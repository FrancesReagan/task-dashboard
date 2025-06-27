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
        : "bg-gray-800 border border-gray-700"
        : "bg-white shadow-sm border border-gray-200"
      }`}>
    



export default TaskList