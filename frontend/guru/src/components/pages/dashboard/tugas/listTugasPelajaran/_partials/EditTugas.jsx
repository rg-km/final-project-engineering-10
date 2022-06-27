import { Form, Select } from 'antd';
import { Formik } from 'formik';
import { useEffect, useState } from 'react';
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
	judul: Yup.string().required('Nama Tugas wajib diisi'),
	deskripsi: Yup.string().required('Deskripsi wajib diisi'),
});

const { Option } = Select;

function EditTugas() {
	const initialState = {
		judul: '',
		deskripsi: '',
		tipe: '',
	};

	const navigate = useNavigate();

	const [input, setInput] = useState(initialState);
	const [errorMessage, setErrorMessage] = useState({});
	const [data, setData] = useState({});
	const [loading, setLoading] = useState(false);
	const { mapelId, tugasId } = useParams();
	const { userData, loading: loadingUser, status, setUser } = useUserStore();

	const fetchFindTugas = async () => {
		try {
			setLoading(true);
			const response = await axiosConfig.get(`${BASE_URL}/Guru/${userData.id}/mapel/list/${mapelId}/tugas/${tugasId}/`);
			setData(response.data.data);
			setInput({
				judul: response.data.data.judul,
				deskripsi: response.data.data.deskripsi,
				tipe: response.data.data.tipe,
			});
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
			const response = await axiosConfig.put(
				`${BASE_URL}/Guru/${userData.id}/mapel/list/${mapelId}/tugas/${tugasId}/`,
				values
			);
			Toast.fire({
				icon: 'success',
				title: 'Berhasil Mengupdate Tugas',
			});
			navigate(`/dashboard/tugas/${mapelId}`);
		} catch (error) {
			console.log(error);
			Toast.fire({
				icon: 'error',
				title: 'Terdapat Kesalahan',
			});
		}
	};
	useEffect(() => {
		fetchFindTugas();
	}, []);

	return (
		<div>
			<h1 className="text-3xl font-bold">Tambah Tugas {mapelId}</h1>
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
								label="Nama Tugas"
								error={getErrorValue(errors.judul, errorMessage?.judul)}
								touched={touched.judul}
							>
								<Input
									onChange={handleChange}
									onBlur={handleBlur}
									value={values.judul}
									name="judul"
									placeholder="Masukkan nama tugas"
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
							<FormItem label="Tipe">
								<Input className="capitalize" disabled value={values.tipe} name="tipe" />
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

export default EditTugas;
