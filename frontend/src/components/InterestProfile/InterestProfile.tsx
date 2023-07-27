import React from 'react';
import { InterestListProfile } from '../InterestProfileList/InterestProfileList';

export function InterestProfile() {
	const myInterest = ['42', 'Gaming'];
	const userInterest = ['42', 'Dancing', 'Cars', 'Nature'];

	return (
		<>
			{userInterest.map((interest: string, index: number) => {
				return (
					<React.Fragment key={index}>
						<InterestListProfile
							name={interest}
							common={myInterest.includes(interest)}
						/>
					</React.Fragment>
				);
			})}
		</>
	)
}