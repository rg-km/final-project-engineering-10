import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import ListPointCreditScore from './components/pages/dashboard/creditscore/listPointCreditScore/ListPointCreditScore';
import CreatePoin from './components/pages/dashboard/creditscore/listPointCreditScore/_partials/CreatePoin';
import EditPoin from './components/pages/dashboard/creditscore/listPointCreditScore/_partials/EditPoin';
import ListSiswaCreditScore from './components/pages/dashboard/creditscore/ListSiswaCreditScore';
import Dashboard from './components/pages/dashboard/Dashboard';
import CreatePelajaran from './components/pages/dashboard/matapelajaran/CreatePelajaran';
import EditPelajaran from './components/pages/dashboard/matapelajaran/EditPelajaran';
import ListPelajaran from './components/pages/dashboard/matapelajaran/ListPelajaran';
import ListSiswaPelajaran from './components/pages/dashboard/matapelajaran/listSiswaPelajaran/ListSiswaPelajaran';
import RekapNilaiSiswa from './components/pages/dashboard/rekapNilaiSiswa/RekapNilaiSiswa';
import EditNilaiTugas from './components/pages/dashboard/rekapNilaiSiswa/_partials/EditNilaiTugas';
import ListMapelSiswa from './components/pages/dashboard/siswa/listMapelSiswa/ListMapelSiswa';
import ListSiswa from './components/pages/dashboard/siswa/ListSiswa';
import ListTugasPelajaran from './components/pages/dashboard/tugas/listTugasPelajaran/ListTugasPelajaran';
import CreateTugas from './components/pages/dashboard/tugas/listTugasPelajaran/_partials/CreateTugas';
import SelectPelajaran from './components/pages/dashboard/tugas/SelectPelajaran';
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
							<Layout type={'dashboard'} >
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
					<Route
						path="/dashboard/pelajaran/:mapel/:nama/edit/:tugas"
						element={
							<Layout type={'dashboard'}>
								<EditNilaiTugas />
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
						path="/dashboard/siswa/:nama"
						element={
							<Layout type={'dashboard'}>
								<ListMapelSiswa />
							</Layout>
						}
					/>
					<Route
						path="/dashboard/siswa/:nama/:mapel"
						element={
							<Layout type={'dashboard'}>
								<RekapNilaiSiswa />
							</Layout>
						}
					/>
					<Route
						path="/dashboard/siswa/:mapel/:nama/edit/:tugas"
						element={
							<Layout type={'dashboard'}>
								<EditNilaiTugas />
							</Layout>
						}
					/>
					<Route
						path="/dashboard/tugas"
						element={
							<Layout type={'dashboard'}>
								<SelectPelajaran />
							</Layout>
						}
					/>
					<Route
						path="/dashboard/tugas/:mapel"
						element={
							<Layout type={'dashboard'}>
								<ListTugasPelajaran />
							</Layout>
						}
					/>
					<Route
						path="/dashboard/tugas/:mapel/create"
						element={
							<Layout type={'dashboard'}>
								<CreateTugas />
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
						path="/dashboard/credit-score/:nama"
						element={
							<Layout type={'dashboard'}>
								<ListPointCreditScore />
							</Layout>
						}
					/>
					<Route
						path="/dashboard/credit-score/:nama/create"
						element={
							<Layout type={'dashboard'}>
								<CreatePoin />
							</Layout>
						}
					/>
					<Route
						path="/dashboard/credit-score/:nama/edit"
						element={
							<Layout type={'dashboard'}>
								<EditPoin />
							</Layout>
						}
					/>
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
