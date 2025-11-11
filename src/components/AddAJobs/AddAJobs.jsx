import { useState } from "react";
import { useAuth } from "../../context/AuthProvider";

const JobPostForm = () => {
  const { user } = useAuth(); // logged-in user
  console.log(user);
  const [loading, setLoading] = useState(false);


  const handleJobPost = async (e) => {
    e.preventDefault();
    setLoading(true);

    
  const form = e.target;
  const jobData = {
    title: form.title.value,
    postedBy: user?.displayName,
    category: form.category.value,
    summary: form.summary.value,
    coverImage: form.coverImage.value,
    userEmail: user?.email,
    postedAt: new Date(), // backend can override if needed
  };

 try {
      setLoading(true);
      const res = await fetch("http://localhost:3000/job", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jobData),
      });

      if (!res.ok) {
        throw new Error("Failed to post job");
      }

      alert("Job posted successfully!");
      // setFormData({ title: "", category: "", summary: "", coverImage: "" });
    } catch (err) {
      console.error(err);
      alert(err.message);
    } finally {
      setLoading(false);
    }
  
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-base-200 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4">Post a New Job</h2>

      <form onSubmit={handleJobPost} className="space-y-4">
        {/* Title */}
        <div>
          <label className="font-semibold">Job Title</label>
          <input
            type="text"
            name="title"
            placeholder="Enter job title"
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Posted By (Auto-filled) */}
        <div>
          <label className="font-semibold">User Name</label>
          <input
            type="name"
            value={user?.displayName || ""}
            className="input input-bordered w-full bg-gray-100"
            readOnly
          />
        </div>
        {/* <div>
          <label className="font-semibold">Posted By</label>
          <input 
            type="text"
            value={user?.displayName || ""}
            className="input input-bordered w-full bg-gray-100"
            readOnly
          />
        </div> */}

        {/* Category Dropdown */}
        <div>
          <label className="font-semibold">Category</label>
          <select
            name="category"
            className="select select-bordered w-full"
            required
          >
            <option value="">Select Category</option>
            <option>Web Development</option>
            <option>Graphics Design</option>
            <option>Digital Marketing</option>
            <option>SEO</option>
            <option>Video Editing</option>
          </select>
        </div>

        {/* Summary */}
        <div>
          <label className="font-semibold">Summary</label>
          <textarea
            name="summary"
            className="textarea textarea-bordered w-full"
            placeholder="Enter job summary"
            required
          ></textarea>
        </div>

        {/* Cover Image URL */}
        <div>
          <label className="font-semibold">Cover Image URL</label>
          <input
            type="text"
            name="coverImage"
            placeholder="Paste image URL"
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* User Email (Auto-filled) */}
        <div>
          <label className="font-semibold">User Email</label>
          <input
            type="email"
            value={user?.email || ""}
            className="input input-bordered w-full bg-gray-100"
            readOnly
          />
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={loading}
          >
            {loading ? "Posting..." : "Post Job"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default JobPostForm;
