import React, { createContext, useState, useContext, useEffect } from 'react';
import { fetchData } from '../helpers/fetch';
import { AuthContext } from '../auth/AuthContext';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
	const [rows, setRows] = useState([]);
	const [openbd, setOpenbd] = useState(false);
	const [tipoID, setTipoID] = useState(null);
	const [openDialog, setOpenDialog] = useState(false);
  const [cedula, setCedula] = useState(null);
  const [placa, setPlaca] = useState(null);
  const [serial, setSerial] = useState(null);
  const [idepol, setIdepol] = useState(null);
  const [numcert, setNumcert] = useState(null);

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
				p_tipoid: tipoID,
				p_numid: cedula,
				p_dvid: tipoID == 'V' ? '0' : null,
				p_numplaca: placa,
				p_serialcarroceria: serial,
			});
      console.log(res)
    setIdepol(res.data.c_polizas.IDEPOL)
    setNumcert(res.data.c_polizas.NUMCERT)

  console.log(res.data.c_polizas)
    //console.log(5,res.data.c_polizas[0].NUMCERT)
      const resAuto = await fetchData('devuelve_auto', {
        p_idepol : idepol,
        p_numcert : numcert,
      }) 
			const arrayTabla = await res.data.c_polizas.map((asegurado) => {
				return {
					NUMEROPOL: asegurado.NUMEROPOL,
					TITULAR: asegurado.TITULAR,
					VIGENCIA: asegurado.VIGENCIA,
					NUMPLACA: asegurado.NUMPLACA,
					SERIALCARROCERIA: asegurado.SERIALCARROCERIA,
					ESTADO: asegurado.ESTADO,
				 	COBERTURAS: resAuto.data.c_vehiculo.map(cobertura =>{
            return cobertura
          })
				};
			});
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
        setSerial,
        idepol,
        numcert
			}}
		>
			{children}
		</DataContext.Provider>
	);
};
