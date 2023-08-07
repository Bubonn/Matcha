import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { MessagesList } from '../MessagesList/MessagesList';
import React from 'react';
import s from './style.module.css'

const tmp = [
	{
		message_id: 2,
		sender_id: 498,
		recipient_id: 999,
		message_content: 'Contenu du message sisi',
		timestamp: '2023-08-07 14:38:18'
	},
	{
		message_id: 3,
		sender_id: 999,
		recipient_id: 498,
		message_content: 'Contenu du second message',
		timestamp: '2023-08-07 14:38:44'
	},
	{
		message_id: 4,
		sender_id: 999,
		recipient_id: 498,
		message_content: 'Consequuntur modi quae aut veritatis dicta et vel et. Quia sed et aut quibusdam deleniti aut. Doloremque quae necessitatibus maiores inventore maxime magni enim. Deleniti porro et et et magn',
		timestamp: '2023-08-07 14:38:44'
	},
	{
		message_id: 5,
		sender_id: 498,
		recipient_id: 999,
		message_content: 'Consequuntur modi quae aut veritatis dicta et vel et. Quia sed et aut quibusdam deleniti aut. Doloremque quae necessitatibus maiores inventore maxime magni enim. Deleniti porro et et et magn',
		timestamp: '2023-08-07 14:38:44'
	},
	{
		message_id: 6,
		sender_id: 498,
		recipient_id: 999,
		message_content: 'Consequuntur modi quae aut veritatis dicta et vel et. Quia sed et aut quibusdam deleniti aut. Doloremque quae necessitatibus maiores inventore maxime magni enim. Deleniti porro et et et magn',
		timestamp: '2023-08-07 14:38:44'
	},
	{
		message_id: 7,
		sender_id: 498,
		recipient_id: 999,
		message_content: 'Consequuntur modi quae aut veritatis dicta et vel et. Quia sed et aut quibusdam deleniti aut. Doloremque quae necessitatibus maiores inventore maxime magni enim. Deleniti porro et et et magn',
		timestamp: '2023-08-07 14:38:44'
	},
	{
		message_id: 8,
		sender_id: 498,
		recipient_id: 999,
		message_content: 'Consequuntur modi quae aut veritatis dicta et vel et. Quia sed et aut quibusdam deleniti aut. Doloremque quae necessitatibus maiores inventore maxime magni enim. Deleniti porro et et et magn',
		timestamp: '2023-08-07 14:38:44'
	},
]


export function Messages() {
	const selector = useSelector((store: RootState) => store.user.user);

	return (
		<>
			{tmp.map((message: any) => {
				return (
					<React.Fragment key={message.message_id}>
						<MessagesList id={selector.id} message={message} />
					</React.Fragment>
				);
			})}
		</>
	);
}