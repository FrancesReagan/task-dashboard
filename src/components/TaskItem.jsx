
function TaskItem({task, onDelete, toggleCompleted}) {
  return (
    <>
    <h1>{task.title}</h1>
    <h2>{task.dueDate}</h2>
    <h2>{task.priority}</h2>
    <h3>{task.status}</h3>
    <button onClick={() toggleCompleted } 
    <button onClick={() => onDelete(task.id)}>Delete</button>

    
    </>
  )
}

export default TaskItem
