import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import StatsBar from './components/sections/StatsBar';
import Problem from './components/sections/Problem';
import Solution from './components/sections/Solution';
import ToolGrid from './components/sections/ToolGrid';
import PlatformDemo from './components/sections/PlatformDemo';
import Architecture from './components/sections/Architecture';
import LiveSync from './components/sections/LiveSync';
import Integrations from './components/sections/Integrations';
import Pricing from './components/sections/Pricing';
import Competitors from './components/sections/Competitors';
import Waitlist from './components/sections/Waitlist';

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <StatsBar />
        <Problem />
        <Solution />
        <ToolGrid />
        <PlatformDemo />
        <Architecture />
        <LiveSync />
        <Integrations />
        <Pricing />
        <Competitors />
        <Waitlist />
      </main>
      <Footer />
    </>
  );
}
