import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

const DecimalSelector = (props) => {
	const { handleChange, decimals } = props;
	return (
		<Box sx={{ minWidth: 120, width: 300, m: 2 }}>
			<FormControl fullWidth>
				<InputLabel id='demo-simple-select-label'>Group</InputLabel>
				<Select
					labelId='demo-simple-select-label'
					id='demo-simple-select'
					value={decimals}
					label='Age'
					onChange={handleChange}>
					<MenuItem value={4}>4 Decimals</MenuItem>
					<MenuItem value={5}>5 Decimals</MenuItem>
					<MenuItem value={6}>6 Decimals</MenuItem>
				</Select>
			</FormControl>
		</Box>
	);
};

export default DecimalSelector;
