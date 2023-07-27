import s from './style.module.css'

interface InputSettingsProps {
	name: string;
	text: boolean;
	content: string;
	setContent: any;
	placeholder: string;
}

export function InputSettings({ name, text, content, setContent, placeholder }: InputSettingsProps) {

	function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		setContent(e.target.value);
	}

	return (
		<input
			className={s.input}
			name={name}
			value={content}
			type={text ? 'text' : 'password'}
			placeholder={placeholder}
			onChange={handleChange}
		/>
	);
}