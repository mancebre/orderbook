import React, { useEffect, useState, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
	Autocomplete,
	TextField,
	Box,
	Snackbar,
	Alert,
	Skeleton,
} from '@mui/material';

const TradingPairSelector = memo((props) => {
	const api = 'https://api.binance.com/api/v3/exchangeInfo';
	const [error, setError] = useState(null);
	const [pairs, setPairs] = useState([]);
	const [snackbarOpen, setSnackbarOpen] = useState(false);
	const changeTradingPair = props.changeTradingPair;
	const tradingPairString = props.tradingPair.toUpperCase();
	const [tradingPair, setTemp] = useState(null);

	let navigate = useNavigate();

	useEffect(() => {
		fetch(api)
			.then((res) => res.json())
			.then(
				(result) => {
					setPairs(result.symbols);
					setError(false);
					const prevPair = result.symbols.find(
						(o) => o.symbol === tradingPairString,
					);
					setTemp(prevPair);
				},
				(error) => {
					setError(true);
					console.log(error);
				},
			);
	}, []);

	const onChangeHandler = (event, values) => {
		if (values && values.symbol) {
			changeTradingPair(values.symbol.toLowerCase());
			setTemp(values);
			// history.push('/?pair=' + values.symbol.toLowerCase());
			navigate('/' + values.symbol.toLowerCase());
		}
		setSnackbarOpen(true);
	};

	const handleSnackbarClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		setSnackbarOpen(false);
	};

	const handleErrorClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		setError(false);
	};

	const tradigPairSuccessfullChange = (
		<Snackbar
			open={snackbarOpen}
			autoHideDuration={6000}
			onClose={handleSnackbarClose}>
			<Alert
				onClose={handleSnackbarClose}
				severity='success'
				sx={{ width: '100%' }}>
				Trading pair changed successfully.
			</Alert>
		</Snackbar>
	);

	const errorMsg = (
		<Snackbar open={error} autoHideDuration={6000} onClose={handleErrorClose}>
			<Alert onClose={handleErrorClose} severity='error' sx={{ width: '100%' }}>
				Something went wrong please refresh the page.
			</Alert>
		</Snackbar>
	);

	let content = (
		<Box sx={{ display: 'flex' }}>
			<Skeleton sx={{ minWidth: 120, width: 300, m: 2 }} height={60} />
		</Box>
	);

	if (pairs.length > 0 && tradingPair) {
		content = (
			<div>
				<Autocomplete
					id='trading-pair-selector'
					options={pairs}
					sx={{ minWidth: 120, width: 300, m: 2 }}
					onChange={onChangeHandler}
					getOptionLabel={(option) => (option.symbol ? option.symbol : '')}
					renderInput={(params) => (
						<TextField {...params} label='Trading Pair' />
					)}
					value={tradingPair}
				/>
			</div>
		);
	}

	return (
		<div>
			{content}
			{tradigPairSuccessfullChange}
			{errorMsg}
		</div>
	);
});

export default TradingPairSelector;
