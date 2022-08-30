import React, { useState, useContext } from "react";
import { useNavigate } from 'react-router-dom'

import axios from 'axios'

import { AuthContext } from "../../contexts/Auth/AuthContext";

import { FormControl, TextField, Button } from '@mui/material';

import { Container } from "./styles";



export const Inicio = () => {

    const auth = useContext(AuthContext)

    const [nomeDaEquipe, setNomeDaEquipe] = useState('')
    const [equipeNaoExiste, setEquipeNaoExiste] = useState(false)

    const navigate = useNavigate();

    const hadleContinuarSprint = async (e) => {


        if(nomeDaEquipe) {

            const existe = await axios.post("/api/login/", {
                username: nomeDaEquipe,
                password: nomeDaEquipe
              })

            if(existe.data.authenticate) {

                const isLogged = await auth.loginUser(nomeDaEquipe, nomeDaEquipe)
                const { data } = await axios.get(`/api/equipes/${nomeDaEquipe}`)
  
                if(isLogged) {
                    setEquipeNaoExiste(false)
                    if(data) {
                       
                        let etapa = data.etapaFinalizada
                        let newEtapa
                        if(etapa === 'etapa1') newEtapa = etapa.replace("1", "2")
                        else if (etapa === 'etapa2') newEtapa = etapa.replace("2", "3")
                        else if (etapa === 'etapa3') newEtapa = etapa.replace("3", "4")
                        else if (etapa === 'etapa4') newEtapa = etapa
                        else newEtapa = 'etapa1'

                        navigate(`/${newEtapa}`, { replace: true })
                    }
                }

            } else {
                setEquipeNaoExiste(true)
            }
        }

    }

    const handleIniciarSprint = () => {
        navigate('/home', { replace: true })
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
                            <h2>Continuar a sprint?</h2>
                       </div>

                        <label className="text-papel">Insira o nome da Equipe</label>
                        <TextField onMouseLeave={() => setEquipeNaoExiste(false)} onFocus={() => setEquipeNaoExiste(false)} required type={'text'} onChange={(e) => setNomeDaEquipe(e.target.value)} fullWidth  margin="normal" size="small" placeholder="Informe o nome da equipe" variant="outlined" className={`input-text ${equipeNaoExiste ? 'equipeNaoExisteInput' : ''}`} />                                                  
                        <div className={`${equipeNaoExiste ? 'equipeNaoExiste' : 'equipeExiste'}`} onMouseLeave={() => setEquipeNaoExiste(false)}>
                            Está equipe ainda não iniciou uma sprint.
                        </div>
                        <Button type="submit" className="btn-formulario" onClick={hadleContinuarSprint}>Continuar Sprint</Button>
                        

                        <div className="divider">

                            <p className="borderright"></p>
                            <h5>ou</h5>
                            <p className="borderleft"></p>
                        </div>
                        

                        <div className="box-sprint">
                            
                            <div className="box-title2">
                                <h2>Iniciar uma sprint?</h2>
                            </div>

                            <div className="box-form">

                                
                                    
                                <Button type="submit" className="btn-formulario" onClick={handleIniciarSprint}>Iniciar Sprint</Button>
                                    

                               

                            </div>

                           
                            

                        </div>

                        
                       

                        


                    </div>





                </div>


                </div>
           
        </Container>
    )
}