"use client";

import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, ExternalLink, Play } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

const videos = [
  "/videos/1.mp4",
  "/videos/2.mp4",
  "/videos/3.mp4",
  "/videos/4.mp4",
  "/videos/5.mp4",
  "/videos/6.mp4",
];

export default function VideoCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
    slidesToScroll: 1,
  });

  const [prevDisabled, setPrevDisabled] = useState(true);
  const [nextDisabled, setNextDisabled] = useState(false);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setPrevDisabled(!emblaApi.canScrollPrev());
    setNextDisabled(!emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    onSelect(); // run on mount
  }, [emblaApi, onSelect]);

  const next = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const prev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);

  return (
    <div className="relative w-full md:px-12 px-6">
      <button
        onClick={prev}
        disabled={prevDisabled}
        className={`absolute left-0 top-1/2 z-20 -translate-y-1/2 h-10 w-10 rounded-full shadow-xl 
          flex items-center justify-center transition-all duration-200 border-2 border-white bg-white/90
          ${
            prevDisabled
              ? " text-red-300 cursor-not-allowed"
              : " text-red-600 hover:bg-white cursor-pointer"
          }`}
      >
        <ChevronLeft />
      </button>

      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex ">
          {videos.map((src, index) => (
            <div
              key={index}
              className="flex-none w-full md:w-1/3 lg:w-1/5 px-2"
            >
              <div className="rounded-3xl overflow-hidden">
                <div className="demo-col">
                  <div className="glass-video-card px-2! backdrop-blur-md">
                    <div className="card-inner">
                      <div className="card-media">
                        <Image
                          src="/images/instagram.png"
                          alt="fb Icon"
                         fill
                          className="object-cover"
                        />
                        <div className="">
                       
                        <div className="pill left-2">
                          <Play className="h-3 w-3 text-white" />
                          Reels
                        </div>

                        <div className="pill right-2">12s</div>

                        </div>

                        <div
                          className="watch-bar absolute bottom-5 left-5 right-5 backdrop-blur-md rounded-xl bg-black/20 flex items-center gap-2 p-2 
                         border border-white"
                        >
                          <div className="bg-white rounded-full p-2">
                            <Play className="h-4 w-4 text-red-600" />
                          </div>
                          <div className=" text-white font-medium text-xs">
                            Watch on
                            <br />
                            Facebook
                          </div>
                        </div>
                      </div>
                      <div className=" backdrop-blur-md bg-black/0 px-6 py-3 rounded-b-3xl space-y-3">
                        <div className="h-4 w-4 flex items-center gap-1">
                            <Image
                                                               src="/images/fb-red.png"
                                                               alt="fb Icon"
                                                               width={500}
                                                               height={500}
                                                             />
                          <span className="brand-name text-red-500 text-xs font-semibold">Facebook</span>
                        </div>
                        <a
                          href="#"
                          className=" text-black text-xs font-semibold flex items-center gap-2"
                        >
                          Watch on Facebook
                          <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={next}
        disabled={nextDisabled}
        className={`absolute right-0 top-1/2 z-20 -translate-y-1/2 h-10 w-10 rounded-full shadow-xl 
          flex items-center justify-center transition-all duration-200  border border-white bg-white/90
          ${
            nextDisabled
              ? " text-red-300 cursor-not-allowed"
              : " text-red-600 hover:bg-white cursor-pointer"
          }`}
      >
        <ChevronRight />
      </button>
    </div>
  );
}
