import { useState } from “react”;

function TaskFilter({ onFilterChange }) {

  const [status, setStatus] = useState(“all-statuses”);
  const [priority, setPriority] = useState(“all-priorities”);

  const handleStatusChange = (e) => {
    const newStatus = e.target.value;

    setStatus(newStatus);

    onFilterChange({
      status: newStatus === “all-statuses” ? undefined : newStatus,
      priority: priority === “all-priorities” ? undefined : priority,
    });
  };

  const handlePriorityChange = (e) => {
    const newPriority = e.target.value;
    setPriority(newPriority);

    onFilterChange({
      status: status === “all-statuses” ? undefined : status,
      priority:
        newPriority === “all-priorities” ? undefined : newPriority,
    });
  };
  
  return (
    <div className=“flex justify-center mb-4 gap-4">
      <select value={status} onChange={handleStatusChange}>
        <option value=“all-statuses”>All Statuses</option>
        <option value=“pending”>Pending</option>
        <option value=“in-progress”>In Progress</option>
        <option value=“completed”>Completed</option>
      </select>
      <select value={priority} onChange={handlePriorityChange}>
        <option value=“all-priorities”>All Priorities</option>
        <option value=“high”>High</option>
        <option value=“medium”>Medium</option>
        <option value=“low”>Low</option>
      </select>
    </div>
  );
}
export default TaskFilter;