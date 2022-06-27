import { AuditOutlined, BarChartOutlined, BookFilled, FilePdfFilled, PieChartFilled } from '@ant-design/icons';
import { Layout as AntLayout, Menu } from 'antd';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import IconMactiv from '../../assets/logo_mactiv_2.png';
import Gmail from '../../assets/sosmed/gmaill.png';
import Instagram from '../../assets/sosmed/Instagramm.png';
import Whatsapp from '../../assets/sosmed/whatsappp.png';
import useUserStore from '../../store/userStore';

const { Header, Sider, Content, Footer } = AntLayout;

function Layout({ type, children }) {
	const { userData, loading: loadingUser } = useUserStore();

	const [collapse, setCollapse] = useState(false);
	const menu = ['Home', 'Features', 'Pricing', 'Testimonials', 'About Us'];

	if (type === 'front') {
		return (
			<AntLayout className="min-h-screen bg-white">
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
						<Link to={'/login'} className="font-bold">
							Sign In
						</Link>
						<Link to={'/register'} className="border text-white bg-[#3D8AC1] border-[#103379] rounded-full py-2 px-6">
							Sign Up
						</Link>
					</div>
				</header>
				<Content>{children}</Content>
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
							<div className="text-lg  text-black font-semibold mb-6">Mactiv Menu</div>
							<ul className="space-y-6 text-sm text-gray-500">
								<li>Pricing</li>
								<li>Features</li>
								<li>About Us</li>
								<li>Our Team</li>
							</ul>
						</div>
						<div>
							<div className="text-lg text-black font-semibold mb-6">Location</div>
							<ul className="space-y-6  text-sm text-gray-500">
								<li>Jl. Bangau Ujung No 63, Pekanbaru, Riau </li>
								<li className="text-lg text-black font-semibold mb-6">Contact Us</li>
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
			</AntLayout>
		);
	} else if (type === 'dashboard') {
		return (
			<AntLayout className="min-h-screen">
				<Sider collapsible collapsed={collapse} onCollapse={value => setCollapse(value)} width="300">
					<Menu mode="inline" theme="dark" className="mt-16 text-lg font-bold">
						<Menu.ItemGroup title={<div className="mx-2 text-2xl">{!collapse && 'Menu'}</div>}>
							<Menu.Item
								icon={
									<div>
										<BarChartOutlined style={{ fontSize: '28px' }} className={`ml-4 ${collapse && '-ml-1'}`} />
									</div>
								}
								key={'dashboard'}
							>
								<Link to={'/dashboard'}>
									<div className="mr-4">Dashboard</div>
								</Link>
							</Menu.Item>
							<Menu.Item
								icon={
									<div>
										<BookFilled style={{ fontSize: '28px' }} className={`ml-4 ${collapse && '-ml-1'}`} />
									</div>
								}
								key={'pelajaran'}
							>
								<Link to={'/dashboard/pelajaran'}>
									<div className="mr-4">Mata Pelajaran</div>
								</Link>
							</Menu.Item>
							<Menu.Item
								key={'tugas'}
								icon={
									<div>
										<FilePdfFilled style={{ fontSize: '28px' }} className={`ml-4 ${collapse && '-ml-1'}`} />
									</div>
								}
							>
								<Link to={'/dashboard/tugas'}>
									<div className="mr-4">Tugas</div>
								</Link>
							</Menu.Item>
							<Menu.Item
								key={'credit_score'}
								icon={
									<div>
										<PieChartFilled style={{ fontSize: '28px' }} className={`ml-4 ${collapse && '-ml-1'}`} />
									</div>
								}
							>
								<Link to={'/dashboard/credit-score'}>
									<div className="mr-4">Credit Score</div>
								</Link>
							</Menu.Item>
							<Menu.Item
								key={'catatan_minat'}
								icon={
									<div>
										<AuditOutlined style={{ fontSize: '28px' }} className={`ml-4 ${collapse && '-ml-1'}`} />
									</div>
								}
							>
								<Link to={'/dashboard/catatan-minat'}>
									<div className="mr-4">Catatan Minat</div>
								</Link>
							</Menu.Item>
						</Menu.ItemGroup>
					</Menu>
				</Sider>
				<AntLayout>
					<Header className="flex justify-between bg-primary">
						<div className="text-white text-3xl font-bold flex h-full items-center">MACTIV</div>
						<div className="text-white text-xl font-bold flex h-full items-center">{userData.nama}</div>
					</Header>

					<Content className="mx-12 my-12 bg-white p-6">{children}</Content>
				</AntLayout>
			</AntLayout>
		);
	} else {
		return <></>;
	}
}

export default Layout;
