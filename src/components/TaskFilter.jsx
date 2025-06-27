import { useMemo } from "react";

function TaskFilter({ filters, setFilters, sortBy, setSortBy, theme }) {
  // handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value === "all-statuses" || value === "all-priorities" ? "all" : value, // Fixed typo: "all-statues" → "all-statuses"
    }));
  };

  // handle the search with the debouncing effect
  const handleSearchChange = (e) => {
    const { value } = e.target;
    setFilters(prev => ({ ...prev, search: value }));
  };

  // clear all filters
  const clearFilters = () => {
    setFilters({ status: "all", priority: "all", search: "" });
    setSortBy("dueDate");
  };

  // check if any filters are active
  const hasActiveFilters = useMemo(() => {
    return filters.status !== "all" ||
      filters.priority !== "all" ||
      filters.search.trim() !== "";
  }, [filters]);

  return (
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
            value={filters.status === "all" ? "all-statuses" : filters.status} 
            onChange={handleFilterChange} // Fixed: was handleSearchChange
            className={`w-full px-3 py-2 border rounded-lg transition-colors duration-200 ${
              theme === "dark" ? "bg-gray-700 border-gray-600 text-white focus:border-blue-500"
                : "bg-white border-gray-300 text-gray-900 focus:border-blue-500"
            } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20`} // Fixed: added space
          >
            <option value="all-statuses">All Statuses</option>
            <option value="pending">⏳ Pending</option>
            <option value="in-progress">🔄 In Progress</option>
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
            value={filters.priority === "all" ? "all-priorities" : filters.priority}
            onChange={handleFilterChange}
            className={`w-full px-3 py-2 border rounded-lg transition-colors duration-200 ${
              theme === "dark" ? "bg-gray-700 border-gray-600 text-white focus:border-blue-500"
                : "bg-white border-gray-300 text-gray-900 focus:border-blue-500" // Fixed: removed space in "focus: border-blue-500"
            } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20`} // Fixed: added space
          >
            <option value="all-priorities">All Priorities</option>
            <option value="high">🔴 High Priority</option>
            <option value="medium">🟡 Medium Priority</option>
            <option value="low">🟢 Low Priority</option>
          </select>
        </div>

        {/* search */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Search Tasks
          </label>
          <input 
            type="text"
            name="search"
            value={filters.search}
            onChange={handleSearchChange}
            placeholder="Search by title..."
            className={`w-full px-3 py-2 border rounded-lg transition-colors duration-200 ${
              theme === "dark" ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500"
                : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500"
            } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20`} // Fixed: added space
          />
        </div>

        {/* sort */} {/* Fixed: was {sort} */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Sort Tasks By
          </label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg transition-colors duration-200 ${
              theme === "dark" ? "bg-gray-700 border-gray-600 text-white focus:border-blue-500" // Fixed: "border-dray-600" → "border-gray-600"
                : "bg-white border-gray-300 text-gray-900 focus:border-blue-500"
            } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20`} // Fixed: added space
          >
            <option value="dueDate">📅 Due Date</option>
            <option value="title">🔤 Title (A-Z)</option>
            <option value="priority">⚡ Priority</option>
            <option value="status">📊 Status</option>
            <option value="createdAt">🕒 Created Date</option>
          </select>
        </div>
      </div>
    </div>
  );
}
        
export default TaskFilter;