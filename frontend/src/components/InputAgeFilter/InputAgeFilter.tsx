import logo from '../../assets/userFilter.svg'
import s from './style.module.css'

interface InputAgeFilterProps {
	label: string;
	name: string;
	selectedAge: any;
	setAge: any;
}

export function InputAgeFilter({ label, name, selectedAge, setAge }: InputAgeFilterProps) {
	const age = Array.from(Array(82), (_, index) => index + 18);

	return (
		<div className={s.container}>
			<label className={s.label} htmlFor={name}>
			<img src={logo} alt='logoUser'/>
				{label}
			</label>
			<select
				className={s.select}
				name={name}
				value={selectedAge}
				onChange={(e) => setAge(Number(e.target.value))}
			>
				<option value="">{name}</option>
				{age.map((age) => (
					<option key={age} value={age}>
						{age}
					</option>
				))}
			</select>
		</div>
	);
}