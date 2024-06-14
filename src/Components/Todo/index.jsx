import React, { useEffect, useState } from 'react';
import { useAuth } from '../../Context/Auth/index'; // Import the useAuth hook
import useForm from '../../hooks/form';
import { v4 as uuid } from 'uuid';
import { Pagination, Checkbox, Button } from '@mantine/core';

const Todo = () => {
  const { user } = useAuth(); // Use the useAuth hook to access user info
  const [defaultValues] = useState({ difficulty: 4 });
  const [list, setList] = useState([]);
  const [incomplete, setIncomplete] = useState(0);
  const [activePage, setActivePage] = useState(1);
  const itemsPerPage = 3;
  const { handleChange, handleSubmit } = useForm(addItem, defaultValues);

  function addItem(item) {
    if (!user) {
      alert("Please log in to add items.");
      return; // Prevent adding items if not logged in
    }
    item.id = uuid();
    item.complete = false;
    setList([...list, item]);
  }

  function deleteItem(id) {
    if (!user) {
      alert("Please log in to modify items.");
      return; // Prevent deleting items if not logged in
    }
    const items = list.filter(item => item.id !== id);
    setList(items);
  }

  const toggleComplete = (id) => {
    if (!user) {
      alert("Please log in to modify items.");
      return; // Prevent toggling completion if not logged in
    }
    setList(list.map(item => {
      if (item.id === id) {
        return { ...item, complete: !item.complete };
      }
      return item;
    }));
  };

  useEffect(() => {
    let incompleteCount = list.filter(item => !item.complete).length;
    setIncomplete(incompleteCount);
    document.title = `To Do List: ${incompleteCount} items pending`;
  }, [list]);

  const startIndex = (activePage - 1) * itemsPerPage;
  const paginatedList = list.slice(startIndex, startIndex + itemsPerPage);

  return (
    <>
      <header data-testid="todo-header">
        <h1 data-testid="todo-h1">To Do List: {incomplete} items pending</h1>
      </header>

      <form onSubmit={handleSubmit}>
        <h2>Add To Do Item</h2>
  
        <label>
          <span>To Do Item</span>
          <input onChange={handleChange} name="text" type="text" placeholder="Item Details" />
        </label>
  
        <label>
          <span>Assigned To</span>
          <input onChange={handleChange} name="assignee" type="text" placeholder="Assignee Name" />
        </label>
  
        <label>
          <span>Difficulty</span>
          <input onChange={handleChange} defaultValue={defaultValues.difficulty} type="range" min={1} max={5} name="difficulty" />
        </label>
  
        <label>
          <Button type="submit" variant="gradient" gradient={{ from: 'pink', to: 'grape', deg: 0 }}>
            Submit
          </Button>
        </label>
      </form>

      {paginatedList.map(item => (
        <div key={item.id}>
          <p>{item.text}</p>
          <p><small>Assigned to: {item.assignee}</small></p>
          <p><small>Difficulty: {item.difficulty}</small></p>
          <Checkbox
            checked={item.complete}
            onChange={() => toggleComplete(item.id)}
            label="Complete"
            style={{ textDecoration: item.complete ? 'line-through' : 'none' }}
          />
          <Button
            onClick={() => deleteItem(item.id)}
            variant="gradient"
            gradient={{ from: 'pink', to: 'grape', deg: 0 }}
          >
            Delete
          </Button>
          <hr />
        </div>
      ))}

      <Pagination
        total={Math.ceil(list.length / itemsPerPage)}
        page={activePage}
        onChange={setActivePage}
      />
    </>
  );
};

export default Todo;
