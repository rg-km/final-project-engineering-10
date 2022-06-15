import { Table, Tag } from 'antd';
import React from 'react';

const columns = [
	{
		title: 'No',
		dataIndex: 'no',
		key: 'no',
		render: (item, record, index) => <>{index + 1}</>,
		className: 'text-center',
	},
	{
		title: 'Nama Tugas',
		dataIndex: 'nama_tugas',
		key: 'nama_tugas',
		className: 'text-center',
	},
	{
		title: 'Nilai Tugas',
		dataIndex: 'nilai_tugas',
		key: 'nilai_tugas',
		className: 'text-center',
	},
	{
		className: 'text-center',
		title: 'Status',
		key: 'status',
		dataIndex: 'status',
		render: status => {
			let color;
			let caption;

			if (status === 'belum') {
				color = '#F9B577';
				caption = 'Belum Mengumpulkan';
			} else if (status === 'review') {
				color = '#2F71EB';
				caption = 'Sedang dalam penilaian';
			} else if (status === 'lulus') {
				color = '#A1FF80';
				caption = 'Lulus';
			} else {
				color = '#FC3E32';
				caption = 'Tidak Lulus';
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
		className: 'text-center',
		title: 'Action',
		key: 'action',
		render: (_, record) => (
			<div>
				<img src="/image/dashboard/file.svg" alt="edit" />
			</div>
		),
	},
];

const data = [
	{
		key: '1',
		nama_tugas: 'Aljabar',
		nilai_tugas: '-',
		status: 'belum',
	},
	{
		key: '2',
		nama_tugas: 'Perkalian',
		nilai_tugas: '-',
		status: 'review',
	},
	{
		key: '3',
		nama_tugas: 'Pertambahan',
		nilai_tugas: 95,
		status: 'lulus',
	},
	{
		key: '4',
		nama_tugas: 'Pembagian',
		nilai_tugas: 40,
		status: 'tidak_lulus',
	},
	{
		key: '5',
		nama_tugas: 'Pertambahan',
		nilai_tugas: 95,
		status: 'lulus',
	},
];

function ListPelajaranSiswa() {
	return (
		<div>
			<div className="text-2xl font-bold mb-4">List Tugas Matematika</div>
			<Table rowClassName={'text-center'} pagination={false} columns={columns} dataSource={data} />
		</div>
	);
}

export default ListPelajaranSiswa;
