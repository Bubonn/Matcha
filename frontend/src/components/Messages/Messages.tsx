import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { MessagesList } from '../MessagesList/MessagesList';
import { getToken } from '../../utils/auth';
import { BackApi } from '../../api/back';
import { getSocket } from '../../utils/socket';
import React, { useEffect, useRef, useState } from 'react';
import s from './style.module.css'

interface MessagesChatProps {
	idConv: any;
}

export function Messages({ idConv }: MessagesChatProps) {
	const selector = useSelector((store: RootState) => store.user.user);
	const [messages, setMessages] = useState<any>([]);
	const [socket, setSocket] = useState<any>(null);
	const messagesEndRef = useRef<HTMLDivElement>(null);

	async function getMessages() {
		const token = getToken();
		if (token) {
			const rep = await BackApi.getMessagesById(token, idConv);
			setMessages(rep.data)
		}
	}

	const messageListener = (message: any) => {
		setMessages((prevMessages: any[]) => [...prevMessages, message]);
	}

	useEffect(() => {
		const sock: any = getSocket();
		setSocket(sock)
	}, [])

	useEffect(() => {
		if (socket) {
			socket.on('messageFromServer', messageListener)
		}
	}, [socket])

	useEffect(() => {
		getMessages();
	}, [idConv])

	useEffect(() => {
		if (messagesEndRef.current) {
		  messagesEndRef.current.scrollIntoView({ behavior: 'smooth' }); // Faites défiler vers le bas
		}
	  }, [messages]); // Faites défiler chaque fois que les messages sont mis à jour

	if (!messages) {
		return (<></>);
	}

	// return (
	// 	<>
	// 		{messages.map((message: any, index: number) => {
	// 			return (
	// 				<React.Fragment key={index}>
	// 					<MessagesList id={selector.id} message={message} />
	// 				</React.Fragment>
	// 			);
	// 		})}
	// 	</>
	// );
	return (
		<div className={s.messagesContainer}>
			{messages.map((message: any, index: number) => (
				<React.Fragment key={index}>
					<MessagesList id={selector.id} message={message} />
				</React.Fragment>
			))}
			<div ref={messagesEndRef} /> {/* Élément de référence pour le défilement vers le bas */}
		</div>
	);
}