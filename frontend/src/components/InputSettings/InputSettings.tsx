import s from './style.module.css'

interface InputSettingsProps {
	name: string;
	text: boolean;
	content: string;
	setContent: any;
	placeholder: string;
}

export function InputSettings({ name, text, content, setContent, placeholder }: InputSettingsProps) {
	return (
		<input
			className={s.input}
			name={name}
			content={content}
			type={text ? 'text' : 'password'}
			placeholder={placeholder}
			onChange={(e) => setContent(Number(e.target.value))}
		/>
	);
}