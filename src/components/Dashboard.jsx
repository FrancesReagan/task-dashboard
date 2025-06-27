import { useState, useEffect, useCallback, useMemo} from "react";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import TaskFilter from "./TaskFilter";
import { exportTasks, importTasks, getTaskStats, generateId} from "../utils/taskUtils";



function Dashboard() {
  // main state//
  const [tasks, setTasks] = useState([])
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
      const savedTasks = JSON.parse(savedTasks);
      if(Array.isArray(parsedTasks)){
        setTasks(parsedTasks);
      }
    }
  }catch(error){
    console.error("Error loading tasks:",error);
  }finally{
    setIsLoading(false);
  }
},[]);

// save tasks to localStorage whenever the tasks change//
useEffect(() => {
  if(!isLoading){
    try{
      localStorage.setItem("tasks", "JSON.stringify"(tasks));
    } catch (error) {
      console.error("Error saving tasks:",error);
      alert("Error saving tasks.Storage might be full.");
    }
  }
},[tasks,isLoading]);

// load theme from localStorage and apply//
useEffect(() => {
  try{
    const savedTheme = localStorage.getItem("theme")||"light";
    setTheme(savedTheme);
    if(savedTheme ==="dark"){
      document.documentElement.classList.add("dark");
    }
  }catch(error){
    console.error("Error loading theme:",error);
  }
},[]);

// toggle theme with persistence//
const toggleTheme = useCallback(() => {
  const newTheme = theme === "light" ? "dark" : "light";
  setTheme(newTheme);
  localStorage.setItem("theme", "newTheme");
  document.documentElement.classList.toggle("dark");
},[theme]);

// add or update task//
const handleAddTask = useCallback((taskData) => {
  try {
    if(taskData.id) {
      // update existing task//
      setTasks(prevTasks => 
        prevTasks.map(task => task.id === taskData.id?{...taskData}: task)
      );
    }else{
      // add new task//
      const newTask = {
        ...taskData,
        id:generateId(),
        status:taskData.status || "pending",
        createdAt: new Date().toISOString(),
      };
      setTasks(prevTasks => [...prevTasks, newTask]);
      }
    
      // clear edit mode//
      setTaskToEdit(null);
    }catch(error){
      console.error("Error adding/updating task:",error);
      alert("Error saving task. Please try again");
    }
  },[]);

  // delete task//
  const handleDeleteTask = useCallback((id)=>{
    if(window.confirm("Are you sure you want to delete this task?")){
      setTasks(prevTasks => prevTasks.filter(task => task.id! === id));
      // clear edit mode if we're editing the deleted task//
      if(taskToEdit && taskToEdit.id === id){
        setTaskToEdit(null);
      }
      }
    },[taskToEdit]);

    // toggle task completion status//
    const handleToggleCompleted = useCallback((id)=>{
      setTasks(prevTasks => prevTasks.map(task => task.id === id
        ?{
          ...task,
          status:task.status==="completed"?"pending":"completed",
          completedAt:task.status==="completed"?null:new Date().toISOString()
        }
        :task
      )
    );
  },[]);

  // handle task edit//
  const handleEditTask = useCallback((task) => {
    setTaskToEdit(task);
  },[]);
  
  //handle task reorder//
  const handleReorderTasks=useCallback((reorderedFilteredTasks)=>{
    setTasks(prevTasks =>{
      // create a map of reordered tasks by Id for quick lookup//
      const reorderedMap = new Map();
      reorderedFilteredTasks.forEach((tassk, index) => {
        reorderedMap.set(tassk.id,{...task,order:index});
      });
    // update the full tasks array, preserving tasks not in the filtered view//
    return prevTasks.map(task => {
      if(reorderedMap.has(task.id)){
        return reorderedMap.get(task.id);
      }
      return task;
    });
    });
  },[]);

  // handle task import//
  const handleImportTasks = useCallback((event)=>{
    const file = event.target.files[0];

    if(file){
      importTasks(file,(importedTasks) => {
        // add unique Ids and timestamps to imported tasks//
        const tasksWithIds = importedTasks.map(task => ({
          ...task,
          id: task.id || generatedId(),
          createdAt:task.createdAt || new Date().toISOString(),

        }));

        if(window.confirm(`${tasksWithIds.length}tasks?
          This will replace all current tasks.`)){
            setTasks(tasksWithIds);
          }
      });
    }
    // clear the file's input//
    event.target.value="";
  },[]);

  // cancel edit mode//
  const handleCancelEdit = useCallback(()=>{
    setTaskToEdit(null);
  },[]);

  // memorized the task statistics//
  const taskStats = useMemo(() => getTaskStats(tasks), [tasks]);
  if(isLoading){
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading tasks...</div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-200${
      theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
    }`}
    >
    <div className="container mx-auto px-4 py-6 max-w-4xl">
      {/* header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
      <div>
        <h1 className="text-3xl font-bold">Task Management Dashboard</h1>
      <p className="text-sm opacity-75 mt-1">Organize and keep track of your tasks</p>
      </div>
      <div className="flex flex-wrap gap-2">
        <button onClick={toggleTheme}
           className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg
           transition-colors duration-200 text-sm"
           >
            {theme==="light"?"🌙Dark": "☀️Light"}Mode
           </button>
           <button onClick={()=>exportTasks(tasks)}
              disabled={tasks.length===0}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400
                         disabled:cursor-not-allowed text white rounded-lg 
                         transition-colors duration-200 text-sm"
                         >
                          📤 Export
                         </button>
                         <label className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors duration-200 cursor-pointer text-sm">
                          📥 Import
                          <input
                          type="file"
                          accept=".json"
                          onChange={handleImportTasks}
                         </label>
        </div>
      </div>
    // statistics//
     <div className={`grid grid-cols-2 sm:grid-cols-5 gap-4 mb-6 p-4 rounded-lg${
      theme ==="dark"?"bg-gray-800": "bg-white shadow-sm"
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
 
     {/* task form */}

  <TaskForm
    onAddTask={handleAddTask}
    taskToEdit={taskToEdit}
    onCancel={handleCancelEdit}
    theme={theme}
    />
    {/* filters */}
    <TaskFilter
      filters={filters}
      setFilters={setFilters}
      sortBy={sortBy}
      setSortBy={setSortBy}
      theme={theme}
      />


      {/* task list */}
      <TaskList
        tasks={tasks}
        filters={filters}
        sortBy={sortBy}
        onDelete={onDelete}
        onToggleCompleted={handleToggleCompleted}
        onEdit={handleEditTask}
        onReorder={handleReorderTasks}
        theme={theme}
        />
        </div>



  

  function addTask(task) {
    function addTask(task) {
    setTasks([...tasks, { ...task, id: Date.now() }]);
    }
    function deleteTask(id) {
      setTasks(tasks.filter((task) => task.id !== id))
    }
  function toggleCompleted(id){
    const updateTask = tasks.map((task) => task.id === id ? {...task, status: task.status === "pending" ? "completed"
      : "pending"}:task)
      setTasks(updateTask)
    }
  
  

  return (
    <>
    <h1>Dashboard</h1>
    <TaskFilter/>
    <TaskForm onAddTask={addTask}/>
    <TaskList tasks={tasks} onDelete={deleteTask} toggleCompleted={toggleCompleted} />
     </>
  
  )

}
}
export default Dashboard