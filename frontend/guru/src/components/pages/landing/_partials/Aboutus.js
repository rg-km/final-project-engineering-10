import React from "react";
import GambarAboutUs from "../../../../assets/logo_mactiv.png";

export default function Aboutus() {
  return (
    <div className="container max-w-5xl mx-auto grid grid-cols-2 py-20 items-center">
      <div>
        <h1 className="font-bold text-4xl pb-5">About Us</h1>
        <div className="font-medium text-justify text-md pb-12">
          MACTIV atau Measured Activities merupakan sebuah platform pemantau
          aktivitas dan performa yang melibatkan guru dan siswa untuk membuat
          dan memantau nilai, credit score, softskill, rata-rata nilah, hingga
          pengumpulan tugas secara efektif dan efisien. <br />
          MACTIV dapat membuat siswa bisa memantau rata-rata nilai sebelum
          penerimaan rapor, sehingga siswa dapat memperbaiki nilai agar
          rata-rata nilai naik dan membantu siswa menentukan jurusan yang sesuai
          dengan nilai dan minat bakat mereka berdasarkan soft skill dan catatan
          minat yang diberikan oleh guru.
          <br /> MACTIV juga membantu guru dalam memantau performa siswa,
          memantau tugas siswa, serta membantu dalam perhitungan nilai dengan
          cepat, akurat, dan tepat.
        </div>
      </div>
      <div>
        <img src={GambarAboutUs} alt="ilustration-mactiv" />
      </div>
    </div>
  );
}
