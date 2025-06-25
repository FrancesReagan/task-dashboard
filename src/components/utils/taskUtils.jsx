

// utility functions for task management//

// formats the date to a readable format (MM/DD/YYYY)//
export const formatDate = (date) => {
  if(!date) return"";
  try {
    const d = new Date(date);
    // check if date is valid//
    if(isNaN(d.getTime())) return"Invalid Date";
        return `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
  } catch (error){
    return"Invalid Date";
  }
  };

  // task validatin with error messages//
  export const validateTask = (task) => {
    const errors = {};

    // title validation//
  if (!task.title || !task.title.trim()) {
    errors.title = "Title is required and cannot be empty";
  } else if (task.title.trim().length < 3) {
    errors.title = "Title must be at least 3 characters long";
  } else if (task.title.trim().length > 100) {
    errors.title = "Title must be less than 100 characters";

    // due date validation//
    if(!task.dueDate){
      errors.dueDate = "Due date is required";
    }else{
      const today = new Date();
      const dueDate = newDate(task.dueDate);
      // reset time for comparsion//
      
      if (dueDate<today){
        errors.dueDate = "Due date cannot be in the past";
      }
    }
// priority validation//
if(!task.priority ||!["low","medium","high"].includes(task.priority)){
  errors.priority = "Please select a valid priority";
}
return errors;
  };
  
if

    }
function taskUtils() {
  return (
    <>
    
    </>
  )
}

export default taskUtils;