import { useState, useEffect, useCallback, useMemo } from "react";

// simple utility functions (I can move these to utils/taskUtils.js later)//
const generateId = () => Date.now().toString(36) + Math.random().toString(36).substr(2);

const exportTasks = (tasks) => {
  if (!tasks || tasks.length === 0) {
    alert("No tasks to export");
    return;
  }
  const dataStr = JSON.stringify(tasks, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `tasks-${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

const getTaskStats = (tasks) => {
  if (!Array.isArray(tasks)) return { total: 0, pending: 0, inProgress: 0, completed: 0, overdue: 0 };
  
  const now = new Date();
  return tasks.reduce((acc, task) => {
    acc.total++;
    switch (task.status) {
      case 'pending': acc.pending++; break;
      case 'in-progress': acc.inProgress++; break;
      case 'completed': acc.completed++; break;
      default: acc.pending++;
    }
    if (task.status !== 'completed' && task.dueDate && new Date(task.dueDate) < now) {
      acc.overdue++;
    }
    return acc;
  }, { total: 0, pending: 0, inProgress: 0, completed: 0, overdue: 0 });
};

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [filters, setFilters] = useState({
    status: "all",
    priority: "all",
    search: ""
  });
  const [sortBy, setSortBy] = useState("dueDate");
  const [theme, setTheme] = useState("light");
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // load tasks from localStorage on mount//
  useEffect(() => {
    try {
      const savedTasks = localStorage.getItem("tasks");
      if (savedTasks) {
        const parsedTasks = JSON.parse(savedTasks);
        if (Array.isArray(parsedTasks)) {
          setTasks(parsedTasks);
        }
      }
    } catch (error) {
      console.error("Error loading tasks:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // save tasks to localStorage whenever tasks change//
  useEffect(() => {
    if (!isLoading) {
      try {
        localStorage.setItem("tasks", JSON.stringify(tasks));
      } catch (error) {
        console.error("Error saving tasks:", error);
      }
    }
  }, [tasks, isLoading]);

  // toggle theme//
  const toggleTheme = useCallback(() => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark");
  }, [theme]);

  // add task//
  const handleAddTask = useCallback((taskData) => {
    const newTask = {
      id: generateId(),
      title: taskData.title || "New Task",
      description: taskData.description || "",
      dueDate: taskData.dueDate || new Date().toISOString().split('T')[0],
      priority: taskData.priority || "medium",
      status: taskData.status || "pending",
      createdAt: new Date().toISOString(),
    };
    setTasks(prev => [...prev, newTask]);
  }, []);

  // delete task//
  const handleDeleteTask = useCallback((id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      setTasks(prev => prev.filter(task => task.id !== id));
    }
  }, []);

  // toggle task completion//
  const handleToggleCompleted = useCallback((id) => {
    setTasks(prev => prev.map(task => 
      task.id === id 
        ? { ...task, status: task.status === "completed" ? "pending" : "completed" }
        : task
    ));
  }, []);

  const taskStats = useMemo(() => getTaskStats(tasks), [tasks]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading tasks...</div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-200 ${
      theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
    }`}>
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold">Task Management Dashboard</h1>
            <p className="text-sm opacity-75 mt-1">Organize and keep track of your tasks</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button 
              onClick={toggleTheme}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 text-sm"
            >
              {theme === "light" ? "🌙 Dark" : "☀️ Light"} Mode
            </button>
            <button 
              onClick={() => exportTasks(tasks)}
              disabled={tasks.length === 0}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-lg transition-colors duration-200 text-sm"
            >
              📤 Export
            </button>
          </div>
        </div>

        {/* statistics */}
        <div className={`grid grid-cols-2 sm:grid-cols-5 gap-4 mb-6 p-4 rounded-lg ${
          theme === "dark" ? "bg-gray-800" : "bg-white shadow-sm"
        }`}>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{taskStats.total}</div>
            <div className="text-sm opacity-75">Total</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600">{taskStats.pending}</div>
            <div className="text-sm opacity-75">Pending</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">{taskStats.inProgress}</div>
            <div className="text-sm opacity-75">In Progress</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{taskStats.completed}</div>
            <div className="text-sm opacity-75">Completed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">{taskStats.overdue}</div>
            <div className="text-sm opacity-75">Overdue</div>
          </div>
        </div>

        {/* simple task form */}
        <div className={`mb-6 p-6 rounded-lg ${
          theme === "dark" ? "bg-gray-800" : "bg-white shadow-sm"
        }`}>
          <h2 className="text-xl font-semibold mb-4">Add New Task</h2>
          <form onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            handleAddTask({
              title: formData.get('title'),
              description: formData.get('description'),
              dueDate: formData.get('dueDate'),
              priority: formData.get('priority')
            });
            e.target.reset();
          }} className="space-y-4">
            <div>
              <input
                name="title"
                type="text"
                placeholder="Task title..."
                required
                className={`w-full px-3 py-2 border rounded-lg ${
                  theme === "dark" ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300"
                }`}
              />
            </div>
            <div>
              <textarea
                name="description"
                placeholder="Task description..."
                rows={2}
                className={`w-full px-3 py-2 border rounded-lg ${
                  theme === "dark" ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300"
                }`}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                name="dueDate"
                type="date"
                required
                min={new Date().toISOString().split('T')[0]}
                className={`px-3 py-2 border rounded-lg ${
                  theme === "dark" ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300"
                }`}
              />
              <select
                name="priority"
                className={`px-3 py-2 border rounded-lg ${
                  theme === "dark" ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300"
                }`}
              >
                <option value="low">🟢 Low Priority</option>
                <option value="medium">🟡 Medium Priority</option>
                <option value="high">🔴 High Priority</option>
              </select>
            </div>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              Add Task
            </button>
          </form>
        </div>

        {/* task list */}
        <div className={`rounded-lg p-4 ${
          theme === "dark" ? "bg-gray-800" : "bg-white shadow-sm"
        }`}>
          <h3 className="text-lg font-medium mb-4">Your Tasks ({tasks.length})</h3>
          
          {tasks.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-xl font-medium mb-2">No Tasks Yet</h3>
              <p className="text-gray-500 mb-4">Create your first task to get started.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className={`border rounded-lg p-4 transition-all hover:shadow-md ${
                    theme === "dark" ? "bg-gray-700 border-gray-600" : "bg-gray-50 border-gray-200"
                  } ${task.status === "completed" ? "opacity-75" : ""}`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <h4 className={`font-medium ${
                        task.status === "completed" ? "line-through" : ""
                      }`}>
                        {task.title}
                      </h4>
                      {task.description && (
                        <p className="text-sm opacity-75 mt-1">{task.description}</p>
                      )}
                      <div className="flex flex-wrap gap-2 mt-2 text-xs">
                        <span>📅 Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                        <span className={`px-2 py-1 rounded-full ${
                          task.priority === 'high' ? 'bg-red-100 text-red-800' :
                          task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {task.priority === 'high' ? '🔴' : task.priority === 'medium' ? '🟡' : '🟢'} {task.priority}
                        </span>
                        <span className={`px-2 py-1 rounded-full ${
                          task.status === 'completed' ? 'bg-green-100 text-green-800' :
                          task.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {task.status === 'completed' ? '✅' : task.status === 'in-progress' ? '🔄' : '⏳'} {task.status}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <button
                        onClick={() => handleToggleCompleted(task.id)}
                        className={`p-2 rounded-lg text-sm transition-colors ${
                          task.status === "completed"
                            ? "bg-yellow-100 hover:bg-yellow-200 text-yellow-800"
                            : "bg-green-100 hover:bg-green-200 text-green-800"
                        }`}
                        title={task.status === "completed" ? "Mark as pending" : "Mark as completed"}
                      >
                        {task.status === "completed" ? "↶" : "✓"}
                      </button>
                      <button
                        onClick={() => handleDeleteTask(task.id)}
                        className="p-2 rounded-lg bg-red-100 hover:bg-red-200 text-red-800 transition-colors"
                        title="Delete task"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

// old version below//
// import { useState } from "react";

// function Dashboard() {
//   const [theme, setTheme] = useState("light");

//   return (
//     <div className={`min-h-screen transition-colors duration-200 ${
//       theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
//     }`}>
//       <div className="container mx-auto px-4 py-6 max-w-4xl">
//         <h1 className="text-3xl font-bold mb-6">🎉 Dashboard is Working!</h1>
//         <p className="text-lg">Your Task Management Dashboard has loaded successfully!</p>
        
//         <button 
//           onClick={() => setTheme(theme === "light" ? "dark" : "light")}
//           className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
//         >
//           Toggle Theme: {theme}
//         </button>
//       </div>
//     </div>
//   );
// }

// export default Dashboard;








// import { useState, useEffect, useCallback, useMemo } from "react";
// import TaskList from "./TaskList";
// import TaskForm from "./TaskForm";
// import TaskFilter from "./TaskFilter";
// import { exportTasks, importTasks, getTaskStats, generateId } from "../utils/taskUtils";

// function Dashboard() {
//   // main state//
//   const [tasks, setTasks] = useState([]);
//   const [filters, setFilters] = useState({
//     status: "all",
//     priority: "all",
//     search: ""
//   });

//   const [sortBy, setSortBy] = useState("dueDate");
//   const [theme, setTheme] = useState("light");
//   const [taskToEdit, setTaskToEdit] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);

//   // load tasks from localStorage on mount//
//   useEffect(() => {
//     try {
//       const savedTasks = localStorage.getItem("tasks"); 
//       if (savedTasks) {
//         const parsedTasks = JSON.parse(savedTasks); 
//         if (Array.isArray(parsedTasks)) {
//           setTasks(parsedTasks);
//         }
//       }
//     } catch (error) {
//       console.error("Error loading tasks:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   }, []);

//   // save tasks to localStorage whenever the tasks change//
//   useEffect(() => {
//     if (!isLoading) {
//       try {
//         localStorage.setItem("tasks", JSON.stringify(tasks));
//       } catch (error) {
//         console.error("Error saving tasks:", error);
//         alert("Error saving tasks. Storage might be full.");
//       }
//     }
//   }, [tasks, isLoading]);

//   // load theme from localStorage and apply//
//   useEffect(() => {
//     try {
//       const savedTheme = localStorage.getItem("theme") || "light";
//       setTheme(savedTheme);
//       if (savedTheme === "dark") {
//         document.documentElement.classList.add("dark");
//       }
//     } catch (error) {
//       console.error("Error loading theme:", error);
//     }
//   }, []);

//   // toggle theme with persistence//
//   const toggleTheme = useCallback(() => {
//     const newTheme = theme === "light" ? "dark" : "light";
//     setTheme(newTheme);
//     localStorage.setItem("theme", newTheme); 
//     document.documentElement.classList.toggle("dark");
//   }, [theme]);

//   // add or update task//
//   const handleAddTask = useCallback((taskData) => {
//     try {
//       if (taskData.id) {
//         // update existing task//
//         setTasks(prevTasks => 
//           prevTasks.map(task => task.id === taskData.id ? { ...taskData } : task)
//         );
//       } else {
//         // add new task//
//         const newTask = {
//           ...taskData,
//           id: generateId(),
//           status: taskData.status || "pending",
//           createdAt: new Date().toISOString(),
//         };
//         setTasks(prevTasks => [...prevTasks, newTask]);
//       }
      
//       // clear edit mode//
//       setTaskToEdit(null);
//     } catch (error) {
//       console.error("Error adding/updating task:", error);
//       alert("Error saving task. Please try again");
//     }
//   }, []);

//   // delete task//
//   const handleDeleteTask = useCallback((id) => {
//     if (window.confirm("Are you sure you want to delete this task?")) {
//       setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
//       // clear edit mode if we're editing the deleted task//
//       if (taskToEdit && taskToEdit.id === id) {
//         setTaskToEdit(null);
//       }
//     }
//   }, [taskToEdit]);

//   // toggle task completion status//
//   const handleToggleCompleted = useCallback((id) => {
//     setTasks(prevTasks => prevTasks.map(task => task.id === id
//       ? {
//           ...task,
//           status: task.status === "completed" ? "pending" : "completed",
//           completedAt: task.status === "completed" ? null : new Date().toISOString()
//         }
//       : task
//     ));
//   }, []);

//   // handle task edit//
//   const handleEditTask = useCallback((task) => {
//     setTaskToEdit(task);
//   }, []);
  
//   // handle task reorder//
//   const handleReorderTasks = useCallback((reorderedFilteredTasks) => {
//     setTasks(prevTasks => {
//       // create a map of reordered tasks by Id for quick lookup//
//       const reorderedMap = new Map();
//       reorderedFilteredTasks.forEach((task, index) => { 
//         reorderedMap.set(task.id, { ...task, order: index });
//       });
      
//       // update the full tasks array, preserving tasks not in the filtered view//
//       return prevTasks.map(task => {
//         if (reorderedMap.has(task.id)) {
//           return reorderedMap.get(task.id);
//         }
//         return task;
//       });
//     });
//   }, []);

//   // handle task import//
//   const handleImportTasks = useCallback((event) => {
//     const file = event.target.files[0];

//     if (file) {
//       importTasks(file, (importedTasks) => {
//         // add unique Ids and timestamps to imported tasks//
//         const tasksWithIds = importedTasks.map(task => ({
//           ...task,
//           id: task.id || generateId(), 
//           createdAt: task.createdAt || new Date().toISOString(),
//         }));

//         if (window.confirm(`Import ${tasksWithIds.length} tasks? This will replace all current tasks.`)) { 
//           setTasks(tasksWithIds);
//         }
//       });
//     }
//     // clear the file input//
//     event.target.value = "";
//   }, []);

//   // cancel edit mode//
//   const handleCancelEdit = useCallback(() => {
//     setTaskToEdit(null);
//   }, []);

//   // memoized task statistics//
//   const taskStats = useMemo(() => getTaskStats(tasks), [tasks]);

//   if (isLoading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-xl">Loading tasks...</div>
//       </div>
//     );
//   }

//   return (
//     <div className={`min-h-screen transition-colors duration-200 ${
//       theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
//     }`}>
//       <div className="container mx-auto px-4 py-6 max-w-4xl">
//         {/* header */}
//         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
//           <div>
//             <h1 className="text-3xl font-bold">Task Management Dashboard</h1>
//             <p className="text-sm opacity-75 mt-1">Organize and keep track of your tasks</p>
//           </div>
//           <div className="flex flex-wrap gap-2">
//             <button 
//               onClick={toggleTheme}
//               className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg
//                         transition-colors duration-200 text-sm"
//             >
//               {theme === "light" ? "🌙 Dark" : "☀️ Light"} Mode
//             </button>
//             <button 
//               onClick={() => exportTasks(tasks)}
//               disabled={tasks.length === 0}
//               className="px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400
//                         disabled:cursor-not-allowed text-white rounded-lg 
//                         transition-colors duration-200 text-sm" 
//             >
//               📤 Export
//             </button>
//             <label className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors duration-200 cursor-pointer text-sm">
//               📥 Import
//               <input
//                 type="file"
//                 accept=".json"
//                 onChange={handleImportTasks}
//                 className="hidden" 
//               />
//             </label>
//           </div>
//         </div>


//         {/* statistics */}
//         <div className={`grid grid-cols-2 sm:grid-cols-5 gap-4 mb-6 p-4 rounded-lg ${
//           theme === "dark" ? "bg-gray-800" : "bg-white shadow-sm"
//         }`}>
//           <div className="text-center">
//             <div className="text-2xl font-bold text-blue-600">{taskStats.total}</div>
//             <div className="text-sm opacity-75">Total</div> 
//           </div>
//           <div className="text-center">
//             <div className="text-2xl font-bold text-yellow-600">{taskStats.pending}</div>
//             <div className="text-sm opacity-75">Pending</div>
//           </div>
//           <div className="text-center">
//             <div className="text-2xl font-bold text-orange-600">{taskStats.inProgress}</div>
//             <div className="text-sm opacity-75">In Progress</div>
//           </div>
//           <div className="text-center">
//             <div className="text-2xl font-bold text-green-600">{taskStats.completed}</div>
//             <div className="text-sm opacity-75">Completed</div>
//           </div>
//           <div className="text-center">
//             <div className="text-2xl font-bold text-red-600">{taskStats.overdue}</div>
//             <div className="text-sm opacity-75">Overdue</div>
//           </div>
//         </div>
 
//         {/* task form */}
//         <TaskForm
//           onAddTask={handleAddTask}
//           taskToEdit={taskToEdit}
//           onCancel={handleCancelEdit}
//           theme={theme}
//         />

//         {/* filters */}
//         <TaskFilter
//           filters={filters}
//           setFilters={setFilters}
//           sortBy={sortBy}
//           setSortBy={setSortBy}
//           theme={theme}
//         />

//         {/* task list */}
//         <TaskList
//           tasks={tasks}
//           filters={filters}
//           sortBy={sortBy}
//           onDelete={handleDeleteTask} 
//           onToggleCompleted={handleToggleCompleted}
//           onEdit={handleEditTask}
//           onReorder={handleReorderTasks}
//           theme={theme}
//         />
//       </div>
//     </div>
//   );
// }

// export default Dashboard;