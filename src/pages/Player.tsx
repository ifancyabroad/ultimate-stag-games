import { Fragment, useEffect, useState } from "react";
import { ATTRIBUTE_COLOUR_MAP, ATTRIBUTE_LABEL_MAP, ATTRIBUTES, MAIN_IMAGES } from "common/utils/constants";
import { IPlayer, IPower } from "common/utils/types";
import { getPlayer } from "common/utils/database";
import { useParams } from "react-router";
import { Layout } from "common/components/Layout";
import { PageLoader } from "common/components/PageLoader";
import { ModalPassword } from "common/components/ModalPassword";

interface IProps {
	player: IPlayer;
	secretPower: IPower;
}

const SecretPower: React.FC<IProps> = ({ player, secretPower }) => {
	const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
	const [isSecretPowerVisible, setIsSecretPowerVisible] = useState(false);
	const password = secretPower.name.replace(/\s/g, "").toLowerCase();
	const isPasswordEntered = localStorage.getItem(player.id) === password;
	const showSecretPower = isPasswordEntered || isSecretPowerVisible;

	const handleOpenPasswordModal = () => {
		setIsPasswordModalOpen(true);
	};

	const handleClosePasswordModal = () => {
		setIsPasswordModalOpen(false);
	};

	const handlePasswordEntered = () => {
		if (!player) {
			return;
		}
		localStorage.setItem(player.id, password);
		setIsSecretPowerVisible(true);
	};

	if (showSecretPower) {
		return (
			<p>
				<strong>{secretPower.name}:</strong> {secretPower.description}
			</p>
		);
	}

	return (
		<Fragment>
			<button onClick={handleOpenPasswordModal} className="cursor-pointer font-medium text-red-900 underline">
				View Secret Power
			</button>
			<ModalPassword
				isOpen={isPasswordModalOpen}
				password={password}
				handleSuccess={handlePasswordEntered}
				handleClose={handleClosePasswordModal}
			/>
		</Fragment>
	);
};

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

	const { attributes, description, name, power, secretPower, shortName } = player;
	const image = MAIN_IMAGES.get(shortName.toLowerCase());

	return (
		<Layout>
			<div className="masthead__wrapper">
				<div
					className="masthead__background"
					style={{
						backgroundImage: `url(${image})`,
					}}
				/>
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
					<h2 className="mb-4 text-xl font-medium">POWERS</h2>
					<p className="mb-8">
						<strong>{power.name}:</strong> {power.description}
					</p>
					{secretPower && <SecretPower player={player} secretPower={secretPower} />}
				</div>
			</div>
		</Layout>
	);
};

export default Player;
