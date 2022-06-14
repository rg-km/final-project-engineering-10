import { Form } from 'antd';

function FormItem({ children, error, touched, ...other }) {
	return (
		<Form.Item
			validateStatus={error && touched ? 'error' : null}
			help={error && touched ? error : null}
			{...other}
		>
			{children}
		</Form.Item>
	);
}

export default FormItem;
