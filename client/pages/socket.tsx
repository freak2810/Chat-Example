import { useEffect, useState } from 'react';

import io from 'socket.io-client';

export const socket = io('http://localhost:3333', {
	autoConnect: false,
});

const Page = () => {
	const [message, setMessage] = useState('');
	const [messages, setMessages] = useState<
		{
			message?: string;
			socketId?: string;
		}[]
	>([]);

	useEffect(() => {
		socket.connect();

		// wait for the acknowledgement from the server
		socket.on('ack', (data: any) => setMessages(prev => [...prev, data]));

		return () => {
			socket.off('ack');
			socket.disconnect();
		};
	}, []);

	const onSubmitHandler = () => {
		socket.emit('message', {
			message: message,
			socketId: socket.id,
		});

		setMessage('');
	};

	return (
		<div style={{ display: 'flex', flexDirection: 'column', maxWidth: 300 }}>
			<textarea
				name='message'
				value={message}
				onChange={e => setMessage(e.target.value)}
				placeholder='Enter a message'
			></textarea>
			<button onClick={onSubmitHandler}>Send Message</button>
			<li>
				{messages.map((message, index) => (
					<div key={index}>
						{'message sent'}: {message.message}
					</div>
				))}
			</li>
		</div>
	);
};

export default Page;
