import React,{useContext} from "react";
import {
  TableRow,
  TableCell,
  Table,
  TableHead,
  TableBody,
} from "@material-ui/core";
import { DataContext } from '../context/DataProvider';


export const TableAnidada = ({ coberturas }) => {
  const {prueba} = useContext(DataContext);
  console.log(prueba.data.c_polizas)
  let Jsonprueba = prueba.data.c_polizas
  // console.log(typeof(Jsonprueba))
let prueba2 = {0: {IDEPOL: 1697308, NUMCERT: 140, ESTATUS_POLIZA: 'ACTIVA', ESTATUS_CERT: 'prueba' },
              1: {IDEPOL: 1697308, NUMCERT: 140, ESTATUS_POLIZA: 'ACTIVA',}}
              
const obj = { oldKey: 'value' };
obj['newKey'] = obj['oldKey'];
delete obj['oldKey'];
console.log(obj);

    console.log(Object.values(prueba2))
    console.log(coberturas)

  return (
    <Table size="small" aria-label="purchases">
      <TableHead>
        <TableRow
          style={{
            backgroundColor: "#dcdee6",
            color: "#2a284f !important",
          }}
        >
          <TableCell style={{ color: 'black' }} align="center">
            MARCA
          </TableCell>
          <TableCell style={{ color: 'black' }} align="center">
            MODELO
          </TableCell>
          <TableCell style={{ color: 'black' }} align="center">
            VERSION
          </TableCell>
          <TableCell style={{ color: 'black' }} align="center">
            AÑO
          </TableCell>
          <TableCell style={{ color: 'black' }} align="center">
            COLOR
          </TableCell>
          <TableCell style={{ color: 'black' }} align="center">
            PLACA
          </TableCell>
          <TableCell style={{ color: 'black' }} align="center">
            SERIAL CARROCERIA
          </TableCell>
          <TableCell style={{ color: 'black' }} align="center">
            SERIAL MOTOR
          </TableCell>
          <TableCell style={{ color: 'black' }} align="center">
            NUMERO DE PUESTOS
          </TableCell>
          <TableCell style={{ color: 'black' }} align="center">
            
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {coberturas.map((cobertura, i) => (
          <TableRow key={i}>
            <TableCell component="th" scope="row">
              {cobertura.DESCMARCA}
            </TableCell>
            <TableCell component="th" scope="row">
              {cobertura.DESCMODELO}
            </TableCell>
            <TableCell component="th" scope="row">
              {cobertura.DESVERSION}
            </TableCell>
            <TableCell component="th" scope="row">
              {cobertura.ANOVEH}
            </TableCell>
            <TableCell component="th" scope="row">
              {cobertura.COLOR}
            </TableCell>
            <TableCell component="th" scope="row">
              {cobertura.NUMPLACA}
            </TableCell>
            <TableCell component="th" scope="row">
              {cobertura.SERIALCARROCERIA}
            </TableCell>
            <TableCell component="th" scope="row">
              {cobertura.SERIALMOTOR}
            </TableCell>
            <TableCell component="th" scope="row">
              {cobertura.NUMPUESTOS}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
