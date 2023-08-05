import { BackApi } from '../../api/back';
import { getToken } from '../../utils/auth';
import s from './style.module.css'

interface InterestFilterListProps {
	idx: number;
	name: string;
	interests: any;
	setInterests: any;
	search: boolean;
}

export function InterestFilterList({ idx, name, interests, setInterests, search }: InterestFilterListProps) {

	async function handleClick() {
		if (interests.includes(idx)) {
			if (interests.length === 1 && !search) {
				return;
			}
			const updatedArray = interests.filter((idx_array: number) => idx_array !== idx);
			setInterests(updatedArray);
			if (!search) {
				const token = getToken();
				if (token) {
					await BackApi.delInterest(token, idx);
				}
			}
		} else {
			if (interests.length !== 5) {
				const updatedArray = interests.concat(idx);
				setInterests(updatedArray);
				if (!search) {
					const token = getToken();
					if (token) {
						await BackApi.addInterest(token, idx);
					}
				}
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
				backgroundColor: isPresent() ? '#FB025D' : 'white',
				color: isPresent() ? 'white' : 'black',
			}}
		>
			#{name}
		</button>
	)
}