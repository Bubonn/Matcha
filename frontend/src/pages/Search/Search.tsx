import { FormEvent, useEffect, useState } from 'react';
import { LargeCardUser } from '../../components/LargeCardUser/LargeCardUser';
import { InputAgeFilter } from '../../components/InputAgeFilter/InputAgeFilter';
import { InterestFilter } from '../../components/InterestFilter/InterestFilter';
import { useDispatch } from 'react-redux';
import { saveSection } from '../../store/user/user-slice';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { getToken } from '../../utils/auth';
import { BackApi } from '../../api/back';
import { useScrollPosition } from '../../hooks/useScrollPosition';
//import { MapUser } from '../MapUser/MapUser';
//import 'mapbox-gl/dist/mapbox-gl.css';
import filter from '../../assets/filters.svg'
import map from '../../assets/map.svg'
import React from 'react';
import s from './style.module.css'


export function Search() {
	const [isClicked, setIsClicked] = useState<boolean>(false);
	//const [mapClicked, setMapClicked] = useState<boolean>(false);
	const [distanceValue, setDistanceValue] = useState<number>(250);
	const [popularityValue, setPopularityValue] = useState<number>(500);
	const [selectedAgeFrom, setSelectedAgeFrom] = useState<number>(18);
	const [selectedAgeTo, setSelectedAgeTo] = useState<number>(99);
	const [errFilters, setErrFilters] = useState<null | string>(null);
	const [interests, setInterests] = useState<number[]>([]);
	const [usersSlected, setUsersSlected] = useState<any>(null);
	const [usersSorted, setUsersSorted] = useState<any>(null);
	const [usersToDisplay, setUsersToDisplay] = useState<any>(null);
	const [page, setPage] = useState(0);
	const [loading, setLoading] = useState(true);
	const [noSuggestions, setNoSuggestions] = useState(false);
	const [filterSelected, setFilterSelected] = useState('Recommanded');
	const {isBottom} = useScrollPosition();
	const selector = useSelector((store: RootState) => store.user.user);
	const dispatch = useDispatch();

	const handleDistanceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setDistanceValue(Number(event.target.value));
	};

	const handlePopularityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setPopularityValue(Number(event.target.value));
	};

	async function getUsersSelected(users: any) {
		const token = getToken();
		if (token) {
			const arrayOfIds = users.map((obj: any) => obj.id);
			arrayOfIds.sort((a: any, b: any) => a - b);
	
			const rep = await BackApi.manyUsers(token, arrayOfIds);
			if (rep.status === 200) {

				const usersSelect = rep.data;
				let i = 0;
				let tmp: any[] = [];
				
				for (const userSelect of usersSelect) {
					userSelect.note = users[i].note;
					userSelect.commonTags = users[i].commonTags;
					tmp.push(userSelect);
					i++;
				}
				setUsersSlected(tmp);
			}
		}
	}

	async function getSuggestions() {
		const token = getToken();
		if (token) {
			const rep = await BackApi.getSuggestions(token, distanceValue, popularityValue, selectedAgeFrom, selectedAgeTo, interests);
			if (rep.data.length > 0) {
				await getUsersSelected(rep.data);
			} else {
				setNoSuggestions(true);
			}
		}
	}

	async function incrementPage() {
		let newPage = page + 1;
		setPage(newPage);
		if (usersSorted) {

			let array = usersSorted.slice((newPage * 12), ((newPage + 1) * 12));
			if (array.length < 12) {
				setLoading(false);
			}
			setUsersToDisplay([...usersToDisplay, ...array]);
		}
	}

	function sortUsers() {
		setPage(0);
		const copyArray = usersSlected.slice();
		if (filterSelected === 'Recommanded') {
			copyArray.sort((a: any, b: any) => b.note - a.note);
		} else if (filterSelected === 'Age') {
			copyArray.sort((a: any, b: any) => a.age - b.age);
		} else if (filterSelected === 'Location') {
			copyArray.sort((a: any, b: any) => a.distance - b.distance);
		} else if (filterSelected === 'Fame rating') {
			copyArray.sort((a: any, b: any) => b.popularity - a.popularity);
		} else {
			copyArray.sort((a: any, b: any) => b.commonTags - a.commonTags);
		}
		setUsersSorted(copyArray);
		const firstsElements = copyArray.slice(0, 12);
		if (firstsElements.length < 12) {
			setLoading(false);
		}
		setUsersToDisplay(firstsElements);
	}

	async function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setUsersSlected(null);
		setLoading(true);
		setIsClicked(false);
		setNoSuggestions(false);
		await getSuggestions();
	}

	useEffect(() => {
		if (selector.id !== 0) {
			dispatch(saveSection('Search'));
			getSuggestions();
		}
		// eslint-disable-next-line
	}, [selector.id])

	useEffect(() => {
		if (usersSlected) {
			sortUsers();
		}
		// eslint-disable-next-line
	}, [filterSelected, usersSlected])

	useEffect(() => {
		if (isBottom === true) {
			incrementPage();
		}
		// eslint-disable-next-line
	}, [isBottom])

	useEffect(() => {
		if (selectedAgeFrom > selectedAgeTo) {
			setErrFilters("'Age to' cannot be greater than 'age from'");
		} else {
			setErrFilters(null);
		}
	}, [selectedAgeFrom, selectedAgeTo])
	
	if (selector.id === 0 || !usersSlected || !usersToDisplay) {
		return (
			<div className={s.container}>

			<div className={s.button}>
				{noSuggestions &&
					<div className={s.filterMapnotClicked}>
						<div className={s.filter}>
							<img src={filter} alt='filter' onClick={() => setIsClicked(!isClicked)} />
						</div>
					</div>
				}
			</div>
			<div
				className={s.boxFilters}
				style={{ display: isClicked ? 'flex' : 'none' }}
			>
				<form onSubmit={handleSubmit}>
					<div className={s.boxTitle}><span className={s.title}>Search filters</span></div>
					<div className={s.allFilters}>
						<div className={s.filterA}>
							<div className={s.slider}>
								<label
									className={s.label} htmlFor="volume">Maximum distance <span className={s.pink}>({distanceValue} Km)</span>
								</label>
								<input
									type="range"
									id="distance"
									name="distance"
									min="1"
									max="250"
									value={distanceValue}
									onChange={handleDistanceChange}
								/>
							</div>
							<div className={s.slider}>
								<label
									className={s.label} htmlFor="distance">Maximum popularity difference <span className={s.pink}>({popularityValue})</span>
								</label>
								<input
									type="range"
									id="popularity"
									name="popularity"
									min="0"
									max="500"
									step="10"
									value={popularityValue}
									onChange={handlePopularityChange}
								/>
							</div>
							<div className={s.ageFilter}>
								<InputAgeFilter label='Age (from)' name='ageFrom' selectedAge={selectedAgeFrom} setAge={setSelectedAgeFrom} />
								<InputAgeFilter label='Age (to)' name='ageTo' selectedAge={selectedAgeTo} setAge={setSelectedAgeTo} />
							</div>
							{errFilters && <span className={s.errFilter}>{errFilters}</span>}
						</div>
						<div className={s.filterB}>
							<div className={s.hobbiesTitle}>
								Hobbies
							</div>
							<div className={s.hobbies}>
								<InterestFilter
									interests={interests}
									setInterests={setInterests}
									search={true}
								/>
							</div>
						</div>
					</div>
					<div className={s.buttonSubmit}>
						<button
							type='submit'
							className={s.buttonFilters}
							disabled={errFilters !== null}
							style={{
								background: errFilters !== null ? '#C3C8D3' : '#FB025D',
								cursor: errFilters !== null ? 'not-allowed' : 'pointer'
							}}
						>
							Submit
						</button>
					</div>
				</form>
			</div>
				<div className={s.containerLoader}>
					<span className={s.textLoader}>
						{noSuggestions ? 'Aucune suggestions' : 'Chargement de vos suggestions'}
					</span>
					{!noSuggestions && <div className={s.loader}></div>}
				</div>
			</div>
		);
	}

	return (
		<div className={s.container}>
			<div className={s.button}>
				{/*{!mapClicked &&*/}
					<div className={s.filterMapnotClicked}>
						<div className={s.filter}>
							<img src={filter} alt='filter' onClick={() => setIsClicked(!isClicked)} />
						</div>
						<div>
							<select
								className={s.select}
								value={filterSelected}
								onChange={(e) => setFilterSelected(e.target.value)}
							>
								<option value="Recommended">Recommended</option>
								<option value="Age">Age</option>
								<option value="Location">Location</option>
								<option value="Fame rating">Fame rating</option>
								<option value="Tags">Tags</option>
							</select>
						</div>
					</div>
				{/*}*/}
				{/*<div className={s.filter}>
					<img className={s.iconMap} src={map} alt='filter' onClick={() => setMapClicked(!mapClicked)} />
				</div>*/}
			</div>
			<div
				className={s.boxFilters}
				style={{ display: isClicked ? 'flex' : 'none' }}
			>
				<form onSubmit={handleSubmit}>
					<div className={s.boxTitle}><span className={s.title}>Search filters</span></div>
					<div className={s.allFilters}>
						<div className={s.filterA}>
							<div className={s.slider}>
								<label
									className={s.label} htmlFor="volume">Maximum distance <span className={s.pink}>({distanceValue} Km)</span>
								</label>
								<input
									type="range"
									id="distance"
									name="distance"
									min="1"
									max="250"
									value={distanceValue}
									onChange={handleDistanceChange}
								/>
							</div>
							<div className={s.slider}>
								<label
									className={s.label} htmlFor="distance">Maximum popularity difference <span className={s.pink}>({popularityValue})</span>
								</label>
								<input
									type="range"
									id="popularity"
									name="popularity"
									min="0"
									max="500"
									step="10"
									value={popularityValue}
									onChange={handlePopularityChange}
								/>
							</div>
							<div className={s.ageFilter}>
								<InputAgeFilter label='Age (from)' name='ageFrom' selectedAge={selectedAgeFrom} setAge={setSelectedAgeFrom} />
								<InputAgeFilter label='Age (to)' name='ageTo' selectedAge={selectedAgeTo} setAge={setSelectedAgeTo} />
							</div>
							{errFilters && <span className={s.errFilter}>{errFilters}</span>}
						</div>
						<div className={s.filterB}>
							<div className={s.hobbiesTitle}>
								Hobbies
							</div>
							<div className={s.hobbies}>
								<InterestFilter
									interests={interests}
									setInterests={setInterests}
									search={true}
								/>
							</div>
						</div>
					</div>
					<div className={s.buttonSubmit}>
						<button
							type='submit'
							className={s.buttonFilters}
							disabled={errFilters !== null}
							style={{
								background: errFilters !== null ? '#C3C8D3' : '#FB025D',
								cursor: errFilters !== null ? 'not-allowed' : 'pointer'
							}}
						>
							Submit
						</button>
					</div>
				</form>
			</div>
			{/*{!mapClicked ?*/}
				<div>
					<div
						className={s.users}
						style={{ opacity: isClicked ? '0.3' : '1' }}
					>
						{usersToDisplay.map((user: any) => {
							if (user.id !== selector.id) {
								return (
									<React.Fragment key={user.id}>
										<LargeCardUser
											user={user}
										/>
									</React.Fragment>
								);
							} else {
								return null;
							}
						})}
					</div>
					<div className={s.ctnLoader}>
						{loading ?
							<div className={s.loader}></div>
							: <div className={s.textEnd}>End of suggestions</div>
						}
					</div>
				</div>
				{/*:
				<div className={s.users}>
					<MapUser usersSelected={usersSlected}/>
				</div>
				}*/}
		</div>
	);
}

