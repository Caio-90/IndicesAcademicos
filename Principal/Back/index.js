async function getMatters() {
        const db = require("./db");
        console.log('Começou!');
    
        console.log('SELECT * FROM matters');
        const matters = await db.selectMatters();
        //console.log(matters);
        return matters
}


function returnMatters() {
    getMatters().then(matters =>{
        const st = require("./store");
        var values = matters;
        //console.log(values);
        //return values  
        st.saveMatters(values)
       }).catch(err =>{
         console.log("ERRO: ",err);
    });
}

returnMatters()