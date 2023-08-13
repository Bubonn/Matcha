import { useEffect, useState } from 'react';
import { getSocket } from '../../utils/socket';
import send from '../../assets/send.svg'
import s from './style.module.css'
import { getToken } from '../../utils/auth';
import { BackApi } from '../../api/back';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useDispatch } from 'react-redux';
import { saveNotifMessages } from '../../store/user/user-slice';

interface InputChatProps {
	idConv: any;
	newMsg: any;
	setNewMsg: any;
}

export function InputChat({ idConv, newMsg,setNewMsg }: InputChatProps) {

	const selector = useSelector((store: RootState) => store.user.user);
	const dispatch = useDispatch();
	const [message, setMessage] = useState<string>('');
	const [socket, setSocket] = useState<any>(null);
	const [idUserMatch, setIdUserMatch] = useState<null | number>(null);

	
	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const existingMessages = selector.notifMessages;
		const updatedMessages = existingMessages.filter((objet: any) => objet.conversation_id !== idConv);
		dispatch(saveNotifMessages(updatedMessages))
		setNewMsg(!newMsg);
		socket.emit('message', {conversation_id: idConv, message_content: message, recipient_id: idUserMatch, sender_id: selector.id, timestamp: new Date().toISOString()});
		setMessage('');
		const token = getToken();
		if (token) {
			const rep = await BackApi.updateNotificationsMessages(token, updatedMessages);
		}
	}

	async function getInfosConv() {
		const token = getToken();
		if (token) {
			const response = await BackApi.getConversationById(token, idConv);
			const conv = response.data;
			const idUser = conv.user1_id === selector.id ? conv.user2_id : conv.user1_id;
			setIdUserMatch(idUser);
		}
	}

	useEffect(() => {
		const sock: any = getSocket();
		setSocket(sock)
		getInfosConv();
		// eslint-disable-next-line
	}, [idConv])
	
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