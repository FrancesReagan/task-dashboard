// import { useState, useEffect } from "react";
import { useMemo } from "react";

function TaskFilter({ filters, setFilters, sortBy, setSortBy, theme }) {
  // handle filter changes//
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value === "all-statues" || value === "all-priorities" ? "all" : value,
    }));
  };
// handle the search with the debouncing effect//
const handleSearchChange = (e) => {
  const {value} = e.target;
  setFilters(prev => ({...prev,search: value}));
};
// clear all filters//
const clearFilters = () => {
  setFilters({ status: "all", priority: "all", search: "" });
  setSortBy("dueDate");
};
// check if any filters are active//
const hasActiveFilters = useMemo(() => {
  return filters.status!=="all"; ||
    filters.priority!=="all" ||
    filters.search.trim()!=="";
},[filters]);

return(
  <div className={`mb-6 p-4 rounded-lg transition-colors duration-200 ${
    theme === "dark" ? "bg-gray-800 border border-gray-700"
    : "bg-white shadow-sm border border-gray-200"
  }`}>
    
)
})

}

// function TaskFilter({ onFilterChange }) {
//   const [status, setStatus] = useState("all-statuses");
//   const [priority, setPriority] = useState("all-priorities");

//   useEffect(() => {
//     onFilterChange({
//       status: status === "all-statuses" ? undefined : status,
//       priority: priority === "all-priorities" ? undefined : priority,
//     });
//   }, [status, priority, onFilterChange]);

//   const handleStatusChange = (e) => {
//     setStatus(e.target.value);
//   };

//   const handlePriorityChange = (e) => {
//     setPriority(e.target.value);
//   };

//   return (
//     <div className="flex justify-center mb-4 gap-4">
//       <select value={status} onChange={handleStatusChange}>
//         <option value="all-statuses">All Statuses</option>
//         <option value="pending">Pending</option>
//         <option value="in-progress">In Progress</option>
//         <option value="completed">Completed</option>
//       </select>
//       <select value={priority} onChange={handlePriorityChange}>
//         <option value="all-priorities">All Priorities</option>
//         <option value="high">High</option>
//         <option value="medium">Medium</option>
//         <option value="low">Low</option>
//       </select>
//     </div>
//   );
// }

export default TaskFilter;