import Icon, { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Input as InputTag } from 'antd';

function Input({ type, error, image, size, ...other }) {
	const sizeByScreen = 'large';
	if (type === 'password') {
		return (
			<InputTag.Password
				size={size ? size : sizeByScreen}
				prefix={image ? <Icon component={() => <img src={image} className="mr-1 w-5" />} /> : null}
				iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
				{...other}
			/>
		);
	} else if (type === 'textarea') {
		return <InputTag.TextArea size={size ? size : sizeByScreen} {...other} />;
	}
	return (
		<InputTag
			size={size ? size : sizeByScreen}
			prefix={image ? <Icon component={() => <img src={image} className="mr-1 w-5" />} /> : null}
			{...other}
		/>
	);
}

export default Input;
