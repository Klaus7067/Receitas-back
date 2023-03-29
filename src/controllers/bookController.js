import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

function BookController(app) {
    app.get('/book', exibir)
    function exibir(req, res) {
        (async () => {
            const db = await open({
                filename: './src/infra/bdReceitas.db',
                driver: sqlite3.Database
            })
            const result = await db.all('SELECT * FROM Books')
            res.send(result)
            db.close()
        })()
    }
    app.get('/book/name/:name', buscarName)
    function buscarName(req, res) {
        (async () => {
            const db = await open({
                filename: './src/infra/bdReceitas.db',
                driver: sqlite3.Database
            })
            const result = await db.all('SELECT * FROM Books where name like ?', req.body.name)
            if (result != '') {
                res.send(result)
            } else {
                res.send(`Books com name: ${req.body.name} não encontrado`)
            }
            db.close()
        })()
    }
    app.post('/book', inserir)
    function inserir(req, res) {
        (async () => {
            const db = await open({
                filename: './src/infra/bdReceitas.db',
                driver: sqlite3.Database
            })
            await db.run(`INSERT INTO Books(name,publishing,author,description,price, image) VALUES(?,?,?,?,?,?)`, req.body.name, req.body.publishing, req.body.author, req.body.description, req.body.price, req.body.image)
            res.send(`Book: ${req.body.name} inserida com sucesso.`)
            db.close()
        })()
    }
    app.delete('/book/name/:name', deletarName)
    function deletarName(req, res) {
        (async () => {
            const db = await open({
                filename: './src/infra/bdReceitas.db',
                driver: sqlite3.Database
            })
            const result = await db.all('SELECT * FROM Books where name like ?', req.body.name)
            if (result != '') {
                res.send(`Books com name: ${req.body.name} deletada`)
                await db.run('DELETE from Books WHERE name= ?', req.body.name)
            } else {
                res.send(`Books com name: ${req.body.name} não encontrada`)
            }
            db.close()
        })()
    }
    app.delete('/book/name/:name', deletarName)
    function deletarName(req, res) {
        (async () => {
            const db = await open({
                filename: './src/infra/bdReceitas.db',
                driver: sqlite3.Database
            })
            const result = await db.all('SELECT * FROM Books where name like ?', req.body.name)
            if (result != '') {
                res.send(`Books: ${req.body.name} deletada`)
                await db.run('DELETE from Books WHERE name= ?', req.body.name)
            } else {
                res.send(`Books: ${req.body.name} não encontrada`)
            }
            db.close()
        })()
    }
    app.put('/book/name/:name', Atualizar)
    function Atualizar(req, res) {
        (async () => {
            const db = await open({
                filename: './src/infra/bdReceitas.db',
                driver: sqlite3.Database
            })
            const result = await db.all('SELECT * FROM Books where name like ?', req.body.name)
            if (result != '') {
                res.send(`Books: ${req.body.name} Atualizada`)
                await db.run('UPDATE Books SET name=?, publishing=?, author=?, description=?, price=?, image=?, name=? WHERE name= ?', req.body.name, req.body.publishing, req.body.author, req.body.description, req.body.price, req.body.image)
            } else {
                res.send(`Books: ${req.body.name} não encontrada`)
            }
            db.close()
        })()
    }
}
export default BookController