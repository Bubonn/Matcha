import { InterestListSignup } from '../InterestListSignup/InterestListSignup';
import s from './style.module.css'

interface InterestProps {
	interests: any;
	setInterests: any;
}

export function InterestSignup({ interests, setInterests }: InterestProps) {

	const listInterests = ['sport', 'music', 'Travel', 'Movies', 'TV Shows', 'Reading',
	'Cooking', 'Art', 'Fitness', 'Gaming', 'Dancing', 'Technology', 'Photography',
	'Running', 'Pets', 'Nature', 'Sciences', 'Cars', '42']

	return (
		<>
			{listInterests.map((interest: string, idx: number) => {
				return (
					<div className={s.container} key={interest}>
						<InterestListSignup
							idx={idx}
							name={interest}
							interests={interests}
							setInterests={setInterests}
						/>
					</div>
				);
			})}
		</>
	)
}