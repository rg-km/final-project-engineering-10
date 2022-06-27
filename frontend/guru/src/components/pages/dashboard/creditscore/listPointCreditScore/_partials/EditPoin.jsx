import { Form, Select } from 'antd';
import { Formik } from 'formik';
import { isEmpty } from 'lodash';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import useUserStore from '../../../../../../store/userStore';
import axiosConfig from '../../../../../../utils/axiosConfig';
import BASE_URL from '../../../../../../utils/config';
import { getErrorValue } from '../../../../../../utils/getErrors';
import FormItem from '../../../../../reusable/FormItem';
import Input from '../../../../../reusable/Input';
import Loading from '../../../../../reusable/Loading';
import { Toast } from '../../../../../reusable/Toast';

const validationSchema = Yup.object().shape({
	deskripsi: Yup.string().required('Nama Task wajib diisi'),
	status: Yup.string().required('Status wajib dipilih'),
});

const { Option } = Select;

function EditPoin() {
	const initialState = {
		deskripsi: '',
		bukti: '',
		status: '',
	};

	const { creditscoreId, siswaId } = useParams();
	const { userData, loading: loadingUser } = useUserStore();
	const [input, setInput] = useState(initialState);
	const [loading, setLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState({});
	const [data, setData] = useState([]);
	const navigate = useNavigate();

	const fetchFindCreditScore = async () => {
		try {
			setLoading(true);
			const response = await axiosConfig.get(`${BASE_URL}/Guru/${userData.id}/credit/${creditscoreId}/`);
			setInput({
				bukti: response.data.data.bukti,
				deskripsi: response.data.data.deskripsi,
				status: response.data.data.status,
			});
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
			const response = await axiosConfig.put(`${BASE_URL}/Guru/${userData.id}/credit/${creditscoreId}/`, values);
			Toast.fire({
				icon: 'success',
				title: 'Berhasil Mengupdate Tugas',
			});
			navigate(`/dashboard/credit-score/${siswaId}`);
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

	return loading || loadingUser ? (
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
							<FormItem label="Nama Siswa">
								<Input value={data.nama_siswa} disabled />
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
							<FormItem label="Poin">
								<Input disabled value={data.point} name="point" placeholder="Masukkan Jumlah Poin" />
							</FormItem>

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

							<FormItem
								label="Status"
								error={getErrorValue(errors.status, errorMessage?.status)}
								touched={touched.status}
							>
								<Select
									name="status"
									defaultValue={values.status}
									style={{ width: '100%' }}
									onBlur={() => setFieldTouched('status')}
									onChange={value => {
										setFieldValue('status', value);
									}}
									size="large"
								>
									<Option value="" disabled>
										Pilih Status
									</Option>
									<Option value="belum">Belum Dikirim</Option>
									<Option value="dikirim">Tugas Sudah dikirim</Option>
									<Option value="selesai">Selesai</Option>
								</Select>
							</FormItem>
							{values.bukti && (
								<FormItem
									label="Bukti"
									error={getErrorValue(errors.bukti, errorMessage?.bukti)}
									touched={touched.bukti}
								>
									<Input
										onChange={handleChange}
										onBlur={handleBlur}
										value={values.bukti}
										name="bukti"
										placeholder="Masukkan Bukti"
									/>
								</FormItem>
							)}

							<div className="flex justify-end">
								<button type="submit" className="px-12 py-4 bg-blue text-white font-bold rounded-xl text-xl">
									Simpan
								</button>
							</div>
						</Form>
					)}
				</Formik>
			</div>
		</div>
	);
}

export default EditPoin;
