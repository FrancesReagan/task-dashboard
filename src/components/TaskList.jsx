import TaskItem from "./TaskItem";
function TaskList({tasks, onDelete}) {
   console.log(tasks);


  return (
    <>
    <h1>TaskList</h1>
    <TaskItem key={tasks.id} task={task} onDelete={onDelete} /> </>
    </TaskItem>
  )
}

export default TaskList