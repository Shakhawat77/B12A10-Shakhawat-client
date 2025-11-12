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
        const res = await fetch(`http://localhost:3000/job/${id}`);
        const data = await res.json();
        setJob(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching job details:", error);
        setLoading(false);
      }
    };
    fetchJobDetails();
  }, [id]);

  const handleAcceptJob = () => {
    if (!user) {
      toast.error("Please login to accept a job.");
      navigate("/login");
      return;
    }

    const acceptedJobs = JSON.parse(localStorage.getItem("acceptedJobs")) || [];

    // Prevent accepting same job twice
    if (acceptedJobs.some((j) => j._id === job._id)) {
      toast.info("You have already accepted this job!");
      return;
    }

    acceptedJobs.push({
      ...job,
      acceptedBy: user.email,
      acceptedAt: new Date().toISOString(),
    });

    localStorage.setItem("acceptedJobs", JSON.stringify(acceptedJobs));
    toast.success("Job accepted successfully!");
    navigate("/my-accepted-tasks");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-lg">
        Loading job details...
      </div>
    );
  }

  if (!job) {
    return (
      <div className="text-center py-10 text-red-500">
        Job not found or deleted.
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-16">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-6">
        {/* Cover Image */}
        <img
          src={job.coverImage}
          alt={job.title}
          className="w-full h-64 object-cover rounded-lg mb-6"
        />

        {/* Title & Meta */}
        <div className="flex justify-between items-center mb-4">
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

        {/* Category & Posted By */}
        <p className="text-gray-600 mb-3">
          <strong>Category:</strong> {job.category}
        </p>
        <p className="text-gray-600 mb-6">
          <strong>Posted by:</strong> {job.postedBy || job.userEmail}
        </p>

        {/* Full Summary */}
        <p className="text-gray-700 leading-relaxed mb-8">{job.summary}</p>

        {/* Accept Button */}
        <div className="text-center">
          <button
            onClick={handleAcceptJob}
            className="btn btn-primary text-lg px-8 py-3 rounded-xl shadow-md hover:scale-105 transition-transform"
          >
            Accept Job
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
