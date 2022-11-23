import React from "react";

import Typography from '@mui/material/Typography';
import { Chip } from "@mui/material";

import { Container } from "./styles";

import { FormControl, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';


import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

import parse from 'html-react-parser';


export const AtividadeBox = (props) => {
    
    const stringToHTML = (stringText, titleAtv) => {

        const options = {
            replace: ({ name }) => {
                if(props.etapaAtual === '1' && titleAtv.includes('informações da equipe')) {
                    if (name === 'form' ) {
                        return (
                            <form onSubmit={props.handleNomeEquipe}>

                        <FormControl fullWidth>
                            <label className="text-papel">Nome da Equipe</label>
                            <TextField disabled={props.infoPrincipalPreenchida} value={props.nomeDaEquipe} defaultValue={`${JSON.parse(localStorage.getItem('novaSprint')) !== true && props.nomeDaEquipe !== '' ? props.nomeDaEquipe : ''}`} onMouseLeave={() => props.setEquipeExiste(false)} required type={'text'} onChange={(e) => props.setNomeDaEquipe(e.target.value)} fullWidth margin="normal" size="small" placeholder="Informe o nome da equipe" variant="outlined" className={`input-text ${props.equipeExiste ? 'equipeExisteInput' : ''}`} />
                            <div className={`${props.equipeExiste ? 'equipeExiste' : 'equipeNaoExiste'}`} onMouseLeave={() => props.setEquipeExiste(false)}>
                                Nome de Equipe já existe.
                            </div>
                            <label className="text-papel">Quantidade de Integrantes</label>
                            <TextField disabled={props.infoPrincipalPreenchida} value={props.quantidadeIntegrantes} defaultValue={`${JSON.parse(localStorage.getItem('novaSprint')) !== true && props.quantidadeIntegrantes !== 0 ? props.quantidadeIntegrantes : ''}`} required onChange={(e) => props.setQuantidadeIntegrantes(e.target.value)} type={'number'} fullWidth margin="normal" size="small" placeholder="Informe a quantidade de integrantes" variant="outlined" className="input-text" />

                            <Button disabled={props.atvCompleta1 || props.infoPrincipalPreenchida} type="submit" className="btn-formulario">Enviar Informações</Button>

                        </FormControl>

                    </form>
                        )
                      }
                }

                if(props.etapaAtual === '1' && titleAtv.includes('representantes da equipe')) {
                    if (name === 'form' ) {
                        return (
                            <form onSubmit={props.handleInformacaoEquipe}>

                        <FormControl fullWidth>

                            <label className="text-papel" >Facilitador</label>
                            <Popup trigger={<QuestionMarkIcon className="icon-pop"></QuestionMarkIcon>} position="right center">
                                <div>Responsável por guiar a equipe nas atividades realizadas. Controla o tempo e a próxima atividade.</div>
                            </Popup>
                            <TextField disabled={props.infoPapeisPreenchida} value={props.facilitador} defaultValue={`${JSON.parse(localStorage.getItem('novaSprint')) !== true && props.facilitador !== '' ? props.facilitador : ''}`} required onChange={(e) => props.setFacilitador(e.target.value)} fullWidth margin="normal" size="small" placeholder="Informe o nome do integrante" variant="outlined" className="input-text" />

                            <label className="text-papel">Definidor</label>
                            <Popup trigger={<QuestionMarkIcon className="icon-pop2"></QuestionMarkIcon>} position="right center">
                                <div>Responsável por realizar as decisões mais importantes de cada atividade.</div>
                            </Popup>
                            <TextField disabled={props.infoPapeisPreenchida} value={props.definidor} defaultValue={`${JSON.parse(localStorage.getItem('novaSprint')) !== true && props.definidor !== '' ? props.definidor : ''}`} required onChange={(e) => props.setDefinidor(e.target.value)} fullWidth margin="normal" size="small" placeholder="Informe o nome do integrante" variant="outlined" className="input-text" />

                            <label className="text-papel">Observador</label>
                            <Popup trigger={<QuestionMarkIcon className="icon-pop3"></QuestionMarkIcon>} position="right center">
                                <div>Responsável por realizar anotações durante as entrevistas.</div>
                            </Popup>
                            <TextField disabled={props.infoPapeisPreenchida} value={props.observador} defaultValue={`${JSON.parse(localStorage.getItem('novaSprint')) !== true && props.observador !== '' ? props.observador : ''}`} required onChange={(e) => props.setObservador(e.target.value)} fullWidth margin="normal" size="small" placeholder="Informe o nome do integrante" variant="outlined" className="input-text" />

                            <label className="text-papel">Entrevistador</label>
                            <Popup trigger={<QuestionMarkIcon className="icon-pop4"></QuestionMarkIcon>} position="right center">
                                <div>Responsável por fazer perguntas nas atividades de entrevistas.</div>
                            </Popup>
                            <TextField disabled={props.infoPapeisPreenchida} value={props.entrevistador} defaultValue={`${JSON.parse(localStorage.getItem('novaSprint')) !== true && props.entrevistador !== '' ? props.entrevistador : ''}`} required onChange={(e) => props.setEntrevistador(e.target.value)} fullWidth margin="normal" size="small" placeholder="Informe o nome do integrante" variant="outlined" className="input-text" />

                            <label className="text-papel">Scrum Master</label>
                            <Popup trigger={<QuestionMarkIcon className="icon-pop5"></QuestionMarkIcon>} position="right center">
                                <div>Responsável por cobrar as atividades de planejamento, reuniões e controla a participação do definidor/cliente/dono do produto.</div>
                            </Popup>
                            <TextField disabled={props.infoPapeisPreenchida} value={props.scrumMaster} defaultValue={`${JSON.parse(localStorage.getItem('novaSprint')) !== true && props.scrumMaster !== '' ? props.scrumMaster : ''}`} required onChange={(e) => props.setScrumMaster(e.target.value)} fullWidth margin="normal" size="small" placeholder="Informe o nome do integrante" variant="outlined" className="input-text" />

                            <Button disabled={props.atvCompleta2 || props.infoPapeisPreenchida} type="submit" className="btn-formulario">Enviar Informações</Button>
                        </FormControl>

                    </form>
                        )
                      }
                }

                if(props.etapaAtual === '1' && titleAtv.includes('Retrospectiva')) {
                    if (name === 'form' ) {
                        return (
        
                            <form onSubmit={(e) => {e.preventDefault(); props.setInfoRetrospectivaPreenchida(true)}}>
                                <FormControl fullWidth>
                                    <label className="text-papel">Link da Retrospectiva preenchida</label>
                                    <TextField disabled={props.infoRetrospectivaPreenchida} value={props.linkRetrospectiva} defaultValue={`${JSON.parse(localStorage.getItem('novaSprint')) !== true && props.linkRetrospectiva !== '' ? props.linkRetrospectiva : ''}`} required type={'text'} onChange={(e) => props.setLinkRetrospectiva(e.target.value)} fullWidth  margin="normal" size="small" placeholder="Informe o link da retrospectiva" variant="outlined" className="input-text" />
                                    <Button disabled={props.atvCompleta3 || props.infoRetrospectivaPreenchida} type="submit" className="btn-formulario">Enviar Informações</Button>
                                </FormControl>
                            </form>
                        )
                      }
                }

                if(props.etapaAtual === '2' && titleAtv.includes('Retrospectiva')) {
                    if (name === 'form' ) {
                        return (
                            <form onSubmit={(e) => {e.preventDefault(); props.setInfoRetrospectivaPreenchida(true)}}>
                                <FormControl fullWidth>
                                    <label className="text-papel">Link da Retrospectiva preenchida</label>
                                    <TextField disabled={props.infoRetrospectivaPreenchida} value={props.linkRetrospectiva} defaultValue={`${JSON.parse(localStorage.getItem('novaSprint')) !== true && props.linkRetrospectiva !== '' ? props.linkRetrospectiva : ''}`} required type={'text'} onChange={(e) => props.setLinkRetrospectiva(e.target.value)} fullWidth  margin="normal" size="small" placeholder="Informe o link da retrospectiva" variant="outlined" className="input-text" />
                                    <Button disabled={props.atvCompleta || props.infoRetrospectivaPreenchida} type="submit" className="btn-formulario">Enviar Informações</Button>
                                </FormControl>
                            </form>
                        )
                      }
                }

                if(props.etapaAtual === '3' && titleAtv.includes('Retrospectiva')) {
                    if (name === 'form' ) {
                        return (
                            <form onSubmit={(e) => {e.preventDefault(); props.setInfoRetrospectivaPreenchida(true)}}>
                                <FormControl fullWidth>
                                    <label className="text-papel">Link da Retrospectiva preenchida</label>
                                    <TextField disabled={props.infoRetrospectivaPreenchida} value={props.linkRetrospectiva} defaultValue={`${JSON.parse(localStorage.getItem('novaSprint')) !== true && props.linkRetrospectiva !== '' ? props.linkRetrospectiva : ''}`} required type={'text'} onChange={(e) => props.setLinkRetrospectiva(e.target.value)} fullWidth  margin="normal" size="small" placeholder="Informe o link da retrospectiva" variant="outlined" className="input-text" />
                                    <Button disabled={props.atvCompleta || props.infoRetrospectivaPreenchida} type="submit" className="btn-formulario">Enviar Informações</Button>
                                </FormControl>
                            </form>
                        )
                      }
                }
                
                if(props.etapaAtual === '4' && titleAtv.includes('Retrospectiva')) {
                    if (name === 'form' ) {
                        return (
                            <form onSubmit={(e) => {e.preventDefault(); props.setInfoRetrospectivaPreenchida(true)}}>
                                <FormControl fullWidth>
                                    <label className="text-papel">Link da Retrospectiva preenchida</label>
                                    <TextField disabled={props.infoRetrospectivaPreenchida} value={props.linkRetrospectiva} defaultValue={`${JSON.parse(localStorage.getItem('novaSprint')) !== true && props.linkRetrospectiva !== '' ? props.linkRetrospectiva : ''}`} required type={'text'} onChange={(e) => props.setLinkRetrospectiva(e.target.value)} fullWidth  margin="normal" size="small" placeholder="Informe o link da retrospectiva" variant="outlined" className="input-text" />
                                    <Button disabled={props.atvCompleta || props.infoRetrospectivaPreenchida} type="submit" className="btn-formulario">Enviar Informações</Button>
                                </FormControl>
                            </form>
                        )
                      }
                }
              
    
            }
          };

          
        let tags = parse(stringText, options)

        return tags
    }

   

    const handleTempoAtividade = (tempo) => {
        //recebe tempo e verifica se eh minutos ou horas
        let inteira = Math.floor(tempo / 60);
        let resto = tempo % 60;
        if(tempo < 60) {
            return tempo + ' minutos';
        } else {
            if(tempo === 60) {
                return inteira + " hora"
            } else {
                return `${inteira} hora e ${resto} minutos`
            }
        }
    }

    return (

        <Container className={`${props.activeStep === props.i ? 'atvAtual' : 'atvAnt'}`}>           
            
            <div className={`${props.activeStep === props.i ? 'atvAtualBox' : ''}`}>

                <h5 className={`${props.activeStep === props.i ? 'atvAtual' : 'atvAnt'}`} style={{ textAlign: 'center' }}>{props.item.title}</h5>
                <div className={`bloco-atv ${props.activeStep === props.i ? 'atvAtual' : 'atvAnt'} ${props.activeStep === 0 ? 'bloco-atv-video' : ''} `}>
                    <Chip label={props.item.tipo} className="chipAtv" />
                
                    <Typography paragraph >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'column' }}>
                            
                            <h4 className="text-title-inside"> {props.item.tituloAtividade} </h4>
                            
                           {props.children}
                        </div>
                        
                        <div className="box-atv">
                            {stringToHTML(props.item.descricao, props.item.tituloAtividade)}
                            <a rel='noreferrer' href={`${props.item.link}`} target="_blank">{props.item.descricaoLink}</a>
                            <br />
                            <br />
                            { props.item.tempoEstimado !== 0 ?   
                                <div className="iniciar-atv">
                                    <p>Antes de inciar a atividade lembrem-se que vocês têm <strong>{handleTempoAtividade(props.item.tempoEstimado)}</strong> para finalizar a mesma.</p>
                                    <button className={`btn-atv ${props.isActive ? 'selected' : ''}`} onClick={() => props.handleTempoEstimado(props.item.tempoEstimado)} disabled={props.isActive || props.seConhecem}>Iniciar Atividade</button>
                                </div> : ''
                            }

                        </div> 
                    </Typography>

                </div>
            </div>

        </Container>
    )
}