import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { useAuth } from "../../context/AuthProvider"; 

const MyAcceptedTasks = () => {
  const { user } = useAuth();
  const [acceptedJobs, setAcceptedJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAcceptedJobs = async () => {
    try {
      const res = await fetch("https://freelance-server-beige.vercel.app/accepted");
      if (!res.ok) throw new Error("Failed to fetch accepted jobs");
      const data = await res.json();
      setAcceptedJobs(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching accepted jobs:", error);
      toast.error("Failed to load accepted jobs.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAcceptedJobs();
  }, []);

  const handleDone = async (id) => {
    try {
      const res = await fetch(`https://freelance-server-beige.vercel.app/accepted/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setAcceptedJobs((prev) => prev.filter((job) => job._id !== id));
        toast.success("Task marked as Done!");
      } else {
        toast.error("Failed to mark task as Done");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  const handleCancel = async (id) => {
    try {
      const res = await fetch(`https://freelance-server-beige.vercel.app/myAccepted-task/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setAcceptedJobs((prev) => prev.filter((job) => job._id !== id));
        toast.info("Task canceled and removed!");
      } else {
        toast.error("Failed to cancel task");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center bg-gradient-to-r from-[#49c9a5] to-[#4db4d7] items-center h-screen text-lg text-gray-600">
        Loading your accepted tasks...
      </div>
    );
  }

  if (acceptedJobs.length === 0) {
    return (
      <div className="text-center py-20 bg-gradient-to-r from-[#49c9a5] to-[#4db4d7] text-gray-500 text-lg font-medium">
        You haven’t accepted any jobs yet.
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-[#49c9a5] to-[#32c5f6] min-h-screen py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">
          My Accepted Tasks
        </h1>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {acceptedJobs.map((job) => {
            const isOwner = user?.email === job.userEmail; 

            return (
              <div
                key={job._id}
                className="bg-gradient-to-r from-[#6fecc9] to-[#75d8f9] rounded-2xl shadow-md hover:shadow-xl  duration-300 overflow-hidden border-none"
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
                    Accepted by: {job.acceptedBy} ({job.acceptedEmail})
                    <br />
                    Accepted on:{" "}
                    {new Date(job.acceptedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>

                  <div className="flex justify-between items-center">
                    <button
                      onClick={() => handleDone(job._id)}
                      disabled={!isOwner}
                      className={`flex items-center gap-2 font-semibold hover:scale-105 transition-transform ${
                        isOwner
                          ? "text-green-600"
                          : "text-gray-400 cursor-not-allowed"
                      }`}
                    >
                      <FaCheckCircle className="text-lg" />ADD
                    </button>
                    <button
                      onClick={() => handleCancel(job._id)}
                      disabled={!isOwner}
                      className={`flex items-center gap-2 font-semibold hover:scale-105 transition-transform ${
                        isOwner
                          ? "text-red-600"
                          : "text-gray-400 cursor-not-allowed"
                      }`}
                    >
                      <FaTimesCircle className="text-lg" /> Cancel
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MyAcceptedTasks;
