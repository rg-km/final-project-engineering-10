import { Table } from 'antd';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import useUserStore from '../../../../../store/userStore';
import axiosConfig from '../../../../../utils/axiosConfig';
import BASE_URL from '../../../../../utils/config';
import { Toast } from '../../../../reusable/Toast';

const columns = [
	{
		title: 'No',
		dataIndex: 'no',
		key: 'no',
		render: (item, record, index) => <>{index + 1}</>,
	},
	{
		title: 'Nama Siswa',
		dataIndex: 'nama_siswa',
		key: 'nama_siswa',
		render: (_, record) => (
			<Link to={`${record.nama_siswa}`} className="h-full">
				<p className="text-black">{record.nama_siswa}</p>
			</Link>
		),
	},
	{
		title: 'Rata-rata',
		dataIndex: 'rata_rata',
		key: 'rata_rata',
	},
	{
		title: 'Action',
		key: 'action',
		render: (_, record) => (
			<div className="flex gap-4 items-center justify-center">
				<img src="/image/dashboard/edit.svg" alt="edit" />
				<img src="/image/dashboard/trash.svg" alt="edit" />
			</div>
		),
	},
];

function ListSiswaPelajaran() {
	const { mapel } = useParams();
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState([]);
	const { userData, loading: loadingUser, status, setUser } = useUserStore();

	const fetchPelajaran = async () => {
		try {
			setLoading(true);
			const response = await axiosConfig.get(`${BASE_URL}/Guru/${userData.id}/mapel/`);
			setData(response.data.data);
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
		fetchPelajaran();
	}, []);

	return (
		<div>
			<div className="text-2xl font-bold mb-4">List Siswa Mapel {mapel}</div>
			<Table pagination={false} columns={columns} dataSource={data} />
		</div>
	);
}

export default ListSiswaPelajaran;
