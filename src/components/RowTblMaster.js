import React, { useEffect, useContext } from 'react';
import { IconButton, TableCell } from '@material-ui/core';
import TableRow from '@material-ui/core/TableRow';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { makeStyles } from '@material-ui/core/styles';
// import { TableAnidada } from './TableAnidada';
import { DataContext } from '../context/DataProvider';

const useRowStyles = makeStyles({
	root: {
		'& > *': {
			borderBottom: 'unset',
		},
	},
});

export const RowTblMaster = (props) => {
	const { row } = props;
	// const [open, setOpen] = React.useState(false);
	const { rows, geDataAuto, idepol,
        numcert } = useContext(DataContext);
	const classes = useRowStyles();

	// useEffect(() => {
	// 	geDataAuto();
	// 	setOpen(false);
	// }, []);


	return (
		<>
			<TableRow className={classes.root}>
				{/* <TableCell>
					<IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
						{open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
					</IconButton>
				</TableCell> */}
				{/* <TableCell align="center">{row.CEDULA_ASEGURADO}</TableCell> */}
				{/* <TableCell align="center">{row.NOMASEG}</TableCell> */}
				<TableCell align="center">{row.NUMEROPOL}</TableCell>
				<TableCell align="center">{row.TITULAR}</TableCell>
				<TableCell align="center">{row.VIGENCIA}</TableCell>
				<TableCell align="center">{row.NUMPLACA}</TableCell>
				<TableCell align="center">{row.DESCMARCA}</TableCell>
				<TableCell align="center">{row.DESCMODELO}</TableCell>
				<TableCell align="center">{row.COLOR}</TableCell>
				<TableCell align="center">{row.DESVERSION}</TableCell>
				<TableCell align="center">{row.ANOVEH}</TableCell>
				<TableCell align="center">{row.SERIALCARROCERIA}</TableCell>
			</TableRow>
			{/* <TableRow>
				<TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
					<Collapse in={open} timeout="auto" unmountOnExit>
						<Box margin={1}>
							<TableAnidada coberturas={row.COBERTURAS} />
						</Box>
					</Collapse>
				</TableCell>
			</TableRow> */}
		</>
	);
};
