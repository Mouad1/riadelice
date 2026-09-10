import { Hero } from "@/components/home/Hero";
import { FeaturedMenu } from "@/components/home/FeaturedMenu";
import { AboutPreview } from "@/components/home/AboutPreview";
import { ReservationCTA } from "@/components/home/ReservationCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedMenu />
      <AboutPreview />
      <ReservationCTA />
    </>
  );
}
