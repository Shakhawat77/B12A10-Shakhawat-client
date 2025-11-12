import React, { useEffect, useState } from "react";
import { Link } from "react-router";

const AllJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch("http://localhost:3000/job");
        const data = await res.json();
        setJobs(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-xl font-semibold text-gray-600 animate-pulse">
        Loading jobs...
      </div>
    );
  }

  if (jobs.length === 0) {
    return (
      <div className="text-center py-20 text-gray-500 text-lg font-medium">
        No jobs found. Please add some jobs.
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 via-sky-100 to-white min-h-screen py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">
          💼 Explore Freelance Jobs
        </h1>

        {/* Job Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {jobs.map((job) => (
            <div
              key={job._id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 group"
            >
              {/* Cover Image */}
              <div className="relative">
                <img
                  src={job.coverImage}
                  alt={job.title}
                  className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3 bg-blue-600 text-white text-xs px-3 py-1 rounded-full shadow">
                  {job.category}
                </div>
              </div>

              {/* Job Content */}
              <div className="p-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-2 line-clamp-1">
                  {job.title}
                </h2>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {job.summary}
                </p>

                <div className="text-sm text-gray-500 mb-4">
                  Posted by:{" "}
                  <span className="font-medium text-gray-700">
                    {job.postedBy || job.userEmail}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <p className="text-gray-400 text-xs">
                    🕒{" "}
                    {new Date(job.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                  <Link
                    to={`/job/${job._id}`}
                    className="bg-gradient-to-r from-blue-500 to-sky-400 text-white px-4 py-2 rounded-lg shadow hover:scale-105 transition-transform text-sm"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllJobs;
