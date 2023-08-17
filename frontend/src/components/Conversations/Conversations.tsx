import React, { useEffect, useState } from 'react';
import { ConversationsList } from '../ConversationsList/ConversationsList';
import { getToken } from '../../utils/auth';
import { BackApi } from '../../api/back';
import { getSocket } from '../../utils/socket';
import s from './style.module.css'
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Socket } from 'socket.io-client';

interface ConversationsProps {
	idConv: any;
	setIdConv: any;
	newMsg: boolean
}

export function Conversations({ idConv, setIdConv, newMsg }: ConversationsProps) {
	const [conversations, setConversations] = useState<any>(null);
	const [socket, setSocket] = useState<null | Socket>(null);
	const selector = useSelector((store: RootState) => store.user.user);

	async function getInfosConversations() {
		const token = getToken();
		if (token) {
			const rep = await BackApi.getConversationsByUserId(token);
			setConversations(rep.data);
			if (idConv) {
				const containsId = rep.data.some((conv: any) => conv.conversation_id === idConv);
				if (!containsId) {
					setIdConv(null);
				}
			}
		}
	}

	function test() {
		console.log('test OK');
	}

	useEffect(() => {
		getInfosConversations();
		const sock: null | Socket = getSocket();
		setSocket(sock);
	}, [newMsg])

	useEffect(() => {
		if (socket) {
			socket.on('reloadConv', getInfosConversations);

			return () => {
				socket.off('reloadConv');
			}
		}
	}, [socket])

	if (!conversations) {
		return (<></>);
	}

	return (
		<div className={s.conversationsBox}>
			<div className={s.header}>Matchs</div>
			<div className={s.conversations}>
				{conversations.map((conv: any, index: number) => {
					return (
						<React.Fragment key={index}>
							<ConversationsList infoConv={conv} idConv={idConv} setIdConv={setIdConv} />
						</React.Fragment>
					);
			})}
			</div>
		</div>
	);
}

