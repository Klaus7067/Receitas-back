import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

function ReceitaController(app) {
    app.get('/receita', exibir)
    function exibir(req, res) {
        (async () => {
            const db = await open({
                filename: './src/infra/bdReceitas.db',
                driver: sqlite3.Database
            })
            const result = await db.all('SELECT * FROM Receitas')
            res.send(result)
            db.close()
        })()
    }
    app.get('/receita/titulo/:titulo', buscarTitulo)
    function buscarTitulo(req, res) {
        (async () => {
            const db = await open({
                filename: './src/infra/bdReceitas.db',
                driver: sqlite3.Database
            })
            const result = await db.all('SELECT * FROM Receitas where titulo like ?', req.body.titulo)
            if (result != '') {
                res.send(result)
            } else {
                res.send(`Receitas com titulo: ${req.body.titulo} não encontrado`)
            }
            db.close()
        })()
    }
    app.post('/receita', inserir)
    function inserir(req, res) {
        (async () => {
            const db = await open({
                filename: './src/infra/bdReceitas.db',
                driver: sqlite3.Database
            })
            await db.run(`INSERT INTO Receitas(titulo,descricao,status,tempo_preparo,id_usuario) VALUES(?,?,?,?,?)`, req.body.titulo, req.body.descricao, req.body.status, req.body.tempo_preparo, req.body.id_usuario)
            res.send(`Receita: ${req.body.titulo} inserida com sucesso.`)
            db.close()
        })()
    }
    app.delete('/receita/titulo/:titulo', deletarTitulo)
    function deletarTitulo(req, res) {
        (async () => {
            const db = await open({
                filename: './src/infra/bdReceitas.db',
                driver: sqlite3.Database
            })
            const result = await db.all('SELECT * FROM Receitas where titulo like ?', req.body.titulo)
            if (result != '') {
                res.send(`Receitas com titulo: ${req.body.titulo} deletada`)
                await db.run('DELETE from Receitas WHERE titulo= ?', req.body.titulo)
            } else {
                res.send(`Receitas com titulo: ${req.body.titulo} não encontrada`)
            }
            db.close()
        })()
    }
    app.delete('/receita/titulo/:titulo', deletarTitulo)
    function deletarTitulo(req, res) {
        (async () => {
            const db = await open({
                filename: './src/infra/bdReceitas.db',
                driver: sqlite3.Database
            })
            const result = await db.all('SELECT * FROM Receitas where titulo like ?', req.body.titulo)
            if (result != '') {
                res.send(`Receitas: ${req.body.titulo} deletada`)
                await db.run('DELETE from Receitas WHERE titulo= ?', req.body.titulo)
            } else {
                res.send(`Receitas: ${req.body.titulo} não encontrada`)
            }
            db.close()
        })()
    }
    app.put('/receita/titulo/:titulo', Atualizar)
    function Atualizar(req, res) {
        (async () => {
            const db = await open({
                filename: './src/infra/bdReceitas.db',
                driver: sqlite3.Database
            })
            const result = await db.all('SELECT * FROM Receitas where titulo like ?', req.body.titulo)
            if (result != '') {
                res.send(`Receitas: ${req.body.titulo} Atualizada`)
                await db.run('UPDATE Receitas SET titulo=?, descricao=?, status=?, tempo_preparo=?, id_usuario=? WHERE titulo= ?', req.body.titulo, req.body.descricao, req.body.status, req.body.tempo_preparo, req.body.id_usuario)
            } else {
                res.send(`Receitas: ${req.body.titulo} não encontrada`)
            }
            db.close()
        })()
    }
}
export default ReceitaController