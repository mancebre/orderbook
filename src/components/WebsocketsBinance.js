import { Grid } from '@mui/material';
import BasicTable from './BasicTable';
import React, { useState, useRef, useEffect, memo } from 'react';

const WebsocketsBinance = memo((props) => {
	const ws = useRef(null);
	const tradingPair = props.tradingPair;
	const [prevTradingPair, setPrevTradingPair] = useState(false);
	const [sellData, setSellData] = useState([]);
	const [buyData, setBuyData] = useState([]);
	const { depth, decimals } = props;

	useEffect(() => {
		ws.current = new WebSocket('wss://stream.binance.com:9443/stream');
		ws.current.onopen = () => {
			// console.log('ws opened');
			subscribe(tradingPair);
		};
		ws.current.onclose = (event) => console.log('ws closed', event.code);
		ws.current.onmessage = (e) => {
			const message = JSON.parse(e.data);
			// console.log('e', message);
			if (message && message.data && message.data.asks && message.data.bids) {
				setSellData(message.data.asks);
				setBuyData(message.data.bids);
			}
		};
		ws.current.onerror = (err) => console.log('Error', err);

		const wsCurrent = ws.current;

		return () => {
			wsCurrent.close();
		};
	}, []);

	useEffect(() => {
		setPrevTradingPair(tradingPair);
		if (prevTradingPair) {
			unsubscribe(prevTradingPair);
			subscribe(tradingPair);
		}
	}, [tradingPair]);

	const unsubscribe = (pair) => {
		ws.current.send(
			JSON.stringify({
				method: 'UNSUBSCRIBE',
				params: [pair + '@depth' + depth],
				id: 1,
			}),
		);
		setTimeout(() => {
			setSellData([]);
			setBuyData([]);
		}, 500);

		// console.log(pair + ' unsubscribed');
	};

	const subscribe = (pair) => {
		ws.current.send(
			JSON.stringify({
				method: 'SUBSCRIBE',
				params: [pair + '@depth' + depth],
				id: 1,
			}),
		);

		// console.log(pair + ' subscribed');
	};

	return (
		<div>
			<Grid container spacing={2}>
				<Grid item xs={12} md={6}>
					<BasicTable
						tableData={buyData}
						title='Buy Order'
						decimals={decimals}
					/>
				</Grid>
				<Grid item xs={12} md={6}>
					<BasicTable
						tableData={sellData}
						title='Sell Order'
						decimals={decimals}
					/>
				</Grid>
			</Grid>
		</div>
	);
});

export default WebsocketsBinance;
