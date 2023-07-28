import { InterestFilterList } from '../InterestFilterList/InterestFilterList';
import s from './style.module.css'

interface InterestFilterProps {
	interests: any;
	setInterests: any;
	search: boolean;
}

export function InterestFilter({ interests, setInterests, search }: InterestFilterProps) {
	const listInterests = ['Sport', 'Music', 'Travel', 'Movies', 'TV Shows', 'Reading',
	'Cooking', 'Art', 'Fitness', 'Gaming', 'Dancing', 'Technology', 'Photography',
	'Running', 'Pets', 'Nature', 'Sciences', 'Cars', '42']

	return (
		<>
			{listInterests.map((interest: string, idx: number) => {
				return (
					<div className={s.container} key={interest}>
						<InterestFilterList
							idx={idx + 1}
							name={interest}
							interests={interests}
							setInterests={setInterests}
							search={search}
						/>
					</div>
				);
			})}
		</>
	)
}