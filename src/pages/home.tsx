import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/home/hero-section";
import { CategoriesSection } from "@/components/home/categories-section";
import { FeaturedSection } from "@/components/home/featured-section";
import { Footer } from "@/components/footer";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <CategoriesSection />
        <FeaturedSection />
      </main>
      <Footer />
    </div>
  );
}


