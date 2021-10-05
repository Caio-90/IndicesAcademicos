function Storage(data) {
    localStorage.setItem('indices',data)
    localStorage.getItem('indices')
}
//estabelece um canal de comunicação com o arquivo Main.py
function canal() {
    const spawn = requirejs(['child_process']);
    const pythonProcess = spawn('python',["Principal/main.py"]);
}
