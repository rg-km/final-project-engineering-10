import { Form } from 'antd';
import { Formik } from 'formik';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import axiosConfig from '../../../utils/axiosConfig';
import BASE_URL from '../../../utils/config';
import { getErrorValue } from '../../../utils/getErrors';
import FormItem from '../../reusable/FormItem';
import Input from '../../reusable/Input';
import SubmitButton from '../../reusable/SubmitButton';
import { Toast } from '../../reusable/Toast';

const validationSchema = Yup.object().shape({
	email: Yup.string().email('Masukan alamat email yang valid').required('Email wajib diisi'),
	nama: Yup.string().required('Nama wajib diisi'),
	password: Yup.string().required('Password wajib diisi'),
	confirmation_password: Yup.string().test('passwords-match', 'Konfirmasi Password harus sama', function (value) {
		return this.parent.password === value;
	}),
	kode_sekolah: Yup.string().required('Kode Sekolah wajib diisi'),
});

function Register() {
	const initialState = {
		email: '',
		nama: '',
		password: '',
		confirmation_password: '',
		kode_sekolah: '',
		credit_score: '100',
	};

	const navigate = useNavigate();

	const [loading, setLoading] = useState(false);
	const [input, setInput] = useState(initialState);
	const [errorMessage, setErrorMessage] = useState({});
	const onSubmit = async values => {
		try {
			setLoading(true);
			const response = await axiosConfig.post(`${BASE_URL}/Guru/register/`, values);
			Toast.fire({
				icon: 'success',
				title: 'Berhasil Register! Silahkan Login',
			});
			navigate('/login');
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
		<div className="h-full ">
			<div className="w-144 px-12 py-16 bg-secondary mx-auto my-24 border-blue border-2 rounded-xl">
				<h1 className="text-center text-4xl font-bold">Register</h1>
				<h2 className="text-center text-xl font-bold mt-2">Silahkan Lengkapi Data Berikut</h2>
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
						<Form onFinish={handleSubmit} layout="vertical" className="mt-6 mx-4">
							<FormItem label="Email" error={getErrorValue(errors.email, errorMessage?.email)} touched={touched.email}>
								<Input
									onChange={handleChange}
									onBlur={handleBlur}
									value={values.email}
									name="email"
									placeholder="Masukkan Email anda"
								/>
							</FormItem>
							<FormItem label="Nama" error={getErrorValue(errors.nama, errorMessage?.nama)} touched={touched.nama}>
								<Input
									onChange={handleChange}
									onBlur={handleBlur}
									value={values.nama}
									name="nama"
									placeholder="Masukkan Nama Lengkap anda"
								/>
							</FormItem>
							<FormItem
								label="Password"
								error={getErrorValue(errors.password, errorMessage?.password)}
								touched={touched.password}
							>
								<Input
									onChange={handleChange}
									onBlur={handleBlur}
									value={values.password}
									name="password"
									placeholder="Masukkan Password anda"
									type="password"
								/>
							</FormItem>
							<FormItem
								label="Konfirmasi Password"
								error={getErrorValue(errors.confirmation_password, errorMessage?.confirmation_password)}
								touched={touched.confirmation_password}
							>
								<Input
									onChange={handleChange}
									onBlur={handleBlur}
									value={values.confirmation_password}
									name="confirmation_password"
									placeholder="Masukkan Konfirmasi Password anda"
									type="password"
								/>
							</FormItem>
							<FormItem
								label="Kode Sekolah"
								error={getErrorValue(errors.kode_sekolah, errorMessage?.kode_sekolah)}
								touched={touched.kode_sekolah}
							>
								<Input
									onChange={handleChange}
									onBlur={handleBlur}
									value={values.kode_sekolah}
									name="kode_sekolah"
									placeholder="Masukkan Kode Sekolah anda"
								/>
							</FormItem>
							<SubmitButton className="py-2 my-12" isSubmitting={isSubmitting} isValid={isValid} dirty={dirty}>
								Register
							</SubmitButton>
						</Form>
					)}
				</Formik>
			</div>
		</div>
	);
}

export default Register;
