const StaticServer = require('static-server');

//set rootPath & port here
const server = new StaticServer({
    rootPath: './public/',
    port: 3000
});

//start server
server.start(() => console.log(`Server started on port: ${server.port}`));