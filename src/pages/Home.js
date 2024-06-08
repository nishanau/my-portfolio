import React from 'react';
import Header from '../components/Header';
import Project from '../components/Project';
import Footer from '../components/Footer';

const projects = [
  {
    title: 'UI/UX Design for Interactive App',
    description: 'Created UI/UX design for a critical Bushfire Info & Management App, incorporating PACT (People, Activities, Context, Technologies) analysis. From low-fidelity to high-fidelity, I tailored the interface based on user personas and scenarios, ensuring an intuitive design for efficient bushfire information dissemination and management, aligning with PACT components.',
    url: 'https://app.visily.ai/projects/4873b486-50b5-466e-b503-2eff441d80e5/boards/470322' // Replace with the actual URL
  },
  {
    title: 'Web Services for Shopping Website',
    description: 'Utilized PHP for server-side scripting, RESTful APIs with Guzzle for communication, SQL for database integration, and React for interactive frontend requests. JWT ensured secure access. Error handling and debugging were vital for reliability. Developed robust, secure, and responsive web services for a shopping website.',
    url: 'https://example.com/shopping-website' // Replace with the actual URL
  },
  {
    title: 'Cryptocurrency Digital Wallet Web App',
    description: 'A digital wallet for cryptocurrencies built using React and Node JS, where users can create a new wallet, restore old wallets using seed phrases or private keys. The app also fetches data from APIs to show prices of cryptocurrency assets, to fetch wallet details and its past transactions from block explorers. Users can send and receive cryptocurrencies.',
    url: 'http://3.25.198.253:3001/' // Replace with the actual URL
  },
  {
    title: 'Research Assessment Program (Windows App)',
    description: 'Developed a Windows application utilizing C# and the .NET framework. This software caters to research administrators in universities, aiding in the meticulous tracking and assessment of researchers\' performance, particularly focusing on the number and significance of their research paper publications.',
    url: 'https://example.com/research-assessment' // Replace with the actual URL
  },
  {
    title: '2D Plotter',
    description: 'A plotting machine that draws pictures on a board automatically once an SVG picture is provided as input. Utilizes motors to create precise movements needed for drawing small details.',
    url: 'https://example.com/2d-plotter' // Replace with the actual URL
  }
];

const Home = () => {
  return (
    <div>
      <Header />
      <main>
        <section id="projects">
          <h2>My Projects</h2>
          {projects.map((project, index) => (
            <Project key={index} title={project.title} description={project.description} url={project.url} />
          ))}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
