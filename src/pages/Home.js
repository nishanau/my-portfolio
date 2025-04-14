import React from "react";
import Header from "../components/Header";
import Project from "../components/Project";
import Footer from "../components/Footer";

const projects = [
  {
    title: "Conway's Game of Life",
    description: (
      <>
        <p>
          A React implementation of Conway's Game of Life, a cellular automaton devised by mathematician John Conway. This interactive app allows users to start, stop, and clear the simulation, as well as adjust the grid size. The game demonstrates the evolution of cell patterns based on initial states and simple rules.
        </p>
        <p><strong>Tasks Achieved:</strong></p>
        <ul>
          <li>Implemented Conway's Game of Life using React.</li>
          <li>Added functionalities to start, stop, and clear the simulation.</li>
          <li>Allowed users to adjust the grid size.</li>
        </ul>
        <p><strong>Skills Gained:</strong></p>
        <ul>
          <li>Advanced React hooks and state management.</li>
          <li>Understanding and applying cellular automata concepts.</li>
          
        </ul>
      </>
    ),
    url: "https://nishanau.github.io/conway-s-game-of-life",
  },
  {
    title: "NextJS Full Stack Shopping App",
    description: (
      <>
        <p>
          This is a full stack application built using Next.js. The app features user authentication with email, Google, and Facebook using NextAuth, and switches between dark mode and light mode based on the user's browser preferences. It includes product cards to display products and categories to filter the products.
        </p>
        <p><strong>Tasks Achieved:</strong></p>
        <ul>
          <li>Implemented sign-up authentication using email.</li>
          <li>Integrated user authentication with Google and Facebook IDs using NextAuth.</li>
          <li>Added dark mode and light mode based on user's browser preferences.</li>
          <li>Developed product cards to display products.</li>
          <li>Implemented category filtering for products.</li>
        </ul>
        <p><strong>Upcoming Tasks:</strong></p>
        <ul>
          <li>Implement search functionality.</li>
          <li>Develop user profile management.</li>
          <li>Add products to cart and process purchases.</li>
          <li>Add skeletons for better UI.</li>
        </ul>
        <p><strong>Skills Gained:</strong></p>
        <ul>
          <li>Implementing authentication with NextAuth.</li>
          <li>Integrating OAuth providers like Google and Facebook.</li>
          <li>Using React Context API for theme management (dark/light mode).</li>
          <li>Building and managing product listing and filtering systems.</li>
          <li>Creating responsive and accessible user interfaces.</li>
        </ul>
      </>
    ),
    url: "https://ecommerce.zapto.org/",
  },
  {
    title: "Computer Networks Mapper",
    description: (
      <>
        <p>
          Developed a web-based application that optimizes and visually maps computer networks based on user input. The tool calculates efficient subnet allocations and necessary IP addresses for routers and switches. It features a responsive UI, network visualization using vis-network, and export options for diagrams. The frontend is built with React and hosted on GitHub Pages, while the backend runs on Node.js and Python on an AWS EC2 instance.
        </p>
        <p><strong>Tasks Achieved:</strong></p>
        <ul>
          <li>Calculated efficient subnet allocations.</li>
          <li>Visualized network using vis-network.</li>
          <li>Implemented export options for network diagrams.</li>
        </ul>
        <p><strong>Skills Gained:</strong></p>
        <ul>
          <li>Designing and implementing network solutions.</li>
          <li>Utilizing vis-network for data visualization.</li>
          <li>Developing backend services with Node.js and Python.</li>
          <li>Deploying and managing applications on AWS EC2.</li>
        </ul>
      </>
    ),
    url: "https://nishanau.github.io/ComputerNetworksSolution/",
  },
  {
    title: "UI/UX Design for Interactive App",
    description: (
      <>
        <p>
          Created UI/UX design for a critical Bushfire Info & Management App, incorporating PACT (People, Activities, Context, Technologies) analysis. From low-fidelity to high-fidelity, I tailored the interface based on user personas and scenarios, ensuring an intuitive design for efficient bushfire information dissemination and management, aligning with PACT components.
        </p>
        <p><strong>Tasks Achieved:</strong></p>
        <ul>
          <li>Conducted PACT analysis.</li>
          <li>Developed low-fidelity to high-fidelity prototypes.</li>
          <li>Designed an intuitive interface for bushfire information management.</li>
        </ul>
        <p><strong>Skills Gained:</strong></p>
        <ul>
          <li>Conducting user research and creating personas.</li>
          <li>Applying PACT analysis in UI/UX design.</li>
          <li>Prototyping with tools like Figma or Adobe XD.</li>
          <li>Creating user-centered design solutions.</li>
        </ul>
      </>
    ),
    url: "https://app.visily.ai/projects/4873b486-50b5-466e-b503-2eff441d80e5/boards/470322",
  },
  {
    title: "Cryptocurrency Digital Wallet Web App",
    description: (
      <>
        <p>
          A digital wallet for cryptocurrencies built using React and Node.js, where users can create a new wallet, restore old wallets using seed phrases or private keys. The app fetches data from APIs to show prices of cryptocurrency assets, fetch wallet details, and view past transactions from block explorers. Users can send and receive cryptocurrencies.
        </p>
        <p><strong>Tasks Achieved:</strong></p>
        <ul>
          <li>Created and restored wallets using seed phrases or private keys.</li>
          <li>Integrated APIs to show cryptocurrency prices and wallet details.</li>
          <li>Implemented functionality to send and receive cryptocurrencies.</li>
        </ul>
        <p><strong>Skills Gained:</strong></p>
        <ul>
          <li>Working with blockchain APIs and data.</li>
          <li>Implementing secure user authentication and wallet management.</li>
          <li>Handling real-time data updates in React.</li>
          <li>Ensuring application security and data integrity.</li>
        </ul>
      </>
    ),
    url: "http://3.25.186.18:3001/",
  },
  {
    title: "Next.js Calculator App",
    description: (
      <>
        <p>
          This is a simple calculator application built using Next.js and React, styled with Tailwind CSS. The app supports basic arithmetic operations and handles input errors gracefully. The app has been configured to be statically exported and deployed to GitHub Pages, ensuring efficient and reliable access.
        </p>
        <p><strong>Tasks Achieved:</strong></p>
        <ul>
          <li>Implemented basic arithmetic operations.</li>
          <li>Handled input errors gracefully.</li>
          <li>Configured static export and deployment to GitHub Pages.</li>
        </ul>
        <p><strong>Skills Gained:</strong></p>
        <ul>
          <li>Developing with Next.js and React.</li>
          <li>Styling applications with Tailwind CSS.</li>
          <li>Deploying static sites with GitHub Pages.</li>
          <li>Managing state and handling user input in React.</li>
        </ul>
      </>
    ),
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
