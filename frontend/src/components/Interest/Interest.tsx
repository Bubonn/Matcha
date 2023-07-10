import { InterestList } from '../InterestList/InterestList';
import s from './style.module.css'

interface InterestProps {
	interests: any;
	setInterests: any;
}

export function Interest({ interests, setInterests }: InterestProps) {

	const listInterests = ['sport', 'music', 'Travel', 'Movies', 'TV Shows', 'Reading',
	'Cooking', 'Art', 'Fitness', 'Gaming', 'Dancing', 'Technology', 'Photography',
	'Running', 'Pets', 'Nature', 'Sciences', 'Cars', '42']

	return (
		<>
			{listInterests.map((interest: string) => {
				return (
					<div className={s.container} key={interest}>
						<InterestList
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