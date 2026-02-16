import React, { useState} from 'react';
import { useTodo } from '../context/TodoContext';
import {TodoList} from '../components/TodoList';
import SearchBar from '../components/SearchBar';
import Loader from '../components/Loader';

const Home = () => {
  const { 
    todos, 
    loading, 
    error, 
    stats,
    toggleTodo, 
    deleteTodo,
    updateFilters,
    refreshTodos 
  } = useTodo();

  const [filterStatus, setFilterStatus] = useState('all');

  // Handle filter change
  const handleFilterChange = (status) => {
    setFilterStatus(status);
    updateFilters({ 
      completed: status === 'all' ? undefined : status === 'completed' 
    });
  };

  // Handle search
  const handleSearch = (term) => {
    updateFilters({ search: term || undefined });
  };

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p className="font-bold mb-2">Error Loading Tasks</p>
          <p>{error}</p>
          <button 
            onClick={refreshTodos}
            className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="card">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">My Tasks</h1>
        <p className="text-gray-600">
          Manage your tasks efficiently and stay organized
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <div className="text-3xl mb-2">📊</div>
          <div className="text-sm opacity-90">Total Tasks</div>
          <div className="text-3xl font-bold">{stats.total}</div>
        </div>
        
        <div className="card bg-gradient-to-br from-green-500 to-green-600 text-white">
          <div className="text-3xl mb-2">✅</div>
          <div className="text-sm opacity-90">Completed</div>
          <div className="text-3xl font-bold">{stats.completed}</div>
        </div>
        
        <div className="card bg-gradient-to-br from-yellow-500 to-yellow-600 text-white">
          <div className="text-3xl mb-2">⏳</div>
          <div className="text-sm opacity-90">Pending</div>
          <div className="text-3xl font-bold">{stats.pending}</div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="card">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <SearchBar 
              onSearch={handleSearch}
              placeholder="Search tasks by title..."
            />
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={() => handleFilterChange('all')}
              className={`
                px-4 py-2 rounded-lg font-medium transition
                ${filterStatus === 'all' 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }
              `}
            >
              All ({stats.total})
            </button>
            <button
              onClick={() => handleFilterChange('pending')}
              className={`
                px-4 py-2 rounded-lg font-medium transition
                ${filterStatus === 'pending' 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }
              `}
            >
              Pending ({stats.pending})
            </button>
            <button
              onClick={() => handleFilterChange('completed')}
              className={`
                px-4 py-2 rounded-lg font-medium transition
                ${filterStatus === 'completed' 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }
              `}
            >
              Completed ({stats.completed})
            </button>
          </div>
        </div>
      </div>

      {/* Todo List */}
      {loading ? (
        <Loader text="Loading your tasks..." />
      ) : (
        <TodoList
          todos={todos}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
          emptyMessage={
            filterStatus === 'all' 
              ? "You haven't created any tasks yet" 
              : filterStatus === 'completed'
              ? "No completed tasks found"
              : "No pending tasks found"
          }
        />
      )}
    </div>
  );
};

export default Home;