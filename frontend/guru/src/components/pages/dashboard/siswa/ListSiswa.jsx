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
		title: 'Rata-rata',
		dataIndex: 'rata_rata',
		key: 'rata_rata',
		render: (_, record) => <p className="text-black">80</p>,
	},
];

function ListSiswa() {
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

export default ListSiswa;
