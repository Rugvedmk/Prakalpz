// ListBox.js
import { useState } from "react";
import ProjectList from "./ProjectList";

function ListBox({ projects }) {
  const [isOpen1, setIsOpen1] = useState(true);

  return (
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => setIsOpen1((open) => !open)}
      >
        {isOpen1 ? "-" : "+"}
      </button>
      {isOpen1 && <ProjectList projects={projects} />}
    </div>
  );
}

export default ListBox;
