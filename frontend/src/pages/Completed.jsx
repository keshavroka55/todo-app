import React from 'react';
import { useTodo } from '../context/TodoContext';
import {TodoList} from '../components/TodoList';
import { Link } from 'react-router-dom';

const Completed = () => {
  const { todos, toggleTodo, deleteTodo, loading } = useTodo();
  const completedTodos = todos.filter(todo => todo.completed);

  if (completedTodos.length === 0 && !loading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="card max-w-md mx-auto">
          <div className="text-6xl mb-4">🎯</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            No Completed Tasks
          </h1>
          <p className="text-gray-600 mb-6">
            You haven't completed any tasks yet. Keep working!
          </p>
          <Link to="/" className="btn-primary inline-block">
            Go to Tasks
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="card">
        <div className="flex items-center space-x-3">
          <span className="text-4xl">✅</span>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Completed Tasks</h1>
            <p className="text-gray-600">
              You've completed {completedTodos.length} task{completedTodos.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="card">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Progress</span>
          <span>{Math.round((completedTodos.length / todos.length) * 100) || 0}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-green-600 h-2.5 rounded-full transition-all duration-500"
            style={{ width: `${(completedTodos.length / todos.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Completed Tasks List */}
      <TodoList
        todos={completedTodos}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
        emptyMessage="No completed tasks yet"
      />
    </div>
  );
};

export default Completed;