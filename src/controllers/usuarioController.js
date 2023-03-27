import { usuarios } from "../infra/bd.js"
import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
function UsuarioController(app) {
    app.get('/usuario', exibir)
    function exibir(req, res) {
        (async () => {
            const db = await open({
                filename: './src/infra/bdReceitas.db',
                driver: sqlite3.Database
            })
            const result = await db.all('SELECT * FROM Usuario')
            res.send(result)
            db.close()
        })()
    }

    app.get('/usuario/email/:email', buscarEmail)
    function buscarEmail(req, res) {
        (async () => {
            const db = await open({
                filename: './src/infra/bdReceitas.db',
                driver: sqlite3.Database
            })
            const result = await db.all('SELECT * FROM Usuario where email like ?', req.params.email)
            if (result != '') {
                res.send(result)
            } else {
                res.send(`Usuário com email: ${req.params.email} não encontrado`)
            }
            db.close()
        })()
    }
    app.get('/usuario/nome/:nome', buscarNome)
    function buscarNome(req, res) {
        (async () => {
            const db = await open({
                filename: './src/infra/bdReceitas.db',
                driver: sqlite3.Database
            })
            const result = await db.all(`SELECT * FROM Usuario where nome like ?`, req.params.nome)
            if (result != '') {
                res.send(result)
            } else {
                res.send(`Usuário: ${req.params.nome} não encontrado`)
            }
            db.close()
        })()
    }
    app.post('/usuario', inserir)
    function inserir(req, res) {
        (async () => {
            const db = await open({
                filename: './src/infra/bdReceitas.db',
                driver: sqlite3.Database
            })
            await db.run(`INSERT INTO Usuario(nome,email,senha) VALUES(?,?,?)`, req.body.nome, req.body.email, req.body.senha)
            res.send(`Usuário: ${req.body.nome} inserido com sucesso.`)
            db.close()
        })()
    }
    app.delete('/usuario/email/:email', deletarEmail)
    function deletarEmail(req, res) {
        (async () => {
            const db = await open({
                filename: './src/infra/bdReceitas.db',
                driver: sqlite3.Database
            })
            const result = await db.all('SELECT * FROM Usuario where email like ?', req.params.email)
            if (result != '') {
                res.send(`Usuário com email: ${req.params.email} deletado`)
                await db.run('DELETE from Usuario WHERE email= ?', req.params.email)
            } else {
                res.send(`Usuário com email: ${req.params.email} não encontrado`)
            }
            db.close()
        })()
    }
    app.delete('/usuario/email/:nome', deletarNome)
    function deletarNome(req, res) {
        (async () => {
            const db = await open({
                filename: './src/infra/bdReceitas.db',
                driver: sqlite3.Database
            })
            const result = await db.all('SELECT * FROM Usuario where nome like ?', req.params.nome)
            if (result != '') {
                res.send(`Usuário: ${req.params.nome} deletado`)
                await db.run('DELETE from Usuario WHERE nome= ?', req.params.nome)
            } else {
                res.send(`Usuário: ${req.params.nome} não encontrado`)
            }
            db.close()
        })()
    }
    app.put('/usuario/email/:email', Atualizar)
    function Atualizar(req, res) {
        (async () => {
            const db = await open({
                filename: './src/infra/bdReceitas.db',
                driver: sqlite3.Database
            })
            const result = await db.all('SELECT * FROM Usuario where email like ?', req.params.email)
            if (result != '') {
                res.send(`Usuário: ${req.params.email} Atualizado`)
                await db.run('UPDATE Usuario SET nome=?, email=?, senha=? WHERE email= ?', req.body.nome, req.body.email, req.body.senha, req.params.email)
            } else {
                res.send(`Usuário: ${req.params.email} não encontrado`)
            }
            db.close()
        })() 
    }
}
export default UsuarioController