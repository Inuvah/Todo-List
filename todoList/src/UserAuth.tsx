import React, { useState } from "react";

export const UserAuth = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  function handleSubmit(e: { preventDefault: () => void }) {
    const users = { userName, password };
    fetch("http://localhost:7000/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(users),
    });
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>User Name:</label>
        <input
          type="text"
          required
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <label>Password:</label>
        <input
          type="text"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button>Register</button>
      </form>
    </div>
  );
};

export default UserAuth;
