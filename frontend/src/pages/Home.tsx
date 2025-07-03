import { useState, useEffect } from 'react';
import TodoForm from '../components/TodoForm';
import TodoList from '../components/TodoList';
import { Todo, TodoFormData } from '../types/Todo';
import todoService from '../services/todoService';

const Home = () => {
  console.log('Home component rendering...');
  
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

  useEffect(() => {
    console.log('Home component mounted, loading todos...');
    loadTodos();
  }, []);

  const loadTodos = async () => {
    try {
      console.log('Starting to load todos...');
      setLoading(true);
      const data = await todoService.getAllTodos();
      console.log('Todos loaded successfully:', data);
      console.log('Data type:', typeof data);
      console.log('Is array:', Array.isArray(data));
      setTodos(Array.isArray(data) ? data : []);
      setError(null);
    } catch (err) {
      console.error('Error loading todos:', err);
      console.error('Error details:', {
        message: err instanceof Error ? err.message : 'Unknown error',
        stack: err instanceof Error ? err.stack : undefined
      });
      setError('Failed to load todos. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddTodo = async (todoData: TodoFormData) => {
    try {
      const newTodo = await todoService.createTodo({
        ...todoData,
        completed: false
      });
      setTodos(prev => [newTodo, ...prev]);
      setError(null);
    } catch (err) {
      setError('Failed to add todo. Please try again.');
      console.error('Error adding todo:', err);
    }
  };

  const handleToggleTodo = async (id: number) => {
    try {
      const updatedTodo = await todoService.toggleTodoStatus(id);
      setTodos(prev => prev.map(todo => 
        todo.id === id ? updatedTodo : todo
      ));
      setError(null);
    } catch (err) {
      setError('Failed to update todo. Please try again.');
      console.error('Error toggling todo:', err);
    }
  };

  const handleDeleteTodo = async (id: number) => {
    try {
      await todoService.deleteTodo(id);
      setTodos(prev => prev.filter(todo => todo.id !== id));
      setError(null);
    } catch (err) {
      setError('Failed to delete todo. Please try again.');
      console.error('Error deleting todo:', err);
    }
  };

  const handleEditTodo = (todo: Todo) => {
    setEditingTodo(todo);
  };

  const handleUpdateTodo = async (todoData: TodoFormData) => {
    if (!editingTodo?.id) return;
    
    try {
      const updatedTodo = await todoService.updateTodo(editingTodo.id, {
        ...editingTodo,
        ...todoData
      });
      setTodos(prev => prev.map(todo => 
        todo.id === editingTodo.id ? updatedTodo : todo
      ));
      setEditingTodo(null);
      setError(null);
    } catch (err) {
      setError('Failed to update todo. Please try again.');
      console.error('Error updating todo:', err);
    }
  };

  const handleCancelEdit = () => {
    setEditingTodo(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Todo List App
          </h1>
          <p className="text-gray-600">
            Manage your tasks with ease
          </p>
        </header>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6">
            {error}
            <button
              onClick={() => setError(null)}
              className="float-right text-red-500 hover:text-red-700"
            >
              ×
            </button>
          </div>
        )}

        {editingTodo ? (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Edit Todo
            </h2>
            <TodoForm
              onSubmit={handleUpdateTodo}
              initialData={editingTodo}
            />
            <button
              onClick={handleCancelEdit}
              className="mt-4 text-gray-600 hover:text-gray-800 text-sm font-medium"
            >
              Cancel
            </button>
          </div>
        ) : (
          <TodoForm onSubmit={handleAddTodo} />
        )}

        <TodoList
          todos={todos}
          onToggle={handleToggleTodo}
          onDelete={handleDeleteTodo}
          onEdit={handleEditTodo}
          isLoading={loading}
        />
      </div>
    </div>
  );
};

export default Home; 