import { Form } from 'antd';
import { Formik } from 'formik';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import useUserStore from '../../../../store/userStore';
import axiosConfig from '../../../../utils/axiosConfig';
import BASE_URL from '../../../../utils/config';
import { getErrorValue } from '../../../../utils/getErrors';
import FormItem from '../../../reusable/FormItem';
import Input from '../../../reusable/Input';
import Loading from '../../../reusable/Loading';
import { Toast } from '../../../reusable/Toast';

const validationSchema = Yup.object().shape({
	Nama_kelas: Yup.string().required('Nama Pelajaran wajib diisi'),
});

function EditPelajaran() {
	const initialState = {
		Nama_kelas: '',
	};

	const { mapelId } = useParams();
	const navigate = useNavigate();
	const { userData, loading: loadingUser, status, setUser } = useUserStore();

	const onSubmit = async values => {
		try {
			const response = await axiosConfig.put(`${BASE_URL}/Guru/${userData.id}/mapel/${mapelId}/`, values);
			Toast.fire({
				icon: 'success',
				title: 'Berhasil Membuat Mata Pelajaran',
			});
			navigate('/dashboard/pelajaran');
		} catch (error) {
			console.log(error);
			Toast.fire({
				icon: 'error',
				title: 'Terdapat Kesalahan',
			});
		}
	};
	const [input, setInput] = useState(initialState);
	const [errorMessage, setErrorMessage] = useState({});
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState({});

	const fetchFindPelajaran = async () => {
		try {
			setLoading(true);
			const response = await axiosConfig.get(`${BASE_URL}/Guru/${userData.id}/mapel/${mapelId}/show/`);
			setData(response.data.data);
			setInput({ Nama_kelas: response.data.data.nama_kelas });
		} catch (error) {
			console.log(error);
			Toast.fire({
				icon: 'error',
				title: 'Terdapat Kesalahan',
			});
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchFindPelajaran();
	}, []);

	return loading ? (
		<Loading />
	) : (
		<div>
			<h1 className="text-3xl font-bold">Edit Mata Pelajaran</h1>
			<div className="my-3 bg-blue-bright rounded-xl p-4">
				<Formik initialValues={input} enableReinitialize validationSchema={validationSchema} onSubmit={onSubmit}>
					{({
						isSubmitting,
						handleSubmit,
						handleBlur,
						handleChange,
						errors,
						touched,
						values,
						setFieldValue,
						setFieldTouched,
						isValid,
						dirty,
					}) => (
						<Form
							onFinish={handleSubmit}
							className="my-16"
							labelCol={{
								span: 5,
							}}
							wrapperCol={{
								span: 18,
							}}
							labelAlign="left"
						>
							<FormItem label="Kode Mata Pelajaran">
								<Input disabled value={data.kode_kelas} />
							</FormItem>
							<FormItem
								label="Nama Lengkap"
								error={getErrorValue(errors.Nama_kelas, errorMessage?.Nama_kelas)}
								touched={touched.Nama_kelas}
							>
								<Input
									onChange={handleChange}
									onBlur={handleBlur}
									value={values.Nama_kelas}
									name="Nama_kelas"
									placeholder="Masukkan nama lengkap anda"
								/>
							</FormItem>
							<div className="flex justify-end">
								<button className="px-12 py-4 bg-blue text-white font-bold rounded-xl text-xl">Edit</button>
							</div>
						</Form>
					)}
				</Formik>
			</div>
		</div>
	);
}

export default EditPelajaran;
