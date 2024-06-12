import React from "react";
import Header from "../components/Header";
import Project from "../components/Project";
import Footer from "../components/Footer";

const projects = [
  {
    title: "Conway's Game of Life",
    description:
      "A React implementation of Conway's Game of Life, a cellular automaton devised by mathematician John Conway. This interactive app allows users to start, stop, and clear the simulation, as well as adjust the grid size. The game demonstrates the evolution of cell patterns based on initial states and simple rules.",
    url: "https://nishanau.github.io/conway-s-game-of-life", 
  },
  {
    title: "Computer Networks Mapper",
    description:
      "Developed a web-based application that optimizes and visually maps computer networks based on user input. The tool calculates efficient subnet allocations and necessary IP addresses for routers and switches. It features a responsive UI, network visualization using vis-network, and export options for diagrams. The frontend is built with React and hosted on GitHub Pages, while the backend runs on Node.js and Python on an AWS EC2 instance. This project showcases skills in network design, web development, and cloud deployment.",
    url: "https://nishanau.github.io/ComputerNetworksSolution/", 
  },
  {
    title: "UI/UX Design for Interactive App",
    description:
      "Created UI/UX design for a critical Bushfire Info & Management App, incorporating PACT (People, Activities, Context, Technologies) analysis. From low-fidelity to high-fidelity, I tailored the interface based on user personas and scenarios, ensuring an intuitive design for efficient bushfire information dissemination and management, aligning with PACT components.",
    url: "https://app.visily.ai/projects/4873b486-50b5-466e-b503-2eff441d80e5/boards/470322", 
  },

  {
    title: "Cryptocurrency Digital Wallet Web App",
    description:
      "A digital wallet for cryptocurrencies built using React and Node JS, where users can create a new wallet, restore old wallets using seed phrases or private keys. The app also fetches data from APIs to show prices of cryptocurrency assets, to fetch wallet details and its past transactions from block explorers. Users can send and receive cryptocurrencies.",
    url: "http://3.25.186.18:3001/", 
  },
  {
    title: "Next.js Calculator App",
    description:
      "This is a simple calculator application built using Next.js and React, styled with Tailwind CSS. The app supports basic arithmetic operations and handles input errors gracefully. The app has been configured to be statically exported and deployed to GitHub Pages, ensuring efficient and reliable access.",
    url: "https://nishanau.github.io/nextjs-calculator/", 
  },

  
];

const Home = () => {
  return (
    <div>
      <Header />
      <main>
        <section id="projects">
          <h2>My Projects</h2>
          {projects.map((project, index) => (
            <Project
              key={index}
              title={project.title}
              description={project.description}
              url={project.url}
            />
          ))}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
