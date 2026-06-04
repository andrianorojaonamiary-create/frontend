import React, { useState, useEffect } from 'react';

const TaskForm = ({ onSubmit, editingTask, onUpdate }) => {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title || '');
      setText(editingTask.text || '');
    } else {
      setTitle('');
      setText('');
    }
  }, [editingTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !text.trim()) return;
    if (editingTask) {
      onUpdate(editingTask.id, { title, text });
    } else {
      onSubmit({ title, text });
    }
    setTitle('');
    setText('');
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        type="text"
        placeholder="Titre de la tâche"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Description (texte)"
        value={text}
        onChange={(e) => setText(e.target.value)}
        required
        rows="2"
      />
      <button type="submit">{editingTask ? 'Modifier' : 'Ajouter'}</button>
    </form>
  );
};

export default TaskForm;