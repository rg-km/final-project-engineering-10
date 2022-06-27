function Dashboard() {
	return (
		<div className="">
			<h1 className="text-3xl font-bold">Dashboard</h1>
			<div className="flex gap-10 justify-center">
				<div>
					<h2 className="text-center text-2xl font-bold my-5">Profil Sekolah</h2>
					<div className="bg-[#FF985E] bg-opacity-80 w-full rounded-2xl p-4 flex flex-col items-center justify-center">
						<div>
							<img src="/image/dashboard/building.svg" className="w-40" alt="" />
						</div>
						<div className="my-4 grid grid-cols-7 text-lg font-bold gap-3 justify-center items-center text-center">
							<div className="py-3 px-2 bg-white rounded-lg col-span-3">Nama Sekolah</div>
							<div className="py-3 px-2 bg-white rounded-lg col-span-1">:</div>
							<div className="py-3 px-2 bg-white rounded-lg col-span-3">SMAN 08 Pekanbaru</div>
							<div className="py-3 px-2 bg-white rounded-lg col-span-3">Kepala Sekolah</div>
							<div className="py-3 px-2 bg-white rounded-lg col-span-1">:</div>
							<div className="py-3 px-2 bg-white rounded-lg col-span-3">Hehe.Msc</div>
							<div className="py-3 px-2 bg-white rounded-lg col-span-3">Kode Sekolah</div>
							<div className="py-3 px-2 bg-white rounded-lg col-span-1">:</div>
							<div className="py-3 px-2 bg-white rounded-lg col-span-3">SMAN 08 Pekanbaru</div>
						</div>
					</div>
				</div>
				<div>
					<h2 className="text-center text-2xl font-bold my-5">Profil Guru</h2>
					<div className="bg-[#9747FF] bg-opacity-80 w-full rounded-2xl p-4 flex flex-col items-center justify-center">
						<div>
							<img src="/image/dashboard/profile.svg" className="w-40" alt="" />
						</div>
						<div className="my-4 grid grid-cols-7 text-lg font-bold gap-3 justify-center items-center text-center">
							<div className="py-3 px-2 bg-white rounded-lg col-span-3">Nama Guru</div>
							<div className="py-3 px-2 bg-white rounded-lg col-span-1">:</div>
							<div className="py-3 px-2 bg-white rounded-lg col-span-3">Farhan</div>
							<div className="py-3 px-2 bg-white rounded-lg col-span-3">Email</div>
							<div className="py-3 px-2 bg-white rounded-lg col-span-1">:</div>
							<div className="py-3 px-2 bg-white rounded-lg col-span-3 overflow-auto">arhandev.code@gmail.com</div>
							<div className="py-3 px-2 bg-white rounded-lg col-span-3">Kode Sekolah</div>
							<div className="py-3 px-2 bg-white rounded-lg col-span-1">:</div>
							<div className="py-3 px-2 bg-white rounded-lg col-span-3">SMAN 08 Pekanbaru</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Dashboard;
