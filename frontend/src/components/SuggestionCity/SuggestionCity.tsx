import { useEffect, useState } from 'react';
import { Api } from '../../api/api';
import debounce from 'lodash.debounce';
import s from './style.module.css'
import { getToken } from '../../utils/auth';
import { BackApi } from '../../api/back';


export function SuggestionCity({ placeHolder }: { placeHolder: string }) {
	const [inputText, setInputText] = useState('');
	const [suggestions, setSuggestions] = useState<string[]>([]);


	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const text = event.target.value;
		// const text = event.target.value.trim();
		setInputText(text);
		fetchSuggestions(text);
	};

	const fetchSuggestions = debounce(async (text: string) => {
		try {
			const test = await Api.getSuggestionCity(text);
			// console.log(test.data.features);
			setSuggestions(test.data.features);
		} catch (error) {
			console.error('Error fetching suggestions:', error);
		}
	}, 800);

	async function handleSuggestionClick(city: any) {
		setInputText(city.place_name);
		// console.log('city', city);
		setSuggestions([]);
		const positionGps: string = city.center[1] + ',' + city.center[0];
		const token = getToken();
		if (token) {
			const response = await BackApi.updateLocation(token, positionGps);
			// console.log('rep', response.data.features[0].place_name);
			// const rep = await Api.getCityByPositionGps(positionGps);
			// console.log('rep', rep.data.features[0].place_name);
		}
	};

	return (
		<div className={s.container}>
			{/* <label htmlFor="ville">Entrez le nom de votre ville :</label> */}
			<input
				className={s.input}
				type="text"
				id="ville"
				name="ville"
				value={inputText}
				onChange={handleInputChange}
				placeholder={placeHolder}
			/>
			{suggestions.length > 0 && (
				<ul className={s.ul}>
					{suggestions.map((suggestion: any) => (
						<li className={s.li} key={suggestion.id} onClick={() => handleSuggestionClick(suggestion)}>
							{suggestion.place_name}
						</li>
					))}
				</ul>
			)}
		</div>
	);
};
