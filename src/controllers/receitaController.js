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
            const result = await db.all('SELECT * FROM Receitas where titulo like ?', req.params.titulo)
            if (result != '') {
                res.send(result)
            } else {
                res.send(`Receitas com titulo: ${req.params.titulo} não encontrado`)
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
            await db.run(`INSERT INTO Receitas(titulo,descricao,modo_preparo,tempo_preparo,id_usuario) VALUES(?,?,?,?,?)`, req.body.titulo, req.body.descricao, req.body.modo_preparo, req.params.tempo_preparo,req.params.id_usuario)
            res.send(`Receita: ${req.body.titulo} inserida com sucesso.`)
            db.close()
        })()
    }
    app.delete('/receita/titulo/:titulo', deletartitulo)
    function deletartitulo(req, res) {
        (async () => {
            const db = await open({
                filename: './src/infra/bdReceitas.db',
                driver: sqlite3.Database
            })
            const result = await db.all('SELECT * FROM Receitas where titulo like ?', req.params.titulo)
            if (result != '') {
                res.send(`Receitas com titulo: ${req.params.titulo} deletada`)
                await db.run('DELETE from Receitas WHERE titulo= ?', req.params.titulo)
            } else {
                res.send(`Receitas com titulo: ${req.params.titulo} não encontrada`)
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
            const result = await db.all('SELECT * FROM Receitas where titulo like ?', req.params.titulo)
            if (result != '') {
                res.send(`Receitas: ${req.params.titulo} deletada`)
                await db.run('DELETE from Receitas WHERE titulo= ?', req.params.titulo)
            } else {
                res.send(`Receitas: ${req.params.titulo} não encontrada`)
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
            const result = await db.all('SELECT * FROM Receitas where titulo like ?', req.params.titulo)
            if (result != '') {
                res.send(`Receitas: ${req.params.titulo} Atualizada`)
                await db.run('UPDATE Receitas SET titulo=?, descricao=?, modo_preparo=?, tempo_preparo=?, id_usuario=? WHERE titulo= ?', req.body.titulo, req.body.descricao, req.body.modo_preparo,req.params.tempo_preparo,req.params.id_usuario)
            } else {
                res.send(`Receitas: ${req.params.titulo} não encontrada`)
            }
            db.close()
        })() 
    }
}
export default ReceitaController