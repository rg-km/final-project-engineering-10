import React from "react";
import IconPricing from "../../../../assets/Free.png";
import CheckPricing from "../../../../assets/check-success.png";

function PricingPlan({ title, price, features, isSelect }) {
  return (
    <div
      className={`bg-white rounded-md flex flex-col justify-between items-center  pt-16 pb-8 border ${
        isSelect ? "border-[#003293]" : "border-gray-300"
      }`}
    >
      <div className="space-y-5 flex flex-col justify-center items-center">
        <img src={IconPricing} alt="" className="w-24 h-24" />
        <h3>{title}</h3>
        <div className="space-y-2">
          {features.map((val, index) => {
            return (
              <div
                key={index}
                className="flex flex-row mr-2 items-center space-x-2 "
              >
                <img
                  src={CheckPricing}
                  alt="check-success"
                  className="w-3 h-2"
                />
                <div>
                  {val} <div />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="mt-8">
        <div className="text-center mb-3">{price}</div>
        <button
          className={`border rounded-full py-1 px-10 border-[#003293]  ${
            isSelect ? "bg-[#003293] text-white" : "bg-white text-[#003293]"
          }`}
        >
          Select
        </button>
      </div>
    </div>
  );
}

export default PricingPlan;
