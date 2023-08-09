import React, { useEffect, useState } from 'react';
import { ConversationsList } from '../ConversationsList/ConversationsList';
import s from './style.module.css'
import { getToken } from '../../utils/auth';
import { BackApi } from '../../api/back';

const tmp = [
	{
		conversation_id: 5,
		user1_id: 498,
		user2_id: 999,
		creation_date: "2023-08-07 14:31:46",
		last_message_id: 3,
		last_message_sender_id: 999,
		last_message_recipient_id: 498,
		last_message_content: 'Contenu du deuxieme message',
		last_message_timestamp: '2023-08-07 14:38:44'
	},
	{
		conversation_id: 7,
		user1_id: 550,
		user2_id: 999,
		creation_date: "2023-08-07 16:02:26",
		last_message_id: null,
		last_message_sender_id: null,
		last_message_recipient_id: null,
		last_message_content: null,
		last_message_timestamp: null
	},
	{
		conversation_id: 5,
		user1_id: 498,
		user2_id: 999,
		creation_date: "2023-08-07 14:31:46",
		last_message_id: 3,
		last_message_sender_id: 999,
		last_message_recipient_id: 498,
		last_message_content: 'Contenu du deuxieme message',
		last_message_timestamp: '2023-08-07 14:38:44'
	},
	{
		conversation_id: 5,
		user1_id: 498,
		user2_id: 999,
		creation_date: "2023-08-07 14:31:46",
		last_message_id: 3,
		last_message_sender_id: 999,
		last_message_recipient_id: 498,
		last_message_content: 'Contenu du deuxieme message',
		last_message_timestamp: '2023-08-07 14:38:44'
	},
	{
		conversation_id: 5,
		user1_id: 498,
		user2_id: 999,
		creation_date: "2023-08-07 14:31:46",
		last_message_id: 3,
		last_message_sender_id: 999,
		last_message_recipient_id: 498,
		last_message_content: 'Contenu du deuxieme message',
		last_message_timestamp: '2023-08-07 14:38:44'
	}
]

interface ConversationsProps {
	setIdConv: any;
}

export function Conversations({ setIdConv }: ConversationsProps) {
	const [conversations, setConversations] = useState<any>(null);

	async function getInfosConversations() {
		const token = getToken();
		if (token) {
			const rep = await BackApi.getConversationsByUserId(token);
			setConversations(rep.data);
		}
	}

	useEffect(() => {
		getInfosConversations();
	}, [])


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
							<ConversationsList infoConv={conv} setIdConv={setIdConv} />
						</React.Fragment>
					);
			})}
			</div>
		</div>
	);
}

