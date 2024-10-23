import React, { useState, useEffect } from 'react';
import { TodoInput } from './components/TodoInput';
import { TodoList } from './components/TodoList';
import { TodoStats } from './components/TodoStats';
import { Todo, TodoStats as TodoStatsType } from './types';
import { ListTodo } from 'lucide-react';

function App() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem('todos');
    return saved ? JSON.parse(saved) : [];
  });
  const [showArchived, setShowArchived] = useState(false);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text: string) => {
    setTodos([
      ...todos,
      {
        id: crypto.randomUUID(),
        text,
        completed: false,
      },
    ]);
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const archiveTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, archivedAt: new Date().toISOString() } : todo
      )
    );
  };

  const stats: TodoStatsType = {
    active: todos.filter(t => !t.completed && !t.archivedAt).length,
    completed: todos.filter(t => t.completed && !t.archivedAt).length,
    archived: todos.filter(t => t.archivedAt).length
  };

  const activeTodos = todos.filter(todo => !todo.archivedAt);
  const archivedTodos = todos.filter(todo => todo.archivedAt);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center gap-3 mb-8">
            <ListTodo className="w-8 h-8 text-blue-500" />
            <h1 className="text-2xl font-bold text-gray-800">
              {showArchived ? 'Archived Todos' : 'My Todo List'}
            </h1>
          </div>

          {!showArchived && <TodoInput onAdd={addTodo} />}

          <div className="mt-8">
            <TodoStats 
              stats={stats}
              onShowArchived={() => setShowArchived(!showArchived)}
              showingArchived={showArchived}
            />

            {showArchived ? (
              archivedTodos.length > 0 ? (
                <TodoList
                  todos={archivedTodos}
                  onToggle={toggleTodo}
                  onArchive={archiveTodo}
                  archived={true}
                />
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <p>No archived todos yet.</p>
                </div>
              )
            ) : (
              activeTodos.length > 0 ? (
                <TodoList
                  todos={activeTodos}
                  onToggle={toggleTodo}
                  onArchive={archiveTodo}
                />
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <ListTodo className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No active todos yet. Add one above to get started!</p>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;