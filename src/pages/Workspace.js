import React from "react";
import { useParams } from "react-router-dom";

function Workspace() {
  const { baseId, tableId } = useParams();

  return (
    <div>
      <h1>
        Workspace for Base: {baseId}, Table: {tableId}
      </h1>
      <div className="workspace-pane">
        {/* Future custom components or iFrames go here */}
      </div>
    </div>
  );
}

export default Workspace;
