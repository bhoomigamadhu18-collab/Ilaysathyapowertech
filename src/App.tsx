import { SiteConfigProvider } from './context/SiteConfigContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { PowerSolutionsSection } from './components/PowerSolutionsSection';
import { ConstructionSection } from './components/ConstructionSection';
import { AboutWhySection } from './components/AboutWhySection';
import { ProjectGallerySection } from './components/ProjectGallerySection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { ContentManagerModal } from './components/ContentManagerModal';

export default function App() {
  return (
    <SiteConfigProvider>
      <div className="min-h-screen flex flex-col bg-white text-[#0B1F3A]">
        <Navbar />
        <main className="flex-1">
          <HeroSection />
          <PowerSolutionsSection />
          <ConstructionSection />
          <AboutWhySection />
          <ProjectGallerySection />
          <ContactSection />
        </main>
        <Footer />
        <FloatingWhatsApp />
        <ContentManagerModal />
      </div>
    </SiteConfigProvider>
  );
}
