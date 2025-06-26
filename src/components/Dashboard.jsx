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

  // 



  

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