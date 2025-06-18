import { useState, useEffect } from "react";

function TaskFilter({ onFilterChange }) {
  const [status, setStatus] = useState("all-statuses");
  const [priority, setPriority] = useState("all-priorities");

  useEffect(() => {
    onFilterChange({
      status: status === "all-statuses" ? undefined : status,
      priority: priority === "all-priorities" ? undefined : priority,
    });
  }, [status, priority, onFilterChange]);

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handlePriorityChange = (e) => {
    setPriority(e.target.value);
  };

  return (
    <div className="flex justify-center mb-4 gap-4">
      <select value={status} onChange={handleStatusChange}>
        <option value="all-statuses">All Statuses</option>
        <option value="pending">Pending</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>
      <select value={priority} onChange={handlePriorityChange}>
        <option value="all-priorities">All Priorities</option>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </select>
    </div>
  );
}

export default TaskFilter;