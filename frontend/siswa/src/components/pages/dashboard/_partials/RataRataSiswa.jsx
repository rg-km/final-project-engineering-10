import { Progress } from 'antd';
import { useEffect, useState } from 'react';
import useUserStore from '../../../../store/userStore';
import axiosConfig from '../../../../utils/axiosConfig';
import BASE_URL from '../../../../utils/config';
import { Toast } from '../../../reusable/Toast';
import Loading from './Loading';

function RataRataSiswa() {
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState(0);
	const { userData } = useUserStore();

	const fetchAvgSiswa = async () => {
		try {
			setLoading(true);
			const response = await axiosConfig.get(`${BASE_URL}/siswa/${userData.id}/avg/`);
			setData(response.data.rata_rata);
		} catch (error) {
			console.log(error);
			Toast.fire({
				icon: 'error',
				title: 'Terdapat Kesalahan',
			});
		} finally {
			setLoading(false);
		}
	};
	useEffect(() => {
		fetchAvgSiswa();
	}, []);

	return (
		<div className="w-full flex flex-col items-center">
			<h1 className="text-center mb-8 text-2xl">Rata-Rata {userData.nama}</h1>
			<Progress
				type="circle"
				strokeColor={{
					'0%': '#3D8AC1',
				}}
				width={350}
				percent={Number(data).toFixed(2)}
				format={percent => (loading ? <Loading /> : percent)}
			/>
		</div>
	);
}

export default RataRataSiswa;
