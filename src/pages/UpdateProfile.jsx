import axios from "axios";
import { useEffect, useState } from "react";

const UpdateProfile = ({ handleCloseModal, id }) => {
  const [profile, setProfile] = useState();
  const [loading, setLoading] = useState(true);
  const { token } = JSON.parse(localStorage.getItem("user"));

  const getProfile = async () => {
    const config = {
      headers: {
        authorization: `Token ${token}`,
      },
    };
    setLoading(true);
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/update_profile/`,
        config
      );

      setProfile(response.data);
      console.log(profile);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };
  useEffect(() => {
    getProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        authorization: `Token ${token}`,
      },
    };
    try {
      const response = await axios.patch(
        `http://127.0.0.1:8000/update_profile/`,
        {
          name: profile.name,
          date_of_birth: profile.date_of_birth,
          bio: profile.bio,
        },
        config
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section class="bg-gray-900">
      {/* FIXME whole page background color */}
      <div class="py-8 px-4 mx-auto max-w-2xl lg:py-16">
        <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">
          Update Profile
        </h2>
        {loading && <div>Loading</div>}
        <form action="#">
          {!loading && (
            <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
              <div class="sm:col-span-2">
                <label
                  for="name"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Type Your name"
                  required=""
                  value={profile.name}
                  onChange={(e) => {
                    setProfile({ ...profile, name: e.target.value });
                  }}
                />
              </div>
              <div class="sm:col-span-2">
                <label
                  for="dob"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Date of Birth
                </label>
                <input
                  type="date"
                  name="dob"
                  id="dob"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Date of Birth"
                  required=""
                  value={profile.date_of_birth}
                  onChange={(e) => {
                    setProfile({ ...profile, name: e.target.value });
                  }}
                />
              </div>
              <div class="sm:col-span-2">
                <label
                  for="bio"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Bio
                </label>
                <textarea
                  name="bio"
                  id="bio"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Your Bio here ..."
                  value={profile.bio}
                  onChange={(e) => {
                    setProfile({ ...profile, name: e.target.value });
                  }}
                />
              </div>
            </div>
          )}
          <div className="space-x-4">
            <button
              onClick={handleSubmit}
              type="submit"
              class="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-primary-900 hover:bg-primary-800"
            >
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default UpdateProfile;
