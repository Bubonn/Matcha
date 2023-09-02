import send from '../../assets/send.svg'
import s from './style.module.css'

interface InputSettingsProps {
	name: string;
	text: boolean;
	content: string;
	setContent: any;
	placeholder: string;
	handleClick: any;
}

export function InputSettings({ name, text, content, setContent, placeholder, handleClick }: InputSettingsProps) {

	function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		setContent(e.target.value);
	}

	return (
		<div className={s.container}>
			<input
				className={s.input}
				name={name}
				value={content}
				type={text ? 'text' : 'password'}
				placeholder={placeholder}
				onChange={handleChange}
				maxLength={name === 'firstName' ? 15 : 30}
				autoComplete={'off'}
			/>
			<img
				className={s.sendButton}
				src={send}
				alt='sendButton'
				onClick={handleClick}
				style={{visibility: name === 'newPassword' ? 'hidden' : 'visible'}}
			/>
		</div>
	);
}