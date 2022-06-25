import IconMactiv from "../../../assets/logo_mactiv_2.png";
import GambarHome from "../../../assets/gambar_home_4.png";
import GambarFitur from "../../../assets/gambar_fitur_1.png";
import Check from "../../../assets/Check.gif";
import Whatsapp from "../../../assets/sosmed/whatsappp.png";
import Instagram from "../../../assets/sosmed/Instagramm.png";
import Gmail from "../../../assets/sosmed/gmaill.png";
import PricingPlan from "./_partials/PricingPlan";
import Testimoni from "./_partials/Testimoni";
import DeskripsiJudul from "./_partials/DeskripsiJudul";
import SubsribeNow from "./_partials/SubsribeNow";
import GambarAboutUs from "../../../assets/logo_mactiv.png";

function Landing() {
  const menu = ["Home", "Features", "Pricing", "Testimonials", "About Us"];

  const fitur = [
    "Perlindungan data yang aman.",
    "Performa Siswa - Mactiv.",
    "Credit Score - Mactiv.",
    "Rata-rata Siswa- Mactiv.",
    "Catatan Minat Siswa.",
  ];
  //
  const pricing = [
    {
      title: "Free Plan",
      features: [
        "1 Sesi Pendampingan/bulan",
        "Timespan Monthly",
        "Konsultasi 1x /bulan",
        "CS Support 24 Hours",
        "Pendampingan Konsultan",
      ],
      price: "Free",
    },
    {
      title: "Standard Plan",
      features: [
        "4 Sesi Pendampingan/bulan",
        "Timespan Monthly",
        "Konsultasi 4x /bulan",
        "CS Support 24 Hours",
        "Pendampingan Konsultan",
      ],
      price: "Rp 3.899.000",
    },
    {
      title: "Premium Plan",
      features: [
        "Improvement",
        "8 sesi pendampingan / bulan",
        "Timespan Monthly",
        "Konsultasi 4x /bulan",
        "CS Support 24 Hours",
        "Pendampingan Konsultan",
      ],
      price: "Rp 5.499.000",
    },
  ];

  return (
    <div className="bg-white">
      <header className="container max-w-5xl mx-auto flex flex-row pt-12 items-center space-x-36">
        <img alt="icon-mactiv" src={IconMactiv} className="w-36" />
        <div className="flex-1">
          <ul className="flex flex-row space-x-6">
            {menu.map((val, index) => (
              <li key={index}>{val}</li>
            ))}
          </ul>
        </div>
        <div className="space-x-6 flex flex-row items-center ">
          <button className="font-bold">Sign In</button>
          <button className="border text-white bg-[#3D8AC1] border-[#103379] rounded-full py-2 px-6">
            Sign Up
          </button>
        </div>
      </header>
      <main>
        <div className="container max-w-5xl mx-auto grid grid-cols-2 py-24 items-center">
          <div>
            <h1 className="font-bold text-4xl pb-5">
              Memantau performa siswa lebih mudah
              <br />
              dengan MACTIV.
            </h1>
            <div className="font-normal text-xs pb-12">
              Menyediakan sistem pemantau performa siswa anda dengan efisien dan
              efektif menggunakan MACTIV temukan fitur menarik dari kami.
            </div>
            <button className="py-4 px-16 bg-[#3D8AC1] rounded-md text-white drop-shadow-3xl">
              Get Started
            </button>
          </div>
          <div>
            <img src={GambarHome} alt="ilustration-mactiv" />
          </div>
        </div>
        <div className="bg-[#CDF0EA] ">
          <div className="container max-w-5xl mx-auto grid grid-cols-2 py-20  items-center ">
            <img src={GambarFitur} alt={"features-lasles-vpn"} />
            <div className="px-16 space-y-4 ">
              <div className="font-medium text-3xl">
                Kami Menyediakan Fitur yang Dapat Anda Gunakan
              </div>
              <div className="text-sm font-normal">
                Anda dapat menggunakan fitur-fitur yang kami sediakan dengan
                menyenangkan dan mudah dalam memantau performa siswa anda .
              </div>
              {fitur.map((val, index) => {
                return (
                  <div className="flex items-center space-x-3" key={index}>
                    <img
                      src={Check}
                      alt="fitur-check-mactiv"
                      className="w-8 h-8"
                    />
                    <div className="text-xs">{val}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="bg-gray-50 py-20">
          <DeskripsiJudul
            title={"Pilih Paket Anda"}
            desc={`Mari pilih paket yang terbaik untuk Anda dan jelajahi
            dengan senang hati dan
            dengan riang.`}
          />

          <div className=" container max-w-5xl mx-auto grid grid-cols-3 space-x-6">
            {pricing.map((val, index) => {
              return (
                <PricingPlan
                  key={index}
                  {...val}
                  isSelect={index + 1 === pricing.length}
                />
              );
            })}
          </div>

          <Testimoni />
        </div>
        <div className="bg-[#defff7]">
          <div className="container max-w-5xl mx-auto grid grid-cols-2 py-20 items-center">
            <div>
              <h1 className="font-bold text-4xl pb-5">About Us</h1>
              <div className="font-medium text-justify text-md pb-12">
                MACTIV atau Measured Activities merupakan sebuah platform
                pemantau aktivitas dan performa yang melibatkan guru dan siswa
                untuk membuat dan memantau nilai, credit score, softskill,
                rata-rata nilah, hingga pengumpulan tugas secara efektif dan
                efisien. <br />
                MACTIV dapat membuat siswa bisa memantau rata-rata nilai sebelum
                penerimaan rapor, sehingga siswa dapat memperbaiki nilai agar
                rata-rata nilai naik dan membantu siswa menentukan jurusan yang
                sesuai dengan nilai dan minat bakat mereka berdasarkan soft
                skill dan catatan minat yang diberikan oleh guru.
                <br /> MACTIV juga membantu guru dalam memantau performa siswa,
                memantau tugas siswa, serta membantu dalam perhitungan nilai
                dengan cepat, akurat, dan tepat.
              </div>
            </div>
            <div>
              <img src={GambarAboutUs} alt="ilustration-mactiv" />
            </div>
          </div>
        </div>
        <div className="bg-gray-100">
          <SubsribeNow />
        </div>
      </main>
      <footer className="bg-[#CDF0EA] py-20">
        <div className="container mx-auto max-w-5xl flex flex-row  space-x-24">
          <div className="flex-1 space-y-5">
            <img src={IconMactiv} alt="logo lasles vpn" className="w-36" />
            <div>
              MACTIV merupakan sistem pemantau performa siswa <br />
              dengan perhitungan yang akurat dan <br />
              keamanan yang tinggi.
            </div>

            <div>©2022mactiv</div>
          </div>
          <div className="">
            <div className="text-lg  text-black font-semibold mb-6">
              Mactiv Menu
            </div>
            <ul className="space-y-6 text-sm text-gray-500">
              <li>Pricing</li>
              <li>Features</li>
              <li>About Us</li>
            </ul>
          </div>
          <div>
            <div className="text-lg text-black font-semibold mb-6">
              Location
            </div>
            <ul className="space-y-6  text-sm text-gray-500">
              <li>Jl. Bangau Ujung No 63, Pekanbaru, Riau </li>
              <li className="text-lg text-black font-semibold mb-6">
                Contact Us
              </li>
              <li>+62 812 7576 2056 - Whatsapp Only</li>
              <li>+62 812 9133 5215 - Whatsapp Only</li>
              <li>Gmail: frisca.veronica08@gmail.com</li>
            </ul>
          </div>
          <div className="flex flex-row space-x-5">
            <img src={Whatsapp} alt="facebook icon" className="w-14 h-14" />
            <img src={Gmail} alt="Gmail icon" className="w-14 h-14" />
            <img src={Instagram} alt="IG icon" className="w-14 h-14" />
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Landing;
