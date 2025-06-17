import { useState } from "react";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import TaskFilter from "./TaskFilter";


function Dashboard() {
  const [tasks, setTasks] = useState([])

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