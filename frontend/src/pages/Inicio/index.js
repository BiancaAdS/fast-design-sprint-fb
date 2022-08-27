import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'

import { FormControl, TextField, Button } from '@mui/material';

import { Container } from "./styles";


export const Inicio = () => {

    const [nomeDaEquipe, setNomeDaEquipe] = useState('')

    const navigate = useNavigate();

    const hadleContinuarSprint = (nomeDaEquipe) => {

    }

    const handleIniciarSprint = () => {
        navigate('/etapa1', { replace: true })
    }
      
    return(
        <Container>
            <div className="wrapper">

                <div className="content">

                    <div className="box-title">
                        <h1>Já iniciou uma Sprint?</h1>
                    </div>


                    <div className="box-info">
                       <div className="box-title2">
                            <h2>Continue a sprint?</h2>
                       </div>
                        
                       <form onSubmit={hadleContinuarSprint}>

                            <FormControl fullWidth>
                                <label className="text-papel">Insira o nome da Equipe</label>
                                <TextField required type={'text'} onChange={(e) => setNomeDaEquipe(e.target.value)} fullWidth  margin="normal" size="small" placeholder="Informe o nome da equipe" variant="outlined" className="input-text" />                                                  
                                <Button type="submit" className="btn-formulario">Continuar Sprint</Button>
                            </FormControl>

                        </form>

                        <div className="divider">

                            <p className="borderright"></p>
                            <h5>ou</h5>
                            <p className="borderleft"></p>
                        </div>
                        

                        <div className="box-sprint">
                            
                            <div className="box-title2">
                                <h2>Inicie uma sprint?</h2>
                            </div>

                            <div className="box-form">

                                <form>

                                    <FormControl fullWidth>
                                        <Button type="submit" className="btn-formulario" onClick={handleIniciarSprint}>Iniciar Sprint</Button>
                                    </FormControl>

                                </form>

                            </div>

                           
                            

                        </div>

                        
                       

                        


                    </div>





                </div>


                </div>
           
        </Container>
    )
}