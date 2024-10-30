import React from "react";

function ClassRequirements({ shownClass, classList }) {
  return (
    <div>
      <h2>{shownClass}</h2>
      {Object.keys(classList).map((attribute) => (
        <div>
          <span>{attribute}:</span>
          <span>{classList[attribute]}</span>
        </div>
      ))}
    </div>
  );
}

export default ClassRequirements;
