import {
  ChevronUpDownIcon,
  XMarkIcon,
  PlusIcon,
  PauseIcon,
  CheckIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import releasingService from "../../services/apiServices/releasingAPI"; // Assuming releasingService is correctly set up
import { ToastContainer, toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";

// Table headers for releasing
const TABLE_HEAD = [
  "No.",
  "Title",
  "Aprroved?",
  "Approved at",
  "Approved by",
  "License",
  "Publisher",
  "Status",
  "Action",
];
// Utility function to format date
const formatDate = (dateString) => {
  const date = new Date(dateString);

  if (isNaN(date)) return "Invalid Date"; // Handle invalid date strings

  // Format the date to 'YYYY:MMM:DD'
  const formatter = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short", // "MMM"
    day: "2-digit", // "DD"
  });

  const parts = formatter.formatToParts(date);
  const year = parts.find((part) => part.type === "year").value;
  const month = parts.find((part) => part.type === "month").value;
  const day = parts.find((part) => part.type === "day").value;

  return `${year} ${month} ${day}`;
};

const PublishingTable = () => {
  const [releasing, setReleasing] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const authToken = sessionStorage.getItem("authToken");
  const [searchQuery, setSearchQuery] = useState("");

  const handleReleasingAdded = () => {
    try {
      if (!authToken) {
        // Redirect to login page if authToken is missing
        navigate("/login");
      } else {
        try {
          // Decode the authToken to get the role
          const decodedToken = jwtDecode(authToken);
          const userRole =
            decodedToken[
              "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
            ];

          // Check if user has an admin role
          if (userRole !== "Admin" && userRole !== "Manager") {
            toast.error("You are not authorized to add new user.");
          } else {
            navigate("/admin/addreleasing"); // Redirect to Add User page
          }
        } catch (error) {
          // Handle decoding errors (e.g., if authToken is invalid)
          console.error("Invalid authToken:", error);
          navigate("/login");
        }
      }
    } catch (err) {
      setError("Failed to delete user.");
      toast.error(error.response?.data?.description || "Registration failed.");
    }
  };

  const handleApprovedReleasing = async (releasing) => {
    // Delete user with userId
    try {
      if (!authToken) {
        // Redirect to login page if authToken is missing
        navigate("/login");
      } else {
        try {
          // Decode the authToken to get the role
          const decodedToken = jwtDecode(authToken);
          const userRole =
            decodedToken[
              "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
            ];

          // Check if user has an admin role
          if (userRole !== "Admin" && userRole !== "Manager") {
            toast.error("You are not authorized to delete users.");
          } else {
            // Check if user has an admin role
            if (userRole !== "Admin" && userRole !== "Manager") {
              toast.error("You are not authorized to add new user.");
            } else {
              // navigate(`/admin/editreleasing?id=${releasing.comicId}`);
              if (!releasing.isApprove || releasing.status === "Pending") {
                console.log(`Releasing:`);
                releasing.isApprove = !releasing.isApprove;
                releasing.approveAt = new Date();

                if (releasing.status === "Pending")
                  releasing.status = "Approved";

                console.log(releasing);
                const updatedReleasing = await releasingService.UpdateReleasing(
                  releasing
                );
                console.log(updatedReleasing);

                // reload data
                fetchReleasing();
              }
            }
          }
        } catch (error) {
          // Handle decoding errors (e.g., if authToken is invalid)
          console.error("Invalid authToken:", error);
          navigate("/login");
        }
      }
    } catch (err) {
      setError("Failed to delete user.");
      toast.error(error.response?.data?.description || "Registration failed.");
    }
  };
  const handleRejectedReleasing = async (releasing) => {
    // Delete user with userId
    try {
      if (!authToken) {
        // Redirect to login page if authToken is missing
        navigate("/login");
      } else {
        try {
          // Decode the authToken to get the role
          const decodedToken = jwtDecode(authToken);
          const userRole =
            decodedToken[
              "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
            ];

          // Check if user has an admin role
          if (userRole !== "Admin" && userRole !== "Manager") {
            toast.error("You are not authorized to delete users.");
          } else {
            // Check if user has an admin role
            if (userRole !== "Admin" && userRole !== "Manager") {
              toast.error("You are not authorized to add new user.");
            } else {
              if (releasing.isApprove || releasing.status === "Approved") {
                console.log(`Releasing:`);
                releasing.isApprove = !releasing.isApprove;
                releasing.approveAt = new Date();
                
                // if(releasing.userID == null) releasing.userID = ;

                if (releasing.status === "Approved")
                  releasing.status = "Pending";

                console.log(releasing);
                const updatedReleasing = await releasingService.UpdateReleasing(
                  releasing
                );
                console.log(updatedReleasing);

                // reload data
                fetchReleasing();
              }
            }
          }
        } catch (error) {
          // Handle decoding errors (e.g., if authToken is invalid)
          console.error("Invalid authToken:", error);
          navigate("/login");
        }
      }
    } catch (err) {
      setError("Failed to delete user.");
      toast.error(error.response?.data?.description || "Registration failed.");
    }
  };

  const fetchReleasing = async () => {
    try {
      setLoading(true);
      const releasingList = await releasingService.GetListReleasing();
      console.log(`Result:`);
      console.log(releasingList);
      setReleasing(releasingList);

      console.log(releasing);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch Releasings.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReleasing();
  }, []);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter users based on the search query
  const handleSearchReleasing = () => {
    return releasing;
  };

  return (
    <div className="h-full w-full bg-white shadow-md rounded-lg">
      <div className="p-6 border-b">
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <h1 className="text-2xl font-semibold text-gray-700">
              Publishing Overview
            </h1>
            <p className="text-gray-500 text-lg">
              Manage and track all releasing
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <button
              onClick={handleReleasingAdded}
              className="flex items-center gap-2 text-sm px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              <PlusIcon className="h-4 w-4" /> New request
            </button>
          </div>
        </div>

        {/* Table Body with Scroll */}
        <div className="overflow-y-auto h-screen p-4">
          <table className="w-full table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head, index) => (
                  <th
                    key={head}
                    className="cursor-pointer border-b p-4 text-sm font-semibold text-gray-600"
                  >
                    <div className="flex items-center justify-between">
                      {head}
                      {index !== TABLE_HEAD.length - 1 && (
                        <ChevronUpDownIcon className="h-4 w-4 text-gray-500" />
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {handleSearchReleasing().map((releasing, index) => {
                const isLast = index === releasing.length - 1;
                const classes = isLast ? "p-4" : "p-4 border-b border-gray-100";

                return (
                  <tr key={releasing.comicId}>
                    <td className={classes}>
                      <span className="text-gray-700 font-medium">
                        {releasing.comicId}
                      </span>
                    </td>

                    <td className={classes}>
                      <span className="text-gray-700">
                        {releasing.comicTitle}
                      </span>
                    </td>

                    <td className={classes}>
                      <span className="text-gray-700">
                        {releasing.isApprove ? (
                          <CheckCircleIcon className="h-5 w-5 text-green-500" />
                        ) : (
                          <XCircleIcon className="h-5 w-5 text-red-500" />
                        )}
                      </span>
                    </td>

                    <td className={classes}>
                      <span className="text-gray-700">
                        {releasing.approveAt
                          ? formatDate(releasing.approveAt)
                          : ""}
                      </span>
                    </td>
                    <td className={classes}>
                      <span className="text-gray-700">
                        {releasing.userID ? releasing.userID : "N/A"}
                      </span>
                    </td>
                    <td className={classes}>
                      <span className="text-gray-700">
                        {releasing.licenseID}
                      </span>
                    </td>

                    <td className={classes}>
                      <span className="text-gray-700">
                        {releasing.releasingID}
                      </span>
                    </td>
                    <td className={classes}>
                      <span
                        className={`inline-block px-2 py-1 text-xs font-medium rounded ${
                          releasing.status === "Approved"
                            ? "bg-green-100 text-green-700"
                            : releasing.status === "Pending" ||
                              releasing.status === "In progress"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {releasing.status}
                      </span>
                    </td>

                    <td className={`${classes} flex items-center gap-2`}>
                      <button
                        onClick={() => handleApprovedReleasing(releasing)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <CheckIcon className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleRejectedReleasing(releasing)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <XMarkIcon className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default PublishingTable;
