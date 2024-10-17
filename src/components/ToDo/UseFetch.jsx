import React, { useEffect, useState } from 'react';
function UseFetch() {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState(null);
  const apiUrl = 'http://localhost:8080/todos';

  useEffect(() => {
    const fetchData = async () => { 
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        setTodos(data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchData();
  }, [apiUrl]); 

  return { todos, error, setTodos }; 
}

export default UseFetch;
