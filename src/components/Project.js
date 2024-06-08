import React from 'react';

const Project = ({ title, description }) => {
  return (
    <article>
      <h3>{title}</h3>
      <p>{description}</p>
    </article>
  );
};

export default Project;
