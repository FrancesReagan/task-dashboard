import { useState, useEffect } from 'react';

// import { validateTask } from '../utils/taskUtils'; //

function TaskForm({ onAddTask, taskToEdit, onCancel, theme }) {
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  //  validation function//
  const validateTask = (formData) => {
    const errors = {};
    if (!formData.title.trim()) {
      errors.title = "Title is required";
    }
    if (!formData.dueDate) {
      errors.dueDate = "Due date is required";
    }
    if (!formData.priority) {
      errors.priority = "Priority is required";
    }
    return errors;
  };

  // reset form to default state//
  const resetForm = () => {
    setForm({
      id: null,
      title: "",
      description: "",
      dueDate: "",
      priority: "medium",
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
        dueDate: taskToEdit.dueDate ? taskToEdit.dueDate.split("T")[0] : "",
      });
      setErrors({});
    } else {
      resetForm();
    }
  }, [taskToEdit]); 

  // handle input changes//
  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm(prev => ({ ...prev, [name]: value }));
    
    // clear an error when the user starts typing//
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  }; 

  // handle form submission//
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      // validate the form//
      const validationErrors = validateTask(form);
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }
    
      // prepare task data//
      const taskData = { 
        ...form,
        title: form.title.trim(),
        description: form.description?.trim() || "",
        // ensure the date is stored in ISO format
        dueDate: new Date(form.dueDate).toISOString(),
      };

      // submit the task//
      onAddTask(taskData);

      // reset the form only if not editing//
      if (!form.id) {
        resetForm();
      }
    } catch (error) { 
      console.error("Error submitting form:", error); 
      setErrors({ submit: "Error saving task. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  }; 

  // handle cancel//
  const handleCancel = () => {
    resetForm();
    if (onCancel) onCancel();
  };

  const isEditing = Boolean(taskToEdit && taskToEdit.id);

  return (
    <div className={`mb-6 p-6 rounded-lg transition-colors duration-200 ${
      theme === "dark"
        ? "bg-gray-800 border border-gray-700"
        : "bg-white shadow-sm border border-gray-200"
    }`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">
          {isEditing ? "Edit Task" : "Add New Task"}
        </h2>
        {isEditing && (
          <button 
            type="button" 
            onClick={handleCancel} 
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            ✕ CANCEL
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* title */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Task Title*
          </label>
          <input 
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Enter task title (e.g. 'Complete all Mod9 and Mod10 labs and SBAs')"
            className={`w-full px-3 py-2 border rounded-lg transition-colors duration-200 ${
              theme === "dark" 
                ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500" 
                : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500"
            } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20 ${
              errors.title ? "border-red-500" : ""
            }`} 
            maxLength={100}
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title}</p>
          )}
        </div>

        {/* description */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Description
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Add task description or notes..."
            rows={3}
            className={`w-full px-3 py-2 border rounded-lg transition-colors duration-200 resize-vertical ${
              theme === "dark" 
                ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500"
                : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500"
            } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20`}
            maxLength={500}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* due date */}
          <div> 
            <label className="block text-sm font-medium mb-1">
              Due Date*
            </label>
            <input
              type="date"
              name="dueDate"
              value={form.dueDate}
              onChange={handleChange}
              min={new Date().toISOString().split("T")[0]}
              className={`w-full px-3 py-2 border rounded-lg transition-colors duration-200 ${
                theme === "dark"
                  ? "bg-gray-700 border-gray-600 text-white focus:border-blue-500"
                  : "bg-white border-gray-300 text-gray-900 focus:border-blue-500"
              } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20 ${
                errors.dueDate ? "border-red-500" : ""
              }`}
            />
            {errors.dueDate && (
              <p className="text-red-500 text-sm mt-1">{errors.dueDate}</p>
            )}
          </div>

          {/* priority */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Priority*
            </label>
            <select
              name="priority"
              value={form.priority}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg transition-colors duration-200 ${
                theme === "dark"
                  ? "bg-gray-700 border-gray-600 text-white focus:border-blue-500"
                  : "bg-white border-gray-300 text-gray-900 focus:border-blue-500"
              } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20 ${
                errors.priority ? "border-red-500" : ""
              }`}
            >
              <option value="">Select Priority</option>
              <option value="low">🟢 Low</option>
              <option value="medium">🟡 Medium</option>
              <option value="high">🔴 High</option>
            </select>
            {errors.priority && (
              <p className="text-red-500 text-sm mt-1">{errors.priority}</p>
            )}
          </div>

          {/* status */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Status
            </label>
            <select 
              name="status"
              value={form.status}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg transition-colors duration-200 ${
                theme === "dark" 
                  ? "bg-gray-700 border-gray-600 text-white focus:border-blue-500"
                  : "bg-white border-gray-300 text-gray-900 focus:border-blue-500"
              } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20`}
            >
              <option value="pending">⏳ Pending</option>
              <option value="in-progress">🔄 In Progress</option>
              <option value="completed">✅ Completed</option>
            </select>
          </div>
        </div>
        
        {/* submit error */}
        {errors.submit && (
          <p className="text-red-500 text-sm">{errors.submit}</p>
        )}

        {/* submit buttons */}
        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-6 py-2 text-white rounded-lg transition-all duration-200 ${
              isSubmitting 
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 hover:shadow-lg"
            } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
          >
            {isSubmitting ? "Saving..." : (isEditing ? "Update Task" : "Add Task")}
          </button>

          {isEditing && (
            <button
              type="button"
              onClick={handleCancel}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 
                        focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
            >
              Cancel
            </button>        
          )}
        </div>
      </form>
    </div>
  );
}

export default TaskForm;