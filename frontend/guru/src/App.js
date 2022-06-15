import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import ListSiswaCreditScore from './components/pages/dashboard/creditscore/ListSiswaCreditScore';
import Dashboard from './components/pages/dashboard/Dashboard';
import ListSiswaPelajaran from './components/pages/dashboard/ListSiswaPelajaran';
import CreatePelajaran from './components/pages/dashboard/matapelajaran/CreatePelajaran';
import EditPelajaran from './components/pages/dashboard/matapelajaran/EditPelajaran';
import ListPelajaran from './components/pages/dashboard/matapelajaran/ListPelajaran';
import RekapNilaiSiswa from './components/pages/dashboard/RekapNilaiSiswa';
import ListSiswa from './components/pages/dashboard/siswa/ListSiswa';
import Login from './components/pages/landing/Login';
import Register from './components/pages/landing/Register';
import Layout from './components/reusable/Layout';

function App() {
	return (
		<div className="">
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Layout type={'front'}></Layout>} />
					<Route
						path="/login"
						element={
							<Layout type={'front'}>
								<Login />
							</Layout>
						}
					/>
					<Route
						path="/register"
						element={
							<Layout type={'front'}>
								<Register />
							</Layout>
						}
					/>
					<Route
						path="/dashboard"
						element={
							<Layout type={'dashboard'}>
								<Dashboard />
							</Layout>
						}
					/>
					<Route
						path="/dashboard/pelajaran"
						element={
							<Layout type={'dashboard'}>
								<ListPelajaran />
							</Layout>
						}
					/>
					<Route
						path="/dashboard/pelajaran/create"
						element={
							<Layout type={'dashboard'}>
								<CreatePelajaran />
							</Layout>
						}
					/>
					<Route
						path="/dashboard/pelajaran/edit"
						element={
							<Layout type={'dashboard'}>
								<EditPelajaran />
							</Layout>
						}
					/>
					<Route
						path="/dashboard/siswa"
						element={
							<Layout type={'dashboard'}>
								<ListSiswa />
							</Layout>
						}
					/>
					<Route
						path="/dashboard/credit-score"
						element={
							<Layout type={'dashboard'}>
								<ListSiswaCreditScore />
							</Layout>
						}
					/>
					<Route
						path="/dashboard/pelajaran/:mapel"
						element={
							<Layout type={'dashboard'}>
								<ListSiswaPelajaran />
							</Layout>
						}
					/>
					<Route
						path="/dashboard/pelajaran/:mapel/:nama"
						element={
							<Layout type={'dashboard'}>
								<RekapNilaiSiswa />
							</Layout>
						}
					/>
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
