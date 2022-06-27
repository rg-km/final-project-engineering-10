import { Progress, Select } from 'antd';
import { useEffect, useState } from 'react';
import useUserStore from '../../../../store/userStore';
import axiosConfig from '../../../../utils/axiosConfig';
import BASE_URL from '../../../../utils/config';
import { Toast } from '../../../reusable/Toast';
import Loading from './Loading';

const { Option } = Select;

function RataRataMapelSiswa() {
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState(0);
	const [mapel, setMapel] = useState([]);
	const [mapelSelected, setMapelSelected] = useState(null);
	const { userData } = useUserStore();

	const fetchAvgMapelSiswa = async () => {
		try {
			setLoading(true);
			const response = await axiosConfig.get(`${BASE_URL}/siswa/${userData.id}/avg/${mapelSelected}/me/`);
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

	const fetchMapelSekolah = async () => {
		try {
			setLoading(true);
			const response = await axiosConfig.get(`${BASE_URL}/siswa/${userData.id}/mapel/`);
			setMapel(response.data.data);
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
		if (mapelSelected) {
			fetchAvgMapelSiswa();
		}
	}, [mapelSelected]);

	useEffect(() => {
		fetchMapelSekolah();
	}, []);

	const onChange = value => {
		setMapelSelected(value);
	};

	return (
		<div className="w-full flex flex-col items-center">
			<div className="flex justify-between items-center w-full mb-8">
				<h1 className="text-2xl">
					Rata-Rata Nilai <br /> {userData.nama} per mapel
				</h1>
				<Select
					showSearch
					placeholder="Pilih mata pelajaran"
					size="large"
					optionFilterProp="children"
					onChange={onChange}
					className="w-48"
					filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
				>
					{mapel.map(item => (
						<Option value={item.kode_kelas}>{item.nama_kelas}</Option>
					))}
				</Select>
			</div>
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

export default RataRataMapelSiswa;
