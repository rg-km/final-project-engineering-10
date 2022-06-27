import { Progress } from 'antd';
import useUserStore from '../../../../store/userStore';

function CreditScore() {
	const { userData } = useUserStore();

	return (
		<div className="w-full flex flex-col items-center">
			<h1 className="text-center mb-8 text-2xl">Credit Score</h1>
			<Progress
				type="circle"
				width={500}
				strokeColor={{
					'0%': '#2F71EB',
					'70%': '#A1FF80',
				}}
				format={percent => `${percent}.0`}
				percent={userData.credit_score}
			/>
		</div>
	);
}

export default CreditScore;
