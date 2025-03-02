export const Header: React.FC = () => {
	return (
		<header className="bg-neutral-900 text-white flex justify-between p-5">
			<h4 className="font-bold">ULTIMATE STAG GAMES</h4>

			<nav className="flex gap-4 ml-auto">
				<a href="/" className="hover:underline">
					Standings
				</a>
				<a href="/players" className="hover:underline">
					Players
				</a>
			</nav>
		</header>
	);
};
