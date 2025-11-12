import React, { useEffect, useState } from "react";
import { Link } from "react-router";

const HomePage = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch("http://localhost:3000/job?limit=6");
        const data = await res.json();
        setJobs(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, []);

  const topCategories = [
    { name: "Web Development", img: "https://via.placeholder.com/150" },
    { name: "Graphics Design", img: "https://via.placeholder.com/150" },
    { name: "Digital Marketing", img: "https://via.placeholder.com/150" },
    { name: "SEO", img: "https://via.placeholder.com/150" },
  ];

  // 🕒 Helper to format date
  const formatDate = (isoString) => {
    if (!isoString) return "Unknown date";
    const date = new Date(isoString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-400 to-sky-200 py-20 px-6 text-center text-white relative overflow-hidden">
        <h1 className="text-5xl font-bold mb-4 animate-pulse">
          Freelance MarketPlace
        </h1>
        <p className="text-xl mb-6">
          The most reliable platform to post and find freelance jobs.
        </p>
        <div className="flex justify-center gap-4">
          <Link to="/allJobs" className="btn btn-lg animate-gradient">
            Explore Jobs
          </Link>

          <Link to="/addAJobs" className="btn btn-lg animate-gradient">
            Create Jobs
          </Link>
        </div>
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-white opacity-10 rounded-full animate-pulse"></div>
      </section>

      {/* Latest Jobs Section */}
      <section className="container mx-auto px-6">
        <h2 className="text-3xl font-bold mb-6 text-center">Latest Jobs</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {jobs.length === 0 ? (
            <p className="text-center col-span-3">No jobs available yet.</p>
          ) : (
            jobs.map((job) => (
              <div
                key={job._id}
                className="card bg-base-100 shadow-md p-4 hover:shadow-xl transition"
              >
                <img
                  src={job.coverImage}
                  alt={job.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="text-xl font-bold mb-2">{job.title}</h3>
                <p className="text-gray-600 mb-2">
                  <strong>Category:</strong> {job.category}
                </p>

                {/* ✂️ Summary limited to 2 lines */}
                <p className="text-gray-700 mb-2 line-clamp-2">
                  {job.summary}
                </p>

                <p className="text-sm text-gray-500">
                  Posted by: {job.postedBy || job.userEmail}
                </p>
                <p className="text-xs text-gray-400">
                  🕒 Posted on: {formatDate(job.createdAt)}
                </p>

                <Link
                  to={`/job/${job._id}`}
                  className="btn btn-sm btn-primary mt-3"
                >
                  View Job
                </Link>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Top Categories */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-6 text-center">
            Top Categories
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {topCategories.map((cat, idx) => (
              <div
                key={idx}
                className="card shadow-md hover:shadow-xl transition text-center p-4 bg-white rounded-lg"
              >
                <img
                  src={cat.img}
                  alt={cat.name}
                  className="w-full h-40 object-cover rounded-lg mb-2"
                />
                <h3 className="font-semibold text-lg">{cat.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="container mx-auto px-6 py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">About Freelance Market</h2>
        <p className="text-gray-700 max-w-3xl mx-auto">
          Freelance Market is a platform connecting freelancers and clients
          efficiently. Post jobs, hire professionals, manage tasks, and explore
          opportunities all in one place. Our mission is to make freelance work
          reliable, transparent, and easy for everyone.
        </p>
      </section>
    </div>
  );
};

export default HomePage;
