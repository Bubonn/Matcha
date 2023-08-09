import React, { useEffect, useState } from 'react';
import { ConversationsList } from '../ConversationsList/ConversationsList';
import s from './style.module.css'
import { getToken } from '../../utils/auth';
import { BackApi } from '../../api/back';

interface ConversationsProps {
	idConv: any;
	setIdConv: any;
	newMsg: boolean
}

export function Conversations({ idConv, setIdConv, newMsg }: ConversationsProps) {
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
	}, [newMsg])


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

