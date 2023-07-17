import { InterestFilterList } from '../InterestFilterList/InterestFilterList';
import s from './style.module.css'

interface InterestFilterProps {
	interests: any;
	setInterests: any;
}

export function InterestFilter({ interests, setInterests }: InterestFilterProps) {
	const listInterests = ['sport', 'music', 'Travel', 'Movies', 'TV Shows', 'Reading',
	'Cooking', 'Art', 'Fitness', 'Gaming', 'Dancing', 'Technology', 'Photography',
	'Running', 'Pets', 'Nature', 'Sciences', 'Cars', '42']

	return (
		<>
			{listInterests.map((interest: string) => {
				return (
					<div className={s.container} key={interest}>
						<InterestFilterList
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