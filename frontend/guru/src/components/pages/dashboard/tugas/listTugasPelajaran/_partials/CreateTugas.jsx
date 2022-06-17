import { Form, Select } from 'antd';
import { Formik } from 'formik';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { getErrorValue } from '../../../../../../utils/getErrors';
import FormItem from '../../../../../reusable/FormItem';
import Input from '../../../../../reusable/Input';

const validationSchema = Yup.object().shape({
	nama_tugas: Yup.string().required('Nama Tugas wajib diisi'),
});

const { Option } = Select;

function CreateTugas() {
	const initialState = {
		nama_tugas: '',
		tipe: '',
	};

	const onSubmit = values => {};
	const [input, setInput] = useState(initialState);
	const [errorMessage, setErrorMessage] = useState({});
	const { mapel } = useParams();

	return (
		<div>
			<h1 className="text-3xl font-bold">Tambah Tugas {mapel}</h1>
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
								error={getErrorValue(errors.nama_tugas, errorMessage?.nama_tugas)}
								touched={touched.nama_tugas}
							>
								<Input
									onChange={handleChange}
									onBlur={handleBlur}
									value={values.nama_tugas}
									name="nama_tugas"
									placeholder="Masukkan nama tugas"
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
										Pilih Tipe Tugas
									</Option>
									<Option value="PR">PR</Option>
									<Option value="Ulangan">Ulangan</Option>
									<Option value="Kuis">Kuis</Option>
								</Select>
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

export default CreateTugas;
