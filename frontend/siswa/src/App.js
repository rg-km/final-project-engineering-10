import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import CatatanMinat from './components/pages/dashboard/catatanMinat/CatatanMinat';
import ListSiswaCreditScore from './components/pages/dashboard/creditScore/ListPointCreditScore';
import EditPoin from './components/pages/dashboard/creditScore/_partials/EditPoin';
import Dashboard from './components/pages/dashboard/Dashboard';
import ListPelajaran from './components/pages/dashboard/mataPelajaran/ListPelajaran';
import EnrollPelajaran from './components/pages/dashboard/mataPelajaran/_partials/EnrollPelajaran';
import ListTugasPelajaran from './components/pages/dashboard/tugas/listTugasPelajaran/ListTugasPelajaran';
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
					<Route
						path="/"
						element={
							<Layout type={'front'}>
								<Landing />
							</Layout>
						}
					/>
					<Route
						path="/login"
						element={
							<Layout type={'front'}>
								{' '}
								<Login />{' '}
							</Layout>
						}
					/>
					<Route
						path="/register"
						element={
							<Layout type={'front'}>
								{' '}
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
						path="/dashboard/pelajaran/enroll"
						element={
							<Layout type={'dashboard'}>
								<EnrollPelajaran />
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
						path="/dashboard/tugas/:mapelId/edit/:tugasId/:linkId"
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
						path="/dashboard/credit-score/edit/:creditscoreId"
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
								<CatatanMinat />
							</Layout>
						}
					/>
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
