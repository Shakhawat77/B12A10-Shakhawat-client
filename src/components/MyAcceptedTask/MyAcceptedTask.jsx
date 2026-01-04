import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { useAuth } from "../../context/AuthProvider";

const AcceptedTasksSkeleton = () => (
  <div className="bg-gradient-to-r from-[#FF6B6B] via-[#FFD93D] to-[#6BCB77] min-h-screen py-16 px-6 flex justify-center items-center">
    <div className="max-w-6xl w-full grid sm:grid-cols-2 lg:grid-cols-3 gap-8 animate-pulse">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="rounded-2xl shadow-md overflow-hidden border-none bg-white dark:bg-gray-800/20 p-6">
          <div className="h-48 bg-gray-300 rounded mb-4"></div>
          <div className="h-6 bg-gray-300 rounded mb-2 w-3/4"></div>
          <div className="h-4 bg-gray-300 rounded mb-2 w-full"></div>
          <div className="h-4 bg-gray-300 rounded mb-2 w-5/6"></div>
          <div className="flex justify-between items-center mt-4">
            <div className="h-8 bg-gray-300 rounded w-20"></div>
            <div className="h-8 bg-gray-300 rounded w-20"></div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

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

  if (loading) return <AcceptedTasksSkeleton />;

  if (acceptedJobs.length === 0) {
    return (
      <div className="text-center py-20 bg-gradient-to-r from-[#FF6B6B] via-[#FFD93D] to-[#6BCB77] text-gray-700 text-lg font-medium">
        You haven’t accepted any jobs yet.
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-[#FF6B6B] via-[#FFD93D] to-[#6BCB77] min-h-screen py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 dark:text-gray-200 mb-12">
          My Accepted Tasks
        </h1>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {acceptedJobs.map((job) => {
            const isOwner = user?.email === job.userEmail;

            return (
              <div
                key={job._id}
                className="bg-gradient-to-r from-[#FFD93D]/30 via-[#FF6B6B]/30 to-[#6BCB77]/30 rounded-2xl shadow-md hover:shadow-xl duration-300 overflow-hidden border-none"
              >
                <img
                  src={job.coverImage}
                  alt={job.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
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
