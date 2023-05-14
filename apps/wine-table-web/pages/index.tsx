import { useState, useEffect } from 'react';
import styles from './index.module.scss';
import axios from "axios";

interface TodoProp {
  id: number,
  text: string
}

export function Index() {
  const [todoList, setTodoList] = useState<TodoProp[]>([]);
  const [newTodo, setNewTodo] = useState("");
  const url = 'http://localhost:3000'

  const getTodoList = async () => {
    const res = await axios.get(`${url}/api/todo`);
    setTodoList(res.data)
  }

  const addTodo = async () => {
    if (!newTodo) {
      return;
    }

    const res = await axios.post(`${url}/api/todo`, { text: newTodo });
    setTodoList([...todoList, res.data]);
    setNewTodo("");
  };

  const deleteTodo = async (id: number) => {
    await axios.delete(`${url}/api/todo/${id}`);
    setTodoList(todoList.filter((todo) => todo.id !== id));
  };

  useEffect(() => {
    getTodoList();
  }, [todoList])

  return (
    <div className={styles['container']}>
      <div className={styles['top-content']}>
        <h1> Wine Table To-do </h1>
        <div className={styles['inputs']}>
          <input type='text' value={newTodo} onChange={(e) => setNewTodo(e.target.value)}/>
          <button onClick={addTodo}> Add to list </button>
        </div>
      </div>
      <div className={styles['todo-list']}>
        {
          todoList.map((item, index) => (
            <div key={index}>
              <span key={index}> {index+1}. {item.text} </span>
              <button onClick={() => deleteTodo(item.id)}> x </button>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default Index;
