import { Form, Select } from 'antd';
import { Formik } from 'formik';
import React, { useState } from 'react';
import * as Yup from 'yup';
import { getErrorValue } from '../../../../../../utils/getErrors';
import FormItem from '../../../../../reusable/FormItem';
import Input from '../../../../../reusable/Input';

const validationSchema = Yup.object().shape({
	deskripsi_poin: Yup.string().required('Nama Task wajib diisi'),
	tipe: Yup.string().required('Tipe Task wajib dipilih'),
	poin: Yup.number().typeError('Masukan Angka yang Valid').required('Poin Task wajib diisi'),
});

const { Option } = Select;

function CreatePoin() {
	const initialState = {
		deskripsi_poin: '',
		tipe: '',
		poin: '',
	};

	const onSubmit = values => {};
	const [input, setInput] = useState(initialState);
	const [errorMessage, setErrorMessage] = useState({});

	return (
		<div>
			<h1 className="text-3xl font-bold">Tambah Task</h1>
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
								label="Deskripsi Task"
								error={getErrorValue(errors.deskripsi_poin, errorMessage?.deskripsi_poin)}
								touched={touched.deskripsi_poin}
							>
								<Input
									onChange={handleChange}
									onBlur={handleBlur}
									value={values.deskripsi_poin}
									name="deskripsi_poin"
									placeholder="Masukkan Deskripsi Poin"
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
										Pilih Tipe Task
									</Option>
									<Option value="pelanggaran">Pelanggaran</Option>
									<Option value="tugas">Tugas</Option>
								</Select>
							</FormItem>
							<FormItem label="Poin" error={getErrorValue(errors.poin, errorMessage?.poin)} touched={touched.poin}>
								<Input
									onChange={handleChange}
									onBlur={handleBlur}
									value={values.poin}
									name="poin"
									placeholder="Masukkan Jumlah Poin"
								/>
							</FormItem>
							<div className="flex justify-end">
								<button className="px-12 py-4 bg-blue text-white font-bold rounded-xl text-xl">Buat Task</button>
							</div>
						</Form>
					)}
				</Formik>
			</div>
		</div>
	);
}

export default CreatePoin;