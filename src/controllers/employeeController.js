import { Employees } from "../infra/bd.js"
import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
function EmployeeController(app) {
    app.get('/employee', exibir)
    function exibir(req, res) {
        (async () => {
            const db = await open({
                filename: './src/infra/bdReceitas.db',
                driver: sqlite3.Database
            })
            const result = await db.all('SELECT * FROM Employee')
            res.send(result)
            db.close()
        })()
    }

    app.get('/employee/office/:office', buscarOffice)
    function buscarOffice(req, res) {
        (async () => {
            const db = await open({
                filename: './src/infra/bdReceitas.db',
                driver: sqlite3.Database
            })
            const result = await db.all('SELECT * FROM Employee where office like ?', req.params.office)
            if (result != '') {
                res.send(result)
            } else {
                res.send(`Usuário com office: ${req.params.office} não encontrado`)
            }
            db.close()
        })()
    }
    app.get('/employee/name/:name', buscarNome)
    function buscarNome(req, res) {
        (async () => {
            const db = await open({
                filename: './src/infra/bdReceitas.db',
                driver: sqlite3.Database
            })
            const result = await db.all(`SELECT * FROM Employee where name like ?`, req.params.name)
            if (result != '') {
                res.send(result)
            } else {
                res.send(`Usuário: ${req.params.name} não encontrado`)
            }
            db.close()
        })()
    }
    app.post('/employee', inserir)
    function inserir(req, res) {
        (async () => {
            const db = await open({
                filename: './src/infra/bdReceitas.db',
                driver: sqlite3.Database
            })
            await db.run(`INSERT INTO Employee(name,office,departament) VALUES(?,?,?)`, req.body.name, req.body.office, req.body.departament)
            res.send(`Usuário: ${req.body.name} inserido com sucesso.`)
            db.close()
        })()
    }
    app.delete('/employee/office/:office', deletarOffice)
    function deletarOffice(req, res) {
        (async () => {
            const db = await open({
                filename: './src/infra/bdReceitas.db',
                driver: sqlite3.Database
            })
            const result = await db.all('SELECT * FROM Employee where office like ?', req.params.office)
            if (result != '') {
                res.send(`Usuário com office: ${req.params.office} deletado`)
                await db.run('DELETE from Employee WHERE office= ?', req.params.office)
            } else {
                res.send(`Usuário com office: ${req.params.office} não encontrado`)
            }
            db.close()
        })()
    }
    app.delete('/employee/office/:name', deletarNome)
    function deletarNome(req, res) {
        (async () => {
            const db = await open({
                filename: './src/infra/bdReceitas.db',
                driver: sqlite3.Database
            })
            const result = await db.all('SELECT * FROM Employee where name like ?', req.params.name)
            if (result != '') {
                res.send(`Usuário: ${req.params.name} deletado`)
                await db.run('DELETE from Employee WHERE name= ?', req.params.name)
            } else {
                res.send(`Usuário: ${req.params.name} não encontrado`)
            }
            db.close()
        })()
    }
    app.put('/employee/office/:office', Atualizar)
    function Atualizar(req, res) {
        (async () => {
            const db = await open({
                filename: './src/infra/bdReceitas.db',
                driver: sqlite3.Database
            })
            const result = await db.all('SELECT * FROM Employee where office like ?', req.params.office)
            if (result != '') {
                res.send(`Usuário: ${req.params.office} Atualizado`)
                await db.run('UPDATE Employee SET name=?, office=?, departament=? WHERE office= ?', req.body.name, req.body.office, req.body.departament, req.params.office)
            } else {
                res.send(`Usuário: ${req.params.office} não encontrado`)
            }
            db.close()
        })()
    }
}
export default EmployeeController