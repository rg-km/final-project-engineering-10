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
	status: Yup.string().required('Status wajib diisi'),
});

function EditNilaiTugas() {
	const { tugasId, pengumpulanId, mapelId, siswaId } = useParams();

	const initialState = {
		nilai: '',
		link_pengumpulan: '',
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
				`${BASE_URL}/Guru/${userData.id}/mapel/list/${mapelId}/tugas/${tugasId}/pengumpulan/${pengumpulanId}/`
			);
			setData(response.data.data);
			setInput({
				nilai: response.data.data.nilai,
				status: response.data.data.status,
				link_pengumpulan: response.data.data.link_pengumpulan,
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

	// navigate('/dashboard');
	useEffect(() => {
		fetchNilai();
	}, []);

	const onSubmit = async values => {
		try {
			setLoading(true);
			values.nilai = parseInt(values.nilai);
			const response = await axiosConfig.put(
				`${BASE_URL}/Guru/${userData.id}/mapel/list/${mapelId}/tugas/${tugasId}/pengumpulan/${pengumpulanId}/${siswaId}/`,
				values
			);
			Toast.fire({
				icon: 'success',
				title: 'Berhasil Mengupdate Nilai',
			});
			navigate(-1);
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
							<FormItem label="Tipe Tugas">
								<Input value={data.tipe} className="capitalize" disabled />
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
									value={values.status}
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
									<Select.Option value="belum">Belum</Select.Option>
									<Select.Option value="dikirim">Dikirim</Select.Option>
									<Select.Option value="selesai">Dinilai</Select.Option>
									<Select.Option value="gagal">Gagal</Select.Option>
								</Select>
							</FormItem>
							{values.link_pengumpulan && (
								<FormItem
									label="Link Pengumpulan"
									error={getErrorValue(errors.link_pengumpulan, errorMessage?.link_pengumpulan)}
									touched={touched.link_pengumpulan}
								>
									<Input
										onChange={handleChange}
										onBlur={handleBlur}
										value={values.link_pengumpulan}
										name="link_pengumpulan"
										placeholder={`Masukkan Nilai ${tugasId}`}
									/>
								</FormItem>
							)}
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
