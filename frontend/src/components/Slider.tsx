import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";

import { FreeMode, Pagination } from "swiper/modules";

import { RxArrowTopRigth } from "react-icons/rx";

const Slider = () => {
  const images = [
    {
      id: 1,
      src: "https://ripleype.imgix.net/https%3A%2F%2Fs3.amazonaws.com%2Fimagenes-sellers-mercado-ripley%2F2019%2F03%2F18121201%2FSoto304.jpg?w=750&h=555&ch=Width&auto=format&cs=strip&bg=FFFFFF&q=60&trimcolor=FFFFFF&trim=color&fit=fillmax&ixlib=js-1.1.0&s=28cc8c8e6f38735ede81a4cf0297700e",
    },
    {
      id: 2,
      src: "https://ripleype.imgix.net/https%3A%2F%2Fs3.amazonaws.com%2Fimagenes-sellers-mercado-ripley%2F2019%2F03%2F18121201%2FSoto304.jpg?w=750&h=555&ch=Width&auto=format&cs=strip&bg=FFFFFF&q=60&trimcolor=FFFFFF&trim=color&fit=fillmax&ixlib=js-1.1.0&s=28cc8c8e6f38735ede81a4cf0297700e",
    },
    {
      id: 3,
      src: "https://ripleype.imgix.net/https%3A%2F%2Fs3.amazonaws.com%2Fimagenes-sellers-mercado-ripley%2F2019%2F03%2F18121201%2FSoto304.jpg?w=750&h=555&ch=Width&auto=format&cs=strip&bg=FFFFFF&q=60&trimcolor=FFFFFF&trim=color&fit=fillmax&ixlib=js-1.1.0&s=28cc8c8e6f38735ede81a4cf0297700e",
    },
    {
      id: 4,
      src: "https://ripleype.imgix.net/https%3A%2F%2Fs3.amazonaws.com%2Fimagenes-sellers-mercado-ripley%2F2019%2F03%2F18121201%2FSoto304.jpg?w=750&h=555&ch=Width&auto=format&cs=strip&bg=FFFFFF&q=60&trimcolor=FFFFFF&trim=color&fit=fillmax&ixlib=js-1.1.0&s=28cc8c8e6f38735ede81a4cf0297700e",
    },
    {
      id: 5,
      src: "https://ripleype.imgix.net/https%3A%2F%2Fs3.amazonaws.com%2Fimagenes-sellers-mercado-ripley%2F2019%2F03%2F18121201%2FSoto304.jpg?w=750&h=555&ch=Width&auto=format&cs=strip&bg=FFFFFF&q=60&trimcolor=FFFFFF&trim=color&fit=fillmax&ixlib=js-1.1.0&s=28cc8c8e6f38735ede81a4cf0297700e",
    },
  ];

  return (
    <div className="h-[33rem] bg-slate-800">
      <Swiper
        breakpoints={{
          340: {
            slidesPerView: 1,
            spaceBetween: 15,
          },
          700: {
            slidesPerView: 1,
            spaceBetween: 15,
          },
        }}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        modules={[FreeMode, Pagination]}
        className="max-w-[95%] lg:max-w-[80%]"
      >
        {images.map((image) => (
          <SwiperSlide key={image.id}>
            <div className="w-full h-auto">
              <img src={image.src} className="block w-full h-auto" alt="" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;
