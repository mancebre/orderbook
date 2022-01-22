import { useCallback, useMemo, useRef } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';

const WebsocketsBinanceDemo = (props) => {
	const socketUrl = 'wss://stream.binance.com:9443/stream';
	const tradingPair = props.tradingPair;
	console.log('trading pair', tradingPair);

	const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(
		socketUrl,
	);

	const messageHistory = useRef([]);

	messageHistory.current = useMemo(
		() => messageHistory.current.concat(lastJsonMessage ?? []),
		[lastJsonMessage],
	);

	const handleClickSendMessage = useCallback(
		() =>
			sendJsonMessage({
				method: 'SUBSCRIBE',
				params: [tradingPair + '@ticker'],
				id: 1,
			}),
		[sendJsonMessage, tradingPair],
	);

	const handleClickUnSendMessage = useCallback(
		() =>
			sendJsonMessage({
				method: 'UNSUBSCRIBE',
				params: [tradingPair + '@ticker'],
				id: 1,
			}),
		[sendJsonMessage, tradingPair],
	);

	const connectionStatus = {
		[ReadyState.CONNECTING]: 'Connecting',
		[ReadyState.OPEN]: 'Open',
		[ReadyState.CLOSING]: 'Closing',
		[ReadyState.CLOSED]: 'Closed',
		[ReadyState.UNINSTANTIATED]: 'Uninstantiated',
	}[readyState];

	return (
		<div>
			<h1>Hello CodeSandbox</h1>
			<h2>Start editing to see some magic happen!</h2>
			<button
				onClick={handleClickSendMessage}
				disabled={readyState !== ReadyState.OPEN}>
				Subscribe
			</button>
			<button
				onClick={handleClickUnSendMessage}
				disabled={readyState !== ReadyState.OPEN}>
				Unsubscribe
			</button>
			<span>The WebSocket is currently {connectionStatus}</span>
			{lastJsonMessage ? (
				<div>Last message: {JSON.stringify(lastJsonMessage.data, null, 4)}</div>
			) : null}
			<ul>
				{messageHistory.current.map((message, idx) => (
					<span key={idx}>{JSON.stringify(message.data, null, 4)}</span>
				))}
			</ul>
		</div>
	);
};

export default WebsocketsBinanceDemo;
