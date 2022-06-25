import { Form, Select } from 'antd';
import { Formik } from 'formik';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import useUserStore from '../../../../../store/userStore';
import axiosConfig from '../../../../../utils/axiosConfig';
import BASE_URL from '../../../../../utils/config';
import { getErrorValue } from '../../../../../utils/getErrors';
import FormItem from '../../../../reusable/FormItem';
import Input from '../../../../reusable/Input';
import { Toast } from '../../../../reusable/Toast';

const validationSchema = Yup.object().shape({
	nilai: Yup.number().typeError('Tolong masukan angka yang valid').required('Nilai Tugas wajib diisi'),
});

function EditNilaiTugas() {
	const { tugasId, pengumpulanId, mapelId } = useParams();

	const initialState = {
		name: '',
		status: '',
	};
	const navigate = useNavigate();
	const [input, setInput] = useState(initialState);
	const [data, setData] = useState({});
	const [errorMessage, setErrorMessage] = useState({});
	const [loading, setLoading] = useState(false);
	const { userData } = useUserStore();

	const fetchNilai = async () => {
		try {
			setLoading(true);
			const response = await axiosConfig.get(
				`${BASE_URL}/siswa/${userData.id}/mapel/${mapelId}/tugas/${tugasId}/pengumpulan/${pengumpulanId}/`
			);
			setData(response.data.data);
		} catch (error) {
			console.log(error);
			Toast.fire({
				icon: 'error',
				title: 'Terdapat Kesalahan',
			});
			setLoading(false);
		}
	};

	// navigate('/dashboard');
	useEffect(() => {
		fetchNilai();
	}, []);

	const onSubmit = async values => {
		try {
			setLoading(true);
			const response = await axiosConfig.put(
				`${BASE_URL}/Guru/${userData.id}/mapel/list/${mapelId}/tugas/${tugasId}/pengumpulan/${pengumpulanId}/`,
				values
			);
			Toast.fire({
				icon: 'success',
				title: 'Berhasil Mengupdate Nilai',
			});
		} catch (error) {
			console.log(error);
			Toast.fire({
				icon: 'error',
				title: 'Terdapat Kesalahan',
			});
			setLoading(false);
		}
	};

	return (
		<div>
			<h1 className="text-3xl font-bold">Ubah Nilai {tugasId}</h1>
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
								span: 4,
							}}
							wrapperCol={{
								span: 16,
							}}
							labelAlign="left"
						>
							<FormItem label="Tipe Nilai">
								<Input value="Ulangan" disabled />
							</FormItem>
							<FormItem label="Nilai" error={getErrorValue(errors.nilai, errorMessage?.nilai)} touched={touched.nilai}>
								<Input
									onChange={handleChange}
									onBlur={handleBlur}
									value={values.nilai}
									name="nilai"
									placeholder={`Masukkan Nilai ${tugasId}`}
								/>
							</FormItem>
							<FormItem
								label="Status"
								error={getErrorValue(errors.status, errorMessage?.status)}
								touched={touched.status}
							>
								<Select
									name="status"
									defaultValue={''}
									style={{ width: '100%' }}
									onBlur={() => setFieldTouched('status')}
									onChange={value => {
										setFieldValue('status', value);
									}}
									size="large"
								>
									<Select.Option value="" disabled>
										Pilih Status Tugas
									</Select.Option>
									<Select.Option value="Belum">Belum</Select.Option>
									<Select.Option value="Review">Review</Select.Option>
									<Select.Option value="Dinilai">Dinilai</Select.Option>
								</Select>
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

export default EditNilaiTugas;
