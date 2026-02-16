import React from 'react';
import TodoItem from './TodoItem';

/**
 * Todo List Component
 * Displays a list of todos
 */
export const TodoList = ({ todos, onToggle, onDelete, emptyMessage = "No tasks found" }) => {
  if (!todos || todos.length === 0) {
    return (
      <div className="card text-center py-12">
        <div className="text-6xl mb-4">📭</div>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">
          {emptyMessage}
        </h3>
        <p className="text-gray-500">
          Click the "Add Task" button to create your first task!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {todos.map((todo, index) => (
        <div 
          key={todo.id} 
          className="fade-in"
          style={{ animationDelay: `${index * 50}ms` }}
        >
          <TodoItem
            todo={todo}
            onToggle={onToggle}
            onDelete={onDelete}
          />
        </div>
      ))}
    </div>
  );
};
