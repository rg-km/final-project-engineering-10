import { Table } from 'antd';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
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
		title: 'Minat',
		dataIndex: 'minat',
		key: 'minat',
		render: (_, record) => <p className="text-black">{record.minat}</p>,
	},
];

function CatatanMinat() {
	const { siswaId } = useParams();
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState([]);
	const { userData, loading: loadingUser } = useUserStore();

	const fetchMinat = async () => {
		try {
			setLoading(true);
			const response = await axiosConfig.get(`${BASE_URL}/siswa/${userData.id}/minat/`);
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
		fetchMinat();
	}, []);

	return (
		<div>
			<div>
				<div className="text-2xl font-bold mb-4">List Catatan Minat</div>
			</div>
			<Table columns={columns} dataSource={data} rowKey="id" pagination={false} />
			<Link to={'/dashboard/catatan-minat'} className="flex justify-center">
				<button className="py-3 px-4 w-40 bg-primary text-white my-8 rounded-full font-bold text-lg">
					Selengkapnya
				</button>
			</Link>
		</div>
	);
}

export default CatatanMinat;
