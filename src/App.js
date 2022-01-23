import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import TradingPairSelector from './components/TradingPairSelector';
import WebsocketsBinance from './components/WebsocketsBinance';
import DecimalSelector from './components/DecimalSelector';
import { Container, Typography } from '@mui/material';

const App = () => {
	const params = useParams();
	let pair = params.pair;
	if (!pair || typeof pair === undefined) {
		pair = 'ethbtc';
	}
	const [selectedTradingPair, setSelectedTradingPair] = useState(pair);
	const [decimals, setDecimals] = useState(8);

	const handleDecimalsChange = (event) => {
		setDecimals(event.target.value);
	};
	return (
		<Container maxWidth='lg'>
			<Typography variant='h2'>
				Trading pair -{'>'} <strong>{selectedTradingPair.toUpperCase()}</strong>
			</Typography>
			<TradingPairSelector
				tradingPair={selectedTradingPair}
				changeTradingPair={setSelectedTradingPair}
			/>
			<DecimalSelector
				handleChange={handleDecimalsChange}
				decimals={decimals}
			/>
			<WebsocketsBinance
				tradingPair={selectedTradingPair}
				depth={5}
				decimals={decimals}
			/>
		</Container>
	);
};

export default App;
