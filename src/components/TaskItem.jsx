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
