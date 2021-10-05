(async () => {
    const db = require("./db");
    console.log('Começou!');
 
    console.log('SELECT * FROM matters');
    const matters = await db.selectMatters();
    console.log(matters);
})();