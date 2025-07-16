import React from "react";
import noteContext from "../context/notes/noteContext";
import Notes from "./Notes";

const Home = () => {
  return (
    <div>
      <div className="container my-3">
      <h1>Welcome to iNotebook</h1>
      <Notes />
      </div>
    </div>
  );
};

export default Home;
