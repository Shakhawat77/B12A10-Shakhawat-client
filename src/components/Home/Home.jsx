import React, { useEffect, useState } from "react";
import { Link } from "react-router";

const JobCardSkeleton = () => (
  <div className="card bg-white dark:bg-gray-800 dark:bg-gray-800 shadow-md animate-pulse h-full rounded-2xl overflow-hidden">
    <div className="h-48 bg-gray-300 rounded-t"></div>
    <div className="p-4 space-y-3">
      <div className="h-5 bg-gray-300 rounded w-3/4"></div>
      <div className="h-4 bg-gray-300 rounded w-full"></div>
      <div className="h-8 bg-gray-300 rounded"></div>
    </div>
  </div>
);

const JobCard = ({ job }) => (
  <div className="card bg-gradient-to-r from-[#49c9a5] to-[#4db4d7] dark:from-gray-800 dark:to-gray-900 shadow-lg h-full rounded-2xl overflow-hidden group transition-transform hover:scale-105">
    <figure className="overflow-hidden">
      <img
        src={job.coverImage}
        alt={job.title}
        className="h-48 w-full object-cover group-hover:opacity-90 transition"
      />
    </figure>
    <div className="card-body flex flex-col">
      <h3 className="card-title line-clamp-1 text-white font-semibold">{job.title}</h3>
      <p className="text-sm text-white/90">Category: {job.category}</p>
      <p className="text-sm text-white/80 line-clamp-2">{job.summary}</p>
      <Link
        to={`/job/${job._id}`}
        className="btn btn-sm btn-white mt-auto w-full text-gray-800 dark:text-gray-200 hover:text-white hover:bg-gray-700 transition"
      >
        View Details
      </Link>
    </div>
  </div>
);

