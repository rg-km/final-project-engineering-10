import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import AuthenticatedRoute from './components/HOC/AuthenticatedRoute';
import UnauthenticatedRoute from './components/HOC/UnauthenticatedRoute';
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
					<Route path="/dashboard">
						<Route
							path=""
							element={
								<AuthenticatedRoute>
									<Layout type={'dashboard'}>
										<Dashboard />
									</Layout>
								</AuthenticatedRoute>
							}
						/>
						<Route path="pelajaran">
							<Route
								path=""
								element={
									<AuthenticatedRoute>
										<Layout type={'dashboard'}>
											<ListPelajaran />
										</Layout>
									</AuthenticatedRoute>
								}
							/>
							<Route
								path="create"
								element={
									<AuthenticatedRoute>
										<Layout type={'dashboard'}>
											<CreatePelajaran />
										</Layout>
									</AuthenticatedRoute>
								}
							/>
							<Route
								path=":mapelId/edit"
								element={
									<AuthenticatedRoute>
										<Layout type={'dashboard'}>
											<EditPelajaran />
										</Layout>
									</AuthenticatedRoute>
								}
							/>
							<Route
								path=":mapelId"
								element={
									<AuthenticatedRoute>
										<Layout type={'dashboard'}>
											<ListSiswaPelajaran />
										</Layout>
									</AuthenticatedRoute>
								}
							/>
							<Route
								path=":siswaId/:mapelId"
								element={
									<AuthenticatedRoute>
										<Layout type={'dashboard'}>
											<RekapNilaiSiswa />
										</Layout>
									</AuthenticatedRoute>
								}
							/>
							<Route
								path=":siswaId/:mapelId/edit/:tugasId/:pengumpulanId"
								element={
									<AuthenticatedRoute>
										<Layout type={'dashboard'}>
											<EditNilaiTugas />
										</Layout>
									</AuthenticatedRoute>
								}
							/>
						</Route>
						<Route path="siswa">
							<Route
								path=""
								element={
									<AuthenticatedRoute>
										<Layout type={'dashboard'}>
											<ListSiswa />
										</Layout>
									</AuthenticatedRoute>
								}
							/>
							<Route
								path=":siswaId"
								element={
									<AuthenticatedRoute>
										<Layout type={'dashboard'}>
											<ListMapelSiswa />
										</Layout>
									</AuthenticatedRoute>
								}
							/>
							<Route
								path=":siswaId/:mapelId"
								element={
									<AuthenticatedRoute>
										<Layout type={'dashboard'}>
											<RekapNilaiSiswa />
										</Layout>
									</AuthenticatedRoute>
								}
							/>
							<Route
								path=":siswaId/:mapelId/edit/:tugasId/:pengumpulanId"
								element={
									<AuthenticatedRoute>
										<Layout type={'dashboard'}>
											<EditNilaiTugas />
										</Layout>
									</AuthenticatedRoute>
								}
							/>
						</Route>
						<Route path="tugas">
							<Route
								path=""
								element={
									<AuthenticatedRoute>
										<Layout type={'dashboard'}>
											<SelectPelajaran />
										</Layout>
									</AuthenticatedRoute>
								}
							/>
							<Route
								path=":mapelId"
								element={
									<AuthenticatedRoute>
										<Layout type={'dashboard'}>
											<ListTugasPelajaran />
										</Layout>
									</AuthenticatedRoute>
								}
							/>
							<Route
								path=":mapelId/create"
								element={
									<AuthenticatedRoute>
										<Layout type={'dashboard'}>
											<CreateTugas />
										</Layout>
									</AuthenticatedRoute>
								}
							/>
							<Route
								path=":mapelId/edit/:tugasId"
								element={
									<AuthenticatedRoute>
										<Layout type={'dashboard'}>
											<EditTugas />
										</Layout>
									</AuthenticatedRoute>
								}
							/>
						</Route>
						<Route path="credit-score">
							<Route
								path=""
								element={
									<AuthenticatedRoute>
										<Layout type={'dashboard'}>
											<ListSiswaCreditScore />
										</Layout>
									</AuthenticatedRoute>
								}
							/>
							<Route
								path=":siswaId"
								element={
									<AuthenticatedRoute>
										<Layout type={'dashboard'}>
											<ListPointCreditScore />
										</Layout>
									</AuthenticatedRoute>
								}
							/>
							<Route
								path=":siswaId/create"
								element={
									<AuthenticatedRoute>
										<Layout type={'dashboard'}>
											<CreatePoin />
										</Layout>
									</AuthenticatedRoute>
								}
							/>
							<Route
								path=":siswaId/edit/:creditscoreId"
								element={
									<AuthenticatedRoute>
										<Layout type={'dashboard'}>
											<EditPoin />
										</Layout>
									</AuthenticatedRoute>
								}
							/>
						</Route>
						<Route path="catatan-minat">
							<Route
								path=""
								element={
									<AuthenticatedRoute>
										<Layout type={'dashboard'}>
											<SelectSiswaCatatanMinat />
										</Layout>
									</AuthenticatedRoute>
								}
							/>
							<Route
								path=":siswaId"
								element={
									<AuthenticatedRoute>
										<Layout type={'dashboard'}>
											<CatatanMinat />
										</Layout>
									</AuthenticatedRoute>
								}
							/>
							<Route
								path=":siswaId/create"
								element={
									<AuthenticatedRoute>
										<Layout type={'dashboard'}>
											<CreateCatatanMinat />
										</Layout>
									</AuthenticatedRoute>
								}
							/>
							<Route
								path=":siswaId/edit/:minatId"
								element={
									<AuthenticatedRoute>
										<Layout type={'dashboard'}>
											<EditCatatanMinat />
										</Layout>
									</AuthenticatedRoute>
								}
							/>
						</Route>
					</Route>
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
