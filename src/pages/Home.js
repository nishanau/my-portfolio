import React from "react";
import Header from "../components/Header";
import Project from "../components/Project";
import Footer from "../components/Footer";

const projects = [
  {
    title: "Conway's Game of Life",
    description: `
      A React implementation of Conway's Game of Life, a cellular automaton devised by mathematician John Conway. This interactive app allows users to start, stop, and clear the simulation, as well as adjust the grid size. The game demonstrates the evolution of cell patterns based on initial states and simple rules.

      **Tasks Achieved:**
      - Implemented Conway's Game of Life using React.
      - Added functionalities to start, stop, and clear the simulation.
      - Allowed users to adjust the grid size.

      **Skills Gained:**
      - React development.
      - Understanding of cellular automata.
      - Interactive UI design.
    `,
    url: "https://nishanau.github.io/conway-s-game-of-life",
  },
  {
    title: "NextJS Full Stack Shopping App",
    description: `
      This is a full stack application built using Next.js. The app features user authentication with email, Google, and Facebook using NextAuth, and switches between dark mode and light mode based on the user's browser preferences. It includes product cards to display products and categories to filter the products.

      **Tasks Achieved:**
      - Implemented sign-up authentication using email.
      - Integrated user authentication with Google and Facebook IDs using NextAuth.
      - Added dark mode and light mode based on user's browser preferences.
      - Developed product cards to display products.
      - Implemented category filtering for products.

      **Upcoming Tasks:**
      - Implement search functionality.
      - Develop user profile management.
      - Add products to cart and process purchases.
      - Add skeletons for better UI.

      **Skills Gained:**
      - Full stack development with Next.js.
      - Authentication with NextAuth.
      - Responsive design with dark mode and light mode.
      - Frontend development with product and category display.
    `,
    url: "http://3.27.247.61:3000/",
  },
  {
    title: "Computer Networks Mapper",
    description: `
      Developed a web-based application that optimizes and visually maps computer networks based on user input. The tool calculates efficient subnet allocations and necessary IP addresses for routers and switches. It features a responsive UI, network visualization using vis-network, and export options for diagrams.

      **Tasks Achieved:**
      - Calculated efficient subnet allocations.
      - Visualized network using vis-network.
      - Implemented export options for network diagrams.

      **Skills Gained:**
      - Network design and optimization.
      - Web development with React.
      - Backend development with Node.js and Python.
      - Cloud deployment on AWS EC2.
    `,
    url: "https://nishanau.github.io/ComputerNetworksSolution/",
  },
  {
    title: "UI/UX Design for Interactive App",
    description: `
      Created UI/UX design for a critical Bushfire Info & Management App, incorporating PACT (People, Activities, Context, Technologies) analysis. From low-fidelity to high-fidelity, I tailored the interface based on user personas and scenarios, ensuring an intuitive design for efficient bushfire information dissemination and management, aligning with PACT components.

      **Tasks Achieved:**
      - Conducted PACT analysis.
      - Developed low-fidelity to high-fidelity prototypes.
      - Designed an intuitive interface for bushfire information management.

      **Skills Gained:**
      - UI/UX design.
      - User research and persona development.
      - Prototyping and wireframing.
    `,
    url: "https://app.visily.ai/projects/4873b486-50b5-466e-b503-2eff441d80e5/boards/470322",
  },
  {
    title: "Cryptocurrency Digital Wallet Web App",
    description: `
      A digital wallet for cryptocurrencies built using React and Node.js, where users can create a new wallet, restore old wallets using seed phrases or private keys. The app fetches data from APIs to show prices of cryptocurrency assets, fetch wallet details, and view past transactions from block explorers. Users can send and receive cryptocurrencies.

      **Tasks Achieved:**
      - Created and restored wallets using seed phrases or private keys.
      - Integrated APIs to show cryptocurrency prices and wallet details.
      - Implemented functionality to send and receive cryptocurrencies.

      **Skills Gained:**
      - API integration.
      - State management in React.
      - Web security practices.
    `,
    url: "http://3.25.186.18:3001/",
  },
  {
    title: "Next.js Calculator App",
    description: `
      This is a simple calculator application built using Next.js and React, styled with Tailwind CSS. The app supports basic arithmetic operations and handles input errors gracefully. The app has been configured to be statically exported and deployed to GitHub Pages, ensuring efficient and reliable access.

      **Tasks Achieved:**
      - Implemented basic arithmetic operations.
      - Handled input errors gracefully.
      - Configured static export and deployment to GitHub Pages.

      **Skills Gained:**
      - Next.js and React development.
      - Styling with Tailwind CSS.
      - Deployment to GitHub Pages.
    `,
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
