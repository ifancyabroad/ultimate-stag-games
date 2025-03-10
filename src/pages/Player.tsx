import { useEffect, useState } from "react";
import { ATTRIBUTE_COLOUR_MAP, ATTRIBUTE_LABEL_MAP, ATTRIBUTES } from "common/utils/constants";
import { IPlayer } from "common/utils/types";
import { getPlayer } from "common/utils/database";
import { useParams } from "react-router";
import { Layout } from "common/components/Layout";
import { PageLoader } from "common/components/PageLoader";

const Player: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const [player, setPlayer] = useState<IPlayer | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		if (!id) {
			return;
		}

		const fetchPlayer = async () => {
			const data = await getPlayer(id);
			setPlayer(data);
			setIsLoading(false);
		};

		fetchPlayer();
	}, [id]);

	if (isLoading) {
		return <PageLoader />;
	}

	if (!player) {
		return null;
	}

	const { attributes, description, name } = player;

	return (
		<Layout>
			<div className="masthead__wrapper">
				<div className="masthead__background">
					<p className="text-4xl">Image</p>
				</div>
				<div className="masthead__content">
					<div className="mx-auto max-w-xl">
						<h1 className="mb-4 text-2xl font-medium uppercase">{name}</h1>
						<p>{description}</p>
					</div>
				</div>
			</div>
			<div className="p-5 md:py-10">
				<div className="mx-auto max-w-xl">
					<h2 className="mb-4 text-xl font-medium">ATTRIBUTES</h2>
					<div className="space-y-3">
						{ATTRIBUTES.map((attribute, index) => (
							<div key={index}>
								<p className="text-sm font-medium uppercase">{ATTRIBUTE_LABEL_MAP.get(attribute)}</p>
								<div className="mt-1 flex gap-1">
									{[...Array(5)].map((_, i) => (
										<div
											key={i}
											className={`h-4 flex-1 ${i < attributes[attribute] ? ATTRIBUTE_COLOUR_MAP.get(attribute) : "bg-neutral-700"}`}
										></div>
									))}
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
			<div className="p-5 md:py-10">
				<div className="mx-auto max-w-xl">
					<h2 className="mb-4 text-xl font-medium">POWER</h2>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
						labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
						laboris nisi ut aliquip ex ea commodo consequat.
					</p>
				</div>
			</div>
		</Layout>
	);
};

export default Player;
