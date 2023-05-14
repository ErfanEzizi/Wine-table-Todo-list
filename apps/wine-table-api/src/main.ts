
import express from 'express';
import * as path from 'path';
import bodyParser from "body-parser";
import cors from 'cors';

interface TodoProp {
  id: number,
  text: string
}

const app = express();

app.use(cors())
app.use(bodyParser.json())


let todoList: TodoProp[] = [];
let nextId = 1;

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/api/todo', (req, res) => {
  res.json(todoList)
});

app.post('/api/todo', (req, res) => {
  const newTodo = {
    id: nextId,
    text: req.body.text
  }
  todoList.push(newTodo);
  nextId++;
  res.json(newTodo);
});

app.delete('/api/todo/:id', (req, res) => {
  const id = parseInt(req.params.id);
  todoList = todoList.filter((todo) => todo.id !== id);
  res.json({ id });
});

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/`);
});
server.on('error', console.error);
