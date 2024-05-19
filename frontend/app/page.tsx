import Image from "next/image";
import Navbar from "./_components/Navbar";
import Hero from "./_components/Hero";
import { TypewriterEffectSmoothDemo } from "./_components/HeroText";
import LatestProducts from "./_components/LatestProducts";
import CategoriesList from "./_components/CategoriesList";
import ReviewSection from "./_components/ReviewSection";
import Footer from "./_components/Footer";

const spacing = '2xl:max-w-[1320px] xl:max-w-[1089px] lg:max-w-[867px] md:max-w-[672px]'
export default function Home() {
  return (
    <>
    <Hero/>
    <LatestProducts/>
    <CategoriesList/>
    <ReviewSection/>
    </>
  );
}
