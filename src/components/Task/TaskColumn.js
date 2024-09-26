import React from 'react';
import TaskCard from './TaskCard';
import { useDrop } from 'react-dnd';

const TaskColumn = ({ status, tasks, onTaskDrop,users,handleCreateOrUpdateTask, setSelectedTask }) => {
  const [{ isOver }, drop] = useDrop({
    accept: 'TASK',
    drop: (item) => {
        console.log('item', item)
        if (item && item.id) {
          onTaskDrop(item.id, status); 
        } else {
          console.error('Dropped item has no ID:', item); 
        }
      },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <div
      ref={drop}
      className={`w-1/3 h-[85vh] bg-gray-100 p-4 rounded-md shadow-md ${isOver ? 'bg-blue-100' : ''}`}
    >
      <h2 className="text-xl font-semibold mb-4">{status}</h2>
      {tasks?.map(task => (
        <TaskCard key={task.ID} task={task} users={users} handleCreateOrUpdateTask={handleCreateOrUpdateTask} setSelectedTask={setSelectedTask}/>
      ))}
    </div>
  );
};

export default TaskColumn;
