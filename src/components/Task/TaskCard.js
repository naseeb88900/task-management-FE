import React, { useState } from 'react';
import { useDrag } from 'react-dnd';
import { getUserRole } from '../../utils/auth'; // Assuming you have a utility to get user role
import TaskModal from './Modal/TaskModal';
import { FaTrash } from 'react-icons/fa'; // Importing a trash icon from react-icons
import { deleteTask } from '../../api/api';

const TaskCard = ({ task, users, onUpdateTask, handleCreateOrUpdateTask, setSelectedTask, onDeleteTask }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'TASK',
    item: { id: task.ID },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const filteredUser = users.find((user) => user?.ID === task?.assigned_to);

  const isManager = getUserRole() === 'manager'; // Check if the user is a manager

  const handleEditTask = async (updatedTask) => {
    setSelectedTask(task);
    handleCreateOrUpdateTask(updatedTask, task);
    setIsModalOpen(false); // Close the modal after update
  };

  const handleDelete = async () => {
    await deleteTask(task.ID); // Trigger the delete action, passing the task ID
  };

  return (
    <>
      <div
        ref={drag}
        className={`p-4 mb-4 bg-white rounded shadow-md cursor-pointer flex justify-between items-center ${isDragging ? 'opacity-50' : 'opacity-100'}`}
        onClick={() => setIsModalOpen(true)} // Open modal on card click
      >
        <div>
          <h3 className="font-bold">{task.title}</h3>
          <p>{task.description}</p>
          <p className="text-sm text-gray-500">Assigned to: {filteredUser?.username || 'Unassigned'}</p>
        </div>

        {/* Delete icon on the far right */}
        <FaTrash
          className="text-red-500 hover:text-red-700 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation(); // Prevent triggering the modal when clicking the delete icon
            handleDelete();
          }}
        />
      </div>

      {/* TaskModal for editing the task */}
      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleEditTask}
        users={isManager ? users : []} // Pass users only if the user is a manager
        taskData={task} // Pass the current task to the modal for editing
      />
    </>
  );
};

export default TaskCard;
