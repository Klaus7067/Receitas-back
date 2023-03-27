import express from 'express'
import UsuarioController from './controllers/usuarioController.js'
import ReceitaController from './controllers/receitaController.js'
import rootController from './controllers/rootController.js'
import cors from 'cors'
const app = express()
app.use(cors())
app.use(express.json())
UsuarioController(app)
ReceitaController(app)
rootController(app)
export default app