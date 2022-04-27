import React, {useState} from 'react';
import DataTable from '../../components/Table';
import { Box, Button, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AddIcon from '@mui/icons-material/Add';

function Tabela(){
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };

    return(
        <>
            <Box sx={{width: '100vw', display: 'flex', justifyContent: 'center'}}>
                <Box sx={{width: '80vw', display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
                <Typography variant='h3'>Consulta</Typography>
                <Button variant="contained" endIcon={<AddIcon/>} sx={{width: '150px', margin: '1rem'}} onClick={handleClickOpen}>Cadastrar</Button>
                    <DataTable/>
                </Box>
            </Box>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Subscribe</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                    To subscribe to this website, please enter your email address here. We
                    will send updates occasionally.
                 </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Email Address"
                    type="email"
                    fullWidth
                    variant="standard"
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Email Address"
                    type="email"
                    fullWidth
                    variant="standard"
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Email Address"
                    type="email"
                    fullWidth
                    variant="standard"
                />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleClose}>Subscribe</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default Tabela;