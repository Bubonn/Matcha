import { useEffect, useState } from 'react';
import { Conversations } from '../../components/Conversations/Conversations';
import { HeaderChat } from '../../components/HeaderChat/HeaderChat';
import { InputChat } from '../../components/InputChat/InputChat';
import s from './style.module.css'
import { Messages } from '../../components/Messages/Messages';
import { useDispatch } from 'react-redux';
import { saveSection } from '../../store/user/user-slice';

export function Chat() {

	const dispatch = useDispatch();
	const [idConv, setIdConv] = useState<null | number>(null);

	useEffect(() => {
		dispatch(saveSection('Chat'));
	}, [])

	return (
		<div className={s.container}>
			<div className={s.conversations}>
				<Conversations setIdConv={setIdConv} />
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
						<InputChat idConv={idConv}/>
					</div>
				</div>
			}
		</div>
	);
}