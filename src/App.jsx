import React, { useState, useEffect } from 'react';
import TaskList from './composant/liste';   // adaptez selon votre chemin
import TaskForm from './composant/form';    // adaptez selon votre chemin
import './App.css';

import logo from './assets/tableau.png'; 
import plus from './assets/plus-1.png'; 
import liste from './assets/formulaire-1.png'; 

const API_URL = 'http://localhost:3001/tasks';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        setTasks(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Erreur chargement', err);
        setLoading(false);
      });
  }, []);

  const addTask = async (newTask) => {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...newTask, completed: false })
    });
    const saved = await response.json();
    setTasks([...tasks, saved]);
  };

  const updateTask = async (id, updatedFields) => {
    const taskToUpdate = tasks.find(t => t.id === id);
    const updated = { ...taskToUpdate, ...updatedFields };
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updated)
    });
    const data = await response.json();
    setTasks(tasks.map(t => (t.id === id ? data : t)));
    setEditingTask(null);
  };

  const deleteTask = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    setTasks(tasks.filter(t => t.id !== id));
  };

  const toggleComplete = async (id) => {
    const task = tasks.find(t => t.id === id);
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: !task.completed })
    });
    const data = await response.json();
    setTasks(tasks.map(t => (t.id === id ? data : t)));
  };

  if (loading) return <div className="app">Chargement des tâches...</div>;

  return (
    <div className="app">
    <header className="header">
      <img src={logo} alt="Logo tâches" />
      <h1>Gestionnaire des tâches</h1>
    </header>

    <div className="main-content">
      {/* Colonne gauche : formulaire */}
      <div className="form-col">
        <div className="section-title"><img src={plus} alt="Ajout" />Ajouter une nouvelle tâche</div>
        <TaskForm
          onSubmit={addTask}
          editingTask={editingTask}
          onUpdate={updateTask}
        />
      </div>

      {/* Colonne droite : liste */}
      <div className="list-col">
        <div className="section-title"><img src={liste} alt="Liste" />Liste des tâches</div>
        <div className="task-list-container">
          <TaskList
            tasks={tasks}
            onDelete={deleteTask}
            onToggle={toggleComplete}
            onEdit={setEditingTask}
          />
        </div>
      </div>
    </div>
    </div>
    );
};

export default App;