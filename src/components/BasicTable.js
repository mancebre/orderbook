import React from 'react';
import {
	TableContainer,
	Paper,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	Typography,
	tableCellClasses,
	styled,
	Box,
	Skeleton,
} from '@mui/material';

const BasicTable = (props) => {
	const { tableData, title, decimals } = props;

	const parsePrice = (price) => Number(price).toFixed(decimals);

	const createData = (price, size) => {
		return { price, size };
	};

	const rows = tableData.map((row) => createData(row[0], row[1]));

	const StyledTableCell = styled(TableCell)(({ theme }) => ({
		[`&.${tableCellClasses.head}`]: {
			backgroundColor: theme.palette.common.white,
			color: theme.palette.common.black,
		},
		[`&.${tableCellClasses.body}`]: {
			fontSize: 14,
		},
	}));

	const StyledTableRow = styled(TableRow)(({ theme }) => ({
		'&:nth-of-type(odd)': {
			backgroundColor: theme.palette.action.hover,
		},
		// hide last border
		'&:last-child td, &:last-child th': {
			border: 0,
		},
	}));

	let tableBox = (
		<Box>
			<Typography
				sx={{ flex: '1 1 100%' }}
				variant='h6'
				id='tableTitle'
				component='div'>
				{title}
			</Typography>
			<Skeleton height={60} />
			<Skeleton height={60} />
			<Skeleton height={60} />
			<Skeleton height={60} />
			<Skeleton height={60} />
		</Box>
	);

	if (rows.length > 0) {
		tableBox = (
			<TableContainer component={Paper}>
				<Typography
					sx={{ flex: '1 1 100%' }}
					variant='h6'
					id='tableTitle'
					component='div'>
					{title}
				</Typography>
				<Table sx={{ minWidth: 400 }} aria-label='simple table'>
					<TableHead>
						<StyledTableRow>
							<StyledTableCell align='right'>Price</StyledTableCell>
							<StyledTableCell align='right'>Quantity</StyledTableCell>
						</StyledTableRow>
					</TableHead>
					<TableBody>
						{rows.map((row, index) => (
							<StyledTableRow
								key={index}
								sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
								<StyledTableCell align='right'>
									{parsePrice(row.price)}
								</StyledTableCell>
								<StyledTableCell align='right'>{row.size}</StyledTableCell>
							</StyledTableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		);
	}

	return tableBox;
};

export default BasicTable;
