import { Layout } from "common/components/Layout";

const Spells: React.FC = () => {
	return (
		<Layout>
			<div className="title__wrapper">
				<div className="title__content">
					<h1 className="mb-2 text-center text-2xl font-medium uppercase md:text-4xl">Arcana Obscura</h1>
					<p className="text-center">How they work and how to use them.</p>
				</div>
			</div>
			<div className="p-5 md:py-10">
				<div className="mx-auto max-w-4xl">
					<p className="mb-4">
						Legends whisper that the <strong>Arcana Obscura</strong> dice were not crafted by mortal hands
						but were discovered , hidden deep within the vaults of a long-lost sorcerer’s sanctum. Scholars
						believe they were forged in a time when magic was raw and untamed, when spells were not learned,
						but earned through sacrifice and secrets traded in shadowed halls.
					</p>
					<p>
						It is said that those who roll these dice might feel a fleeting sensation—a brush of unseen
						fingers, the echo of a distant incantation, or the flicker of golden glyphs in their peripheral
						vision. Whether this is mere legend or something more is for the wielder to decide.
					</p>
				</div>
			</div>
			<div className="p-5 md:py-10">
				<div className="mx-auto max-w-4xl">
					<table className="w-full table-auto border-collapse border border-neutral-300">
						<thead className="bg-neutral-100 text-left text-sm font-medium">
							<tr>
								<th className="border border-neutral-300 px-4 py-2">Dice</th>
								<th className="border border-neutral-300 px-4 py-2">Spell</th>
								<th className="border border-neutral-300 px-4 py-2">Effects</th>
							</tr>
						</thead>
						<tbody className="text-sm">
							<tr>
								<td className="border border-neutral-300 px-4 py-2">D4</td>
								<td className="border border-neutral-300 px-4 py-2">Fireball</td>
								<td className="border border-neutral-300 px-4 py-2">
									Choose a target and roll. Deduct the result from their bonus points.
								</td>
							</tr>
							<tr>
								<td className="border border-neutral-300 px-4 py-2">D6</td>
								<td className="border border-neutral-300 px-4 py-2">Counterspell</td>
								<td className="border border-neutral-300 px-4 py-2">
									<p className="mb-2">Roll then apply the result to the last spell that was cast.</p>
									<ul className="mb-2 list-disc pl-5">
										<li>1-2 = no effect</li>
										<li>3-4 = cancel the spell</li>
										<li>5-6 = cancel the spell or choose a new target for it if applicable</li>
									</ul>
									<p>
										*Note: The time to cast counterspell is immediately after the effects of the
										last spell are determined. It can be cast regardless of what the effect is.
									</p>
								</td>
							</tr>
							<tr>
								<td className="border border-neutral-300 px-4 py-2">D8</td>
								<td className="border border-neutral-300 px-4 py-2">Duel</td>
								<td className="border border-neutral-300 px-4 py-2">
									Choose a target and an attribute. Both players must roll and add their attribute
									score to the result. The player with the highest result wins. The winner gains 2
									bonus points and the loser loses 2 bonus point. If the result is a tie, choose a
									different attribute and roll again.
								</td>
							</tr>
							<tr>
								<td className="border border-neutral-300 px-4 py-2">D10</td>
								<td className="border border-neutral-300 px-4 py-2">Charm</td>
								<td className="border border-neutral-300 px-4 py-2">
									<p>Choose a target then roll:</p>
									<ul className="mb-2 list-disc pl-5">
										<li>
											1 = your target gains bonus points equal to all points you earn for the
											current event
										</li>
										<li>
											2-5 = force an alliance with your target for the current event (see Scott's
											power)
										</li>
										<li>
											6-9 = gain bonus points equal to your target's rank points at the end of the
											event
										</li>
										<li>
											10 = gain bonus points equal to all points earned by your target for the
											current event
										</li>
									</ul>
								</td>
							</tr>
							<tr>
								<td className="border border-neutral-300 px-4 py-2">D12</td>
								<td className="border border-neutral-300 px-4 py-2">Amplify</td>
								<td className="border border-neutral-300 px-4 py-2">
									<p className="mb-2">Choose an event before it starts then roll:</p>
									<ul className="mb-2 list-disc pl-5">
										<li>
											1 = all players lose bonus points equal to half their rank points rounded
											down
										</li>
										<li>
											2-5 = all players gain bonus points equal to half their rank points rounded
											up
										</li>
										<li>6-11 = all players gain bonus points equal to their rank points</li>
										<li>12 = all players gain bonus points equal to 2x their rank points</li>
									</ul>
								</td>
							</tr>
							<tr>
								<td className="border border-neutral-300 px-4 py-2">D20</td>
								<td className="border border-neutral-300 px-4 py-2">Chaos</td>
								<td className="border border-neutral-300 px-4 py-2">
									<p className="mb-2">Roll:</p>
									<ul className="mb-2 list-disc pl-5">
										<li>1 = all bonus points reset to 0</li>
										<li>2-3 = roll fireball for all players</li>
										<li>4-5 = reveal your secret power to player of your choice (except Edgar)</li>
										<li>6-7 = choose a player to arm wrestle for 2 bonus points</li>
										<li>8-9 = deduct a bonus point anytime a player uses a quote</li>
										<li>10-11 = gain access to another user's power (except Edgar)</li>
										<li>
											12-13 = player with the most kills from 1 hero in Browser Heroes gains 2
											bonus points
										</li>
										<li>14-15 = choose a player to reveal their secret power to you</li>
										<li>16-17 = all spells are refreshed including Chaos</li>
										<li>18-19 = roll amplify for all remaining events</li>
										<li>20 = choose any effect from any dice and apply it</li>
									</ul>
									<p>*Note: If an effect is no longer applicable you must roll again.</p>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
			<div className="p-5 md:py-10">
				<div className="mx-auto max-w-xl">
					<h2 className="mb-4 text-xl font-bold">RULES</h2>
					<div className="space-y-3 text-sm font-medium">
						<div className="flex gap-2">
							<p>1.</p>
							<p>Players will all pick 1 spell. Selection order to be determined by rolling D100.</p>
						</div>

						<div className="flex gap-2">
							<p>2.</p>
							<p>Spells are one time use only. Once a spell is used, it cannot be used again.</p>
						</div>

						<div className="flex gap-2">
							<p>3.</p>
							<p>Player's must declare they are casting a spell before rolling the dice.</p>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default Spells;
