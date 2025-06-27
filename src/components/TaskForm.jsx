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

// handle form submission//
const handleSubmit = async(e) => {
  e.preventDefault();

  if(isSubmitting) return;
    setIsSubmitting(true);

    try {
      // validate the form//
      const validationErrors = validateTask(form);
      if(Object.keys(validationErrors).length > 0){
        setErrors(validationErrors);
        return;
      }
    
      // prepare task data//
      cont taskData ={
        ...form,
        title:form.title.trim(),
        description:form.description?.trim() || "",
        // ensure the date is stored in ISO format//
        dueDate: new Date(form.dueDate).toISOString(),
      };

      // submit the task//
      onAddTask(taskData);

      // reset the form only if not editing it//
      if(!form.id){
        resetForm();
      }catch(error) {
        console.error("Error submitting form:"",error);
          setErrors({submit: "Error saving task. Please try again."});
        }finally{
          setIsSubmitting(false);
        }
      };

      // handle cancel//
      const handleCancel = () => {
        resetForm();
        if(onCancel) onCancel();
      };

      const isEditing = Boolean(taskToEdit && taskToEdit.id);

      return(
        <div className={`mb-6 p-6 rounded-lg transition-colors duration-200 ${theme === "dark"
          ? "bg-gray-800 border border-gray-700"
          : "bg-white shadow-sm border border-gray-200"
        }`}>     
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            {isEditing? "Edit Task" : "Add New Task"}
          </h2>
          {isEditing && (
            <button type="button" onClick={handleCancel} 
             className="text-gray-500 hover:text-gray-700 transition-colors"
             >
              ✕ CANCEL
             </button>
          )}

          
        </div>
        </div>
      )
      }

    }
}

//   function handleSubmit(e){
//     e.preventDefault()
//    onAddTask(newTask)
//    setForm({title:"", priority: "medium"})

//     const newTask = {
//     id: Date.now().toString(),
//     title:  form.title,
//     dueDate:form.dueDate,
//     status: form.status,
//     priority: form.priority,
//   }
//   }

  
//   return (
//     <>
//     <h1>TaskForm</h1>
//     <form onSubmit={handleSubmit}>
//       <input type="text" name="title" value={form.title} onChange={handleChange} placeholder="Task Title"/>
//       <input type="date" name="dueDate" value={form.dueDate} onChange={handleChange}/>
//       <select name="priority" onChange={handleChange} value={form.priority}>
//         <option value="low">Low</option> 
//         <option value="medium">Medium</option>
//         <option value="High">High</option>
//       </select>
//       <input type="checkbox" />
//       <button type="submit">Add Task</button>
//     </form>
//     </>
//   )
// }

export default TaskForm;