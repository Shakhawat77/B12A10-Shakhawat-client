import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HomePage = () => {
  const [jobs, setJobs] = useState([]);
  const topCategoriesRef = useRef(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch("https://freelance-server-beige.vercel.app/allJobs?limit=6");
        const data = await res.json();
        setJobs(data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, []);

  const topCategories = [
    { name: "Web Development", img: "https://storage.googleapis.com/ureify-strapi-assets/web_developer_resume_4906271445/web_developer_resume_4906271445.jpeg" },
    { name: "Graphics Design", img: "https://kritagyata.in/wp-content/uploads/2024/01/graphic-design-1500-x-900-picture-lpuf40e9jm621ews-1500x750.jpg" },
    { name: "Digital Marketing", img: "https://s44783.pcdn.co/in/wp-content/uploads/sites/3/2023/03/How-to-Learn-Digital-Marketing-768x511.jpg.webp" },
    { name: "SEO", img: "https://pairroxz.com/blog/wp-content/uploads/2023/03/What-is-SEO-in-Web-Development_10-Best-Points-How-SEO-and-Website-Development-Interact-3.png" },
  ];

  const formatDate = (isoString) => {
    if (!isoString) return "Unknown date";
    const date = new Date(isoString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };
  useEffect(() => {
    const container = topCategoriesRef.current;
    if (!container) return;

    container.innerHTML += container.innerHTML;

    const cards = container.children;
    const cardWidth = cards[0].offsetWidth + 24; 
    const totalWidth = cardWidth * topCategories.length;

    gsap.to(container, {
      x: `-=${totalWidth}`, 
      duration: 12,
      ease: "linear",
      repeat: -1,
      modifiers: {
        x: (x) => {        
          const val = parseFloat(x);
          return `${(val % totalWidth)}px`;
        },
      },
    });
  }, []);

  return (
  <div className="space-y-16 bg-gradient-to-r from-[#47aa8e] to-[#6497a8] dark:from-gray-800 dark:to-gray-900">     
  <section className="bg-gradient-to-r from-[#33826c] to-[#4c7684] py-50 px-6 text-center text-white dark:bg-gray-900 dark:text-gray-200 relative overflow-hidden">
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
    <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-white opacity-10 dark:bg-gray-700 rounded-full animate-pulse"></div>
  </section>     
  <section className="container mx-auto px-6">
    <h2 className="text-3xl font-bold mb-6 text-center dark:text-gray-200">Latest Jobs</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {jobs.length === 0 ? (
        <p className="text-center col-span-3 dark:text-gray-300">No jobs available yet.</p>
      ) : (
        jobs.map((job) => (
          <div
            key={job._id}
            className="card  bg-gradient-to-r from-[#49c9a5] to-[#4db4d7] shadow-md p-4 hover:shadow-xl transition dark:bg-gray-800 dark:text-gray-800"
          >
            <img
              src={job.coverImage}
              alt={job.title}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-bold mb-2">{job.title}</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-2">
              <strong>Category:</strong> {job.category}
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-2 line-clamp-2">{job.summary}</p>
            <p className="text-sm text-gray-700 dark:text-gray-400">
              Posted by: {job.postedBy || job.userEmail}
            </p>
            <p className="text-xs text-black dark:text-gray-300">
              🕒 Posted on: {formatDate(job.createdAt)}
            </p>
            <Link
              to={`/job/${job._id}`}
              className="btn btn-sm btn-primary mt-3 animate-gradient"
            >
              View Job
            </Link>
          </div>
        ))
      )}
    </div>
  </section>

  <section className="bg-gradient-to-r from-[#164a3b] to-[#1b647d] py-16 overflow-hidden relative dark:bg-gray-900">
    <div className="container mx-auto px-6">
      <h2 className="text-3xl font-bold mb-6 text-white text-center dark:text-gray-200">Top Categories</h2>
      <div
        ref={topCategoriesRef}
        className="flex gap-6 w-max"
        style={{ display: "flex" }}
      >
        {topCategories.map((cat, idx) => (
          <div
            key={idx}
            className="card shadow-md text-center p-4 bg-[#14976b] dark:bg-gray-800 rounded-lg w-48 flex-shrink-0"
          >
            <img
              src={cat.img}
              alt={cat.name}
              className="w-full h-32 object-cover rounded-lg mb-2"
            />
            <h3 className="font-semibold text-lg dark:text-gray-200">{cat.name}</h3>
          </div>
        ))}
      </div>
    </div>
  </section>

  <section className="container mx-auto px-6 py-16 text-center">
    <h2 className="text-3xl font-bold mb-4 dark:text-gray-200">About Freelance Market</h2>
    <p className="text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
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
