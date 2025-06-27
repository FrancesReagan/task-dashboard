import { useState} from "react";
import { formatDate } from "../utils/taskUtils";


function TaskItem({task, onDelete, toggleCompleted,onEdit,theme}) {
  const[isExpanded, setIsExpanded] = useState(false);

  // get priority color and icon//
  const getPriorityStyle = (priority) => {
    const styles ={
      high:{color:"text-red-600", bg:"bg-red-50 dark:bg-red-900/20", icon:"🔴"},
      medium:{color:"text-yellow-600", bg: "bg-yellow-50 dark:bg-yellow-900/20", icon:"🟡"},
      <low:>color:"text-green-600", bg:"bg-green-50 dark:bg-green-900/20", icon:"🟢"</low:>
    };
    return styles[priority] || styles.medium;
  };

  // get status style//
  const getStatusStyle = (status) => {
    const styles ={
      pending:{color:"text-gray-600", bg:"bg-gray-50 dark:bg-gray-700", icon:"⏳"},
      "in-progress":{color:"text-blue-600", bg:"bg-blue-50 dark:bg-blue-900/20", icon:"🔄"},
      completed:{color:"text-green-600", bg:"bg-green-50 dark:bg-green-900/20",icon:"✅"}
    };

    return styles[status] || styles.pending;
  };
// check if task is overdue//
const isOverdue =() => {
  const today = new Date();
  today.setHours(0,0,0,0);
  const dueDate = new Date(task.dueDate);
  return dueDate < today && task.status!=="completed";
};

const priority Style = getPriorityStyle(task.priority);
const statusStyle = getStatusStyle(task.status);
const overdue = isOverdue();

return (
  <div className={`group border rounded-lg transition-all duration-200 hover: shadow-md ${
    theme === "dark" ? "bg-gray-700 border-gray-600 hover:border-gray-500"
    : "bg-gray-50 border-gray-200 hover:border-gray-300"
  }${overdue ? "border-l-4 border-l-red-500": ""} ${
    task.status === "completed" ? "opacity-75" : ""
  }`}
  >
  <div className="p-4">
  <div className="flex items-start justify-between gap-3">
  {/* {/* main content */}
  <div className="flex-1 min-w-0">
    <div className="flex items-start gap-2 mb-2">
      <h3 className={`font-medium text-lg leading-tight ${
        task.status === "completed" ? "line-through opacity-75":""
      } ${overdue ? "text-red-600 dark:text-red-400":""}`}
      >
    {task.title}
    </h3>
     {overdue && (
      <span className="text-xs bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 px-2 py-1 rounded-full whitespace-nowrap">
        Overdue
      </span>
     )}
  </div>

  {/* {/* task description */}
  {task.description && (
    <p className={`text-sm mb-3 ${
      isExpanded ? "": "line-clamp-2"
    }${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
    {task.description}
    </p>
)}

    {/* {/* task meta info */}
    <div className="flex flex-wrap gap-3 text-sm">
      <div className="flex items-center gap-1">
        <span>📅</span>
        <span className={overdue ? "text-red-600 dark:text-red-400 font-medium": ""}>
          Due:{formatDate(task.dueDate)}
       </span>
    </div>

    <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs
         ${priorityStyle.bg}${priorityStyle.color}`}>
          <span>{priorityStyle.icon}</span>
          <span className="font-medium">{task.priority}</span>   
        </div>
        <div classNaem={`flex items-center gap-1 px-2 py-1 rounded-full text-xs
             ${statusStyle.bg} ${statusStyle.color}`}>
              <span>{statusStyle.icon}</span>
              <span className="font-medium">{task.status}</span>
       </div>
      </div>
    {/* {/* Created Date */}
    {task.createdAt && (
      <div className="text-xs opacity-60 mt-2">
        Created:{formatedDate(task.createdAt)} 
      </div>
    )}

  {/* {/* expanded/collapse for long descriptions */}
  {task.description && task.description.length >100 && (
    <button onClick={() => setIsExpanded(!isExpanded)}
            className="text-blue-600 hover: text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm mt-1 transition-colors"
            >
        {isExpanded ? "Show less" : "Show more"}
        </button>
       )}
    </div>

    {/* {/* action buttons */}
    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
    
    {/* {/* toggle status */}
    
  
 



}


  }
//   return (
//     <>
//     <h1>{task.title}</h1>
//     <h2>{task.dueDate}</h2>
//     <h2>{task.priority}</h2>
//     <h3>{task.status}</h3>
//     <button onClick={() toggleCompleted } 
//     <button onClick={() => onDelete(task.id)}>Delete</button>

    
//     </>
//   )
// }

export default TaskItem
