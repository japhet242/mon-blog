import { FadeText } from "@/components/magicui/fade-text";
import RetroGrid from "@/components/magicui/retro-grid"
export function FadeTextDemo({text1, text2,text3,text4}:{text1:string,text2:string,text3:string,text4:string}) {
  return (
    <div className="relative flex h-full w-full max-w-[30rem] items-center justify-center overflow-hidden rounded-lg  bg-background p-2 ">
    <span className="pointer-events-none z-10 whitespace-pre-wrap bg-gradient-to-b from-[#66ff19] via-[#ff2975] to-[#834fba] bg-clip-text text-center text-7xl font-bold leading-none text-transparent">
    <div className="flex flex-col space-y-8 text-center">
      <FadeText
        className="text-4xl font-bold text-black dark:text-white"
        direction="up"
        framerProps={{
          show: { transition: { delay: 0.2 } },
        }}
        text={text1}
      />
      <FadeText
        className="text-4xl font-bold text-lime-600 dark:text-white"
        direction="right"
        framerProps={{
          show: { transition: { delay: 0.4 } },
        }}
        text={text2}
      />
      <FadeText
        className="text-4xl font-bold text-black dark:text-white"
        direction="down"
        framerProps={{
          show: { transition: { delay: 0.6 } },
        }}
        text={text3}
      />
      <FadeText
        className="text-4xl font-bold dark:text-white text-orange-600"
        direction="left"
        framerProps={{
          show: { transition: { delay: 0.8 } },
        }}
        text={text4}
      />
    </div>
    </span>

    <RetroGrid />
  </div>
    
  );
}
