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
				<p className="text-black">{record.nama_kelas}</p>
		),
	},
	{
		title: 'Rata-Rata',
		dataIndex: 'rata-rata',
		key: 'rata-rata',
		render: (_, record) => (
				<p className="text-black">{record.rata_rata}</p>
		),
	},
	{
		title: 'Action',
		key: 'action',
		render: (_, record) => (
			<Link to="/dashboard/pelajaran/edit" className="flex gap-4 items-center justify-center">
				<img src="/image/dashboard/trash.svg" alt="edit" />
			</Link>
		),
	},
];

const data = [
	{
		key: '1',
		nama_pelajaran: 'Matematika',
	},
	{
		key: '2',
		nama_pelajaran: 'Agama',
	},
	{
		key: '3',
		nama_pelajaran: 'PKWN',
	},
];

function ListPelajaran() {
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState([]);
	const { userData } = useUserStore();

	const fetchPelajaran = async () => {
		try {
			setLoading(true);
			const response = await axiosConfig.get(`${BASE_URL}/siswa/${userData.id}/mapel/`);
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
					to="/dashboard/pelajaran/enroll"
					className="p-4 bg-blue flex items-center gap-2 font-bold text-lg text-white rounded-2xl"
				>
					<div>
						<img src="/image/dashboard/plus.svg" className="w-5" alt="" />
					</div>
					<label>Enroll Mata Pelajaran</label>
				</Link>
			</div>
			<Table pagination={false} columns={columns} dataSource={data} />
		</div>
	);
}

export default ListPelajaran;
