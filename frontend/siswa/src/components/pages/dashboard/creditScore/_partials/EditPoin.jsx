import { Form, Select } from 'antd';
import { Formik } from 'formik';
import { isEmpty } from 'lodash';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import useUserStore from '../../../../../store/userStore';
import axiosConfig from '../../../../../utils/axiosConfig';
import BASE_URL from '../../../../../utils/config';
import { getErrorValue } from '../../../../../utils/getErrors';
import FormItem from '../../../../reusable/FormItem';
import Input from '../../../../reusable/Input';
import Loading from '../../../../reusable/Loading';
import { Toast } from '../../../../reusable/Toast';
const validationSchema = Yup.object().shape({
	bukti: Yup.string().required('Bukti Isi wajib diisi'),
});

const { Option } = Select;

function EditPoin() {
	const initialState = {
		bukti: '',
	};

	const { creditscoreId } = useParams();
	const { userData, loading: loadingUser } = useUserStore();
	const [input, setInput] = useState(initialState);
	const [errorMessage, setErrorMessage] = useState({});
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState({});
	const navigate = useNavigate();

	const fetchFindCreditScore = async () => {
		try {
			setLoading(true);
			const response = await axiosConfig.get(`${BASE_URL}/siswa/${userData.id}/credit/${creditscoreId}/`);
			setInput({ bukti: response.data.data.bukti });
			setData(response.data.data);
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

	const onSubmit = async values => {
		try {
			const response = await axiosConfig.put(`${BASE_URL}/siswa/${userData.id}/credit/${creditscoreId}/`, values);
			Toast.fire({
				icon: 'success',
				title: 'Berhasil Mengupdate Tugas',
			});
			navigate(`/dashboard/credit-score`);
		} catch (error) {
			console.log(error);
			Toast.fire({
				icon: 'error',
				title: 'Terdapat Kesalahan',
			});
		}
	};
	useEffect(() => {
		if (!isEmpty(userData)) {
			fetchFindCreditScore();
		}
	}, [userData]);

	return loadingUser || loading ? (
		<Loading />
	) : (
		<div>
			<h1 className="text-3xl font-bold">Edit Task</h1>
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
							<FormItem label="Deskripsi Task">
								<Input value={data.deskripsi} disabled />
							</FormItem>
							<FormItem label="Tipe">
								<Select name="tipe" defaultValue={data.tipe} style={{ width: '100%' }} size="large" disabled>
									<Option value="" disabled>
										Pilih Tipe Task
									</Option>
									<Option value="pelanggaran">Pelanggaran</Option>
									<Option value="tugas">Tugas</Option>
								</Select>
							</FormItem>
							<FormItem label="Status">
								<Select name="status" defaultValue={data.status} style={{ width: '100%' }} size="large" disabled>
									<Option value="" disabled>
										Pilih Status
									</Option>
									<Option value="belum">Belum Dikirim</Option>
									<Option value="dikirim">Tugas Sudah dikirim</Option>
									<Option value="selesai">Selesai</Option>
								</Select>
							</FormItem>
							<FormItem label="Poin">
								<Input disabled value={data.point} />
							</FormItem>
							<FormItem label="Bukti" error={getErrorValue(errors.bukti, errorMessage?.bukti)} touched={touched.bukti}>
								<Input
									onChange={handleChange}
									onBlur={handleBlur}
									value={values.bukti}
									name="bukti"
									placeholder="Masukkan Bukti"
									disabled={data.tipe === 'pelanggaran'}
								/>
							</FormItem>
							<div className="flex justify-end">
								<button className="px-12 py-4 bg-blue text-white font-bold rounded-xl text-xl">Simpan</button>
							</div>
						</Form>
					)}
				</Formik>
			</div>
		</div>
	);
}

export default EditPoin;
