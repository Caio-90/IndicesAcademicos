function saveMatters(values) {
        
    const {LocalStorage} = require("node-localstorage");
    var storage = new LocalStorage('./scratch');   
    storage.setItem('values', values);
    console.log(storage.getItem('values'));
}
/*
function breakMatters(values)
    values.forEach(element => {
        
    });
*/      
  

module.exports = { saveMatters }
//module.exports = { breakMatters }