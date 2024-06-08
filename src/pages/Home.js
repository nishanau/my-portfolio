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
    title: 'Cryptocurrency Digital Wallet Web App',
    description: 'A digital wallet for cryptocurrencies built using React and Node JS, where users can create a new wallet, restore old wallets using seed phrases or private keys. The app also fetches data from APIs to show prices of cryptocurrency assets, to fetch wallet details and its past transactions from block explorers. Users can send and receive cryptocurrencies.',
    url: 'http://3.25.198.253:3001/' // Replace with the actual URL
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
            <Project key={index} title={project.title} description={project.description} url={project.url} />
          ))}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
