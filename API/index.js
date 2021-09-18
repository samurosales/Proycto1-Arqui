const webServer = require('./services/web-server');
const database = require('./services/database');

async function iniciar(){
    try {
        await database.initialize();
        await webServer.initialize();
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

iniciar();

async function apagar(e){
    let err = e;
    try {
        await webServer.close();
        await database.close();
    } catch (error) {
        console.error(error);
        err = err || error;
    }
    console.log('\nCerrando servidor');
    if(err)
        process.exit(1);
    process.exit(0);
}

process.on('SIGTERM', () => { apagar(); });
   
process.on('SIGINT', () => { apagar(); });

process.on('uncaughtException', err => {
    console.error(err);
    apagar(err);
});