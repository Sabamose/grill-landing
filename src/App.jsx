import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import WhatIsGrill from './components/sections/WhatIsGrill';
import ByRole from './components/sections/ByRole';
import MorningBriefing from './components/sections/MorningBriefing';
import ActionCardCompare from './components/sections/ActionCardCompare';
import Principles from './components/sections/Principles';
import Waitlist from './components/sections/Waitlist';

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <WhatIsGrill />
        <ByRole />
        <MorningBriefing />
        <ActionCardCompare />
        <Principles />
        <Waitlist />
      </main>
      <Footer />
    </>
  );
}
