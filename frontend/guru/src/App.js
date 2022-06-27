import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import CatatanMinat from './components/pages/dashboard/catatanMinat/catatanSiswaMinat/CatatanMinat';
import CreateCatatanMinat from './components/pages/dashboard/catatanMinat/catatanSiswaMinat/_partials/CreateCatatanMinat';
import EditCatatanMinat from './components/pages/dashboard/catatanMinat/catatanSiswaMinat/_partials/EditCatatanMinat';
import SelectSiswaCatatanMinat from './components/pages/dashboard/catatanMinat/SelectSiswaCatatanMinat';
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
import EditTugas from './components/pages/dashboard/tugas/listTugasPelajaran/_partials/EditTugas';
import SelectPelajaran from './components/pages/dashboard/tugas/SelectPelajaran';
import Landing from './components/pages/landing/Landing';
import Login from './components/pages/landing/Login';
import Register from './components/pages/landing/Register';
import Layout from './components/reusable/Layout';

function App() {
	return (
		<div className="">
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Landing />} />
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
						path="/dashboard/pelajaran/:mapelId/edit"
						element={
							<Layout type={'dashboard'}>
								<EditPelajaran />
							</Layout>
						}
					/>
					<Route
						path="/dashboard/pelajaran/:mapelId"
						element={
							<Layout type={'dashboard'}>
								<ListSiswaPelajaran />
							</Layout>
						}
					/>
					<Route
						path="/dashboard/pelajaran/:mapelId/:siswaId"
						element={
							<Layout type={'dashboard'}>
								<RekapNilaiSiswa />
							</Layout>
						}
					/>
					<Route
						path="/dashboard/pelajaran/:mapelId/:siswaId/edit/:tugasId/:pengumpulanId"
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
						path="/dashboard/siswa/:siswaId"
						element={
							<Layout type={'dashboard'}>
								<ListMapelSiswa />
							</Layout>
						}
					/>
					<Route
						path="/dashboard/siswa/:siswaId/:mapelId"
						element={
							<Layout type={'dashboard'}>
								<RekapNilaiSiswa />
							</Layout>
						}
					/>
					<Route
						path="/dashboard/siswa/:mapelId/:siswaId/edit/:tugasId/:pengumpulanId"
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
						path="/dashboard/tugas/:mapelId"
						element={
							<Layout type={'dashboard'}>
								<ListTugasPelajaran />
							</Layout>
						}
					/>
					<Route
						path="/dashboard/tugas/:mapelId/create"
						element={
							<Layout type={'dashboard'}>
								<CreateTugas />
							</Layout>
						}
					/>
					<Route
						path="/dashboard/tugas/:mapelId/edit/:tugasId"
						element={
							<Layout type={'dashboard'}>
								<EditTugas />
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
						path="/dashboard/credit-score/:siswaId"
						element={
							<Layout type={'dashboard'}>
								<ListPointCreditScore />
							</Layout>
						}
					/>
					<Route
						path="/dashboard/credit-score/:siswaId/create"
						element={
							<Layout type={'dashboard'}>
								<CreatePoin />
							</Layout>
						}
					/>
					<Route
						path="/dashboard/credit-score/:siswaId/edit/:creditscoreId"
						element={
							<Layout type={'dashboard'}>
								<EditPoin />
							</Layout>
						}
					/>
					<Route
						path="/dashboard/catatan-minat"
						element={
							<Layout type={'dashboard'}>
								<SelectSiswaCatatanMinat />
							</Layout>
						}
					/>
					<Route
						path="/dashboard/catatan-minat/:siswaId"
						element={
							<Layout type={'dashboard'}>
								<CatatanMinat />
							</Layout>
						}
					/>
					<Route
						path="/dashboard/catatan-minat/:siswaId/create"
						element={
							<Layout type={'dashboard'}>
								<CreateCatatanMinat />
							</Layout>
						}
					/>
					<Route
						path="/dashboard/catatan-minat/:siswaId/edit/:minatId"
						element={
							<Layout type={'dashboard'}>
								<EditCatatanMinat />
							</Layout>
						}
					/>
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
