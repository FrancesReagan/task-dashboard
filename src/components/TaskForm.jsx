import { useState } from 'react';

function TaskForm({onAddTask}) {
  const [form, setForm] = useState({
    title: "",
    priority: "medium",
    dueDate: "",
    status: "",
  })

  console.log("form", form);
  console.log("form.title", form.title);
  function handleChange(event) {
    const {name, value} = event.target
    setForm((prev) => ({...prev, [name]: value}))
  }

  function handleSubmit(e){
    e.preventDefault()
   onAddTask(newTask)
   setForm({title:"", priority: "medium"})

    const newTask = {
    id: Date.now().toString(),
    title:  form.title,
    dueDate:form.dueDate,
    status: form.status,
    priority: form.priority,
  }
  }

  
  return (
    <>
    <h1>TaskForm</h1>
    <form onSubmit={handleSubmit}>
      <input type="text" name="title" value={form.title} onChange={handleChange} placeholder="Task Title"/>
      <input type="date" name="dueDate" value={form.dueDate} onChange={handleChange}/>
      <select name="priority" onChange={handleChange} value={form.priority}>
        <option value="low">Low</option> 
        <option value="medium">Medium</option>
        <option value="High">High</option>
      </select>
      <input type="checkbox" />
      <button type="submit">Add Task</button>
    </form>
    </>
  )
}

export default TaskForm;