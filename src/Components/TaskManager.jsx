import React, { useState, useEffect } from "react";
import "../Styles/TaskManager.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TaskManager = () => {
  const [tasks, setTasks] = useState(() => {
    return JSON.parse(localStorage.getItem("tasks")) || [];
  });
  const [taskTitle, setTaskTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [reminder, setReminder] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));

    const checkReminders = () => {
      const now = new Date();
      tasks.forEach((task) => {
        if (task.reminder && new Date(task.reminder) <= now) {
          toast.info(`⏰ Reminder: "${task.title}" is due!`);
        }
      });
    };

    const timer = setInterval(checkReminders, 60000);
    return () => clearInterval(timer);
  }, [tasks]);

  const addTask = () => {
    if (!taskTitle.trim() || !dueDate) {
      toast.error("⚠️ Task title and due date are required!");
      return;
    }

    const newTask = {
      id: Date.now(),
      title: taskTitle.trim(),
      dueDate,
      priority,
      reminder,
    };
    setTasks([...tasks, newTask]);

    toast.success("✅ Task added successfully!");

    setTaskTitle("");
    setDueDate("");
    setPriority("Medium");
    setReminder("");
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
    toast.warning("🗑️ Task deleted!");
  };

  const editTask = (id) => {
    const taskToEdit = tasks.find((task) => task.id === id);
    if (!taskToEdit) return;

    const newTitle = prompt("Enter new task title:", taskToEdit.title);
    const newDueDate = prompt("Enter new due date:", taskToEdit.dueDate);
    const newPriority = prompt("Enter new priority (High, Medium, Low):", taskToEdit.priority);
    const newReminder = prompt("Enter new reminder date-time:", taskToEdit.reminder);

    if (newTitle && newDueDate && newPriority) {
      setTasks(
        tasks.map((task) =>
          task.id === id ? { ...task, title: newTitle, dueDate: newDueDate, priority: newPriority, reminder: newReminder } : task
        )
      );
      toast.success("✏️ Task updated!");
    }
  };

  return (
    <div className="task-container">
      <h2>🚀 Task Management System</h2>
      <div className="task-form">
        {/* Task Title Input */}
        <label className="input-label">📝 Task Title</label>
        <input
          type="text"
          placeholder="Enter Task Title..."
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
        />

        {/* Due Date Input */}
        <label className="input-label">📅 Due Date</label>
        <input 
          type="date" 
          value={dueDate} 
          onChange={(e) => setDueDate(e.target.value)}
          placeholder="Select Due Date"
        />

        {/* Priority Selection */}
        <label className="input-label">🚦 Priority</label>
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="High">🔥 High</option>
          <option value="Medium">⚡ Medium</option>
          <option value="Low">🟢 Low</option>
        </select>

        {/* Reminder Input */}
        <label className="input-label">⏰ Set Reminder</label>
        <input 
          type="datetime-local" 
          value={reminder} 
          onChange={(e) => setReminder(e.target.value)}
          placeholder="Set Reminder (optional)"
        />

        {/* Add Task Button */}
        <button onClick={addTask}>➕ Add Task</button>
      </div>

      {/* Task List */}
      <div className="task-list">
        {tasks.length === 0 ? (
          <p className="no-tasks">🎉 No tasks yet! Add one above.</p>
        ) : (
          tasks.map((task) => (
            <div key={task.id} className={`task-item ${task.priority.toLowerCase()}`}>
              <h3>{task.title}</h3>
              <p>📅 <strong>Due:</strong> {task.dueDate}</p>
              <p>🚀 <strong>Priority:</strong> {task.priority}</p>
              {task.reminder && <p>🔔 <strong>Reminder:</strong> {new Date(task.reminder).toLocaleString()}</p>}
              <div className="task-actions">
                <button className="edit-btn" onClick={() => editTask(task.id)}>✏️ Edit</button>
                <button className="delete-btn" onClick={() => deleteTask(task.id)}>🗑️ Delete</button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Toast Notifications */}
      <ToastContainer />
    </div>
  );
};

export default TaskManager;
