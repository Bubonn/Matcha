import { useState } from 'react';
import send from '../../assets/send.svg'
import s from './style.module.css'

export function InputChat() {

	const [message, setMessage] = useState<string>('');

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		console.log(message);
	}

	return (
		<form onSubmit={handleSubmit} className={s.form}>
			<input
				className={s.input}
				value={message}
				onChange={(e) => setMessage(e.target.value)}
				placeholder='Write your message...'
			/>
			<button className={s.button}>
				<img
					className={s.sendButton}
					src={send}
					alt='sendButton'
				/>
			</button>
		</form>
	);
}