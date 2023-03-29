import express from 'express'
import EmployeeController from './controllers/employeeController.js'
import BookController from './controllers/bookController.js'
import ClientController from './controllers/clientController.js'
import cors from 'cors'
const app = express()
app.use(cors())
app.use(express.json())
EmployeeController(app)
BookController(app)
ClientController(app)
export default app