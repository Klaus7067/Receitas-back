import Employee from "../models/Employee.js"
import Book from "../models/Book.js"
import Client from "../models/Book.js"

const Employees = []
const Books = []
const Clients = []
const Employee1 = new Employee('Vinicius', 'vinicius@', '123')
Employees.push(Employee1)
const Employee2 = new Employee('João', 'joao@', '321')
Employees.push(Employee2)
const dataAtual = new Date()
const t1 = new Book('Estudar NodeJs', 'Estudar pela documentação online', 'em andamento', dataAtual)
Books.push(t1)
const t2 = new Book('Estudar ExpressJs', 'Estudar pela documentação online', 'em andamento', dataAtual)
Books.push(t2)
export { Employees, Books, Clients }