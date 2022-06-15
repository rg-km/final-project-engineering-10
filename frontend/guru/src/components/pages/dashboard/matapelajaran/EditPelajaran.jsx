import { Form } from 'antd';
import { Formik } from 'formik';
import React, { useState } from 'react';
import * as Yup from 'yup';
import { getErrorValue } from '../../../../utils/getErrors';
import FormItem from '../../../reusable/FormItem';
import Input from '../../../reusable/Input';

const validationSchema = Yup.object().shape({
	name: Yup.string().required('Nama Pelajaran wajib diisi'),
});

function EditPelajaran() {
	const initialState = {
		name: '',
	};

	const onSubmit = values => {};
	const [input, setInput] = useState(initialState);
	const [errorMessage, setErrorMessage] = useState({});

	return (
		<div>
			<h1 className="text-3xl font-bold">Edit Mata Pelajaran</h1>
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
							<FormItem label="Kode Mata Pelajaran">
								<Input disabled value="JKADUQ" />
							</FormItem>
							<FormItem
								label="Nama Lengkap"
								error={getErrorValue(errors.name, errorMessage?.name)}
								touched={touched.name}
							>
								<Input
									onChange={handleChange}
									onBlur={handleBlur}
									value={values.name}
									name="name"
									placeholder="Masukkan nama lengkap anda"
								/>
							</FormItem>
							<div className="flex justify-end">
								<button className="px-12 py-4 bg-blue text-white font-bold rounded-xl text-xl">Edit</button>
							</div>
						</Form>
					)}
				</Formik>
			</div>
		</div>
	);
}

export default EditPelajaran;
