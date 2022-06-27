import { Form, Select } from 'antd';
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
	deskripsi: Yup.string().required('Nama Task wajib diisi'),
	tipe: Yup.string().required('Tipe Task wajib dipilih'),
	point: Yup.number().typeError('Masukan Angka yang Valid').required('Poin Task wajib diisi'),
});

const { Option } = Select;

function CreatePoin() {
	const initialState = {
		deskripsi: '',
		tipe: '',
		point: '',
		status: 'belum',
		bukti: '',
	};
	const { siswaId } = useParams();
	const navigate = useNavigate();
	const [input, setInput] = useState(initialState);
	const [loading, setLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState({});
	const { userData, loading: loadingUser } = useUserStore();

	const onSubmit = async values => {
		try {
			setLoading(true);
			values.point = parseInt(values.point);
			if (values.tipe === 'tugas') {
				delete values.bukti;
			}
			const response = await axiosConfig.post(`${BASE_URL}/Guru/${userData.id}/credit/siswa/${siswaId}/`, values);
			Toast.fire({
				icon: 'success',
				title: 'Berhasil Membuat Mata Pelajaran',
			});
			navigate(`/dashboard/credit-score/${siswaId}`);
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
			<h1 className="text-3xl font-bold">Tambah Task</h1>
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
								label="Deskripsi Task"
								error={getErrorValue(errors.deskripsi, errorMessage?.deskripsi)}
								touched={touched.deskripsi}
							>
								<Input
									onChange={handleChange}
									onBlur={handleBlur}
									value={values.deskripsi}
									name="deskripsi"
									placeholder="Masukkan Deskripsi Poin"
								/>
							</FormItem>

							<FormItem label="Tipe" error={getErrorValue(errors.tipe, errorMessage?.tipe)} touched={touched.tipe}>
								<Select
									name="tipe"
									defaultValue={''}
									style={{ width: '100%' }}
									onBlur={() => setFieldTouched('tipe')}
									onChange={value => {
										setFieldValue('tipe', value);
									}}
									size="large"
								>
									<Option value="" disabled>
										Pilih Tipe Task
									</Option>
									<Option value="pelanggaran">Pelanggaran</Option>
									<Option value="tugas">Tugas</Option>
								</Select>
							</FormItem>
							<FormItem label="Poin" error={getErrorValue(errors.point, errorMessage?.point)} touched={touched.point}>
								<Input
									onChange={handleChange}
									onBlur={handleBlur}
									value={values.point}
									name="point"
									placeholder="Masukkan Jumlah Poin"
								/>
							</FormItem>
							{values.tipe === 'pelanggaran' && (
								<FormItem
									label="Bukti Pelanggaran"
									error={getErrorValue(errors.bukti, errorMessage?.bukti)}
									touched={touched.bukti}
								>
									<Input
										onChange={handleChange}
										onBlur={handleBlur}
										value={values.bukti}
										name="bukti"
										placeholder="Masukkan Bukti Pelanggaran"
									/>
								</FormItem>
							)}
							<div className="flex justify-end">
								<button className="px-12 py-4 bg-blue text-white font-bold rounded-xl text-xl">Buat Task</button>
							</div>
						</Form>
					)}
				</Formik>
			</div>
		</div>
	);
}

export default CreatePoin;
