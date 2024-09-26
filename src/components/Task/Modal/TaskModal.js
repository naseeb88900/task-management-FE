import React, { useState, useEffect } from 'react';

const TaskModal = ({ isOpen, onClose, onSave, users, taskData }) => {
  const [task, setTask] = useState({ title: '', description: '', assignedTo: '' });

  useEffect(() => {
    if (taskData) {
      setTask({
        title: taskData.title || '',
        description: taskData.description || '',
        assignedTo: taskData.assigned_to || '',
      });
    } else {
      setTask({ title: '', description: '', assignedTo: '' });
    }
  }, [taskData]);

  const handleSave = () => {
    onSave(task);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h2 className="text-xl font-semibold mb-4">
          {taskData ? 'Update Task' : 'Create New Task'}
        </h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Task Title</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={task.title}
              onChange={(e) => setTask({ ...task, title: e.target.value })}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Task Description</label>
            <textarea
              className="w-full p-2 border rounded"
              value={task.description}
              onChange={(e) => setTask({ ...task, description: e.target.value })}
              required
            />
          </div>

          {/* Show user assignment dropdown only if users array is not empty (manager view) */}
          {users.length > 0 && (
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Assign To</label>
              <select
                className="w-full p-2 border rounded"
                value={task.assignedTo}
                onChange={(e) => setTask({ ...task, assignedTo: e.target.value })}
              >
                <option value="">Select a user</option>
                {users.map((user) => (
                  <option key={user.ID} value={user.ID}>
                    {user.username}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="flex justify-end space-x-2">
            <button className="px-4 py-2 bg-gray-500 text-white rounded" onClick={onClose}>
              Cancel
            </button>
            <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={handleSave}>
              {taskData ? 'Update Task' : 'Create Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;
