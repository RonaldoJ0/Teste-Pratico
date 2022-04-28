import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
// import { PropTypes } from 'prop-types';
import { ModalContext } from "../../provider";
import api from "../../services/api";

export default function DataTable({ data, func }) {
  const { setOpen, dataUser, setDataUser } = React.useContext(ModalContext);

  const [rows, setRows] = useState(null);

  function createRow(dataUser) {
    let array = [];
    let list = {};

    if (dataUser !== null) {
      dataUser.forEach((element) => {
        list = {
          id: element.id,
          name: element.name,
          phone: element.phone,
          ident_doc: element.ident_doc,
          zip_code: element.zip_code,
          street: element.street,
          district: element.district,
          city: element.city,
          state: element.state,
          ibge: element.ibge,
        };
        array.push(list);
      });

      setRows(array);
    }
  }

  useEffect(() => {
    createRow(dataUser);
  }, [dataUser]);

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Nome", width: 240 },
    {
      field: "phone",
      headerName: "Telefone",
      width: 130,
      sortable: false,
      valueGetter: (params) =>
        `(${params.row.phone.substring(0, 2)}) 
        ${
          params.row.phone.length > 10
            ? params.row.phone.substring(2, 7) +
              "-" +
              params.row.phone.substring(7, 11)
            : params.row.phone.substring(2, 6) +
              "-" +
              params.row.phone.substring(6, 10)
        }`,
    },
    {
      field: "ident_doc",
      headerName: "Documento de Identificação",
      sortable: false,
      width: 200,
      valueGetter: (params) =>
        `${
          params.row.ident_doc.length > 11
            ? params.row.ident_doc.substring(0, 2) +
              "." +
              params.row.ident_doc.substring(2, 5) +
              "." +
              params.row.ident_doc.substring(5, 8) +
              "/" +
              params.row.ident_doc.substring(8, 12) +
              "-" +
              params.row.ident_doc.substring(12, 14)
            : params.row.ident_doc.substring(0, 3) +
              "." +
              params.row.ident_doc.substring(3, 6) +
              "." +
              params.row.ident_doc.substring(6, 9) +
              "-" +
              params.row.ident_doc.substring(9, 11)
        }`,
    },
    {
      field: "zip_code",
      headerName: "CEP",
      sortable: false,
      width: 100,
      valueGetter: (params) =>
        `${params.row.zip_code.substring(0, 5)}-${params.row.zip_code.substring(
          5,
          8
        )}`,
    },
    {
      field: "street",
      headerName: "Rua",
      width: 130,
    },
    {
      field: "district",
      headerName: "Bairro",
      width: 100,
    },
    {
      field: "city",
      headerName: "Cidade",
      width: 100,
    },
    {
      field: "state",
      headerName: "UF",
      width: 10,
    },
    {
      field: "ibge",
      headerName: "IBGE",
      width: 100,
    },
    {
      field: "options",
      headerName: "Opções",
      width: 300,
      renderCell: ({ row }) => {
        return (
          <>
            <Button
              variant="contained"
              color="warning"
              size="small"
              style={{ marginLeft: 16 }}
              startIcon={<EditIcon />}
              onClick={(e) => {
                func(row);
                setOpen(true);
                e.stopPropagation();
              }}
            >
              Atualizar
            </Button>
            <Button
              variant="contained"
              color="error"
              size="small"
              style={{ marginLeft: 16 }}
              startIcon={<DeleteIcon />}
              onClick={async function handleDelete() {
                try {
                  const resp = await api.delete(`v1/users/${row.id}`);
                  console.log(resp.data);
                  const array = dataUser.filter(
                    (element) => element.id !== row.id
                  );
                  setDataUser(array);
                } catch (error) {
                  console.error(error);
                }
              }}
            >
              Deletar
            </Button>
          </>
        );
      },
    },
  ];

  return (
    <div style={{ marginLeft: "1rem", height: 500, width: "100%" }}>
      {rows && (
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
      )}
    </div>
  );
}
