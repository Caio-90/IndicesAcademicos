
//sobe o servidor

const customExpress = require('./customExpress')
const conexao = require('./conexao')
//const tabelas = require('./structure/tabelas')

conexao.connect((erro)=>{
    if(erro){
        console.log(erro)
    }
    else{

        console.log('conectado')

        tabelas.init(conexao)
        const app = customExpress()
        app.listen(3000, ()=>console.log('servidor rodando na porta 3000'))

    }
})