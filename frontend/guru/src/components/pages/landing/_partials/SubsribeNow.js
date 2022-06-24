import React from "react";

export default function SubscribeNow() {
  return (
    <div className=" relative">
      <div className="absolute left-0 right-0 bg-gray-50 h-1/2" />
      <div className=" container mx-auto relative max-w-5xl bg-white rounded-lg px-12 py-10 flex items-center justify-between">
        <div>
          <div className="text-3xl font-medium mb-4">
            Pantau performa anda bersama MACTIV
            <br /> Dapatkan fiturnya Sekarang!
          </div>
          <div className="font-normal text-xs">
            Mari Berlangganan dengan kami.
          </div>
        </div>
        <button className="bg-[#3D8AC1] rounded-md drop-shadow-3xl text-white p-3 px-12">
          Hubungi Kami
        </button>
      </div>
    </div>
  );
}
