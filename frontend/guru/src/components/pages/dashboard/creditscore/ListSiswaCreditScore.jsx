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
		title: 'Nama Siswa',
		dataIndex: 'nama_siswa',
		key: 'nama_siswa',
		render: (_, record) => (
			<Link to={record.nama_siswa}>
				<p>{record.nama_siswa}</p>
			</Link>
		),
	},
	{
		title: 'Credit Score',
		dataIndex: 'credit_score',
		key: 'credit_score',
	},
	{
		title: 'Action',
		key: 'action',
		render: (_, record) => (
			<div className="flex gap-4 items-center justify-center">
				<img src="/image/dashboard/edit.svg" alt="edit" />
			</div>
		),
	},
];

const data = [
	{
		key: '1',
		nama_siswa: 'Farhan',
		credit_score: 80,
	},
	{
		key: '2',
		nama_siswa: 'Hesi',
		credit_score: 85,
	},
	{
		key: '3',
		nama_siswa: 'Saifulloh',
		credit_score: 86,
	},
];

function ListSiswaCreditScore() {
	return (
		<div>
			<div className="text-2xl font-bold mb-4">List Credit Score Siswa</div>
			<Table pagination={false} columns={columns} dataSource={data} />
		</div>
	);
}

export default ListSiswaCreditScore;
