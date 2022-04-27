import React, {useContext} from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { ModalContext } from '../../provider';

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'Nome', width: 160 },
  { 
    field: 'phone', 
    headerName: 'Telefone', 
    width: 160,
    sortable: false,
    valueGetter: (params) =>
      `(${params.row.phone.substring(0, 2)}) 
      ${params.row.phone.length > 10 ? params.row.phone.substring(2,7) + "-" + 
      params.row.phone.substring(7,11) : params.row.phone.substring(2,6) + "-" + 
      params.row.phone.substring(6,10)}`
  },
  {
    field: 'ident_doc',
    headerName: 'Documento de Identificação',
    sortable: false,
    width: 250,
    valueGetter: (params) => `${params.row.ident_doc.length > 11 ? 
      params.row.ident_doc.substring(0, 2) + "." + params.row.ident_doc.substring(2, 5) + "." +
      params.row.ident_doc.substring(5, 8) + "/" + params.row.ident_doc.substring(8, 12) + "-" +
      params.row.ident_doc.substring(12, 14)
    : params.row.ident_doc.substring(0, 3) + "." + params.row.ident_doc.substring(3, 6) + "." +
      params.row.ident_doc.substring(6, 9) + "-" + params.row.ident_doc.substring(9, 11)}`
  },
  {
    field: 'zip_code',
    headerName: 'CEP',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
  },
  {
    field: 'options',
    headerName: 'Opções',
    width: 400,
    renderCell: () => {
      // const {open, setOpen} = useContext(ModalContext);
      return(
        <>
        <Button
            variant="contained"
            color="warning"
            size="small"
            style={{ marginLeft: 16 }}
            startIcon={<EditIcon/>}
            // onClick={() => setOpen(true)}
        >
        Atualizar
        </Button>
        <Button
            variant="contained"
            color="error"
            size="small"
            style={{ marginLeft: 16 }}
            startIcon={<DeleteIcon />}
        >
        Deletar
        </Button>
        </>
      )
  },
  }
];

const rows = [
  // { id: 1, lastName: 'Snow', name: 'Jon', age: 35 },
  // { id: 2, lastName: 'Lannister', name: 'Cersei', age: 42 },
  // { id: 3, lastName: 'Lannister', name: 'Jaime', age: 45 },
  // { id: 4, lastName: 'Stark', name: 'Arya', age: 16 },
  // { id: 5, lastName: 'Targaryen', name: 'Daenerys', age: null },
  // { id: 6, lastName: 'Melisandre', name: null, age: 150 },
  // { id: 7, lastName: 'Clifford', name: 'Ferrara', age: 44 },
  // { id: 8, lastName: 'Frances', name: 'Rossini', age: 36 },
  // { id: 9, lastName: 'Roxie', name: 'Harvey', age: 65 },
  { id: 1, name: 'Teste', phone: '65996029907', ident_doc: '06202692197'},
  { id: 2, name: 'Teste', phone: '6532233223', ident_doc: '12345678912345'},
  { id: 3, name: 'Teste', phone: '6532233223', ident_doc: '12345678912'}
];

export default function DataTable() {
  return (
    <div style={{ marginLeft:'1rem', height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[5]}
      /> 
    </div>
  );
}
