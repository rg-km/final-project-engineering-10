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
	link_pengumpulan: Yup.string().required('Link Pengumpulan Tugas wajib diisi'),
});

const { Option } = Select;

function EditTugas() {
	const initialState = {
		link_pengumpulan: '',
	};

	const navigate = useNavigate();

	const [input, setInput] = useState(initialState);
	const [errorMessage, setErrorMessage] = useState({});
	const [data, setData] = useState({});
	const [loading, setLoading] = useState(false);
	const { mapelId, tugasId, linkId } = useParams();
	const { userData, loading: loadingUser, status, setUser } = useUserStore();

	const fetchFindPengumpulan = async () => {
		try {
			setLoading(true);
			const response = await axiosConfig.get(
				`${BASE_URL}/siswa/${userData.id}/mapel/${mapelId}/tugas/${tugasId}/pengumpulan/${linkId}/`
			);
			setData(response.data.data);
			setInput({
				link_pengumpulan: response.data.data.link_pengumpulan,
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
				`${BASE_URL}/siswa/${userData.id}/mapel/${mapelId}/tugas/${tugasId}/pengumpulan/${linkId}/`,
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
		fetchFindPengumpulan();
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
								label="Link Pengumpulan"
								error={getErrorValue(errors.link_pengumpulan, errorMessage?.link_pengumpulan)}
								touched={touched.link_pengumpulan}
							>
								<Input
									onChange={handleChange}
									onBlur={handleBlur}
									value={values.link_pengumpulan}
									name="link_pengumpulan"
									placeholder="Masukkan Link Pengumpulan"
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

export default EditTugas;
