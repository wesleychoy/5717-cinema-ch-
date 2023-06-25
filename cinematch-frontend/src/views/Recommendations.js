import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Placeholder from "../assets/movieposters/batman.jpeg"

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
            <img src={Placeholder} alt="Batman" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={Placeholder} alt="Batman" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={Placeholder} alt="Batman" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={Placeholder} alt="Batman" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={Placeholder} alt="Batman" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={Placeholder} alt="Batman" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={Placeholder} alt="Batman" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={Placeholder} alt="Batman" />
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
            <img src={Placeholder} alt="Batman" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={Placeholder} alt="Batman" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={Placeholder} alt="Batman" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={Placeholder} alt="Batman" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={Placeholder} alt="Batman" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={Placeholder} alt="Batman" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={Placeholder} alt="Batman" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={Placeholder} alt="Batman" />
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
            <img src={Placeholder} alt="Batman" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={Placeholder} alt="Batman" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={Placeholder} alt="Batman" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={Placeholder} alt="Batman" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={Placeholder} alt="Batman" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={Placeholder} alt="Batman" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={Placeholder} alt="Batman" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={Placeholder} alt="Batman" />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}


