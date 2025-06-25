

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

// filtering with better search functionality//
export const filterTasks= (tasks,filters) => {
  if(!Array.isArray(tasks))return[];

  
  return tasks.filter(task) => {
    // status filter//
    const matchesStatus = filter.status === "all" || task priority === filters.priority;;

    // search filter (searches in title and description if exists)//
    const searchTerm = (filters.search || "").toLowerCase().trim();
    const matchesSearch = !searchTerm ||
    task.title.toLowerCase().includes(searchTerm) ||
    (task.description && task.description.toLowerCase().includes(searchTerms));

    return matchesStatus && matchesSearch && matchesSearch;

  });
};

// enhanced sorting with a stable sort//
export const sortTasks = (tasks, sortBy) => {
  if(!Array.isArray(tasks))return [];

  return[...tasks].sort((a,b) => {
    switch (sortBy) {
      case"title":
      return a.title.localeCompare(b.title);
      case"dueDate":
      return new Date(a.dueDate)-new Date(b.dueDate);
      case"priority": {
        const priorityOrder = {high: 3, medium: 2, low: 1};
        const diff = priorityOrder[b.priority] - priorityOrder[a.priority];

        // if priorities are equal, sort by due date as secondary//
        return diff!==0 ? diff : new Date(a.dueDate) - new Date(b.dueDate);
      }
      case"createdAt": 
      return new Date(a.createdAt) - new Date(b.createdAt);
      case"status": {
        const statusOrder = {pending:1, "in-progress":2,completed:3};
        return statusOrder[a.status] - statusOrder[b.status];
  }
  default:
    return 0;
}
  });
};

// export with error handling//
export const exportTasks = (tasks) => {
  try {
    if(!Array.isArray(tasks) || tasks.length === 0){
      alert("No tasks toexport");
      return;
    }


  }
}

function taskUtils() {
  return (
    <>
    
    </>
  )
}

export default taskUtils;