import { useState } from 'react'
import './App.css'

// Key takeaways from react - I always do it wrong, for rendering new states
// we need to use .map(element => ()//return some jsx);
// What is jsx => Everything we write in react in JSX ex:- <div>{todo.id}</div>
// JSX is not react dependent

function App() {
  const [todos, setTodos] = useState([]); 
  const [globalId, setGlobalId] = useState(1);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  function deleteTodo(id) {
    setTodos(todos.filter(todo => todo.id !== id));
  }

  function addTodo() {
    if (title && description) {
      const todo = {
        title,
        description,
        id: globalId
      };
      setTodos([...todos, todo]);
      setGlobalId(globalId + 1);
  
      setTitle('');
      setDescription('');
    }
  }

  return (
    <div>
      <input type="text" id="title" placeholder="Todo title" onChange={(e) => setTitle(e.target.value)}></input> <br /><br />
      <input type="text" id="description" placeholder="Todo description" onChange={(e) => setDescription(e.target.value)}></input> <br /><br />
      <button onClick={addTodo}>Add todo</button>
      <br /> <br />

      <div id="todos">
        {todos.map(todo => (
          <div key={todo.id} id={todo.id}>
            <div>{todo.title}</div>
            <div>{todo.description}</div>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
