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

  const [showUpdateForm, setShowUpdateForm] = useState(false);

  // Update form state
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [summary, setSummary] = useState("");
  const [coverImage, setCoverImage] = useState("");

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const res = await fetch(`http://localhost:3000/job/${id}`);
        if (!res.ok) throw new Error("Job not found");
        const data = await res.json();
        setJob(data);

        // Prefill form
        setTitle(data.title);
        setCategory(data.category);
        setSummary(data.summary);
        setCoverImage(data.coverImage || "");

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
      const res = await fetch("http://localhost:3000/accepted", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(acceptedJob),
      });

      if (res.ok) {
        toast.success("✅ Job accepted successfully!");
        navigate("/my-accepted-tasks");
      } else {
        toast.error("❌ Failed to accept job.");
      }
    } catch (error) {
      console.error("Error accepting job:", error);
      toast.error("Something went wrong!");
    }
  };

  const handleUpdateJob = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:3000/job/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, category, summary, coverImage }),
      });

      if (res.ok) {
        toast.success("✅ Job updated successfully!");
        const updatedJob = await res.json();
        setJob(updatedJob); // update state
        setShowUpdateForm(false); // hide form after update
      } else {
        toast.error("❌ Failed to update job.");
      }
    } catch (error) {
      console.error("Error updating job:", error);
      toast.error("Something went wrong!");
    }
  };

  const handleDeleteJob = async () => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;

    try {
      const res = await fetch(`http://localhost:3000/job/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        toast.success("✅ Job deleted successfully!");
        navigate("/"); // redirect to home
      } else {
        toast.error("❌ Failed to delete job.");
      }
    } catch (error) {
      console.error("Error deleting job:", error);
      toast.error("Something went wrong!");
    }
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

  const isOwner = user?.email === job.userEmail;

  return (
    <div className="container mx-auto px-6 py-16">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300">
        {/* Cover Image */}
        <img
          src={job.coverImage}
          alt={job.title}
          className="w-full h-64 object-cover rounded-lg mb-6 shadow-md"
        />

        {/* Title & Meta */}
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

        {/* Category & Posted By */}
        <div className="flex flex-wrap gap-4 mb-6">
          <p className="text-gray-600">
            <strong>Category:</strong> {job.category}
          </p>
          <p className="text-gray-600">
            <strong>Posted by:</strong> {job.postedBy || job.userEmail}
          </p>
        </div>

        {/* Full Summary */}
        <p className="text-gray-700 leading-relaxed mb-8">{job.summary}</p>

        {/* Accept Button */}
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

        {/* Owner Actions - buttons inside container */}
        {isOwner && (
          <div className="flex flex-col gap-4 mb-4">
            <div className="flex gap-4">
              <button
                onClick={() => setShowUpdateForm(!showUpdateForm)}
                className="btn btn-success flex-1 animate-gradient"
              >
                {showUpdateForm ? "Cancel Update" : "Update Job"}
              </button>
              <button
                onClick={handleDeleteJob}
                className="btn btn-error flex-1 animate-gradient"
              >
                Delete Job
              </button>
            </div>

            {/* Update Form */}
            {showUpdateForm && (
              <form onSubmit={handleUpdateJob} className="space-y-4 mt-4">
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Job Title"
                  className="input input-bordered w-full"
                  required
                />
                <input
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="Category"
                  className="input input-bordered w-full"
                  required
                />
                <textarea
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  placeholder="Job Summary"
                  className="textarea textarea-bordered w-full"
                  required
                ></textarea>
                <input
                  type="text"
                  value={coverImage}
                  onChange={(e) => setCoverImage(e.target.value)}
                  placeholder="Cover Image URL"
                  className="input input-bordered w-full"
                />
                <button
                  type="submit"
                  className="btn btn-success w-full animate-gradient"
                >
                  Submit Update
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default JobDetails;
