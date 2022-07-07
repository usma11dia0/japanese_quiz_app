import React from "react";

export const Topbar = () => {
  const Logout = () => {
    localStorage.removeItem("localJWT");
    window.location.href = "/";
  };
  return (
    <>
      <div>Topbar</div>;
      <a href="https://www.vecteezy.com/free-vector/nature">
        Nature Vectors by Vecteezy
      </a>
      ;
    </>
  );
};
