import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { deleteCookie } from "../../utils/auth";

export function Logout() {
	const navigate = useNavigate();

	useEffect(() => {
		deleteCookie('token');
		navigate('/signin');
		// eslint-disable-next-line
	}, [])

	return (
		<>
		</>
	);
}