import s from './style.module.css'

interface InterestFilterListProps {
	name: string;
	interests: any;
	setInterests: any;
}

export function InterestFilterList({ name, interests, setInterests }: InterestFilterListProps) {

	function handleClick() {
		if (interests.includes(name)) {
			const updatedArray = interests.filter((word: string) => word !== name);
			setInterests(updatedArray);
		} else {
			const updatedArray = interests.concat(name);
			setInterests(updatedArray);
		}
	}

	function isPresent() {
		return interests.includes(name);
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