import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

const antIcon = (
	<LoadingOutlined
		style={{
			fontSize: 50,
		}}
		spin
	/>
);

function Loading({ className }) {
	return (
		<div className={`w-full h-full flex items-center justify-center gap-8 text-2xl font-bold ${className}`}>
			Loading
			<Spin indicator={antIcon} />
		</div>
	);
}

export default Loading;
