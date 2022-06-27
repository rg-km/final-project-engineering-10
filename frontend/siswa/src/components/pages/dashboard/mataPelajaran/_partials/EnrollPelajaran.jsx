import { Form } from 'antd';
import { Formik } from 'formik';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import useUserStore from '../../../../../store/userStore';
import axiosConfig from '../../../../../utils/axiosConfig';
import BASE_URL from '../../../../../utils/config';
import { getErrorValue } from '../../../../../utils/getErrors';
import FormItem from '../../../../reusable/FormItem';
import Input from '../../../../reusable/Input';
import { Toast } from '../../../../reusable/Toast';

const validationSchema = Yup.object().shape({
	kode_kelas: Yup.number().required('Kode Kelas wajib diisi'),
});

function EnrollPelajaran() {
	const initialState = {
		kode_kelas: '',
	};
	const { userData, loading: loadingUser, status, setUser } = useUserStore();

	const onSubmit = async values => {
		try {
			values.kode_kelas = parseInt(values.kode_kelas);
			setLoading(true);
			const response = await axiosConfig.post(`${BASE_URL}/siswa/enroll/`, values);
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
			setLoading(false);
		}
	};
	const navigate = useNavigate();
	const [input, setInput] = useState(initialState);
	const [loading, setLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState({});

	return (
		<div>
			<h1 className="text-3xl font-bold">Enroll Mata Pelajaran</h1>
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
						<Form onFinish={handleSubmit} className="my-16">
							<FormItem
								label="Kode Kelas"
								error={getErrorValue(errors.kode_kelas, errorMessage?.kode_kelas)}
								touched={touched.kode_kelas}
							>
								<Input
									onChange={handleChange}
									onBlur={handleBlur}
									value={values.kode_kelas}
									name="kode_kelas"
									placeholder="Masukkan Kode Kelas anda"
								/>
							</FormItem>
							<div className="flex justify-end">
								<button className="px-12 py-4 bg-blue text-white font-bold rounded-xl text-xl">Kirim</button>
							</div>
						</Form>
					)}
				</Formik>
			</div>
		</div>
	);
}

export default EnrollPelajaran;
