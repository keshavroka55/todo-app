import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PRIORITY_CONFIG } from '../utils/constants';
import { formatDate } from '../utils/helpers';
/**
 * Todo Item Component
 * Displays a single todo item with actions
 */
const TodoItem = ({ todo, onToggle, onDelete }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Get priority config
  const priority = PRIORITY_CONFIG[todo.priority] || PRIORITY_CONFIG.medium;

  // Handle delete with confirmation
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setIsDeleting(true);
      await onDelete(todo.id);
      setIsDeleting(false);
    }
  };

  return (
    <div className={`
      card slide-in relative
      ${todo.completed ? 'bg-gray-50' : 'bg-white'}
      ${isDeleting ? 'opacity-50 pointer-events-none' : ''}
    `}>
      {/* Priority indicator bar */}
      <div className={`absolute top-0 left-0 w-1 h-full rounded-l-lg ${priority.bg}`}></div>

      <div className="flex items-start justify-between ml-2">
        {/* Left section - Checkbox and Title */}
        <div className="flex items-start space-x-3 flex-1">
          {/* Custom Checkbox */}
          <button
            onClick={() => onToggle(todo.id)}
            className={`
              mt-1 w-5 h-5 rounded-full border-2 flex items-center justify-center
              transition-colors duration-200
              ${todo.completed 
                ? 'bg-green-500 border-green-500' 
                : 'border-gray-300 hover:border-green-500'
              }
            `}
          >
            {todo.completed && (
              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            )}
          </button>

          {/* Title and Description */}
          <div className="flex-1">
            <h3 
              className={`
                text-lg font-medium cursor-pointer
                ${todo.completed ? 'line-through text-gray-500' : 'text-gray-800'}
              `}
              onClick={() => setShowDetails(!showDetails)}
            >
              {todo.title}
            </h3>
            
            {/* Priority badge */}
            <div className="flex items-center space-x-2 mt-1">
              <span className={`
                inline-flex items-center px-2 py-1 rounded-full text-xs font-medium
                ${priority.bg} ${priority.text} ${priority.border}
              `}>
                <span className="mr-1">{priority.icon}</span>
                {priority.label}
              </span>
              
              {todo.completed && (
                <span className="text-xs text-gray-500">
                  ✓ Completed
                </span>
              )}
            </div>

            {/* Expandable description */}
            {showDetails && todo.description && (
              <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-700">{todo.description}</p>
                <p className="text-xs text-gray-400 mt-2">
                  Created: {formatDate(todo.createdAt)}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right section - Actions */}
        <div className="flex items-center space-x-1 ml-4">
          {/* Edit button */}
          <Link
            to={`/edit/${todo.id}`}
            className="p-2 text-blue-600 hover:bg-blue-100 rounded-full transition"
            title="Edit task"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" 
              />
            </svg>
          </Link>

          {/* Delete button */}
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="p-2 text-red-600 hover:bg-red-100 rounded-full transition disabled:opacity-50"
            title="Delete task"
          >
            {isDeleting ? (
              <svg className="animate-spin w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" 
                />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;