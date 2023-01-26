import React, { createContext, useState, useContext, useEffect } from 'react';
import { fetchData } from '../helpers/fetch';
import { AuthContext } from '../auth/AuthContext';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
	const [rows, setRows] = useState([]);
	const [openbd, setOpenbd] = useState(false);
	const [tipoID, setTipoID] = useState('V');
	const [openDialog, setOpenDialog] = useState(false);
  const [cedula, setCedula] = useState(null);
  const [placa, setPlaca] = useState(null);
  const [serial, setSerial] = useState(null);

	const { setOpen, setMsn } = useContext(AuthContext);
	const fetchInfo = async (tipoDocu, proveedor, ci) => {
		console.log(tipoDocu);
		setOpenbd(true);
		const codProveedor = await fetchData('/ObtieneCodProv', {
			cProveedor: proveedor,
		});
		const respAsegurabilidad = await fetchData('/ConsultaAsegurabilidad', {
			cCodProv: codProveedor.data[0].CODPROV,
			cTipoId: tipoDocu,
			nNumId: parseInt(ci),
			cDvId: tipoDocu == 'M' ? null : '0', //"0",
		});

		const arrayTabla = await respAsegurabilidad.data.Asegurados_cur.map((asegurado) => {
			return {
				NOMASEG: asegurado.NOMASEG,
				CEDULA_ASEGURADO: asegurado.CEDULA_ASEGURADO,
				TOMADOR: asegurado.TOMADOR,
				DESCPARENTESCO: asegurado.DESCPARENTESCO,
				COBERTURAS: respAsegurabilidad.data.Aseg_coberturas_cur.filter(
					(cobertura) =>
						cobertura.NUMCERT === asegurado.NUMCERT &&
						cobertura.CEDULA_ASEGURADO === asegurado.CEDULA_ASEGURADO &&
						cobertura.DVIDASEG === asegurado.DVIDASEG
				),
			};
		});

		await setRows(arrayTabla);

		setOpenbd(false);
	};

	const geDataAuto = async () => {
		try {
			setOpenbd(true);
			const res = await fetchData('devuelve_poliza_auto', {
				p_tipoid: 'V',
				p_numid: cedula,
				p_dvid: '0',
				p_numplaca: placa,
				p_serialcarroceria: serial,
			});
			const arrayTabla = await res.data.c_polizas.map((asegurado) => {
				return {
					NUMEROPOL: asegurado.NUMEROPOL,
					TITULAR: asegurado.TITULAR,
					VIGENCIA: asegurado.VIGENCIA,
					NUMPLACA: asegurado.NUMPLACA,
					SERIALCARROCERIA: asegurado.SERIALCARROCERIA,
					ESTADO: asegurado.ESTADO,
				// 	COBERTURAS: respAsegurabilidad.data.Aseg_coberturas_cur.filter(
				// 		(cobertura) =>
				// 			cobertura.NUMCERT === asegurado.NUMCERT &&
				// 			cobertura.CEDULA_ASEGURADO === asegurado.CEDULA_ASEGURADO &&
				// 			cobertura.DVIDASEG === asegurado.DVIDASEG
				// 	),
				};
			});
			console.log(arrayTabla);
			await setRows(arrayTabla);
			setOpenbd(false);
		} catch (error) {}
	};


	

	return (
		<DataContext.Provider
			value={{
				rows,
				fetchInfo,
				setRows,
				setOpenbd,
				openbd,
				setOpenDialog,
				openDialog,
				setTipoID,
				tipoID,
				geDataAuto,
        cedula,
        setCedula,
        placa,
        setPlaca,
        serial,
        setSerial
			}}
		>
			{children}
		</DataContext.Provider>
	);
};
