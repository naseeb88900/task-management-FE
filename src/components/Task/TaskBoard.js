import React, { useEffect, useState } from "react";
import TaskColumn from "./TaskColumn";
import { getTasks, createTask, getUsers, updateTask } from "../../api/api";
import { getToken, getUserRole } from "../../utils/auth";
import TaskModal from "./Modal/TaskModal";

const TaskBoard = () => {
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null); // To hold task data for update

  const isManager = getUserRole() === "manager";

  useEffect(() => {
    const fetchTasks = async () => {
      const token = getToken();
      try {
        const response = await getTasks(token);
        setTasks(response.data);
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await getUsers();
        setUsers(response.data); // Assuming response has the user list
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    fetchTasks();
    fetchUsers();
  }, []);

  const handleStatusChange = async (taskId, newStatus) => {
    const filterTask = tasks?.filter((task) => task.ID === taskId);
    console.log("updated task", filterTask);
    console.log("status", taskId);
    try {
      const payload = {
        status: newStatus,
        title: filterTask?.[0]?.title,
        description: filterTask?.[0]?.description,
      };
      await updateTask(taskId, payload);
      const updatedTasks = tasks?.map((task) =>
        task.ID === taskId ? { ...task, status: newStatus } : task
      );
      setTasks(updatedTasks);
    } catch (err) {
      console.error("Failed to update task status:", err);
    }
  };

  const handleCreateOrUpdateTask = async (task, updated= null) => {
    try {
        const payload = {
            title: task.title,
            description: task.description,
            assigned_to: task.assignedTo,
            status: updated?.status
        }

        console.log('updated', updated)
      if (updated) {
        // Updating an existing task
        await updateTask(updated.ID, payload);
        setTasks((prevTasks) =>
          prevTasks.map((t) =>
            t.ID === updateTask.ID ? { ...t, ...task } : t
          )
        );
      } else {
        // Creating a new task
        const response = await createTask({
          title: task.title,
          description: task.description,
          assigned_to: task.assignedTo,
        });
        setTasks([...tasks, response.data]);
      }
      setIsModalOpen(false);
      setSelectedTask(null); // Reset the selected task after operation
    } catch (err) {
      console.error("Failed to create or update task:", err);
    }
  };

  const handleEditTask = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const taskStatusGroups = {
    "To Do": tasks?.filter((task) => task.status === "To Do"),
    "In Progress": tasks?.filter((task) => task.status === "In Progress"),
    Completed: tasks?.filter((task) => task.status === "Completed"),
  };

  return (
    <div className="flex justify-around mt-8">
      {/* Task Columns */}
      {["To Do", "In Progress", "Completed"].map((status) => (
        <TaskColumn
          key={status}
          status={status}
          tasks={taskStatusGroups[status]}
          onTaskDrop={handleStatusChange}
          onEditTask={handleEditTask} // Pass the edit function to each task
          users={users}
          handleCreateOrUpdateTask={handleCreateOrUpdateTask}
          setSelectedTask={setSelectedTask}
        />
      ))}

      {/* Create Task Button - Visible Only for Managers */}
      {isManager && (
        <button
          className="fixed bottom-10 right-10 bg-blue-500 text-white px-4 py-2 rounded-md"
          onClick={() => {
            setSelectedTask(null); // Reset selected task for creating new
            setIsModalOpen(true);
          }}
        >
          Create Task
        </button>
      )}

      {/* TaskModal for creating or updating tasks */}
      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleCreateOrUpdateTask}
        users={users}
        taskData={selectedTask} // Pass the selected task for editing or null for creating
      />
    </div>
  );
};

export default TaskBoard;
