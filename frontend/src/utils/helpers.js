// src/utils/helpers.js

// Existing helper functions
export const formatDate = (date) => {
  if (!date) return '';
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const truncateText = (text, length = 50) => {
  if (!text) return '';
  if (text.length <= length) return text;
  return text.substring(0, length) + '...';
};

export const isValidEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export const stringToColor = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = hash % 360;
  return `hsl(${hue}, 70%, 80%)`;
};

// ADD THIS - Priority configuration
export const PRIORITY_CONFIG = {
  low: {
    color: 'green',
    bg: 'bg-green-100',
    text: 'text-green-800',
    border: 'border-green-300',
    label: 'Low',
    icon: '🟢',
  },
  medium: {
    color: 'yellow',
    bg: 'bg-yellow-100',
    text: 'text-yellow-800',
    border: 'border-yellow-300',
    label: 'Medium',
    icon: '🟡',
  },
  high: {
    color: 'red',
    bg: 'bg-red-100',
    text: 'text-red-800',
    border: 'border-red-300',
    label: 'High',
    icon: '🔴',
  },
};