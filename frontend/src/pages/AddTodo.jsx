import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTodo } from '../context/TodoContext';
import { PRIORITY_LEVELS } from '../utils/constants';

const AddTodo = () => {
  const navigate = useNavigate();
  const { addTodo, loading } = useTodo();

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: PRIORITY_LEVELS.MEDIUM
  });

  // Validation errors
  const [errors, setErrors] = useState({});

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.length > 100) {
      newErrors.title = 'Title cannot exceed 100 characters';
    }

    if (formData.description && formData.description.length > 500) {
      newErrors.description = 'Description cannot exceed 500 characters';
    }

    return newErrors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Add todo
    const result = await addTodo(formData);
    
    if (result.success) {
      navigate('/');
    } else {
      setErrors({ submit: result.error });
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="card mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Create New Task</h1>
        <p className="text-gray-600">
          Fill in the details below to create a new task
        </p>
      </div>

      {/* Form */}
      <div className="card">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter task title"
              disabled={loading}
              className={`
                input-field
                ${errors.title ? 'border-red-500 focus:ring-red-500' : ''}
                ${loading ? 'bg-gray-100' : ''}
              `}
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">{errors.title}</p>
            )}
          </div>

          {/* Description field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter task description (optional)"
              rows="4"
              disabled={loading}
              className="input-field"
            />
            <p className="mt-1 text-xs text-gray-500">
              Max 500 characters
            </p>
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description}</p>
            )}
          </div>

          {/* Priority field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Priority Level
            </label>
            <div className="grid grid-cols-3 gap-3">
              {Object.values(PRIORITY_LEVELS).map((priority) => (
                <label
                  key={priority}
                  className={`
                    flex items-center justify-center px-4 py-3 border rounded-lg cursor-pointer
                    transition-all duration-200
                    ${formData.priority === priority
                      ? priority === 'low'
                        ? 'bg-green-100 border-green-500 text-green-700 shadow'
                        : priority === 'medium'
                        ? 'bg-yellow-100 border-yellow-500 text-yellow-700 shadow'
                        : 'bg-red-100 border-red-500 text-red-700 shadow'
                      : 'bg-gray-50 border-gray-300 text-gray-700 hover:bg-gray-100'
                    }
                  `}
                >
                  <input
                    type="radio"
                    name="priority"
                    value={priority}
                    checked={formData.priority === priority}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <span className="capitalize font-medium">
                    {priority === 'low' && '🟢'}
                    {priority === 'medium' && '🟡'}
                    {priority === 'high' && '🔴'}
                    <span className="ml-2">{priority}</span>
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Error message */}
          {errors.submit && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {errors.submit}
            </div>
          )}

          {/* Form actions */}
          <div className="flex justify-end space-x-3 pt-4 border-t">
            <button
              type="button"
              onClick={() => navigate('/')}
              disabled={loading}
              className="btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary flex items-center"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating...
                </>
              ) : (
                'Create Task'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTodo;