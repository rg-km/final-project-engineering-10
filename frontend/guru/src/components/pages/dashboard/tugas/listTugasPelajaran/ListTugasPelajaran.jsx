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
		title: 'Action',
		key: 'action',
		render: (_, record) => (
			<div className="flex gap-4 items-center justify-center">
				<Link to={`edit/${record.id}`}>
					<img src="/image/dashboard/edit.svg" alt="edit" />
				</Link>
				<img src="/image/dashboard/trash.svg" alt="edit" />
			</div>
		),
	},
];

function ListTugasPelajaran() {
	const { mapelId } = useParams();
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState([]);
	const { userData, loading: loadingUser } = useUserStore();

	const fetchPelajaran = async () => {
		try {
			setLoading(true);
			const response = await axiosConfig.get(`${BASE_URL}/Guru/${userData.id}/mapel/list/${mapelId}/tugas/`);
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
		fetchPelajaran();
	}, []);
	return (
		<div>
			<div className="text-2xl font-bold mb-4">List Tugas Mapel {mapelId}</div>
			<div className="flex justify-end my-4">
				<Link to="create" className="p-4 bg-blue flex items-center gap-2 font-bold text-lg text-white rounded-2xl">
					<div>
						<img src="/image/dashboard/plus.svg" className="w-5" alt="" />
					</div>
					<label>Tambah Tugas</label>
				</Link>
			</div>
			<Table pagination={false} columns={columns} dataSource={data} />
		</div>
	);
}

export default ListTugasPelajaran;
