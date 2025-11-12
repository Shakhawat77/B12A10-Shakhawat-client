import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const MyAcceptedTasks = () => {
  const [acceptedJobs, setAcceptedJobs] = useState([]);

  useEffect(() => {
    // Load accepted jobs from localStorage
    const storedJobs = JSON.parse(localStorage.getItem("acceptedJobs")) || [];
    setAcceptedJobs(storedJobs);
  }, []);

  // ✅ Handle Done
  const handleDone = async (id) => {
    try {
      const updatedJobs = acceptedJobs.filter((job) => job._id !== id);
      setAcceptedJobs(updatedJobs);
      localStorage.setItem("acceptedJobs", JSON.stringify(updatedJobs));

      // Optional: Remove from database if stored there
      await fetch(`http://localhost:3000/accepted/${id}`, {
        method: "DELETE",
      });

      toast.success("✅ Task marked as Done!");
    } catch (error) {
      toast.error("Failed to mark as done");
    }
  };

  // ❌ Handle Cancel
  const handleCancel = async (id) => {
    try {
      const updatedJobs = acceptedJobs.filter((job) => job._id !== id);
      setAcceptedJobs(updatedJobs);
      localStorage.setItem("acceptedJobs", JSON.stringify(updatedJobs));

      // Optional: Remove from database if stored there
      await fetch(`http://localhost:3000/accepted/${id}`, {
        method: "DELETE",
      });

      toast.info("❌ Task canceled and removed!");
    } catch (error) {
      toast.error("Failed to cancel job");
    }
  };

  if (acceptedJobs.length === 0) {
    return (
      <div className="text-center py-20 text-gray-500 text-lg font-medium">
        You haven’t accepted any jobs yet.
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 via-sky-100 to-white min-h-screen py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">
          🧾 My Accepted Tasks
        </h1>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {acceptedJobs.map((job) => (
            <div
              key={job._id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
            >
              <img
                src={job.coverImage}
                alt={job.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {job.title}
                </h2>
                <p className="text-gray-500 text-sm mb-3 line-clamp-2">
                  {job.summary}
                </p>
                <p className="text-gray-600 text-sm mb-4">
                  <strong>Category:</strong> {job.category}
                </p>
                <p className="text-gray-500 text-xs mb-4">
                  Accepted:{" "}
                  {new Date(job.acceptedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>

                <div className="flex justify-between items-center">
                  <button
                    onClick={() => handleDone(job._id)}
                    className="flex items-center gap-2 text-green-600 font-semibold hover:scale-105 transition-transform"
                  >
                    <FaCheckCircle className="text-lg" /> Done
                  </button>
                  <button
                    onClick={() => handleCancel(job._id)}
                    className="flex items-center gap-2 text-red-600 font-semibold hover:scale-105 transition-transform"
                  >
                    <FaTimesCircle className="text-lg" /> Cancel
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyAcceptedTasks;
