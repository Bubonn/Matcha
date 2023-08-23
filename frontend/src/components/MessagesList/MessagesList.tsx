import s from './style.module.css'

interface MessagesListProps {
	id: number
	message: any;
}

export function MessagesList({ id, message }: MessagesListProps) {
	return (
		<div
			className={s.container}

			style={{
				justifyContent: message.sender_id === id ? 'end' : 'start'
			}}
		>
			<div className={s.message}
				style={{
					backgroundColor: message.sender_id === id ? '#282828' : '#FB025D',
					borderRadius: message.sender_id === id ? '10px 10px 0px 10px' : '10px 10px 10px 0px',
					margin: message.sender_id === id ? '0px 10px 0px 0px' : '0px 0px 0px 10px'
				}}
			>
				{message.message_content}
			</div>
		</div>
	);
}
