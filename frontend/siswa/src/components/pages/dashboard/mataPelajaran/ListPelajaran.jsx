import { Table } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

const columns = [
	{
		title: 'No',
		dataIndex: 'no',
		key: 'no',
		render: (item, record, index) => <>{index + 1}</>,
	},
	{
		title: 'Nama Pelajaran',
		dataIndex: 'nama_pelajaran',
		key: 'nama_pelajaran',
		render: (_, record) => (
			<Link to={`/dashboard/pelajaran/${record.nama_pelajaran}`} className="h-full">
				<p className="text-black">{record.nama_pelajaran}</p>
			</Link>
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
	return (
		<div>
			<div className="text-2xl font-bold mb-4">List Mata Pelajaran</div>
			<div className="flex justify-end my-4">
				<Link
					to="/dashboard/pelajaran/create"
					className="p-4 bg-blue flex items-center gap-2 font-bold text-lg text-white rounded-2xl"
				>
					<div>
						<img src="/image/dashboard/plus.svg" className="w-5" alt="" />
					</div>
					<label>Tambah Mata Pelajaran</label>
				</Link>
			</div>
			<Table pagination={false} columns={columns} dataSource={data} />
		</div>
	);
}

export default ListPelajaran;
