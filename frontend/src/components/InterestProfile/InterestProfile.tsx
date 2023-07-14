import { InterestListProfile } from '../InterestProfileList/InterestProfileList';

export function InterestProfile() {
	const myInterest = ['42', 'Gaming'];
	const userInterest = ['42', 'Dancing', 'Cars', 'Nature', '42'];

	return (
		<>
			{userInterest.map((interest: string) => {
				return (
					<>
						<InterestListProfile
							name={interest}
							common={myInterest.includes(interest)}
						/>
					</>
				);
			})}
		</>
	)
}