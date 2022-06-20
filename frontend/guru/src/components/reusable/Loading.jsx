import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import React from 'react';

const antIcon = (
	<LoadingOutlined
		style={{
			fontSize: 80,
		}}
		spin
	/>
);

function Loading({ className }) {
	return (
		<div className={`w-full h-full flex items-center justify-center gap-10 text-4xl font-bold ${className}`}>
			Loading ...
			<Spin indicator={antIcon} />
		</div>
	);
}

export default Loading;
