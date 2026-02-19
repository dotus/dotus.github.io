import React from 'react';
import { Navbar } from './Navbar';
import { Hero } from './Hero';
import { Stats } from './ui/Stats';
import { TechSection } from './TechSection';
import { Services } from './Services';
import { Comparison } from './Comparison';
import { JournalistSection } from './JournalistSection';
import { Footer } from './Footer';
import { ContactModal } from './ui/ContactModal';

export const LandingPage: React.FC = () => {
    const [isContactOpen, setIsContactOpen] = React.useState(false);

    const openModal = () => setIsContactOpen(true);
    const closeModal = () => setIsContactOpen(false);

    return (
        <>
            <Navbar onOpenModal={openModal} />
            <main>
                <Hero onOpenModal={openModal} />
                <Stats />
                <Services />
                <TechSection />
                <Comparison />
                <JournalistSection />
            </main>
            <Footer onOpenModal={openModal} />

            <ContactModal isOpen={isContactOpen} onClose={closeModal} />
        </>
    );
};
