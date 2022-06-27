import Check from '../../../assets/Check.gif';
import GambarFitur from '../../../assets/gambar_fitur_1.png';
import GambarHome from '../../../assets/gambar_home_4.png';
import GambarAboutUs from '../../../assets/logo_mactiv.png';
import Fadhil from '../../../assets/team/Fadhil.png';
import Farhan from '../../../assets/team/Farhan.png';
import Frisca from '../../../assets/team/Frisca.png';
import Hesi from '../../../assets/team/Hesi.png';
import Saifulloh from '../../../assets/team/Saifulloh.png';
import Yusuf from '../../../assets/team/Yusuf.png';
import DeskripsiJudul from './_partials/DeskripsiJudul';
import PricingPlan from './_partials/PricingPlan';
import SubsribeNow from './_partials/SubsribeNow';
import Testimoni from './_partials/Testimoni';

function Landing() {
	const fitur = [
		'Perlindungan data yang aman.',
		'Performa Siswa - Mactiv.',
		'Credit Score - Mactiv.',
		'Rata-rata Siswa- Mactiv.',
		'Catatan Minat Siswa.',
	];

	const pricing = [
		{
			title: 'Free Plan',
			features: [
				'1 Sesi Pendampingan/bulan',
				'Timespan Monthly',
				'Konsultasi 1x /bulan',
				'CS Support 24 Hours',
				'Pendampingan Konsultan',
			],
			price: 'Free',
		},
		{
			title: 'Standard Plan',
			features: [
				'4 Sesi Pendampingan/bulan',
				'Timespan Monthly',
				'Konsultasi 4x /bulan',
				'CS Support 24 Hours',
				'Pendampingan Konsultan',
			],
			price: 'Rp 3.899.000',
		},
		{
			title: 'Premium Plan',
			features: [
				'Improvement',
				'8 sesi pendampingan / bulan',
				'Timespan Monthly',
				'Konsultasi 4x /bulan',
				'CS Support 24 Hours',
				'Pendampingan Konsultan',
			],
			price: 'Rp 5.499.000',
		},
	];
	return (
		<div className="bg-white">
			<main>
				<div className="container max-w-5xl mx-auto grid grid-cols-2 py-24 items-center">
					<div>
						<h1 className="font-bold text-4xl pb-5">
							Memantau performa siswa lebih mudah
							<br />
							dengan MACTIV.
						</h1>
						<div className="font-normal text-xs pb-12">
							Menyediakan sistem pemantau performa siswa anda dengan efisien dan efektif menggunakan MACTIV temukan
							fitur menarik dari kami.
						</div>
						<button className="py-4 px-16 bg-[#3D8AC1] rounded-md text-white drop-shadow-3xl">Get Started</button>
					</div>
					<div>
						<img src={GambarHome} alt="ilustration-mactiv" />
					</div>
				</div>
				<div className="bg-[#CDF0EA] ">
					<div className="container max-w-5xl mx-auto grid grid-cols-2 py-20  items-center ">
						<img src={GambarFitur} alt={'features-lasles-vpn'} />
						<div className="px-16 space-y-4 ">
							<div className="font-medium text-3xl">Kami Menyediakan Fitur yang Dapat Anda Gunakan</div>
							<div className="text-sm font-normal">
								Anda dapat menggunakan fitur-fitur yang kami sediakan dengan menyenangkan dan mudah dalam memantau
								performa siswa anda .
							</div>
							{fitur.map((val, index) => {
								return (
									<div className="flex items-center space-x-3" key={index}>
										<img src={Check} alt="fitur-check-mactiv" className="w-8 h-8" />
										<div className="text-xs">{val}</div>
									</div>
								);
							})}
						</div>
					</div>
				</div>
				<div className="bg-gray-50 py-20">
					<DeskripsiJudul
						title={'Pilih Paket Anda'}
						desc={`Mari pilih paket yang terbaik untuk Anda dan jelajahi
            dengan senang hati dan
            dengan riang.`}
					/>

					<div className=" container max-w-5xl mx-auto grid grid-cols-3 space-x-6">
						{pricing.map((val, index) => {
							return <PricingPlan key={index} {...val} isSelect={index + 1 === pricing.length} />;
						})}
					</div>

					<Testimoni />
				</div>
				<div className="bg-[#defff7]">
					<div className="container max-w-5xl mx-auto grid grid-cols-2 py-20 items-center">
						<div>
							<h1 className="font-bold text-4xl pb-5">About Us</h1>
							<div className="font-medium text-justify text-md pb-12">
								MACTIV atau Measured Activities merupakan sebuah platform pemantau aktivitas dan performa yang
								melibatkan guru dan siswa untuk membuat dan memantau nilai, credit score, softskill, rata-rata nilah,
								hingga pengumpulan tugas secara efektif dan efisien. <br />
								MACTIV dapat membuat siswa bisa memantau rata-rata nilai sebelum penerimaan rapor, sehingga siswa dapat
								memperbaiki nilai agar rata-rata nilai naik dan membantu siswa menentukan jurusan yang sesuai dengan
								nilai dan minat bakat mereka berdasarkan soft skill dan catatan minat yang diberikan oleh guru.
								<br /> MACTIV juga membantu guru dalam memantau performa siswa, memantau tugas siswa, serta membantu
								dalam perhitungan nilai dengan cepat, akurat, dan tepat.
							</div>
						</div>
						<div>
							<img src={GambarAboutUs} alt="ilustration-mactiv" />
						</div>
					</div>
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
				<div className="bg-gray-100">
					<SubsribeNow />
				</div>
			</main>
		</div>
	);
}

export default Landing;
