# gulp-4.0-refactor
These files should give you a starting point for using Gulp ^4.0.0 in your projects. It should be noted that the styles function 
is built to handle SCSS files only.

# What It Handles
The tasks included will handle all your scripts (ES6 compiling, compressing & mangling, concatenating all files, adding sourcemaps), 
SCSS styles (autoprefixing, compressing, renaming to main.min.css) and compressing images (pngs, jpeg, jpg, svg & gif). Included 
is the clean and bundle functions which will clear your set working directories and export your work files into a .zip respectively. 

# server.js file included for localhosts
A server.js file is included should you want to use a localhost to run your project. If you are not and want to use the command line
to run gulp tasks, remove the livereload functions in the styles, scripts, images and watcher functions. You will also want to remove the require('./server.js') function in the watcher method. If this is the approach you want to take, also delete the server.js file
and remove gulp-livereload from your package.json file and run npm install to be thorough.

If you are using a localhost, livereload is included in the project so you can see your changes apply. You will need to add that 
extension to your browser if you haven't already or add the livereload script to your index file:
<script src="http://localhost:35729/livereload.js"></script>

If the root path for your project is not ./public/ or you do not want to use port 3000, change the server.js file accordingly:

    rootPath: './public/',
    port: 3000
    
# gulpfile.js variables you may want to update

The two variables in gulpfile.js you will likely change are projectName and paths.

Change this name to a name that adequately describes your project.

    const projectName = 'myProject_';

Change these paths so that they reference the appropriate paths. Be sure not to remove the /**/*. part of the reference as it is used
to traverse all the file folders. "src" refers to the source directory and the "dest" is the destination. 

The clean fucntion has only one property which is the reference to the parent folder of all your compressed/gulped files. This assumes you have  a common parent directory for all your dest references.

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
    
    clean: {
        dir: 'public/assets'
    }
    
