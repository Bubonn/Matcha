import { useEffect, useState } from 'react';
import { Conversations } from '../../components/Conversations/Conversations';
import { HeaderChat } from '../../components/HeaderChat/HeaderChat';
import { InputChat } from '../../components/InputChat/InputChat';
import { Messages } from '../../components/Messages/Messages';
import { useDispatch } from 'react-redux';
import { saveSection } from '../../store/user/user-slice';
import s from './style.module.css'

export function Chat() {

	const dispatch = useDispatch();
	const [idConv, setIdConv] = useState<null | number>(null);
	const [newMsg, setNewMsg] = useState<boolean>(false);

	useEffect(() => {
		dispatch(saveSection('Chat'));
		// eslint-disable-next-line
	}, [])

	return (
		<div className={s.container}>
			<div className={s.conversations}>
				<Conversations idConv={idConv} setIdConv={setIdConv} newMsg={newMsg}/>
			</div>
			{idConv &&
				<div className={s.chatbox}>
					<div className={s.header}>
						<HeaderChat idConv={idConv} />
					</div>
					<div className={s.messages}>
						<Messages idConv={idConv}/>
					</div>
					<div className={s.input}>
						<InputChat idConv={idConv} newMsg={newMsg} setNewMsg={setNewMsg}/>
					</div>
				</div>
			}
			{}
		</div>
	);
}