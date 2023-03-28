import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

function ReceitaController(app) {
    app.get('/receita', exibir)
    function exibir(req, res) {
        (async () => {
            const db = await open({
                filename: './src/infra/Database.db',
                driver: sqlite3.Database
            })
            const result = await db.all('SELECT * FROM Receitas')
            res.send(result)
            db.close()
        })()
    }
    app.get('/receita/name/:name', buscarname)
    function buscarname(req, res) {
        (async () => {
            const db = await open({
                filename: './src/infra/Database.db',
                driver: sqlite3.Database
            })
            const result = await db.all('SELECT * FROM Receitas where name like ?', req.body.name)
            if (result != '') {
                res.send(result)
            } else {
                res.send(`Receitas com name: ${req.body.name} não encontrado`)
            }
            db.close()
        })()
    }
    app.post('/receita', inserir)
    function inserir(req, res) {
        (async () => {
            const db = await open({
                filename: './src/infra/Database.db',
                driver: sqlite3.Database
            })
            await db.run(`INSERT INTO Receitas(name,publishing,author,price,image) VALUES(?,?,?,?,?)`, req.body.name, req.body.publishing, req.body.author, req.body.price, req.body.image)
            res.send(`Receita: ${req.body.name} inserida com sucesso.`)
            db.close()
        })()
    }
    app.delete('/receita/name/:name', deletarname)
    function deletarname(req, res) {
        (async () => {
            const db = await open({
                filename: './src/infra/Database.db',
                driver: sqlite3.Database
            })
            const result = await db.all('SELECT * FROM Receitas where name like ?', req.body.name)
            if (result != '') {
                res.send(`Receitas com name: ${req.body.name} deletada`)
                await db.run('DELETE from Receitas WHERE name= ?', req.body.name)
            } else {
                res.send(`Receitas com name: ${req.body.name} não encontrada`)
            }
            db.close()
        })()
    }
    app.delete('/receita/name/:name', deletarname)
    function deletarname(req, res) {
        (async () => {
            const db = await open({
                filename: './src/infra/Database.db',
                driver: sqlite3.Database
            })
            const result = await db.all('SELECT * FROM Receitas where name like ?', req.body.name)
            if (result != '') {
                res.send(`Receitas: ${req.body.name} deletada`)
                await db.run('DELETE from Receitas WHERE name= ?', req.body.name)
            } else {
                res.send(`Receitas: ${req.body.name} não encontrada`)
            }
            db.close()
        })()
    }
    app.put('/receita/name/:name', Atualizar)
    function Atualizar(req, res) {
        (async () => {
            const db = await open({
                filename: './src/infra/Database.db',
                driver: sqlite3.Database
            })
            const result = await db.all('SELECT * FROM Receitas where name like ?', req.body.name)
            if (result != '') {
                res.send(`Receitas: ${req.body.name} Atualizada`)
                await db.run('UPDATE Receitas SET name=?, publishing=?, author=?, price=?, image=?, id=? WHERE name= ?', req.body.name, req.body.publishing, req.body.author, req.body.price, req.body.image)
            } else {
                res.send(`Receitas: ${req.body.name} não encontrada`)
            }
            db.close()
        })()
    }
}
export default ReceitaController