import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import AuthenticatedRoute from './components/HOC/AuthenticatedRoute';
import UnauthenticatedRoute from './components/HOC/UnauthenticatedRoute';
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
							<UnauthenticatedRoute>
								<Layout type={'front'}>
									<Login />
								</Layout>
							</UnauthenticatedRoute>
						}
					/>
					<Route
						path="/register"
						element={
							<UnauthenticatedRoute>
								<Layout type={'front'}>
									<Register />
								</Layout>
							</UnauthenticatedRoute>
						}
					/>
					<Route
						path="/dashboard"
						element={
							<AuthenticatedRoute>
								<Layout type={'dashboard'}>
									<Dashboard />
								</Layout>
							</AuthenticatedRoute>
						}
					/>
					<Route
						path="/dashboard/pelajaran"
						element={
							<AuthenticatedRoute>
								<Layout type={'dashboard'}>
									<ListPelajaran />
								</Layout>
							</AuthenticatedRoute>
						}
					/>
					<Route
						path="/dashboard/pelajaran/enroll"
						element={
							<AuthenticatedRoute>
								<Layout type={'dashboard'}>
									<EnrollPelajaran />
								</Layout>
							</AuthenticatedRoute>
						}
					/>
					<Route
						path="/dashboard/tugas"
						element={
							<AuthenticatedRoute>
								<Layout type={'dashboard'}>
									<SelectPelajaran />
								</Layout>
							</AuthenticatedRoute>
						}
					/>
					<Route
						path="/dashboard/tugas/:mapelId"
						element={
							<AuthenticatedRoute>
								<Layout type={'dashboard'}>
									<ListTugasPelajaran />
								</Layout>
							</AuthenticatedRoute>
						}
					/>
					<Route
						path="/dashboard/tugas/:mapelId/edit/:tugasId/:linkId"
						element={
							<AuthenticatedRoute>
								<Layout type={'dashboard'}>
									<EditTugas />
								</Layout>
							</AuthenticatedRoute>
						}
					/>
					<Route
						path="/dashboard/credit-score"
						element={
							<AuthenticatedRoute>
								<Layout type={'dashboard'}>
									<ListSiswaCreditScore />
								</Layout>
							</AuthenticatedRoute>
						}
					/>
					<Route
						path="/dashboard/credit-score/edit/:creditscoreId"
						element={
							<AuthenticatedRoute>
								<Layout type={'dashboard'}>
									<EditPoin />
								</Layout>
							</AuthenticatedRoute>
						}
					/>
					<Route
						path="/dashboard/catatan-minat"
						element={
							<AuthenticatedRoute>
								<Layout type={'dashboard'}>
									<CatatanMinat />
								</Layout>
							</AuthenticatedRoute>
						}
					/>
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
