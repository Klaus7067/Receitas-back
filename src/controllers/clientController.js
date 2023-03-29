import { Clients } from "../infra/bd.js"
import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

function ClientController(app) {
    app.get('/client', exibir);
    function exibir(req, res) {
        (async () => {
            const db = await open({
                filename: './src/infra/bdReceitas.db',
                driver: sqlite3.Database
            })
            const result = await db.all('SELECT * FROM Client')
            res.send(result)
            db.close()
        })()
    }

    app.get('/client/email/:email', buscarEmail)
    function buscarEmail(req, res) {
        (async () => {
            const db = await open({
                filename: './src/infra/bdReceitas.db',
                driver: sqlite3.Database
            })
            const result = await db.all('SELECT * FROM Client where email like ?', req.params.email)
            if (result != '') {
                res.send(result)
            } else {
                res.send(`Usuário com email: ${req.params.email} não encontrado`)
            }
            db.close()
        })()
    }
    app.get('/client/name/:name', buscarNome)
    function buscarNome(req, res) {
        (async () => {
            const db = await open({
                filename: './src/infra/bdReceitas.db',
                driver: sqlite3.Database
            })
            const result = await db.all(`SELECT * FROM Client where name like ?`, req.params.name)
            if (result != '') {
                res.send(result)
            } else {
                res.send(`Usuário: ${req.params.name} não encontrado`)
            }
            db.close()
        })()
    }
    app.post('/client', inserir)
    function inserir(req, res) {
        (async () => {
            const db = await open({
                filename: './src/infra/bdReceitas.db',
                driver: sqlite3.Database
            })
            await db.run(`INSERT INTO Client(name,email,tel, login, password, cpf, street,number, neighborhood, city, uf, cep) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)`, req.body.name, req.body.email, req.body.tel, req.body.login, req.body.password, req.body.cpf, req.body.street, req.body.number, req.body.neighborhood, req.body.city, req.body.uf, req.body.cep)
            res.send(`Usuário: ${req.body.name} inserido com sucesso.`)
            db.close()
        })()
    }
    app.delete('/client/email/:email', deletarEmail)
    function deletarEmail(req, res) {
        (async () => {
            const db = await open({
                filename: './src/infra/bdReceitas.db',
                driver: sqlite3.Database
            })
            const result = await db.all('SELECT * FROM Client where email like ?', req.params.email)
            if (result != '') {
                res.send(`Usuário com email: ${req.params.email} deletado`)
                await db.run('DELETE from Client WHERE email= ?', req.params.email)
            } else {
                res.send(`Usuário com email: ${req.params.email} não encontrado`)
            }
            db.close()
        })()
    }
    app.delete('/client/email/:name', deletarNome)
    function deletarNome(req, res) {
        (async () => {
            const db = await open({
                filename: './src/infra/bdReceitas.db',
                driver: sqlite3.Database
            })
            const result = await db.all('SELECT * FROM Client where name like ?', req.params.name)
            if (result != '') {
                res.send(`Usuário: ${req.params.name} deletado`)
                await db.run('DELETE from Client WHERE name= ?', req.params.name)
            } else {
                res.send(`Usuário: ${req.params.name} não encontrado`)
            }
            db.close()
        })()
    }
    app.put('/client/email/:email', Atualizar)
    function Atualizar(req, res) {
        (async () => {
            const db = await open({
                filename: './src/infra/bdReceitas.db',
                driver: sqlite3.Database
            })
            const result = await db.all('SELECT * FROM Client where email like ?', req.params.email)
            if (result != '') {
                res.send(`Usuário: ${req.params.email} Atualizado`)
                await db.run('UPDATE Client SET name=?, email=?, tel=?,login=?,password=?,cpf=?,street=?,number=?,neighborhood=?,city=?,uf=?, cep=? WHERE email= ?', req.body.name, req.body.email, req.body.tel, req.body.login, req.body.password, req.body.cpf, req.body.street, req.body.number, req.body.neighborhood, req.body.city, req.body.uf, req.body.cep, req.params.email)
            } else {
                res.send(`Usuário: ${req.params.email} não encontrado`)
            }
            db.close()
        })()
    }
}

export default ClientController