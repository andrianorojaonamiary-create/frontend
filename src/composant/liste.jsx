import React from 'react';
import TaskItem from './item';

const TaskList = ({ tasks, onDelete, onToggle, onEdit }) => {
  return (
    <div className="task-list">
      {tasks.length === 0 && <p>Aucune tâche pour le moment</p>}
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onDelete={onDelete}
          onToggle={onToggle}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
};

export default TaskList;