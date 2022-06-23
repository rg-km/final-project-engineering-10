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
			<Link
				to={`${record.nama_pelajaran}`}
				className="px-8 py-4 bg-primary text-black cursor-pointer font-bold rounded-xl hover:text-white"
			>
				Pilih
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

function SelectPelajaran() {
	return (
		<div>
			<div className="text-2xl font-bold mb-4">Pilih Mata Pelajaran</div>

			<Table pagination={false} columns={columns} dataSource={data} />
		</div>
	);
}

export default SelectPelajaran;
