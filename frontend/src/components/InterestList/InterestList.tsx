import s from './style.module.css'

interface InterestListProps {
	name: string;
	interests: any;
	setInterests: any;
}

export function InterestList({ name, interests, setInterests }: InterestListProps) {

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
				backgroundColor: isPresent() ? '#FB6D6C' : 'white',
				color: isPresent() ? 'white' : 'black',
			}}
		>
			#{name}
		</button>
	)
}