import React from 'react';
import './index.css';
import Navbar     from './components/Navbar';
import Hero       from './components/Hero';
import About      from './components/About';
import Skills     from './components/Skills';
import Projects   from './components/Projects';
import AppShowcase from './components/AppShowcase';
import Experience from './components/Experience';
import Contact    from './components/Contact';
import Footer     from './components/Footer';

function App() {
  return (
    <div className="App">
      {/* Fixed background orbs */}
      <div className="bg-orb bg-orb-1" aria-hidden="true" />
      <div className="bg-orb bg-orb-2" aria-hidden="true" />
      <div className="bg-orb bg-orb-3" aria-hidden="true" />

      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <AppShowcase />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
