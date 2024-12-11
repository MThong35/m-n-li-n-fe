import React, { useEffect, useState } from "react";
import taskService from "../../services/apiServices/tasklistAPI";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation } from "react-router-dom";
import userService from "../../services/apiServices/userAPI";

const EditTaskForm = ({ task, onSave }) => {
  const [taskData, setTaskData] = useState({
    taskID: "",
    taskName: "",
    createAt: "",
    deadline: "",
    progressPercentage: 0,
    priority: "",
    status: "",
  });
  const [assignData, setAssignData] = useState({
    taskID: "",
    userID: "",
  });
  const [assignees, setAssginees] = useState([]); // State for fetched userAssignee

  const location = useLocation();
  const [taskId, setTaskId] = useState([]);
  const nav = useNavigate();

  // Populate the form with existing task data when component loads
  useEffect(() => {
    const fetchTask = async () => {
      try {
        // Fetch task data from the API
        // Here you can add logic to fetch data from your backend
        const params = new URLSearchParams(location.search);
        const id = params.get("id");
        setTaskId(id);
        console.log(`taskid: ${id}`);
        const task = await taskService.GetTaskByID(id);

        // and populate the form with the existing task data
        console.log("setTask:", task);
        setTaskData({
          taskID: task.taskID,
          taskName: task.taskName,
          createAt: task.createAt,
          deadline: task.deadline,
          progressPercentage: task.progressPercentage,
          priority: task.priority,
          status: task.status,
        });
      } catch (error) {
        console.error("Error fetching task:", error);
      }
    };

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
    fetchTask();
  }, []);

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
      const response = await taskService.updateTask(taskData); // Fetching tasks from the API

      if (taskData.assignee && response) {
        assignData.taskID = response.taskID;
        assignData.userID = parseInt(taskData.assignee, 10);
        const assign = await taskService.addAssign(assignData);
        console.log("Assign data:", assignData);
        console.log("Assign:", assign);

        if (assign) {
          toast.success("Assign Update successfully!");
        } else {
          toast.error("Assign failed!");
        }
      }

      if (response) {
        toast.success("Updated task successfully!");
      } else {
        toast.error("Updated failed!");
      }
      setTimeout(() => {
        nav("/admin/taskmanage");
      }, 3000);
    } catch (error) {
      console.error("Error Add Task:", error);
      toast.error(
        error.response?.data?.description || "Updated new task failed."
      );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-4 border-b pb-2">Edit Task</h2>
        <form onSubmit={handleSubmit}>
          {/* Task Title */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Task Name
            </label>
            <input
              type="text"
              name="taskName"
              value={taskData.taskName}
              onChange={handleInputChange}
              className="w-full p-2 mt-1 border rounded-md"
              placeholder="Enter task taskName"
            />
          </div>
          {/* Task Title */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Progress
            </label>
            <input
              type="text"
              name="progressPercentage"
              value={taskData.progressPercentage}
              onChange={handleInputChange}
              className="w-full p-2 mt-1 border rounded-md"
              placeholder="Enter task progressPercentage"
            />
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
          </div>{" "}
          {/* Status */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <select
              name="status"
              value={taskData.status}
              onChange={handleInputChange}
              className="w-full p-2 mt-1 border rounded-md"
            >
              <option value="">Select status</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          {/* Due Date */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Due Date
            </label>
            <input
              type="date"
              name="deadline"
              // value={}
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
              Save Changes
            </button>
            <button
              onClick={() => nav("/admin/taskmanage")}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default EditTaskForm;
