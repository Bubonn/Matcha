import s from './style.module.css'

interface InterestFilterListProps {
	idx: number;
	name: string;
	interests: any;
	setInterests: any;
	search: boolean;
}

export function InterestFilterList({ idx, name, interests, setInterests, search }: InterestFilterListProps) {

	function handleClick() {
		if (interests.includes(idx)) {
			if (interests.length === 1 && !search) {
				return ;
			}
				const updatedArray = interests.filter((idx_array: number) => idx_array !== idx);
				setInterests(updatedArray);
		} else {
				const updatedArray = interests.concat(idx);
				setInterests(updatedArray);
		}
	}

	function isPresent() {
		return interests.includes(idx);
	}

	return (
		<button
			type='button'
			className={s.container}
			onClick={handleClick}
			style={{
				backgroundColor: isPresent() ? '#FB025D' : 'white',
				color: isPresent() ? 'white' : 'black',
			}}
		>
			#{name}
		</button>
	)
}