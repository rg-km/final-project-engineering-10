import { Form } from 'antd';
import { Formik } from 'formik';
import React, { useState } from 'react';
import * as Yup from 'yup';
import { getErrorValue } from '../../../utils/getErrors';
import FormItem from '../../reusable/FormItem';
import Input from '../../reusable/Input';
import SubmitButton from '../../reusable/SubmitButton';

const validationSchema = Yup.object().shape({
	email: Yup.string().email("Masukan alamat email yang valid").required('Email wajib diisi'),
	password: Yup.string().required('Password wajib diisi'),
});

function Login() {
	const initialState = {
		email: '',
		password: '',
	};

	const [input, setInput] = useState(initialState);
	const [errorMessage, setErrorMessage] = useState({});
	const onSubmit = values => {};

	return (
		<div className="h-full ">
			<div className="w-144 px-12 py-16 bg-secondary mx-auto my-24 border-blue border-2 rounded-xl">
				<h1 className="text-center text-4xl font-bold">Login</h1>
				<h2 className="text-center text-xl font-bold mt-2">Silahkan Masukan Email dan Password</h2>
				<div>
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
								<FormItem
									label="Email"
									error={getErrorValue(errors.email, errorMessage?.email)}
									touched={touched.email}
								>
									<Input
										onChange={handleChange}
										onBlur={handleBlur}
										value={values.email}
										name="email"
										placeholder="Masukkan Email anda"
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
										placeholder="Masukkan password anda"
										type={'password'}
									/>
								</FormItem>
								<SubmitButton className="py-2 my-12">Login</SubmitButton>
							</Form>
						)}
					</Formik>
				</div>
			</div>
		</div>
	);
}

export default Login;
