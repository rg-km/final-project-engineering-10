import { Form } from 'antd';
import { Formik } from 'formik';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import axiosConfig from '../../../../utils/axiosConfig';
import BASE_URL from '../../../../utils/config';
import { getErrorValue } from '../../../../utils/getErrors';
import FormItem from '../../../reusable/FormItem';
import Input from '../../../reusable/Input';
import { Toast } from '../../../reusable/Toast';

const validationSchema = Yup.object().shape({
	Nama_kelas: Yup.string().required('Nama Pelajaran wajib diisi'),
});

function CreatePelajaran() {
	const initialState = {
		Nama_kelas: '',
	};

	const onSubmit = async values => {
		try {
			setLoading(true);
			const response = await axiosConfig.post(`${BASE_URL}/Mapel/create/`, values);
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
			<h1 className="text-3xl font-bold">Tambah Mata Pelajaran</h1>
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
								<button className="px-12 py-4 bg-blue text-white font-bold rounded-xl text-xl">Kirim</button>
							</div>
						</Form>
					)}
				</Formik>
			</div>
		</div>
	);
}

export default CreatePelajaran;
