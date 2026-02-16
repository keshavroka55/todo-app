// src/utils/constants.js

// API endpoints
export const API_ENDPOINTS = {
  TODOS: '/todos',
  TODO_BY_ID: (id) => `/todos/${id}`,
  TOGGLE_TODO: (id) => `/todos/${id}/toggle`,
};

// Priority levels
export const PRIORITY_LEVELS = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
};

// ADD THIS - Priority configuration with colors and icons
export const PRIORITY_CONFIG = {
  [PRIORITY_LEVELS.LOW]: {
    color: 'green',
    bg: 'bg-green-100',
    text: 'text-green-800',
    border: 'border-green-300',
    label: 'Low',
    icon: '🟢',
  },
  [PRIORITY_LEVELS.MEDIUM]: {
    color: 'yellow',
    bg: 'bg-yellow-100',
    text: 'text-yellow-800',
    border: 'border-yellow-300',
    label: 'Medium',
    icon: '🟡',
  },
  [PRIORITY_LEVELS.HIGH]: {
    color: 'red',
    bg: 'bg-red-100',
    text: 'text-red-800',
    border: 'border-red-300',
    label: 'High',
    icon: '🔴',
  },
};

// Filter options
export const FILTER_OPTIONS = {
  ALL: 'all',
  COMPLETED: 'completed',
  PENDING: 'pending',
};

// App constants
export const APP_NAME = process.env.REACT_APP_APP_NAME || 'Todo App';
export const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';