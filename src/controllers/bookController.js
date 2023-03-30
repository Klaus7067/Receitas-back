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
            const result = await db.all('SELECT * FROM Book')
            res.send(result)
            db.close()
        })()
    }
    app.get('/book/:id', buscarId)
    function buscarId(req, res) {
        (async () => {
            const db = await open({
                filename: './src/infra/bdReceitas.db',
                driver: sqlite3.Database
            })
            const result = await db.all('SELECT * FROM Book where id like ?', req.params.id)
            if (result != '') {
                res.send(result)
            } else {
                res.send(`Book com name: ${req.params.id} não encontrado`)
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
            await db.run(`INSERT INTO Book(name,publishing,author,description, image) VALUES(?,?,?,?,?)`, req.body.name, req.body.publishing, req.body.author, req.body.description, req.body.image)
            res.send(`Book: ${req.body.name} inserida com sucesso.`)
            db.close()
        })()
    }
    app.delete('/book/:id', deletarId)
    function deletarId(req, res) {
        (async () => {
            const db = await open({
                filename: './src/infra/bdReceitas.db',
                driver: sqlite3.Database
            })
            const result = await db.all('SELECT * FROM Book where id like ?', req.params.id)
            if (result != '') {
                res.send(`Book com name: ${req.params.id} deletada`)
                await db.run('DELETE from Book WHERE id= ?', req.params.id)
            } else {
                res.send(`Book com name: ${req.params.id} não encontrada`)
            }
            db.close()
        })()
    }
    app.put('/book/:id', Atualizar)
    function Atualizar(req, res) {
        (async () => {
            const db = await open({
                filename: './src/infra/bdReceitas.db',
                driver: sqlite3.Database
            })
            const result = await db.all('SELECT * FROM Book where id like ?', req.params.id)
            if (result != '') {
                res.send(`Book: ${req.params.id} Atualizada`)
                await db.run('UPDATE Book SET name=?, publishing=?, author=?, description=?, image=? WHERE id= ?', req.body.name, req.body.publishing, req.body.author, req.body.description, req.body.image, req.params.id)
            } else {
                res.send(`Book: ${req.params.id} não encontrada`)
            }
            db.close()
        })()
    }
}
export default BookController