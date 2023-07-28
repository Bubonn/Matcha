import { FormEvent, useEffect, useState } from 'react';
import { ButtonNext } from '../../components/ButtonNext/ButtonNext';
import { useNavigate } from 'react-router-dom';
import { BackApi } from '../../api/back';
import { getCookieByName } from '../../utils/auth';
import logo from '../../assets/signupQuestions/calendar.png';
import s from './style.module.css';

export function Age() {
	const navigate = useNavigate();
	const [selectedDay, setSelectedDay] = useState('');
	const [selectedMonth, setSelectedMonth] = useState('');
	const [selectedYear, setSelectedYear] = useState('');
	const [legalAge, setLegalAge] = useState(true);

	const days = Array.from(Array(31), (_, index) => index + 1);
	const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
					'August', 'September', 'October', 'November', 'December'];
	const currentYear = new Date().getFullYear();
	const years = Array.from(Array(100), (_, index) => currentYear - index);

	useEffect(() => {
			if (selectedYear !== '' && selectedMonth !== '' && selectedDay !== '') {
				const selectedDate = new Date(
					parseInt(selectedYear),
					parseInt(selectedMonth) - 1,
					parseInt(selectedDay)
					);
				const eighteenYearsAgo = new Date();
				eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);
				setLegalAge(selectedDate <= eighteenYearsAgo);
			} else {
				setLegalAge(true);
			}
	}, [selectedDay, selectedMonth, selectedYear]);

	async function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const selectedDate: string = selectedYear + '-' + selectedMonth + '-' +selectedDay;
		const token = getCookieByName('token');
		if (token) {
			const rep = await BackApi.updateBirth(token, selectedDate);
			if (rep.status === 200) {
				navigate('/gender');
			}
		}
	}

	return (
		<div className={s.container}>
			<div className={s.box}>
				<div className={s.logo}>
					<img src={logo} alt="calendar" />
				</div>
				<div className={s.description}>
					<p>Your date of birth</p>
				</div>
				<form onSubmit={handleSubmit}>
					<div>
						<select
							className={s.select}
							name="day"
							value={selectedDay}
							onChange={(e) => setSelectedDay(e.target.value)}
						>
							<option value="">Day</option>
							{days.map((day) => (
								<option key={day} value={day}>
									{day}
								</option>
							))}
						</select>
						<select
							className={s.select}
							name="month"
							value={selectedMonth}
							onChange={(e) => setSelectedMonth(e.target.value)}
						>
							<option value="">Month</option>
							{months.map((month, index) => (
								<option key={index + 1} value={index + 1}>
									{month}
								</option>
							))}
						</select>
						<select
							className={s.select}
							name="year"
							value={selectedYear}
							onChange={(e) => setSelectedYear(e.target.value)}
						>
							<option value="">Year</option>
							{years.map((year) => (
								<option key={year} value={year}>
									{year}
								</option>
							))}
						</select>
					</div>
					{!legalAge && <span className={s.error}>You must be of legal age to create an account</span>}
					<div className={s.button}>
						<ButtonNext disabled={!legalAge || !selectedDay || !selectedMonth || !selectedYear}/>
					</div>
				</form>
			</div>
		</div>
	);
}
