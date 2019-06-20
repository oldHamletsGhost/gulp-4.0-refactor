const {src, series, parallel, dest, watch} = require('gulp');
const {init: srcStart, write: srcWrite} = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const plumber = require('gulp-plumber');
const autoPrefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');
const imageminPngquant = require('imagemin-pngquant');
const imageminJpegRecompress = require('imagemin-jpeg-recompress');
const livereload = require('gulp-livereload');
const zip = require('gulp-zip');
const del = require('del');

//set project name for bundle()
const projectName = 'myProject_';
//set paths
const paths = {
    styles: {
        src: 'public/src/styles/**/*.scss',
        dest: 'public/assets/styles/'
    },
    scripts: {
        src: 'public/src/scripts/**/*.js',
        dest: 'public/assets/scripts/'
    },
    images: {
        src: 'public/src/images/**/*.{png,jpeg,jpg,svg,gif}',
        dest: 'public/assets/images/'
    },
    bundle: {
        dir: 'public/**/*'
    },
    clean: {
        dir: 'public/assets'
    }
};

function clean() {
    return del([paths.clean.dir]);
}

function bundle() {
    return src(paths.bundle.dir)
        .pipe(zip(`${projectName}${new Date().getTime()}.zip`))
        .pipe(dest('./'))
}

function styles() {
    return src(paths.styles.src)
        .pipe(plumber())
        .pipe(srcStart())
        .pipe(autoPrefixer())
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(srcWrite())
        .pipe(rename({ basename: 'main', suffix: '.min'}))
        .pipe(dest(paths.styles.dest))
        .pipe(livereload());
}

function scripts() {
    return src(paths.scripts.src)
        .pipe(plumber())
        .pipe(srcStart())
        .pipe(babel({presets: ["@babel/preset-env"]}))
        .pipe(uglify({mangle: {toplevel: true}}))
        .pipe(concat('main.min.js'))
        .pipe(srcWrite())
        .pipe(dest(paths.scripts.dest))
        .pipe(livereload());
}

function images() {
    return src(paths.images.src)
        .pipe(imagemin(
            [
                imagemin.gifsicle(),
                imagemin.jpegtran(),
                imagemin.optipng(),
                imagemin.svgo(),
                imageminPngquant(),
                imageminJpegRecompress()
            ]
        ))
        .pipe(dest(paths.images.dest))
        .pipe(livereload());
}

function watcher() {
    require('./server.js');
    livereload.listen();
    watch(paths.scripts.src, series(scripts));
    watch(paths.styles.src, series(styles));
    watch(paths.images.src, series(images));
}

const build = series(clean, parallel(styles, scripts, images, watcher));

exports.clean = clean;
exports.styles = styles;
exports.scripts = scripts;
exports.images = images;
exports.watch = watcher;
exports.bundle = bundle;
exports.default = build;
