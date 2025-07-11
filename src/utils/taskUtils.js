

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

    // create export data with metadata//
    const exportData={
      exportDate: new Date().toISOString(),
      version:"1.0",
      totalTasks: tasks.length,
      tasks: tasks,
    };

    const dataStr = JSON.stringify(exportData, null, 2);
    const blob = new Blob([dataStr], {type:"application/json"});
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `tasks-${new Date().toISOString().split("T")[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  }catch(error){
    alert("Error exporting tasks. Please try again.");
    console.error("Export error:", error);
  }
};

// enchanced import with validation//
export const importTasks = (file, callback) => {
  if(!file){
    alert("Please select a file");
    return;
  }

const reader = new FileReader();
reader.onload = (e) => {
try {

  const data = JSON.parse(e.target.result);

  // handle both old format (direct array) and new format(with metadata)//
  const tasks = Array.isArray(data) ? data : data.tasks || [];

  // validate imported tasks//
  if(!Array.isArray(tasks)){
    throw new Error("Invalid file format");
  }

  // basic validation of task structure//
  const validTasks = tasks.filter(task =>
    task &&
    typeof task === "object" &&
    task.title &&
    task.dueDate &&
    task.priority
  );

  if(validTasks.length ==== 0){
    alert("No valid tasks found in the file");
    return;
  }

  if(validTasks.length !== tasks.lenth){
    const skipped = tasks.length - validTasks.length;
    alert(`Imported ${validTasks.length}tasks.${skipped} invalid tasks were skipped.`);
   
  }

 callback(validTasks);
}catch(error){
  alert("Invalid file format. Please select a valid tasks JSON file.");
  console.error("Import error:",error);
}
};

reader.onerror = () => {
  alert("Error reading file. Please try again.");
};

reader.readAsText(file);
};

// utility to generate unique ID//
export const generateId = () => {
  return Date.now() + Math.random().toString(36).substr(2,9);
};

// utility to get task statistics//
export const getTaskStats = (tasks) => {
  if(!Array.isArray(tasks))return{total:0, completed:0,pending:0,inProgress:0};

  return{
    total: tasks.length,
    completed: tasks.filter(t => t.status === "completed").length,
    pending:tasks.filter(t =>t.status === "pending").length,
    inProgress:tasks.filter(t => t.status === "in-progress").length,
    overdue: tasks.filter(t => {
      const today = new Date();
      today.setHours(0,0,0,0);
      return new Date(t.dueDate)<today && t.status!=="completed";
    }).length,
  };
};


export default taskUtils;