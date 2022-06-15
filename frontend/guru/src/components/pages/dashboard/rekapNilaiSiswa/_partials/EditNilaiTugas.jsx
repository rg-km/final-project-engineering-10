import { Form } from 'antd';
import { Formik } from 'formik';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { getErrorValue } from '../../../../../utils/getErrors';
import FormItem from '../../../../reusable/FormItem';
import Input from '../../../../reusable/Input';

const validationSchema = Yup.object().shape({
	nilai: Yup.number().typeError('Tolong masukan angka yang valid').required('Nilai Tugas wajib diisi'),
});

function EditNilaiTugas() {
	const { mapel, nama, tugas } = useParams();

	const initialState = {
		name: '',
	};
	const onSubmit = values => {};
	const [input, setInput] = useState(initialState);
	const [errorMessage, setErrorMessage] = useState({});
	return (
		<div>
			<h1 className="text-3xl font-bold">Ubah Nilai {tugas}</h1>
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
							<FormItem label="Tipe Nilai">
								<Input value="Ulangan" disabled />
							</FormItem>
							<FormItem label="Nilai" error={getErrorValue(errors.nilai, errorMessage?.nilai)} touched={touched.nilai}>
								<Input
									onChange={handleChange}
									onBlur={handleBlur}
									value={values.nilai}
									name="nilai"
									placeholder={`Masukkan Nilai ${tugas}`}
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

export default EditNilaiTugas;
