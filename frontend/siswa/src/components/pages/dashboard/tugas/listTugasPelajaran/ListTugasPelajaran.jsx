import { Table } from 'antd';
import { isEmpty } from 'lodash';
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
		title: 'Judul',
		dataIndex: 'judul',
		key: 'judul',
	},
	{
		title: 'Deskripsi',
		dataIndex: 'deskripsi',
		key: 'deskripsi',
	},
	{
		title: 'Tipe',
		dataIndex: 'tipe',
		key: 'tipe',
	},
	{
		title: 'Status',
		dataIndex: 'status',
		key: 'status',
	},
	{
		title: 'Action',
		key: 'action',
		render: (_, record) => (
			<div className="flex gap-4 items-center justify-center">
				<Link to={`edit/${record.id}/${record.id_pengumpulan}`}>
					<img src="/image/dashboard/edit.svg" alt="edit" />
				</Link>
			</div>
		),
	},
];

function ListTugasPelajaran() {
	const { mapelId } = useParams();
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState([]);
	const { userData, loading: loadingUser } = useUserStore();

	const fetchTugasPelajaran = async () => {
		try {
			setLoading(true);
			const response = await axiosConfig.get(`${BASE_URL}/siswa/${userData.id}/mapel/${mapelId}/tugas/`);
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
		if (!isEmpty(userData)) {
			fetchTugasPelajaran();
		}
	}, [userData]);
	return (
		<div>
			<div className="text-2xl font-bold mb-4">List Tugas Mapel {mapelId}</div>
			<Table pagination={false} columns={columns} dataSource={data} />
		</div>
	);
}

export default ListTugasPelajaran;
