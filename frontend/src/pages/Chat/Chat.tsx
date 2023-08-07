import { useState } from 'react';
import { Conversations } from '../../components/Conversations/Conversations';
import { HeaderChat } from '../../components/HeaderChat/HeaderChat';
import { InputChat } from '../../components/InputChat/InputChat';
import s from './style.module.css'
import { Messages } from '../../components/Messages/Messages';

export function Chat() {

	const [idConv, setIdConv] = useState<null | number>(null);

	return (
		<div className={s.container}>
			<div className={s.conversations}>
				<Conversations setIdConv={setIdConv}/>
			</div>
			<div className={s.chatbox}>
				<div className={s.header}>
					<HeaderChat idConv={idConv} />
				</div>
				<div className={s.messages}>
					<Messages />
				</div>
				<div className={s.input}>
					<InputChat />
				</div>
			</div>
		</div>
	);
}