const HomePage = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const topCategories = [
    { name: "Web Development", img: "https://storage.googleapis.com/ureify-strapi-assets/web_developer_resume_4906271445/web_developer_resume_4906271445.jpeg" },
    { name: "Graphics Design", img: "https://kritagyata.in/wp-content/uploads/2024/01/graphic-design-1500-x-900-picture-lpuf40e9jm621ews-1500x750.jpg" },
    { name: "Digital Marketing", img: "https://s44783.pcdn.co/in/wp-content/uploads/sites/3/2023/03/How-to-Learn-Digital-Marketing-768x511.jpg.webp" },
    { name: "SEO", img: "https://pairroxz.com/blog/wp-content/uploads/2023/03/What-is-SEO-in-Web-Development_10-Best-Points-How-SEO-and-Website-Development-Interact-3.png" },
  ];

  const testimonials = [
    {
      name: "Alice Johnson",
      role: "Freelancer",
      feedback:
        "This platform helped me find high-quality clients quickly. The workflow is smooth and secure.",
      avatar: "https://i.pravatar.cc/150?img=1",
    },
    {
      name: "Michael Smith",
      role: "Client",
      feedback:
        "Hiring freelancers has never been easier. The platform is reliable and transparent.",
      avatar: "https://i.pravatar.cc/150?img=2",
    },
    {
      name: "Sara Lee",
      role: "Freelancer",
      feedback:
        "I can manage all my projects in one place. Love the instant notifications and payment security.",
      avatar: "https://i.pravatar.cc/150?img=3",
    },
  ];

  const faqList = [
    {
      question: "How do I post a job?",
      answer: "Simply register, go to the 'Post a Job' page, fill in the details, and submit. Your job will be visible to all freelancers.",
    },
    {
      question: "How do I hire a freelancer?",
      answer: "Browse available jobs, view freelancer profiles, and send offers or accept proposals directly on the platform.",
    },
    {
      question: "Is payment secure?",
      answer: "Yes! All payments are processed securely via Stripe, and funds are released only when work is approved.",
    },
    {
      question: "Can I track project progress?",
      answer: "Absolutely. Our platform provides real-time project tracking, messaging, and milestone management.",
    },
  ];

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch(
          "https://freelance-server-beige.vercel.app/allJobs?limit=8"
        );
        const data = await res.json();
        setJobs(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  return (
    <div className="space-y-20">

      <section className="min-h-[65vh] flex items-center bg-gradient-to-r from-[#FF6B6B] via-[#FFD93D] to-[#6BCB77] text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 text-center z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 animate-pulse drop-shadow-lg">
            Freelance Marketplace
          </h1>
          <p className="text-lg max-w-2xl mx-auto mb-8 drop-shadow-md">
            Connect with freelancers or clients instantly. Reliable, fast, and secure.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/allJobs" className="btn btn-lg btn-white text-gray-800 dark:text-gray-200 font-bold animate-gradient">
              Explore Jobs
            </Link>
            <Link to="/addAJobs" className="btn btn-lg btn-outline text-white border-white hover:bg-white dark:bg-gray-800 hover:text-gray-800 dark:text-gray-200 animate-gradient">
              Post a Job
            </Link>
          </div>
        </div>
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-white dark:bg-gray-800 opacity-20 rounded-full animate-pulse"></div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-12 text-gray-800 dark:text-gray-200 dark:text-white">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card bg-gradient-to-r from-[#FF6B6B] to-[#FFD93D] shadow-lg p-6 rounded-xl text-white hover:scale-105 transition">
              <h3 className="font-semibold text-lg mb-2">Post a Job</h3>
              <p className="text-sm">Describe your project and publish it in minutes. Reach thousands of freelancers instantly.</p>
            </div>
            <div className="card bg-gradient-to-r from-[#6BCB77] to-[#4D96FF] shadow-lg p-6 rounded-xl text-white hover:scale-105 transition">
              <h3 className="font-semibold text-lg mb-2">Hire Talent</h3>
              <p className="text-sm">Review proposals, chat, and hire the best freelancer for your project.</p>
            </div>
            <div className="card bg-gradient-to-r from-[#FF6B6B] to-[#4D96FF] shadow-lg p-6 rounded-xl text-white hover:scale-105 transition">
              <h3 className="font-semibold text-lg mb-2">Get Work Done</h3>
              <p className="text-sm">Collaborate, track progress, and pay securely once milestones are completed.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-[#FFECD1] via-[#D6EDFF] to-[#D4FFEA]">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-800 dark:text-gray-200">Latest Jobs</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {loading
              ? Array.from({ length: 8 }).map((_, i) => <JobCardSkeleton key={i} />)
              : jobs.map(job => <JobCard key={job._id} job={job} />)}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-10 text-gray-800 dark:text-gray-200">Top Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {topCategories.map(cat => (
              <div key={cat.name} className="card bg-gradient-to-r from-[#FF6B6B] to-[#FFD93D] shadow-lg p-6 rounded-xl text-white hover:scale-105 transition">
                <img src={cat.img} alt={cat.name} className="h-32 w-full object-cover rounded mb-2"/>
                <span className="font-semibold">{cat.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-[#FFDEE9] via-[#B5FFFC] to-[#F0FFB8]">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div><h3 className="text-3xl font-bold">5K+</h3><p>Jobs Posted</p></div>
          <div><h3 className="text-3xl font-bold">3K+</h3><p>Freelancers</p></div>
          <div><h3 className="text-3xl font-bold">2K+</h3><p>Clients</p></div>
          <div><h3 className="text-3xl font-bold">99%</h3><p>Satisfaction</p></div>
        </div>
      </section>

      <section className="py-16 bg-base-200">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-10 text-center text-gray-800 dark:text-gray-200">Testimonials</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, idx) => (
              <div key={idx} className="card bg-gradient-to-r from-[#FF6B6B] to-[#FFD93D] shadow-lg p-6 rounded-xl text-white hover:scale-105 transition">
                <div className="flex items-center gap-4 mb-4">
                  <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full"/>
                  <div>
                    <h3 className="font-semibold">{t.name}</h3>
                    <p className="text-sm">{t.role}</p>
                  </div>
                </div>
                <p className="text-sm italic">"{t.feedback}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-8 text-gray-800 dark:text-gray-200">FAQ</h2>
          {faqList.map((faq, idx) => (
            <div key={idx} className="mb-6 text-left bg-white dark:bg-gray-800 dark:bg-gray-800 shadow-md p-6 rounded-xl">
              <h3 className="font-semibold text-lg mb-2">{faq.question}</h3>
              <p className="text-gray-700 dark:text-gray-300">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 text-center bg-gradient-to-r from-[#6BCB77] via-[#FFD93D] to-[#FF6B6B] text-white">
        <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
        <Link to="/register" className="btn btn-lg btn-white text-gray-800 dark:text-gray-200 font-bold animate-gradient">
          Join Now
        </Link>
      </section>

    </div>
  );
};

export default HomePage;
