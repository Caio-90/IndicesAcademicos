const http = require("http");
const db = require("../connection/db");
const host = 'localhost';
const port = 8000;


const requestListener = function (req, res) {
    res.setHeader("Content-Type", "application/json");
    res.writeHead(200);
    db.selectMatters().then(matters =>{
    let values = matters;
    let mat = '';
    for (let value of values) {
        value = JSON.stringify(value)
        mat = mat + value;
    }
    res.end(mat);
});
}
function convertMatters(){
    db.selectMatters().then(matters =>{
        let values = matters;
        let i = 5;
        let mat = '';
        for (let value of values) {
            value = JSON.stringify(value)
            mat = mat + value;
        }
        
        mat = mat.replace(/"/g,'|')
        //console.log(typeof(mat))
        return i;
        
        }
        )
}
const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});