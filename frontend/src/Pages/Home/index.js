import React, { useContext, useEffect, useState } from "react";
import DataTable from "../../components/Table";
import { Box, Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { ModalContext } from "../../provider";
import Modal from "../../components/Modal";

function Tabela() {
  const { setOpen, setDataUser, handleGet } = useContext(ModalContext);
  const [altera, setAltera] = useState({});

  useEffect(() => {
    handleGet();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Modal data={altera} />
      <Box sx={{ width: "100vw", display: "flex", justifyContent: "center" }}>
        <Box
          sx={{
            width: "90vw",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Typography variant="h3">Consulta</Typography>
          <Button
            variant="contained"
            endIcon={<AddIcon />}
            sx={{ width: "150px", margin: "1rem" }}
            onClick={() => {
              setOpen(true);
              setDataUser(null);
              setAltera({});
            }}
          >
            Cadastrar
          </Button>
          <DataTable func={setAltera} />
        </Box>
      </Box>
    </>
  );
}

export default Tabela;
