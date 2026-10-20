import Navbar from './components/layout/Navbar/Navbar';
import Footer from './components/layout/Footer/Footer';
import WhatsappFab from './components/layout/WhatsappFab/WhatsappFab';
import Hero from './sections/Hero/Hero';
import About from './sections/About/About';
import Services from './sections/Services/Services';
import Units from './sections/Units/Units';
import Testimonials from './sections/Testimonials/Testimonials';
import Destinations from './sections/Destinations/Destinations';
import Contact from './sections/Contact/Contact';

// El orden de las secciones en la página se define acá.
export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Units />
        <Testimonials />
        <Destinations />
        <Contact />
      </main>
      <Footer />
      <WhatsappFab />
    </>
  );
}
