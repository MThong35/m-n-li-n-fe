import React, { useState, useEffect } from "react";
import taskService from "../../services/apiServices/tasklistAPI"; // Assuming taskService is correctly set up
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import userService from "../../services/apiServices/userAPI";

const AddTaskForm = () => {
  //  assignee: "",
  const [taskData, setTaskData] = useState({
    taskName: "",
    createAt: "",
    deadline: "",
    progressPercentage: 0,
    priority: "",
    status: "Pending",
  });

  const [assignData, setAssignData] = useState({
    taskID: "",
    userID: "",
  });

  const nav = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTaskData({ ...taskData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    taskData.createAt = new Date().toISOString();
    console.log("Task data:", taskData);
    // Here you can add logic to send data to your backend
    try {
      const response = await taskService.addTask(taskData); // Fetching tasks from the API

      if (taskData.assignee && response) {
        assignData.taskID = response.taskID;
        assignData.userID = parseInt(taskData.assignee, 10);
        const assign = await taskService.addAssign(assignData);
        console.log("Assign data:", assignData);
        console.log("Assign:", assign);

        if (assign) {
          toast.success("Assign task successfully!");
        } else {
          toast.error("Assign failed!");
        }
      }

      if (response) {
        toast.success("Create task successfully!");
      } else {
        toast.error("Create failed!");
      }
      setTimeout(() => {
        nav("/admin/taskmanage");
      }, 3000);
    } catch (error) {
      console.error("Error Add Task:", error);
      toast.error(
        error.response?.data?.description || "Create new task failed."
      );
    }
  };

  const [assignees, setAssginees] = useState([]); // State for fetched userAssignee

  useEffect(() => {
    const fetchAssginees = async () => {
      try {
        const response = await userService.getAllUsers(); // Replace with your actual API endpoint

        setAssginees(response); // Assuming response.data contains the priorities

        console.log("Assignees:", response);
      } catch (error) {
        console.error("Error fetching assignee:", error);
      }
    };

    fetchAssginees();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-4 border-b pb-2">
          Add New Task
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Task Title */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Task Title
            </label>
            <input
              type="text"
              name="taskName"
              value={taskData.taskName}
              onChange={handleInputChange}
              className="w-full p-2 mt-1 border rounded-md"
              placeholder="Enter task title"
            />
          </div>

          {/* Task Description
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              value={taskData.description}
              onChange={handleInputChange}
              className="w-full p-2 mt-1 border rounded-md"
              rows="4"
              placeholder="Brief description of the task"
            ></textarea>
          </div> */}

          {/* Due Date */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Due Date
            </label>
            <input
              type="date"
              name="deadline"
              value={taskData.deadline}
              onChange={handleInputChange}
              className="w-full p-2 mt-1 border rounded-md"
            />
          </div>
          {/* Assignee */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Assignee
            </label>
            <select
              name="assignee"
              value={taskData.assignee}
              onChange={handleInputChange}
              className="w-full p-2 mt-1 border rounded-md"
            >
              <option value="">Select Assignee</option>
              {assignees.map((assignee) => (
                <option key={assignee.id} value={assignee.userId}>
                  {assignee.firstName + " " + assignee.lastName}
                </option>
              ))}
            </select>
          </div>
          {/* Priority */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Priority
            </label>
            <select
              name="priority"
              value={taskData.priority}
              onChange={handleInputChange}
              className="w-full p-2 mt-1 border rounded-md"
            >
              <option value="">Select priority</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Add Task
            </button>
            {/* <button onClick={notify}>Notify!</button> */}
            <button
              onClick={() => {
                nav("/admin/taskmanage");
              }}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              Cancel
            </button>
            <ToastContainer />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTaskForm;
