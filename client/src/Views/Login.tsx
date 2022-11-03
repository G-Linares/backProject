import React, { useState, ReactElement } from "react";
import { useNavigate } from "react-router-dom";

export default function Login({ setUser }: any): ReactElement {
  const [currentUser, setCurrentUser] = useState<any>("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setUser(currentUser);
    if (currentUser === "client") {
      navigate("/shop");
    } else {
      navigate("/dsh");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="user" />
        <input
          placeholder="user"
          value={currentUser}
          onChange={(e) => setCurrentUser(e.target.value)}
        />
        <button type="submit">To admin</button>
      </form>
    </div>
  );
}
