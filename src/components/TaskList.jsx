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

}

export default TaskList