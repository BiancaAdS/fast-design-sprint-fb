import React from "react";

import Typography from '@mui/material/Typography';
import { Chip } from "@mui/material";

import { Container } from "./styles";


export const AtividadeBox = (props) => {


    return (

        <Container className={`${props.activeStep === props.i ? 'atvAtual' : 'atvAnt'}`}>
             
           
            <div className={`${props.activeStep === props.i ? 'atvAtualBox' : ''}`}>

                <h5 className={`${props.activeStep === props.i ? 'atvAtual' : 'atvAnt'}`} style={{ textAlign: 'center' }}>{props.item.title}</h5>
                <div className={`bloco-atv ${props.activeStep === props.i ? 'atvAtual' : 'atvAnt'} ${props.activeStep === 0 ? 'bloco-atv-video' : ''} `}>
                    <Chip label={props.item.tipo} className="chipAtv" />
                
                    <Typography paragraph >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'column' }}>
                            
                            <h4 className="text-title-inside"> {props.item.titleAtv} </h4>
                            
                           {props.children}
                        </div>
                        
                        <div className="box-atv">
                            {props.item.descr}
                            <a rel='noreferrer' href={`${props.item.link}`} target="_blank">{props.item.descrLink}</a>
                            <br />
                            <br />
                            { props.item.tempo !== 0 ?   
                                <div className="iniciar-atv">
                                    {props.item.descrTemp}
                                    <button className={`btn-atv ${props.isActive ? 'selected' : ''}`} onClick={() => props.handleTempoEstimado(props.item.tempo)} disabled={props.isActive || props.seConhecem}>Iniciar Atividade</button>
                                </div> : ''
                            }

                        </div> 
                    </Typography>

                </div>
            </div>

        </Container>
    )
}