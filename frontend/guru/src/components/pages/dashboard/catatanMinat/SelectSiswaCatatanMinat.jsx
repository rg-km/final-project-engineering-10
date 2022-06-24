import { Table } from 'antd';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useUserStore from '../../../../store/userStore';
import axiosConfig from '../../../../utils/axiosConfig';
import BASE_URL from '../../../../utils/config';
import { Toast } from '../../../reusable/Toast';

const columns = [
	{
		title: 'No',
		dataIndex: 'no',
		key: 'no',
		render: (item, record, index) => <>{index + 1}</>,
	},
	{
		title: 'Nama Siswa',
		dataIndex: 'nama',
		key: 'nama',
		render: (_, record) => (
			<Link to={`${record.id}`}>
				<p className="text-black">{record.nama}</p>
			</Link>
		),
	},
	{
		title: 'Action',
		key: 'action',
		render: (_, record) => (
			<Link
				to={`${record.id}`}
				className="px-8 py-4 bg-primary text-black cursor-pointer font-bold rounded-xl hover:text-white"
			>
				Pilih
			</Link>
		),
	},
];

function SelectSiswaCatatanMinat() {
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState([]);
	const { userData, loading: loadingUser } = useUserStore();

	const fetchSiswa = async () => {
		try {
			setLoading(true);
			const response = await axiosConfig.get(`${BASE_URL}/siswa/`);
			setData(response.data.message);
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
		fetchSiswa();
	}, []);
	return (
		<div>
			<div className="text-2xl font-bold mb-4">List Siswa Pada Sekolah</div>
			<Table pagination={false} rowKey="id" columns={columns} dataSource={data} />
		</div>
	);
}

export default SelectSiswaCatatanMinat;
