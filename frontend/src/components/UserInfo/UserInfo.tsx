import { useEffect, useState } from "react";
import { Outlet, useNavigate } from 'react-router-dom';
import { BackApi } from "../../api/back";
import { getCookieByName, parseJwt } from "../../utils/auth";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useDispatch } from "react-redux";
import { saveInfoUser } from "../../store/user/user-slice";

export function UserInfo() {

	const navigate = useNavigate();
	const dispatch = useDispatch();
	const selector = useSelector((store: RootState) => store.user.user);
	const [jwt, setJwt] = useState<string | null>(null);

	async function checkToken() {
		const token: string | null = getCookieByName('token');
		if (!token) {
			navigate('/signin');
		} else {
			const rep = await BackApi.checkToken(token);
			if (rep.status !== 200) {
				navigate('/signin');
			} else {
				let id;
				// console.log('selector.id', selector.id);
				if (selector.id === 0) {
					id = parseJwt(token).userId;
					dispatch(saveInfoUser(id));
				}
				setJwt(token);
				let response;
				if (selector.id === 0) {
					response = await BackApi.getUserById(id, token);
				} else {
					response = await BackApi.getUserById(selector.id, token);
				}
				if (response.status === 200) {
					console.log('response.data', response.data);
					const user = response.data;
					if (user.birth === null) {
						 navigate('/age');
					}
					else if (!user.gender) {
						 navigate('/gender');
					}
					else if (!user.preference) {
						 navigate('/preference');
					}
					else if (!user.description) {
						navigate('/description');
					}
					else if (user.interests.length === 0) {
						navigate('/interests');
					}
					else if (!user.photo1) {
						navigate('/mainPhoto');
					} else {
						navigate('/additionalsPhoto');
					}
				}

			}
		}
	}

	useEffect(() => {
		checkToken();
	}, [])

	if (!jwt) {
		return (
			<>
			</>
		);
	}

	return (
		<>
			<Outlet />
		</>
	);
}