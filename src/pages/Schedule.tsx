import { Layout } from "common/components/Layout";

const Schedule: React.FC = () => {
	return (
		<Layout>
			<div className="title__wrapper">
				<div className="title__content">
					<h1 className="mb-2 text-center text-2xl font-medium uppercase md:text-4xl">Schedule</h1>
					<p className="text-center">What's happening and when.</p>
				</div>
			</div>
			<div className="p-5 md:py-10">
				<div className="mx-auto max-w-xl">
					<div className="space-y-4">
						<div>
							<h3 className="mb-2 text-lg font-medium">9:00AM - 10:00AM</h3>
							<h2 className="mb-2 text-xl font-bold text-red-900">Parkrun</h2>
							<p>
								<strong>Description:</strong> 5km race around a park, suitable for all abilities.
							</p>
							<p>
								<strong>Location:</strong> TBC
							</p>
						</div>
						<hr className="border-neutral-300" />
						<div>
							<h3 className="mb-2 text-lg font-medium">10:00AM - 12:30PM</h3>
							<h2 className="mb-2 text-xl font-bold text-blue-600">Rest</h2>
							<p>
								<strong>Description:</strong> Breakfast and chill time until the next event starts.
							</p>
						</div>
						<hr className="border-neutral-300" />
						<div>
							<h3 className="mb-2 text-lg font-medium">12:30PM - 1:30PM</h3>
							<h2 className="mb-2 text-xl font-bold text-red-900">Axeperience</h2>
							<p>
								<strong>Description:</strong> One hour of slinging axes and sinking bullseyes, including
								training, a tournament and trickshots.
							</p>
							<p>
								<strong>Location:</strong> Basement Floor 48-51 Minories and 6 Portsoken Street London
								EC3N 1JJ
							</p>
						</div>
						<hr className="border-neutral-300" />
						<div>
							<h3 className="mb-2 text-lg font-medium">3:00PM - 6:00PM</h3>
							<h2 className="mb-2 text-xl font-bold text-red-900">Bad Moon Cafe</h2>
							<p>
								<strong>Description:</strong> Easygoing board game venue serving sandwiches & pizza,
								plus beer & coffee.
							</p>
							<p>
								<strong>Location:</strong> 159a Great Dover St, London SE1 4GZ
							</p>
						</div>
						<hr className="border-neutral-300" />
						<div>
							<h3 className="mb-2 text-lg font-medium">7:00PM - 11:00PM</h3>
							<h2 className="mb-2 text-xl font-bold text-red-900">Four Quarters</h2>
							<p>
								<strong>Description:</strong> Relaxed watering hole with arcade & console games, dishing
								up diner staples like burgers & hot dogs.
							</p>
							<p>
								<strong>Location:</strong> Elephant Park 20 Ash Avenue, London, SE17 1GQ
							</p>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default Schedule;
