import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useEffect, useState } from 'react';
import { BackApi } from '../../api/back';
import { getToken } from '../../utils/auth';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/verify.svg';
import s from './style.module.css';

export function VerifyAccount() {
	const selector = useSelector((store: RootState) => store.user.user);
	const navigate = useNavigate();
	const [message, setMessage] = useState('');
	const [entrenceAnimation, setEntrenceAnimation] = useState(false);
	const [endAnimation, setEndAnimation] = useState(false);
	const [className, setClassName] = useState(s.boxStart);

	async function sendEmail() {
		const token = getToken();
		if (token) {
			const response = await BackApi.getUserById(selector.id, token);
			if (response.status === 200 && response.data.verified) {
				setEndAnimation(true);
				setTimeout(() => {
					return navigate(`/profile/${selector.id}`);
				}, 700);
			}
			const rep = await BackApi.sendEmail(token, response.data.email);
			if (rep.status === 200) {
				setMessage('A verification link has been sent to your email address.');
			} else {
				setMessage('Error: Email don\'t exist');
			}
		}
	}

	useEffect(() => {
		sendEmail();
		// eslint-disable-next-line
	}, [])

	useEffect(() => {
		const timeoutId = setTimeout(() => {
			setEntrenceAnimation(true);
		}, 50);
		return () => clearTimeout(timeoutId);
	}, []);

	useEffect(() => {
		if (endAnimation) {
			setClassName(s.boxEndAnimate);
		} else if (entrenceAnimation) {
			setClassName(s.boxStartAnimate);
		}
	}, [entrenceAnimation, endAnimation])

	return (
		<div className={s.container}>
			<div className={className}>
				<div className={s.logo}>
					<img className={s.image} src={logo} alt="comma" />
				</div>
				<div className={s.description}>
					<p>Verify your account</p>
				</div>
				<div className={s.verif}>
					<p>{message}</p>
				</div>
			</div>
		</div>
	);
}

