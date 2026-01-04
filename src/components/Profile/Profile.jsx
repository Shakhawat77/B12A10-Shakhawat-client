import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthProvider";

const Profile = () => {
  const { user, loading } = useAuth();
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    if (!loading) setPageLoading(false);
  }, [loading]);

  if (pageLoading) {
    return (
      <section className="min-h-screen bg-gradient-to-r from-[#FF6B6B] via-[#FFD93D] to-[#6BCB77] py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="rounded-2xl shadow-lg p-6 animate-pulse bg-white/30">
            <div className="mb-6 border-b pb-4">
              <div className="h-6 w-40 bg-gray-300 rounded mb-2"></div>
              <div className="h-4 w-64 bg-gray-300 rounded"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center gap-4">
                <div className="w-32 h-32 rounded-full bg-gray-300"></div>
                <div className="h-3 w-40 bg-gray-300 rounded"></div>
              </div>
              <div className="md:col-span-2 space-y-6">
                {[1, 2, 3, 4].map((item) => (
                  <div key={item}>
                    <div className="h-4 w-32 bg-gray-300 rounded mb-2"></div>
                    <div className="h-10 w-full bg-gray-300 rounded"></div>
                  </div>
                ))}
                <div className="h-10 w-40 bg-gray-300 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!user) return null;

  return (
    <section className="min-h-screen bg-gradient-to-r from-[#FF6B6B] via-[#FFD93D] to-[#6BCB77] py-16">
      <div className="max-w-4xl mx-auto px-4">
        <div className="rounded-2xl shadow-lg p-6 bg-white/50 backdrop-blur-md">
          <div className="mb-6 border-b pb-4">
            <h1 className="text-2xl font-bold text-gray-800">My Profile</h1>
            <p className="text-gray-600">Manage your account information</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center gap-4">
              <div className="avatar">
                <div className="w-32 rounded-full ring ring-white/50 ring-offset-4">
                  {user.photoURL ? (
                    <img src={user.photoURL} alt="User Avatar" />
                  ) : (
                    <div className="bg-white text-gray-800 flex items-center justify-center text-4xl h-full">
                      {user.email?.[0]?.toUpperCase()}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="md:col-span-2 space-y-6">
              <div>
                <label className="label font-semibold">Full Name</label>
                <input
                  type="text"
                  className="input input-bordered w-full bg-white/30 text-gray-800"
                  value={user.displayName || "Not provided"}
                  readOnly
                />
              </div>

              <div>
                <label className="label font-semibold">Email Address</label>
                <input
                  type="email"
                  className="input input-bordered w-full bg-white/30 text-gray-800"
                  value={user.email}
                  readOnly
                />
              </div>

              <div>
                <label className="label font-semibold">Account Created</label>
                <input
                  type="text"
                  className="input input-bordered w-full bg-white/30 text-gray-800"
                  value={new Date(user.metadata.creationTime).toLocaleDateString()}
                  readOnly
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
