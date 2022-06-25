import { Form } from 'antd';
import { Formik } from 'formik';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import useUserStore from '../../../../../../store/userStore';
import axiosConfig from '../../../../../../utils/axiosConfig';
import BASE_URL from '../../../../../../utils/config';
import { getErrorValue } from '../../../../../../utils/getErrors';
import FormItem from '../../../../../reusable/FormItem';
import Input from '../../../../../reusable/Input';
import { Toast } from '../../../../../reusable/Toast';

const validationSchema = Yup.object().shape({
	minat: Yup.string().required('Nama Minat wajib diisi'),
});

function CreateCatatanMinat() {
	const initialState = {
		minat: '',
		deskripsi: '',
	};
	const { userData, loading: loadingUser, status, setUser } = useUserStore();
	const { siswaId } = useParams();

	const onSubmit = async values => {
		try {
			setLoading(true);
			const response = await axiosConfig.post(`${BASE_URL}/Guru/${userData.id}/minat/siswa/${siswaId}/`, values);
			Toast.fire({
				icon: 'success',
				title: 'Berhasil Membuat Mata Pelajaran',
			});
			navigate(`/dashboard/catatan-minat/${siswaId}`);
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
			<h1 className="text-3xl font-bold">Tambah Catatan Minat {siswaId}</h1>
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
							<FormItem
								label="Catatan Minat"
								error={getErrorValue(errors.minat, errorMessage?.minat)}
								touched={touched.minat}
							>
								<Input
									onChange={handleChange}
									onBlur={handleBlur}
									value={values.minat}
									name="minat"
									placeholder="Masukkan Catatan Minat"
								/>
							</FormItem>
							<FormItem
								label="Deskripsi"
								error={getErrorValue(errors.deskripsi, errorMessage?.deskripsi)}
								touched={touched.deskripsi}
							>
								<Input
									onChange={handleChange}
									onBlur={handleBlur}
									value={values.deskripsi}
									name="deskripsi"
									placeholder="Masukkan Deskripsi"
									type={'textarea'}
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

export default CreateCatatanMinat;
