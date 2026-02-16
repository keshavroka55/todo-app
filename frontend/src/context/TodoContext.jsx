import React, { createContext, useContext } from 'react';
import { useTodos } from '../hooks/useTodos';

// Create context
const TodoContext = createContext(null);

/**
 * Custom hook to use todo context
 * @returns {Object} Todo context value
 */
export const useTodo = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodo must be used within a TodoProvider');
  }
  return context;
};

/**
 * Todo Provider Component
 * Wraps the app and provides todo data to all children
 */
export const TodoProvider = ({ children }) => {
  // Use our custom hook
  const todoOperations = useTodos();

  return (
    <TodoContext.Provider value={todoOperations}>
      {children}
    </TodoContext.Provider>
  );
};