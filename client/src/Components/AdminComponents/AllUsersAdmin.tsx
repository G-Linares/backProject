import React from "react";
import { RotatingLines } from "react-loader-spinner";
import { Usertype } from "../../utils/adminUtils";
import { useApiGet } from "../../utils/fetchProducts";
import UserCard from "./UserCard";

export default function AllUsersAdmin() {
  const { data, isLoading } = useApiGet(`${process.env.REACT_APP_ALL_USERS}`);
  return (
    <>
      <div className="px-6 py-5 font-semibold border-b border-gray-200 text-3xl text-center mb-4">
        Usuarios Activos
      </div>
      <section className="flex flex-wrap gap-6 p-5 justify-around">
        {isLoading ? (
          <div className="w-full h-[600px] flex items-center justify-center">
            <RotatingLines
              strokeColor="gray"
              strokeWidth="5"
              animationDuration="0.75"
              width="96"
              visible={true}
            />
          </div>
        ) : (
          <>
            {data.map((user: Usertype) => {
              return (
                <UserCard
                  key={user._id}
                  _id={user._id}
                  userName={user.userName}
                  isAdmin={user.isAdmin}
                  name={user.name}
                  lastName={user.lastName}
                  profilePicture={user.profilePicture}
                />
              );
            })}
          </>
        )}
      </section>
    </>
  );
}
