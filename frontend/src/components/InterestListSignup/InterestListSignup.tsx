import s from './style.module.css'

interface InterestListProps {
	idx: number;
	name: string;
	interests: any;
	setInterests: any;
}

export function InterestListSignup({ idx, name, interests, setInterests }: InterestListProps) {

	function handleClick() {
		if (interests.includes(idx)) {
			const updatedArray = interests.filter((index: number) => index !== idx);
			setInterests(updatedArray);
		} else {
			if (interests.length !== 5) {
				const updatedArray = interests.concat(idx);
				setInterests(updatedArray);
			}
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
				backgroundColor: isPresent() ? '#FB6D6C' : 'white',
				color: isPresent() ? 'white' : 'black',
			}}
		>
			#{name}
		</button>
	)
}