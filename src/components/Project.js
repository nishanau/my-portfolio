import React from 'react';

const Project = ({ title, description, url }) => {
  return (
    <article>
      <h3><a href={url} target="_blank" rel="noopener noreferrer">{title}</a></h3>
      <p>{description}</p>
    </article>
  );
};

export default Project;
