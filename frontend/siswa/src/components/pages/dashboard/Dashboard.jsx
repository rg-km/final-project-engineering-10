import CatatanMinat from './_partials/CatatanMinat';
import CreditScore from './_partials/CreditScore';
import RataRataMapel from './_partials/RataRataMapel';
import RataRataMapelSiswa from './_partials/RataRataMapelSiswa';
import RataRataSekolah from './_partials/RataRataSekolah';
import RataRataSiswa from './_partials/RataRataSiswa';

function Dashboard() {
	return (
		<div className="m-4">
			<h1 className="text-3xl font-bold">Dashboard</h1>
			<div>
				<div className="flex gap-20 justify-center my-8">
					<RataRataSekolah />
					<div className="border-r-2 border-primary my-8"></div>
					<RataRataSiswa />
				</div>
				<div className="border-b-2 border-primary w-5/6 mx-auto my-16"></div>
				<div className="flex gap-20 justify-center my-8">
					<RataRataMapel />
					<div className="border-r-2 border-primary my-8"></div>
					<RataRataMapelSiswa />
				</div>
				<div className="border-b-2 border-primary w-5/6 mx-auto my-16"></div>
				<div>
					<CreditScore />
				</div>
				<div className="border-b-2 border-primary w-5/6 mx-auto my-16"></div>
				<div>
					<CatatanMinat />
				</div>
			</div>
		</div>
	);
}

export default Dashboard;
