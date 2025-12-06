import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useAuth } from "../../context/AuthProvider";
import { toast } from "react-toastify";

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const res = await fetch(`https://freelance-server-beige.vercel.app/allJobs/${id}`);
        if (!res.ok) throw new Error("Job not found");
        const data = await res.json();
        setJob(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching job details:", error);
        toast.error("Failed to fetch job details.");
        setLoading(false);
      }
    };
    fetchJobDetails();
  }, [id]);

  const handleAcceptJob = async () => {
    if (!user) {
      toast.error("Please login to accept a job.");
      navigate("/login");
      return;
    }

    if (user.email === job.userEmail) {
      toast.error("You cannot accept your own job.");
      return;
    }

    const acceptedJob = {
      ...job,
      acceptedBy: user.displayName || "Unknown User",
      acceptedEmail: user.email,
    };

    try {
      const res = await fetch("https://freelance-server-beige.vercel.app/myAccepted-task", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(acceptedJob),
      });

      if (res.ok) {
        toast.success("Job accepted successfully!");
        navigate("/my-accepted-tasks");
      } else {
        toast.error("Failed to accept job.");
      }
    } catch (error) {
      console.error("Error accepting job:", error);
      toast.error("Something went wrong!");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-lg bg-gradient-to-r from-[#49c9a5] to-[#4db4d7]">
        Loading job details...
      </div>
    );
  }

  if (!job) {
    return (
      <div className="text-center py-10 text-red-500 bg-gradient-to-r from-[#49c9a5] to-[#4db4d7]">
        Job not found or deleted.
      </div>
    );
  }

  const isOwner = user?.email === job.userEmail;

  return (
    <div className="bg-gradient-to-r from-[#49c9a5] to-[#4db4d7]">
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-[#67eac5] to-[#6fd5f7] rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300">
          <img
            src={job.coverImage}
            alt={job.title}
            className="w-full h-64 object-cover rounded-lg mb-6 shadow-md"
          />
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-3">
            <h1 className="text-3xl font-bold text-gray-800">{job.title}</h1>
            <p className="text-gray-500 text-sm">
              🕒 Posted on:{" "}
              {new Date(job.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </p>
          </div>
          <div className="flex flex-wrap gap-4 mb-6">
            <p className="text-gray-600">
              <strong>Category:</strong> {job.category}
            </p>
            <p className="text-gray-600">
              <strong>Posted by:</strong> {job.postedBy || job.userEmail}
            </p>
          </div>

          <p className="text-gray-700 leading-relaxed mb-8">{job.summary}</p>

          {!isOwner && (
            <div className="text-center mb-4">
              <button
                onClick={handleAcceptJob}
                className="btn btn-primary text-lg px-8 py-3 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300 animate-gradient"
              >
                Accept Job
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
