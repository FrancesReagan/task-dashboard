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
  <div className="flex justify-between items-center mb-4">
    <h3 className="text-lg font-medium">Filter & Sort Tasks</h3>
    {hasActiveFilters && (
      <button
       onClick={clearFilters}
       className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
       >
        Clear All Filters
      </button>
    )}
</div>

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

  {/* Status Filter */}
  <div>
    <label className="block text-sm font-medium mb-1">
      Filter by Status 
      </label>
      <select
        name="status"
        value={filters.status === "all" ? "all-statuses":filters.status} 
        onChange={handleSearchChange}  
        className={`w-full px-3 py-2 border rounded-lg transition-colors duration-200 ${
        theme === "dark" ? "bg-gray-700 border-gray-600 text-white focus:border-blue-500"
        : "bg-white border-gray-300 text-gray-900 focus:border-blue-500"
        }focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20`}
       >
        <option value="all-statuses">All Statuses</option>
        <option value="pending">⏳Pending</option>
        <option value="in-progress">🔄In Progress</option>
        <option value="completed">✅ Completed</option>
      </select>
    </div>

    {/* priority filter */}
    <div>
      <label className="block text-sm font-medium mb-1">
        Filter by Priority
      </label>
      <select 
        name="priority"
        value={filters.priority==="all" ? "all-priorities" : filters.priority}
        onChange={handleFilterChange}
        className={`w-full px-3 py-2 border rounded-lg transition-colors duration-200 ${
          theme==="dark" ? "bg-gray-700 border-gray-600 text-white focus:border-blue-500"
          : "bg-white border-gray-300 text-gray-900 focus: border-blue-500"
        }focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20`}
        >
         <option value="all-priorities">All Priorities</option>
         <option value="high">🔴High Priority</option>
         <option value="medium">🟡Medium Priority</option>
         <option value="low">🟢Low Priority</option>
      </select>
    </div>



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