"use client";
import { TypewriterEffectSmooth } from "./Typewriter";
export function TypewriterEffectSmoothDemo() {
  const textclass = "2xl:text-[223.5px] xl:text-[180px] lg:text-[150px] md:text-[100px] uppercase font-bold text-center "
  const words = [
    {
      text: "Do ",
      className: `text-darkgrey ${textclass}`,
    },
    {
      text: "it ",
      className: `text-darkgrey ${textclass}`,
    },
    {
      text: "right",
      className: `text-blue ${textclass}`,
    },
  ];
  return (
    <div className="flex justify-center">
      <TypewriterEffectSmooth words={words}/>
    </div>
  );
}
