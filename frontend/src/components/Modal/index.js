import React, { useContext, useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { ModalContext } from "../../provider";
import api from "../../services/api";
import {
  telAddMask,
  RemoveMask,
  ValidateBlanksSpace,
  CpfCnpjMask,
  cepAddMask,
} from "../../services/functions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

export default function Modal({ data }) {
  const { open, setOpen, handleGet } = useContext(ModalContext);
  const [dadoUser, setDadoUser] = useState({
    name: data.name,
    phone: data.phone,
    ident_doc: data.ident_doc,
    zip_code: data.zip_code,
    street: data.street,
    district: data.district,
    city: data.city,
    state: data.state,
    ibge: data.ibge,
  });
  const [ender, setEnder] = useState({
    cep: null,
    logradouro: null,
    complemento: null,
    bairro: null,
    localidade: null,
    uf: null,
    ibge: null,
    gia: null,
    ddd: null,
    siafi: null,
  });

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setEnder({
      cep: null,
      logradouro: null,
      complemento: null,
      bairro: null,
      localidade: null,
      uf: null,
      ibge: null,
      gia: null,
      ddd: null,
      siafi: null,
    });
  }, [data]);

  async function handleEndereco(cep) {
    try {
      const resp = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      if (resp.data.erro) {
        toast.error("CEP não encontrado!");
      }
      console.log(resp);
      setEnder(resp.data);
    } catch (error) {
      console.error(error);
    }
  }

  async function handlePost() {
    try {
      const body = {
        ...dadoUser,
        street: ender.logradouro,
        district: ender.bairro,
        city: ender.localidade,
        state: ender.uf,
        ibge: ender.ibge,
      };
      const resp = await api.post(`v1/users/`, body);
      console.log(resp);
      if (resp.status === 201) {
        toast.success("Cadastrado!");
      } else {
        toast.error("Erro!");
      }
      handleGet();
    } catch (error) {
      console.error(error);
    }
    setOpen(false);
  }

  async function handlePut() {
    // delete dadoUser.ident_doc;
    try {
      const resp = await api.put(`v1/users/${data.id}`, dadoUser);
      if (resp.status === 200) {
        toast.success("Alterado!");
      } else {
        toast.error("Erro!");
      }
      console.log(resp);
      handleGet();
    } catch (error) {
      console.error(error);
    }
    setOpen(false);
  }

  function getForm(id, value) {
    setDadoUser({ ...dadoUser, [id]: value });
  }

  return (
    <>
      {data && (
        <Dialog open={open} onClose={handleClose}>
          <Box component="form" autoComplete="off">
            <ToastContainer />
            <DialogTitle>Cadastrar</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Nome"
                type="text"
                fullWidth
                variant="outlined"
                defaultValue={data.name}
                onChange={(e) => {
                  getForm(e.target.id, e.target.value);
                }}
              />
              <TextField
                autoFocus
                margin="dense"
                id="phone"
                label="Telefone"
                type="tel"
                fullWidth
                variant="outlined"
                defaultValue={telAddMask(data.phone || "")}
                onChange={(e) => {
                  ValidateBlanksSpace(e.target.value, e.target);
                  e.target.value = telAddMask(e.target.value);
                  getForm(e.target.id, RemoveMask(e.target.value));
                }}
                inputProps={{ maxLength: 15 }}
              />
              <TextField
                autoFocus
                margin="dense"
                id="ident_doc"
                label="Documento de Identificação"
                type="text"
                fullWidth
                variant="outlined"
                defaultValue={CpfCnpjMask(data.ident_doc || "")}
                onChange={(e) => {
                  ValidateBlanksSpace(e.target.value, e.target);
                  e.target.value = CpfCnpjMask(e.target.value);
                  getForm(e.target.id, RemoveMask(e.target.value));
                }}
                inputProps={{ maxLength: 18 }}
              />
              <TextField
                autoFocus
                margin="dense"
                id="zip_code"
                label="CEP"
                type="text"
                fullWidth
                variant="outlined"
                defaultValue={cepAddMask(data.zip_code || "")}
                onChange={(e) => {
                  ValidateBlanksSpace(e.target.value, e.target);
                  e.target.value = cepAddMask(e.target.value);
                  getForm(e.target.id, RemoveMask(e.target.value));
                  if (e.target.value.length === 9) {
                    e.target.blur();
                  }
                }}
                onBlur={(e) => {
                  if (e.target.value.length === 9) {
                    handleEndereco(RemoveMask(e.target.value));
                  }
                }}
                inputProps={{ maxLength: 9 }}
              />
              {ender.logradouro && (
                <>
                  <TextField
                    margin="dense"
                    id="street"
                    label="Rua"
                    type="text"
                    fullWidth
                    value={ender.logradouro !== null && ender.logradouro}
                    InputProps={{
                      readOnly: true,
                    }}
                    variant="filled"
                    onChange={(e) => {
                      getForm(e.target.id, e.target.value);
                    }}
                  />
                  <TextField
                    margin="dense"
                    id="district"
                    label="Bairro"
                    type="text"
                    fullWidth
                    value={ender.bairro !== null && ender.bairro}
                    InputProps={{
                      readOnly: true,
                    }}
                    variant="filled"
                    onChange={(e) => {
                      getForm(e.target.id, e.target.value);
                    }}
                  />
                  <TextField
                    margin="dense"
                    id="city"
                    label="Cidade"
                    type="text"
                    fullWidth
                    value={ender.localidade || ""}
                    InputProps={{
                      readOnly: true,
                    }}
                    variant="filled"
                    onChange={(e) => {
                      console.log("O alerta entrou aqui");
                      getForm(e.target.id, e.target.value);
                    }}
                  />
                  <TextField
                    margin="dense"
                    id="state"
                    label="Estado"
                    type="text"
                    fullWidth
                    value={ender.uf !== null && ender.uf}
                    InputProps={{
                      readOnly: true,
                    }}
                    variant="filled"
                    onChange={(e) => {
                      getForm(e.target.id, e.target.value);
                    }}
                  />
                  <TextField
                    margin="dense"
                    id="ibge"
                    label="IBGE"
                    type="text"
                    fullWidth
                    value={ender.ibge !== null && ender.ibge}
                    InputProps={{
                      readOnly: true,
                    }}
                    variant="filled"
                    onChange={(e) => {
                      getForm(e.target.id, e.target.value);
                    }}
                  />
                </>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancelar</Button>
              <Button onClick={data.id !== undefined ? handlePut : handlePost}>
                Enviar
              </Button>
            </DialogActions>
          </Box>
        </Dialog>
      )}
    </>
  );
}
