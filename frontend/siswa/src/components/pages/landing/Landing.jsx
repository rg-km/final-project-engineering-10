// import IconMactiv from "../../../assets/logo_mactiv_2.png";
import GambarHome from "../../../assets/gambar_home_4.png";
import GambarFitur from "../../../assets/gambar_fitur_1.png";
import Check from "../../../assets/Check.gif";
// import Whatsapp from "../../../assets/sosmed/whatsappp.png";
// import Instagram from "../../../assets/sosmed/Instagramm.png";
// import Gmail from "../../../assets/sosmed/gmaill.png";
import PricingPlan from "./_partials/PricingPlan";
import Testimoni from "./_partials/Testimoni";
import DeskripsiJudul from "./_partials/DeskripsiJudul";
import SubsribeNow from "./_partials/SubsribeNow";
import Farhan from "../../../assets/team/Farhan.png";
import Frisca from "../../../assets/team/Frisca.png";
import Saifulloh from "../../../assets/team/Saifulloh.png";
import Hesi from "../../../assets/team/Hesi.png";
import Fadhil from "../../../assets/team/Fadhil.png";
import Yusuf from "../../../assets/team/Yusuf.png";
import Aboutus from "./_partials/Aboutus";
import { Link } from "react-router-dom";

function Landing() {
  //const menu = ["Home", "Features", "Pricing", "Testimonials", "About Us"];

  const fitur = [
    "Perlindungan data yang aman.",
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
      <main>
        <div
          className="container max-w-5xl mx-auto grid grid-cols-2 py-24 items-center"
          id="home"
        >
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
            <Link
              to={"/register"}
              className="py-4 px-16 bg-[#3D8AC1] rounded-md text-white drop-shadow-3xl"
            >
              Get Started
            </Link>
          </div>
          <div>
            <img src={GambarHome} alt="ilustration-mactiv" />
          </div>
        </div>
        <div className="bg-[#CDF0EA]" id="fitur">
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
        <div className="bg-gray-50 py-20" id="harga">
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
          <div id="testimoni">
            <Testimoni />
          </div>
        </div>
        <div className="bg-[#defff7]" id="about-us">
          <Aboutus />
        </div>
        <div className="py-10 bg-gray-50">
          <h1 className="font-bold text-4xl text-center pb-2">Our Team</h1>
          <div className="flex flex-row justify-center space-x-1">
            <div className="font-normal text-sm text-center text-md pb-12">
              <img src={Farhan} alt="farhan" className="w-21 h-21" />
              Farhan Dewanta Syahputra <br />
              Frontend Developer
            </div>
            <div className="flex flex-row justify-center space-x-1">
              <div className="font-normal text-sm text-center text-md pb-12">
                <img src={Frisca} alt="frisca" className="w-21 h-21" />
                Frisca Martha Veronica <br />
                Frontend Developer
              </div>
              <div className="flex flex-row justify-center space-x-1">
                <div className="font-normal text-sm text-center text-md pb-12">
                  <img src={Saifulloh} alt="saifulloh" className="w-21 h-21" />
                  Saifulloh Achmad Fajr <br />
                  Backend Developer
                </div>
                <div className="flex flex-row justify-center space-x-1">
                  <div className="font-normal text-sm text-center text-md pb-12">
                    <img src={Hesi} alt="hesi" className="w-21 h-21" />
                    Hesi Taka Maulana <br />
                    Backend Developer
                  </div>
                </div>
                <div className="flex flex-row justify-center space-x-1">
                  <div className="font-normal text-sm text-center text-md pb-12">
                    <img src={Fadhil} alt="fadhil" className="w-21 h-21" />
                    Fadhil Rausyanfikr <br />
                    Backend Developer
                  </div>
                  <div className="flex flex-row justify-center space-x-1">
                    <div className="font-normal text-sm text-center text-md pb-12">
                      <img src={Yusuf} alt="yusuf" className="w-21 h-21" />
                      Yusuf Farhan Nurrahman <br />
                      Backend Developer
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-100" id="hubKami">
          <SubsribeNow />
        </div>
      </main>
    </div>
  );
}

export default Landing;
