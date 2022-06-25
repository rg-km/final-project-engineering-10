import { Table } from 'antd';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useUserStore from '../../../../store/userStore';
import axiosConfig from '../../../../utils/axiosConfig';
import BASE_URL from '../../../../utils/config';
import Loading from '../../../reusable/Loading';
import { Toast } from '../../../reusable/Toast';

const columns = [
	{
		title: 'No',
		dataIndex: 'no',
		key: 'no',
		render: (item, record, index) => <>{index + 1}</>,
	},
	{
		title: 'Nama Pelajaran',
		dataIndex: 'nama_kelas',
		key: 'nama_kelas',
		render: (_, record) => (
			<Link to={`/dashboard/pelajaran/${record.nama_kelas}`} className="h-full uppercase">
				<p className="text-black">{record.nama_kelas}</p>
			</Link>
		),
	},
	{
		title: 'Action',
		key: 'action',
		render: (_, record) => (
			<div className="flex gap-4 items-center">
				<Link to={`/dashboard/pelajaran/${record.kode_kelas}/edit`}>
					<img src="/image/dashboard/edit.svg" alt="edit" />
				</Link>
				<img src="/image/dashboard/trash.svg" alt="edit" />
			</div>
		),
	},
];

function ListPelajaran() {
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState([]);
	const { userData } = useUserStore();

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

	return loading ? (
		<Loading />
	) : (
		<div>
			<div className="text-2xl font-bold mb-4">List Mata Pelajaran</div>
			<div className="flex justify-end my-4">
				<Link
					to="/dashboard/pelajaran/create"
					className="p-4 bg-blue flex items-center gap-2 font-bold text-lg text-white rounded-2xl cursor-pointer"
				>
					<div>
						<img src="/image/dashboard/plus.svg" className="w-5" alt="" />
					</div>
					<p>Tambah Mata Pelajaran</p>
				</Link>
			</div>
			<Table pagination={false} rowKey="kode_kelas" columns={columns} dataSource={data} />
		</div>
	);
}

export default ListPelajaran;
