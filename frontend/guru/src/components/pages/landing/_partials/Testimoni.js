import React, { useRef, useState } from "react";
import Slider from "react-slick";
import DeskripsiJudul from "./DeskripsiJudul";
import CardReview from "./CardReview";
import IconArrowLeft from "../../../../assets/arrow-left.png";
import IconArrowRight from "../../../../assets/arrow-right.png";

const reviews = [
  {
    name: "Farhan",
    address: "Jakarta, Indonesia",
    comment:
      "“Wow... I am very happy to use this VPN, it turned out to be more than my expectations and so far there have been no problems. LaslesVPN always the best”.",
  },
  {
    name: "Frisca",
    address: "Pekanbaru, Indonesia",
    comment:
      "“This is very unusual for my business that currently requires a virtual private network that has high security.”.",
  },
  {
    name: "Saiful",
    address: "Malang, Indonesia",
    comment:
      "““I like it because I like to travel far and still can connect with high speed.”.",
  },
  {
    name: "Hesi",
    address: "Jakarta, Indonesia",
    comment:
      "““I like it because I like to travel far and still can connect with high speed.”.",
  },
  {
    name: "Fadhil",
    address: "Jakarta, Indonesia",
    comment:
      "““I like it because I like to travel far and still can connect with high speed.”.",
  },
];

export default function Testimoni() {
  const [indexSlick, setIndexSlick] = useState(0);

  const settings = {
    dots: false,
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: true,
    afterChange: (index) => setIndexSlick(index),
  };

  const slickRef = useRef();

  function fnNext() {
    slickRef?.current?.slickNext();
  }

  function fnPrev() {
    slickRef?.current?.slickPrev();
  }

  return (
    <div className="py-20">
      <DeskripsiJudul
        title={"Dibawah ini merupakan testimoni dari pelanggan Mactiv"}
        desc=" Ini adalah kisah para pelanggan kami yang telah bergabung dengan kami."
      />

      <div>
        <Slider {...settings} arrows={false} ref={slickRef}>
          {reviews.map((val, index) => (
            <div className={index === 0 ? "ml-28" : ""}>
              <CardReview {...val} key={index} isSelect={index === 0} />
            </div>
          ))}
        </Slider>
      </div>
      <div className="container mx-auto max-w-5xl flex flex-row justify-between items-center mt-12 ">
        <div className="flex space-x-2">
          {reviews.map((_, index) => (
            <div
              className={`${
                indexSlick === index
                  ? "w-8 bg-[#003293] transition-all duration-200 ease-in-out"
                  : "w-4 bg-gray-300 transition-all duration-200 ease-in-out"
              } h-4 rounded-full`}
            />
          ))}
        </div>
        <div className="flex flex-row space-x-5">
          <div
            className="flex self-center border border-[#003293] rounded-full p-5 cursor-pointer"
            onClick={() => fnPrev()}
          >
            <img src={IconArrowLeft} alt="arrow-left" className="w-5 h-5" />
          </div>
          <div
            className="flex self-center bg-[#003293] rounded-full p-5 cursor-pointer"
            onClick={() => fnNext()}
          >
            <img src={IconArrowRight} alt="arrow-right" className="w-5 h-5" />
          </div>
        </div>
      </div>
    </div>
  );
}
