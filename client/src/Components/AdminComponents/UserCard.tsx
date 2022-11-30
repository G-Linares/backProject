import React, { ReactElement, useState } from "react";

interface UserCardProps {
  _id: string;
  userName: string;
  isAdmin: boolean;
  name: string;
  lastName: string;
  profilePicture: string;
}

export default function UserCard({
  _id,
  userName,
  isAdmin,
  name,
  lastName,
  profilePicture
}: UserCardProps): ReactElement {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  return (
    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-md ">
      <div className="flex justify-end px-4 pt-4">
        <button
          id="dropdownButton"
          data-dropdown-toggle="dropdown"
          className="inline-block text-gray-500 hover:bg-gray-100   rounded-lg text-sm p-1.5"
          type="button"
          onClick={() => setIsMenuOpen((prev) => !prev)}
        >
          <span className="sr-only">Open dropdown</span>
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path>
          </svg>
        </button>
        <div className="relative">
          <div
            id="dropdown"
            className={`z-50  ${
              isMenuOpen ? "absolute" : "hidden"
            } -right-16 top-10 text-base list-none bg-white divide-y divide-gray-100 rounded shadow w-44 `}
          >
            <ul className="py-1" aria-labelledby="dropdownButton">
              <li>
                <a
                  href="/"
                  className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100  "
                >
                  Delete
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center pb-10">
        <img
          className="w-24 h-24 mb-3 rounded-full shadow-lg"
          src={
            profilePicture ||
            "https://www.nicepng.com/png/detail/799-7998295_profile-placeholder-woman-720-profile-photo-placeholder-png.png"
          }
          alt="Bonnie"
        />
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
          {userName}
        </h5>
        <span className="text-sm text-gray-500 dark:text-gray-400">{name}</span>
        <span className="text-sm text-gray-500 dark:text-gray-400">{_id}</span>
        <div className="flex mt-4 space-x-3 md:mt-6">
          <a
            href="/"
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Make Admin
          </a>
          <a
            href="/"
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700"
          >
            Check Purchases
          </a>
        </div>
      </div>
    </div>
  );
}
