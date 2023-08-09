import { useEffect, useState } from 'react';
import { getSocket } from '../../utils/socket';
import send from '../../assets/send.svg'
import s from './style.module.css'
import { getToken } from '../../utils/auth';
import { BackApi } from '../../api/back';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

interface InputChatProps {
	idConv: any;
}

export function InputChat({ idConv }: InputChatProps) {

	const selector = useSelector((store: RootState) => store.user.user);
	const [message, setMessage] = useState<string>('');
	const [socket, setSocket] = useState<any>(null);
	const [idUserMatch, setIdUserMatch] = useState<null | number>(null);

	
	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		// console.log('message', message);
		socket.emit('message', {conversation_id: idConv, message_content: message, recipient_id: idUserMatch, sender_id: selector.id, timestamp: new Date().toISOString()});
		setMessage('');
	}

	async function getInfosConv() {
		const token = getToken();
		if (token) {
			const response = await BackApi.getConversationById(token, idConv);
			const conv = response.data;
			const idUser = conv.user1_id === selector.id ? conv.user2_id : conv.user1_id;
			setIdUserMatch(idUser);
			// const rep = await BackApi.getUserById(id, token);
			// if (rep.status === 200) {
				// setUser(rep.data);
			// }
		}
	}

	// const messageListener = (message: any) => {
	// 	// if (message.channelId === idChannelSelected) {
	// 	// 	if (message.length) {
	// 	// 		setMessages(message);
	// 	// 	} else {
	// 	// 		setMessages([...messages, message]);
	// 	// 	}
	// 	// 	if (message.type === 'NOTIF') {
	// 	// 		setRerender(!rerender);
	// 	// 	}
	// 	// }
	// 	console.log('MSG RECU');
	// 	console.log(message);
	// }

	useEffect(() => {
		const sock: any = getSocket();
		setSocket(sock)
		getInfosConv();
	}, [])

	// useEffect(() => {
	// 	if (socket) {
	// 		socket.on('messageFromServer', messageListener)
	// 	}
	// }, [socket])
	
	if (!socket || !idUserMatch) {
		return (<></>);
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