import { Starfield } from "./components/Starfield";
import { Hero } from "./components/Hero";
import { Apod } from "./components/Apod";
import { Scale } from "./components/Scale";
import { Quote } from "./components/Quote";
import { Footer } from "./components/Footer";

function App() {
  return (
    <>
      <Starfield />
      <main className="relative">
        <Hero />
        <Apod />
        <Quote />
        <Scale />
        <Footer />
      </main>
    </>
  );
}

export default App;
