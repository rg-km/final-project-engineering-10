import { Progress, Table, Tag } from 'antd';
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
		title: 'Deskripsi Poin',
		dataIndex: 'deskripsi',
		key: 'deskripsi',
	},
	{
		title: 'Tipe',
		dataIndex: 'tipe',
		key: 'tipe',
		render: tipe => {
			let color;
			let caption;

			if (tipe === 'tugas') {
				color = '#2F71EB';
				caption = 'Tugas';
			} else if (tipe === 'pelanggaran') {
				color = '#FC3E32';
				caption = 'Pelanggaran';
			}

			return (
				<div className="flex justify-center ">
					<Tag className="text-lg" color={color}>
						{caption}
					</Tag>
				</div>
			);
		},
	},
	{
		title: 'Status',
		dataIndex: 'status',
		key: 'status',
		render: status => {
			let color;
			let caption;

			if (status === 'belum') {
				color = '#F9B577';
				caption = 'Belum Mengumpulkan';
			} else if (status === 'dikirim') {
				color = '#2F71EB';
				caption = 'Bukti Telah dikirim';
			} else if (status === 'berhasil') {
				color = '#A1FF80';
				caption = 'Selesai';
			}

			return (
				<div className="flex justify-center ">
					<Tag className="text-lg" color={color}>
						{caption}
					</Tag>
				</div>
			);
		},
	},
	{
		title: 'Poin',
		dataIndex: 'point',
		key: 'point',
		render: (_, record) => <p>{record.tipe === 'tugas' ? record.point : -1 * record.point}</p>,
	},
	{
		title: 'Action',
		key: 'action',
		render: (_, record) => (
			<Link to={`edit/${record.id}`} className="flex gap-4 items-center justify-center">
				<img src="/image/dashboard/edit.svg" alt="edit" />
			</Link>
		),
	},
];

const list = [
	{
		key: '1',
		deskripsi_poin: 'Nyontek',
		tipe: 'pelanggaran',
		status: 'selesai',
		poin: -10,
	},
	{
		key: '2',
		deskripsi_poin: 'Membantu Guru',
		tipe: 'tugas',
		status: 'dikirim',
		poin: 10,
	},
	{
		key: '3',
		deskripsi_poin: 'Membersihkan Kelas',
		tipe: 'tugas',
		status: 'selesai',
		poin: 20,
	},
	{
		key: '4',
		deskripsi_poin: 'Membersihkan Taman',
		tipe: 'tugas',
		status: 'belum',
		poin: 20,
	},
];

function ListPointCreditScore() {
	const { siswaId } = useParams();
	const [loading, setLoading] = useState(0);
	const [data, setData] = useState({});
	const [listPoin, setListPoin] = useState([]);
	const { userData, loading: loadingUser } = useUserStore();

	const fetchSiswa = async () => {
		try {
			setLoading(loading + 1);
			const response = await axiosConfig.get(`${BASE_URL}/siswa/${siswaId}/`);
			setData(response.data.data);
		} catch (error) {
			console.log(error);
			Toast.fire({
				icon: 'error',
				title: 'Terdapat Kesalahan',
			});
		} finally {
			setLoading(loading - 1);
		}
	};

	const fetchPoin = async () => {
		try {
			setLoading(loading + 1);
			const response = await axiosConfig.get(`${BASE_URL}/Guru/${userData.id}/credit/siswa/${siswaId}/`);
			setListPoin(response.data.data);
		} catch (error) {
			console.log(error);
			Toast.fire({
				icon: 'error',
				title: 'Terdapat Kesalahan',
			});
		} finally {
			setLoading(loading - 1);
		}
	};

	useEffect(() => {
		fetchSiswa();
		fetchPoin();
	}, []);

	return (
		<div>
			<div className="text-2xl font-bold mb-4">Total Credit Score Siswa</div>
			<div className="flex justify-center my-8">
				<Progress
					type="circle"
					strokeColor={{
						'0%': '#2F71EB',
						'70%': '#A1FF80',
					}}
					format={percent => `${percent}.0`}
					percent={data.credit_score}
					width={200}
				/>
			</div>
			<div className="text-2xl font-bold mb-4">List Credit Score Siswa</div>
			<div className="flex justify-end my-4">
				<Link
					to="create"
					className="p-4 bg-blue flex items-center gap-2 font-bold text-lg text-white rounded-2xl cursor-pointer"
				>
					<div>
						<img src="/image/dashboard/plus.svg" className="w-5" alt="" />
					</div>
					<label>Tambah Poin</label>
				</Link>
			</div>
			<Table pagination={false} columns={columns} dataSource={listPoin} />
		</div>
	);
}

export default ListPointCreditScore;
