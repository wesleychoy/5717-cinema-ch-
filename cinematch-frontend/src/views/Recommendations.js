import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Placeholder1 from "../assets/movieposters/BatmanBegins.jpeg"
import Placeholder2 from "../assets/movieposters/TheDarkKnightRises.jpeg"
import Placeholder3 from "../assets/movieposters/DarkKnight.jpeg"
import Placeholder4 from "../assets/movieposters/InfinityWar.jpeg"
import Placeholder5 from "../assets/movieposters/BabyDriver.jpeg"
import Placeholder6 from "../assets/movieposters/TheGreenMile.jpeg"
import Placeholder7 from "../assets/movieposters/TheBigShort.jpeg"
import Placeholder8 from "../assets/movieposters/Minions.jpeg"

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import 'swiper/css/navigation';
import "../styles/Slider.css";

import { Pagination, Navigation } from "swiper";

export default function Recommendations() {
  return (
    <div className = 'reccs'>
      <div className='sliders'>
        <h1>Based On What You Watched</h1>
        <Swiper
          modules={[Pagination, Navigation]}
          slidesPerView={3}
          spaceBetween={10}
          navigation
          pagination={{
            clickable: true,
          }}
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log('slide change')}
        >
          <SwiperSlide>
            <img src={Placeholder1} alt="BatmanBegins" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={Placeholder2} alt="TheDarkKnightRises" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={Placeholder3} alt="TheDarkKnight" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={Placeholder4} alt="Avengers" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={Placeholder5} alt="BabyDriver" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={Placeholder6} alt="TheGreenMile" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={Placeholder7} alt="TheBigShort" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={Placeholder8} alt="Minions" />
          </SwiperSlide>
        </Swiper>
      </div>
      <div className='sliders'>
        <h1>What Users With Similar Tastes Enjoyed</h1>
        <Swiper
          modules={[Pagination, Navigation]}
          slidesPerView={3}
          spaceBetween={10}
          navigation
          pagination={{
            clickable: true,
          }}
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log('slide change')}
        >
          <SwiperSlide>
            <img src={Placeholder7} alt="TheBigShort" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={Placeholder2} alt="TheDarkKnightRises" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={Placeholder8} alt="Minions" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={Placeholder4} alt="Avengers" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={Placeholder1} alt="BatmanBegins" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={Placeholder6} alt="TheGreenMile" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={Placeholder3} alt="TheDarkKnight" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={Placeholder5} alt="BabyDriver" />
          </SwiperSlide>
        </Swiper>
      </div>
      <div className='sliders'>
        <h1>Most Popular Movies</h1>
        <Swiper
          modules={[Pagination, Navigation]}
          slidesPerView={3}
          spaceBetween={10}
          navigation
          pagination={{
            clickable: true,
          }}
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log('slide change')}
        >
          <SwiperSlide>
            <img src={Placeholder6} alt="TheGreenMile" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={Placeholder2} alt="TheDarkKnightRises" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={Placeholder5} alt="BabyDriver" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={Placeholder4} alt="Avengers" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={Placeholder8} alt="Minions" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={Placeholder1} alt="BatmanBegins" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={Placeholder7} alt="TheBigShort" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={Placeholder3} alt="TheDarkKnight" />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}


