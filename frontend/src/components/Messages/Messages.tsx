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
	// const [socket, setSocket] = useState<any>(null);
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
		// setSocket(sock)
		if (sock) {
			sock.on('messageFromServer', messageListener)
		}
	}, [])

	useEffect(() => {
		getMessages();
		// eslint-disable-next-line
	}, [idConv])

	useEffect(() => {
		if (messagesEndRef.current) {
			messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
		}
	}, [messages]);

	if (!messages) {
		return (<></>);
	}

	return (
		<div className={s.messagesContainer}>
			{messages.map((message: any, index: number) => (
				<React.Fragment key={index}>
					<MessagesList id={selector.id} message={message} />
				</React.Fragment>
			))}
			<div ref={messagesEndRef} />
		</div>
	);
}