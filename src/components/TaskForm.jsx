import { useState, useEffect } from 'react';
import { validateTask } from './utils/taskUtils'; 
import { use } from 'react';

function TaskForm({onAddTask, taskToEdit, onCancel, theme}) {
  // form state//
  const [form, setForm] = useState({
    id: null,
    title: "",
    description: "",
    dueDate: "",
    priority: "medium",
    status: "pending",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting,setIsSubmitting] = useState(false);
  
  // reset form to default state//
  const resetForm = () => {
    setForm({
      id: null,
      title:"",
      description:"",
      dueDate: "",
      priority:"medium",
      status: "pending",
    });
    setErrors({});
  };

  // load task for editing or reset form when taskToEdit changes//
  useEffect(() => {
    if (taskToEdit) {
      setForm({
        ...taskToEdit,
        // ensure date is in correct format for input//
        dueDate:taskToEdit.dueDate?taskToEdit.dueDate.split("T")[0]:"",
      });
      setErrors({});
    }else{
      resetForm();
    }
  },([taskToEdit,]);

//  handle input changes//
const handleChange = (event) => {
  const { name, value } = event.target;
  setForm(prev =>({...prev,[name]:value}));

  // clear a specific error when the user starts typing//
  if(errors[name]){
    setErrors(prev=>({...prev,[name]:""}));
  }
};



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