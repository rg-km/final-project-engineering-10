import { AuditOutlined, BarChartOutlined, BookFilled, FilePdfFilled, PieChartFilled } from '@ant-design/icons';
import { Layout as AntLayout, Menu } from 'antd';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const { Header, Sider, Content, Footer } = AntLayout;

function Layout({ type, children }) {
	const [collapse, setCollapse] = useState(false);
	if (type === 'front') {
		return (
			<AntLayout className="min-h-screen">
				<Header className="grid grid-cols-12 bg-primary w-full">
					<div className="text-3xl font-bold flex h-full items-center col-span-2">MACTIV</div>
					<Menu
						mode="horizontal"
						theme="dark"
						className="text-white col-span-8 text-xl font-bold"
						items={[
							{ key: 'home', label: 'Home' },
							{ key: 'testimoni', label: 'Testimoni' },
							{ key: 'pricing', label: 'Pricing' },
							{ key: 'about-us', label: 'About Us' },
						]}
					/>
				</Header>
				<Content>{children}</Content>
				<Footer>FOOTER</Footer>
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
						<div className="text-white text-xl font-bold flex h-full items-center">Farhan Abdul Hamid</div>
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
