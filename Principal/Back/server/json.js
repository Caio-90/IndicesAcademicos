const http = require("http");
const  ind = require('../connection/index');
const host = 'localhost';
const port = 8000;

const requestListener = function (req, res) {
    res.setHeader("Content-Type", "application/json");
    res.writeHead(200);
    let aux = getValues()
    res.end(aux);
};
async function getValues() {
    //???????????????????????????????????
}
const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});