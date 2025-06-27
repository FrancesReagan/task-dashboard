import { useMemo } from "react";
import TaskItem from "./TaskItem";
import { filterTasks, sortTasks } from "../utils/taskUtils";



function TaskList({
  tasks,
  filters,
  sortBy,
  onDelete,
  onToggleCompleted,
  onEdit,
  onReorder,
  theme,
}) {

  // memorized, filtered, and sorted tasks//
  const filteredAndSortedTasks = useMemo(() => {
    const filtered = filterTasks(tasks,filters);
    return sortTasks(filtered,sortBy);
  },[tasks,filters,sortBy]);

  // reordering using handleDragEnd//
  const handleDragEnd = (result) => {
    if(!result.destination) return;

    const items = Array.from(filteredAndSortedTasks);
    const [reorderedItem] = items.splice(result.source.index,1);
    items.splice(result.destination.index,0,reorderedItem); 

    // pass reordered filtered tasks back to parent//
    onReorder(items);
  };

  // group tasks by status for better organization//
  const groupedTasks = useMemo(() => {
    const groups ={
      pending:[],
      "in-progress":[],
      completed:[],
    };
  
  filteredAndSortedTasks.forEach(task => {
    if(groups[task.status]){
      groups[task.status].push(task);
    }
  });

  return groups;
}, [filteredAndSortedTasks]);

const totalFilteredTasks = filteredAndSortedTasks.length;
const hasNoTasks = tasks.length === 0;
const hasNoFilteredTasks = totalFilteredTasks === 0 && !hasNoTasks;
  if(hasNoTasks) {
    return (
      <div className={`text-center py-12 rounded-lg ${
        theme === "dark" ? "bg-gray-800 border-gray-700"
        : "bg-white shadow-sm border border-gray-200"
      }`}>

    <div className="text-6xl mb-4">📝</div>
      <h3 className="text-xl font-medium mb-2">No Tasks Yet</h3>
      <p className="text-gray-500 mb-4">Create your first task to get started.</p>
     </div>
    );
  }

  if (hasNoFilteredTasks) {
    return (
      <div className={`text-center py-12 rounded-lg ${
        theme === "dark" ? "bg-gray-800 border border-gray-700"
        : "bg-white shadow-sm border border-gray-200"
      }`}>
    
    <div className="text-6xl mb-4">🔍</div>
     <h3 className="text-xl font-medium mb-2">No Tasks Found</h3>
      <p className="text-gray-500 mb-4">
         Try adjusting your filters or search criteria.
      </p>
    </div>
    );
  }
  return (
    <div className={`rounded-lg transition-colors duration-200 ${
      theme === "dark" ? "bg-gray-800 border border-gray-700"
      : "bg-white shadow-sm border border-gray-200"
    }`}>

      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">
            Tasks({totalFilteredTasks})
          </h3>
        <div className="text-sm opacity-75">
          {tasks.length!==totalFilteredTasks && (
            <span>Showing{totalFilteredTasks} of {tasks.length}</span>
          )}
      </div>
    </div>
  </div>

  <div className="p-4">

 {filters.status !== "all" ? (
    <div className="space-y-3">
      {filteredAndSortedTasks.map((task) => (
        <TaskItem
        key={task.id}
        task={task}
        onDelete={onDelete}
        onToggleCompleted={onToggleCompleted}
        onEdit={onEdit}
        theme={theme}
        />
      ))}
      </div>
  ) : (
    // group by status when showing all//
    <div className="space-y-6">
      {Object.entries(groupedTasks).map(([status,statusTasks]) => {
        if(statusTasks.length===0)return null;

        const statusLabels = {
          pending: "⏳Pending",
          "in-progress": "🔄 In Progress",
          completed: "✅ Completed"
        };
      return (
        <div key={status}>
          <h4 className="font-medium text-sm uppercase tracking-wide opacity-75 mb-3">
            {statusLabels[status]}({statusTasks.length})
            </h4>
            <div className="space-y-3">
              {statusTasks.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onDelete={onDelete}
                  onToggleCompleted={onToggleCompleted} 
                  onEdit={onEdit}
                  theme={theme}
                  />
              ))}
            </div>
          </div>
         );

       })}
     </div>
     )}
    </div>
   </div>
);
}

export default TaskList;