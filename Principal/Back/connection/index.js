async function getMatters() {
        const db = require("./db");
        console.log('Começou!'); 
        //console.log('SELECT * FROM matters');
        const matters = await db.selectMatters();
        //console.log(matters);
        //console.log(Object.keys(matters))
        return matters
}


function returnMatters() {
    getMatters().then(matters =>{
        var values = matters;
        
        JSON.stringify(values);
        //console.log(values);
        return values;  
       }).catch(err =>{
         console.log("ERRO: ",err);
    });
}


module.exports = { returnMatters }
returnMatters();