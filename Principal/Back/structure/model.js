const conexao = require('../infraestrutura/conexao')
const moment = require('moment')

class Postagem {
    adiciona(postagem, res) {
        const data = new Date()

        const usuarioEhvalido = postagem.user.length >=5

        const validacoes = [
            {
                nome: 'user',
                valido: usuarioEhvalido,
                mensagem: 'Nome do usuário deve ter pelo menos 5 caracteres'
            }
        ]

        const erros = validacoes.filter(campo => !campo.valido)

        const existemErros = erros.length

        if(existemErros){
            res.status(400).json(erros)
        }else{
            const postagemDatada = {...postagem, data}       
            const sql = 'INSERT INTO Postagens SET ?'

            conexao.query(sql, postagemDatada, (erro, resultados) => {
                if (erro) {
                    res.status(400).json(erro)
                } else {
                    res.status(201).json(resultados)
                }
            })

        }

        
    }

    lista(res) {
        const sql = 'SELECT * FROM Postagens'

        conexao.query(sql, (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.json(resultados)
            }
        })
    }

    buscaPorId(id, res) {
        const sql = `SELECT * FROM Postagens WHERE id=${id}`;

        conexao.query(sql, (erro, resultados) => {
            const postagem = resultados[0];
            if (erro) {
                res.status(400).json(erro);
            } else {
                res.status(200).json(postagem);
                console.log(postagem.user)
            }
        })
    }

    altera(id, valores, res) {
        const sql = 'UPDATE Postagens SET ? WHERE id=?'

        conexao.query(sql, [valores, id], (erro, resultados) => { 
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json({...valores, id})
            }
        })
    }

    deleta(id, res) {
        const sql = 'DELETE FROM Postagens WHERE id=?'

        conexao.query(sql, id, (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json({id})
            }
        })
    }
}  

module.exports = new Postagem