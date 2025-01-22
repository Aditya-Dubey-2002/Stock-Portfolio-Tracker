import axios from 'axios';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import { useState, useEffect } from 'react';
import CoverOne from '../images/cover/cover-01.png';
import userSix from '../images/user/user-06.png';
import { Link } from 'react-router-dom';
import Loader from '../common/Loader/index';
import config from '../config';
import { jwtDecode } from 'jwt-decode';
import OrdersTable from '../components/Tables/OrdersTable';

interface UserProfile {
  fullName: string;
  email: string;
  bio: string;
  balance: number;
  image: string;
  profit: number;
}

const Profile: React.FC = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        setError('No token found. Please log in.');
        setLoading(false);
        return;
      }

      try {
        const decodedToken: any = jwtDecode(token);
        const userId = decodedToken.userId; // Extracting userId from the token

        const response = await axios.get(`${config.SERVER_URL}/api/user/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUserProfile(response.data.userDetails);
        // console.log(response.data);
        // console.log(response) // Store the user details in state
      } catch (err: any) {
        console.error('Error fetching profile:', err);
        setError(err.response?.data?.error || 'Failed to fetch user profile');
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);
  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!userProfile) {
    return <div>No profile data found.</div>;
  }
  return (
    <>
      {/* <Breadcrumb pageName="Profile" /> */}

      <div className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="relative z-20 h-35 md:h-65">
          <img
            src={CoverOne}
            alt="profile cover"
            className="h-full w-full rounded-tl-sm rounded-tr-sm object-cover object-center"
          />
          <div className="absolute bottom-1 right-1 z-10 xsm:bottom-4 xsm:right-4">
            <label
              htmlFor="cover"
              className="flex cursor-pointer items-center justify-center gap-2 rounded bg-primary py-1 px-2 text-sm font-medium text-white hover:bg-opacity-90 xsm:px-4"
            >
              <input type="file" name="cover" id="cover" className="sr-only" />
              <span>
                <svg
                  className="fill-current"
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M4.76464 1.42638C4.87283 1.2641 5.05496 1.16663 5.25 1.16663H8.75C8.94504 1.16663 9.12717 1.2641 9.23536 1.42638L10.2289 2.91663H12.25C12.7141 2.91663 13.1592 3.101 13.4874 3.42919C13.8156 3.75738 14 4.2025 14 4.66663V11.0833C14 11.5474 13.8156 11.9925 13.4874 12.3207C13.1592 12.6489 12.7141 12.8333 12.25 12.8333H1.75C1.28587 12.8333 0.840752 12.6489 0.512563 12.3207C0.184375 11.9925 0 11.5474 0 11.0833V4.66663C0 4.2025 0.184374 3.75738 0.512563 3.42919C0.840752 3.101 1.28587 2.91663 1.75 2.91663H3.77114L4.76464 1.42638ZM5.56219 2.33329L4.5687 3.82353C4.46051 3.98582 4.27837 4.08329 4.08333 4.08329H1.75C1.59529 4.08329 1.44692 4.14475 1.33752 4.25415C1.22812 4.36354 1.16667 4.51192 1.16667 4.66663V11.0833C1.16667 11.238 1.22812 11.3864 1.33752 11.4958C1.44692 11.6052 1.59529 11.6666 1.75 11.6666H12.25C12.4047 11.6666 12.5531 11.6052 12.6625 11.4958C12.7719 11.3864 12.8333 11.238 12.8333 11.0833V4.66663C12.8333 4.51192 12.7719 4.36354 12.6625 4.25415C12.5531 4.14475 12.4047 4.08329 12.25 4.08329H9.91667C9.72163 4.08329 9.53949 3.98582 9.4313 3.82353L8.43781 2.33329H5.56219Z"
                    fill="white"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M6.99992 5.83329C6.03342 5.83329 5.24992 6.61679 5.24992 7.58329C5.24992 8.54979 6.03342 9.33329 6.99992 9.33329C7.96642 9.33329 8.74992 8.54979 8.74992 7.58329C8.74992 6.61679 7.96642 5.83329 6.99992 5.83329ZM4.08325 7.58329C4.08325 5.97246 5.38909 4.66663 6.99992 4.66663C8.61075 4.66663 9.91659 5.97246 9.91659 7.58329C9.91659 9.19412 8.61075 10.5 6.99992 10.5C5.38909 10.5 4.08325 9.19412 4.08325 7.58329Z"
                    fill="white"
                  />
                </svg>
              </span>
              {/* <span>Edit</span> */}
            </label>
          </div>
        </div>
        <div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">
          <div className="relative z-30 mx-auto -mt-22 h-30 w-full max-w-30 rounded-full bg-white/20 p-1 backdrop-blur sm:h-44 sm:max-w-44 sm:p-3">
            <div className="relative drop-shadow-2">
              <img src={userSix} alt="profile" />
              {/* <label
                htmlFor="profile"
                className="absolute bottom-0 right-0 flex h-8.5 w-8.5 cursor-pointer items-center justify-center rounded-full bg-primary text-white hover:bg-opacity-90 sm:bottom-2 sm:right-2"
              >
                <svg
                  className="fill-current"
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M4.76464 1.42638C4.87283 1.2641 5.05496 1.16663 5.25 1.16663H8.75C8.94504 1.16663 9.12717 1.2641 9.23536 1.42638L10.2289 2.91663H12.25C12.7141 2.91663 13.1592 3.101 13.4874 3.42919C13.8156 3.75738 14 4.2025 14 4.66663V11.0833C14 11.5474 13.8156 11.9925 13.4874 12.3207C13.1592 12.6489 12.7141 12.8333 12.25 12.8333H1.75C1.28587 12.8333 0.840752 12.6489 0.512563 12.3207C0.184375 11.9925 0 11.5474 0 11.0833V4.66663C0 4.2025 0.184374 3.75738 0.512563 3.42919C0.840752 3.101 1.28587 2.91663 1.75 2.91663H3.77114L4.76464 1.42638ZM5.56219 2.33329L4.5687 3.82353C4.46051 3.98582 4.27837 4.08329 4.08333 4.08329H1.75C1.59529 4.08329 1.44692 4.14475 1.33752 4.25415C1.22812 4.36354 1.16667 4.51192 1.16667 4.66663V11.0833C1.16667 11.238 1.22812 11.3864 1.33752 11.4958C1.44692 11.6052 1.59529 11.6666 1.75 11.6666H12.25C12.4047 11.6666 12.5531 11.6052 12.6625 11.4958C12.7719 11.3864 12.8333 11.238 12.8333 11.0833V4.66663C12.8333 4.51192 12.7719 4.36354 12.6625 4.25415C12.5531 4.14475 12.4047 4.08329 12.25 4.08329H9.91667C9.72163 4.08329 9.53949 3.98582 9.4313 3.82353L8.43781 2.33329H5.56219Z"
                    fill=""
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M7.00004 5.83329C6.03354 5.83329 5.25004 6.61679 5.25004 7.58329C5.25004 8.54979 6.03354 9.33329 7.00004 9.33329C7.96654 9.33329 8.75004 8.54979 8.75004 7.58329C8.75004 6.61679 7.96654 5.83329 7.00004 5.83329ZM4.08337 7.58329C4.08337 5.97246 5.38921 4.66663 7.00004 4.66663C8.61087 4.66663 9.91671 5.97246 9.91671 7.58329C9.91671 9.19412 8.61087 10.5 7.00004 10.5C5.38921 10.5 4.08337 9.19412 4.08337 7.58329Z"
                    fill=""
                  />
                </svg>
                <input
                  type="file"
                  name="profile"
                  id="profile"
                  className="sr-only"
                />
              </label> */}
            </div>
          </div>
          <div className="mt-4">
            <h3 className="mb-1.5 text-2xl font-semibold text-black dark:text-white">
              {userProfile.fullName}
            </h3>
            <p className="font-medium">{userProfile.email}</p>
            <div className="mx-auto mt-4.5 mb-5.5 grid max-w-94 grid-cols-1 rounded-md border border-stroke py-2.5 shadow-1 dark:border-strokedark dark:bg-[#37404F]">
              <div className="flex flex-col items-center justify-center gap-1 border-r border-stroke px-4 dark:border-strokedark xsm:flex-row">
                <span className="text-sm">Current Balance</span>
                <span className="font-semibold text-black dark:text-white">
                  ${userProfile.balance}
                </span>

              </div>
              <div className="flex flex-col items-center justify-center gap-1 border-r border-stroke px-4 dark:border-strokedark xsm:flex-row">
                <span className="text-sm">Realized Profit</span>
                <span
                  className={`font-semibold ${userProfile.profit < 0 ? 'text-red-500' : 'text-green-500'
                    }`}
                >
                  ${userProfile.profit}
                </span>
              </div>

            </div>

            <OrdersTable />

            <div className="mt-6.5">
              <h4 className="mb-3.5 font-medium text-black dark:text-white">
                Created by <br />Aditya Dubey
              </h4>
              <div className="flex items-center justify-center gap-3.5">
                <Link
                  to="https://www.instagram.com/_aditya.dubey/"
                  className="hover:text-primary"
                  aria-label="Instagram"
                >
                  <svg
                    className="fill-current"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.75 2H16.25C19.0972 2 21.5 4.40279 21.5 7.25V16.75C21.5 19.5972 19.0972 22 16.25 22H7.75C4.90279 22 2.5 19.5972 2.5 16.75V7.25C2.5 4.40279 4.90279 2 7.75 2ZM7.75 3.5C5.67893 3.5 4 5.17893 4 7.25V16.75C4 18.8211 5.67893 20.5 7.75 20.5H16.25C18.3211 20.5 20 18.8211 20 16.75V7.25C20 5.17893 18.3211 3.5 16.25 3.5H7.75ZM12 7.25C14.8995 7.25 17.25 9.60054 17.25 12.5C17.25 15.3995 14.8995 17.75 12 17.75C9.10054 17.75 6.75 15.3995 6.75 12.5C6.75 9.60054 9.10054 7.25 12 7.25ZM12 8.75C9.92893 8.75 8.25 10.4289 8.25 12.5C8.25 14.5711 9.92893 16.25 12 16.25C14.0711 16.25 15.75 14.5711 15.75 12.5C15.75 10.4289 14.0711 8.75 12 8.75ZM17.1562 6.125C16.7253 6.125 16.375 6.47533 16.375 6.90625C16.375 7.33717 16.7253 7.6875 17.1562 7.6875C17.5872 7.6875 17.9375 7.33717 17.9375 6.90625C17.9375 6.47533 17.5872 6.125 17.1562 6.125Z"
                      fill="currentColor"
                    />
                  </svg>
                </Link>

                <Link
                  to="http://linkedin.com/in/aditya-dubey-7263b7200/"
                  className="hover:text-primary"
                  aria-label="social-icon"
                >
                  <svg
                    className="fill-current"
                    width="23"
                    height="22"
                    viewBox="0 0 23 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_30_974)">
                      <path
                        d="M6.69548 4.58327C6.69523 5.0695 6.50185 5.53572 6.15786 5.87937C5.81387 6.22301 5.34746 6.41593 4.86123 6.41569C4.375 6.41545 3.90878 6.22206 3.56513 5.87807C3.22149 5.53408 3.02857 5.06767 3.02881 4.58144C3.02905 4.09521 3.22244 3.62899 3.56643 3.28535C3.91042 2.9417 4.37683 2.74878 4.86306 2.74902C5.34929 2.74927 5.81551 2.94265 6.15915 3.28664C6.5028 3.63063 6.69572 4.09704 6.69548 4.58327ZM6.75048 7.77327H3.08381V19.2499H6.75048V7.77327ZM12.5438 7.77327H8.89548V19.2499H12.5071V13.2274C12.5071 9.87244 16.8796 9.56077 16.8796 13.2274V19.2499H20.5005V11.9808C20.5005 6.32494 14.0288 6.53577 12.5071 9.31327L12.5438 7.77327Z"
                        fill=""
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_30_974">
                        <rect
                          width="22"
                          height="22"
                          fill="white"
                          transform="translate(0.333862)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                </Link>
                <Link
                  to="https://github.com/Aditya-Dubey-2002"
                  className="hover:text-primary"
                  aria-label="social-icon"
                >
                  <svg
                    className="fill-current"
                    width="23"
                    height="22"
                    viewBox="0 0 23 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_30_982)">
                      <path
                        d="M11.6662 1.83337C6.6016 1.83337 2.49951 5.93546 2.49951 11C2.49847 12.9244 3.10343 14.8002 4.22854 16.3613C5.35366 17.9225 6.94181 19.0897 8.76768 19.6974C9.22602 19.7771 9.39743 19.5021 9.39743 19.261C9.39743 19.0438 9.38552 18.3224 9.38552 17.5542C7.08285 17.9786 6.48701 16.9932 6.30368 16.4771C6.2001 16.2131 5.75368 15.4 5.3641 15.1819C5.04326 15.0105 4.58493 14.586 5.35218 14.575C6.07451 14.5631 6.58968 15.2396 6.76201 15.5146C7.58701 16.9006 8.90518 16.511 9.43135 16.2709C9.51202 15.675 9.75218 15.2745 10.0162 15.0453C7.9766 14.8161 5.84535 14.025 5.84535 10.5188C5.84535 9.52146 6.2001 8.69737 6.78493 8.05479C6.69326 7.82562 6.37243 6.88604 6.8766 5.62562C6.8766 5.62562 7.64385 5.38546 9.39743 6.56612C10.1437 6.35901 10.9147 6.25477 11.6891 6.25629C12.4683 6.25629 13.2474 6.35896 13.9808 6.56521C15.7334 5.37354 16.5016 5.62654 16.5016 5.62654C17.0058 6.88696 16.6849 7.82654 16.5933 8.05571C17.1772 8.69737 17.5329 9.51046 17.5329 10.5188C17.5329 14.037 15.3906 14.8161 13.351 15.0453C13.6829 15.3313 13.9698 15.8813 13.9698 16.7411C13.9698 17.9667 13.9579 18.9521 13.9579 19.262C13.9579 19.5021 14.1302 19.7881 14.5885 19.6965C16.4081 19.0821 17.9893 17.9126 19.1094 16.3526C20.2296 14.7926 20.8323 12.9206 20.8329 11C20.8329 5.93546 16.7308 1.83337 11.6662 1.83337Z"
                        fill=""
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_30_982">
                        <rect
                          width="22"
                          height="22"
                          fill="white"
                          transform="translate(0.666138)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
