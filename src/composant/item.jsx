import React from 'react';

const TaskItem = ({ task, onDelete, onToggle, onEdit }) => {
  const formattedDate = task.created_at
    ? new Date(task.created_at).toLocaleString()
    : 'Date inconnue';

  return (
    <div className="task-item">
      <div className="task-header">
        <small className="task-date">{formattedDate}</small>
        {task.completed && <div className="completed-badge">Tache Terminé</div>}
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          className="task-checkbox"
        />
      </div>
      <div className="task-body">
        
        <strong className="task-title" style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
          {task.title}
        </strong>
        <p className="task-description" style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
          {task.text}
        </p>
      </div>
      <div className="task-footer">
        {!task.completed && (
          <button onClick={() => onEdit(task)} className="btn-edit">Modifier</button>
        )}
        <button onClick={() => onDelete(task.id)} className="btn-delete">Supprimer</button>
      </div>
    </div>
  );
};

export default TaskItem;