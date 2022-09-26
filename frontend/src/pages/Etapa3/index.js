import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

import { AuthContext } from "../../contexts/Auth/AuthContext";

import { Timer } from '../../shared/components/Timer'
import { TabPanel } from '../../shared/components/TabPanel'
import { TabPanelInside } from '../../shared/components/TabPanelInside'

import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import MobileStepper from '@mui/material/MobileStepper';
import { Tabs, Tab, Accordion, AccordionDetails, AccordionSummary, FormControl, TextField } from '@mui/material';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

import { Container } from './styles'

import { useTheme } from '@mui/material/styles';

import notification from '../../shared/assets/notification.wav'




const steps = ['Aprimoramento Esboço', 'Organização da testagem', 'Desenvolvimento e testagem', 'Mentoria', "Aprimoramento Protótipo", "Revisão do Processo", "Avaliação"];


function a22yProps(index) {
    return {
      id: `simple-tab-${index}-inside`,
      'aria-controls': `simple-tabpanel-${index}-inside`, 
    };
}


export const Etapa3 = (props) => {
    const theme = useTheme();

    const navigate = useNavigate();

    const auth = useContext(AuthContext)

    const [activeStep, setActiveStep] = React.useState(0);
    const [completed, setCompleted] = React.useState({});
    const [isActive, setIsActive] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const [isOpenAccordion, setOpenAccordion] = useState(false)
    const [hasFinised, setHasFinised] = useState(false);
    const [timeClock, setTimeClock] = useState(0)
    const [valueInside, setValueInside] = useState(0);
    const [linkRetrospectiva, setLinkRetrospectiva] = useState("")
    
    const maxSteps = steps.length;

    const boxInitial = JSON.parse(localStorage.getItem('boxState3'))

    const [boxState, setBoxState] = useState(boxInitial ? boxInitial :{
            apresentacao: false,
            avaliacaoTestagem: false,
            construcao: false,
            ferramentas: false,
            mentoria: false,
            preparacaoTestes: false,
            reformulacaoEsboco: false,
            reformulacaoPrototipo: false,
            retrospectiva: false,
            revisaoEsboco: false,
            revisaoPrototipo: false,
            testagem: false,
            testagemReformulada: false,
        }
    )

    const handleFinalizar = (boxName) => {
        setBoxState({
            ...boxState,
            [boxName]: !boxState[boxName]
        })
    }

    useEffect(() => {
        localStorage.setItem('boxState3', JSON.stringify(boxState))
    }, [boxState])

    const handleChangeInside = (event, newValue) => {
        setValueInside(newValue);
    };


    const handleOpenBox = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
        setValueInside(isExpanded ? valueInside : 0);
        setOpenAccordion(isExpanded ? false : true)
    };

    const totalSteps = () => {
        return steps.length;
    };

    const completedSteps = () => {
        return Object.keys(completed).length;
    };

    const isLastStep = () => {
        return activeStep === totalSteps() - 1;
    };

    const allStepsCompleted = () => {
        return completedSteps() === totalSteps();
    };

    const handleNext = () => {
        const newActiveStep =
        isLastStep() && !allStepsCompleted()
            ? 
            steps.findIndex((step, i) => !(i in completed))
            : activeStep + 1;
        setActiveStep(newActiveStep);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStep = (step) => () => {
        setActiveStep(step);
    };

    const handleComplete = () => {
        const newCompleted = completed;
        newCompleted[activeStep] = true;
        setCompleted(newCompleted);
        handleNext();
    };

    const handleReset = () => {
        setActiveStep(0);
        setCompleted({});
    };

        const startCountdown = () => {
            setIsActive(true);
        }

    useEffect(() => {

        if(timeClock !== 0) {
            startCountdown()
        }

        if(!isActive && timeClock !== 0) {
            setTimeClock(0)
        }

    }, [timeClock, isActive])

    useEffect(() => {

        if(hasFinised) {
            startNewChallenge()
            setHasFinised(false)
        }
    }, [hasFinised])

    useEffect(() => {
        Notification.requestPermission();
    }, []);


    const startNewChallenge = () => {
        const audio = new Audio(notification);
        audio.load();
        if(Notification.permission == 'granted'){
            new Notification("Tempo para realizar a atividade finalizado ", {
                body: `:) Já é possível iniciar as próximas atividades.`
            });
            
            audio.play()
        }
    }


    const handleInformacaoEquipe = async (e) => {
        e.preventDefault()

        const { data } = await axios.get(`/api/equipes/${auth.user.username}`)
    
        if(Object.keys(data).length !== 0) {
            axios.post('/api/create-equipe', {
                nomeDaEquipe: data.nomeDaEquipe,
                quantidadeIntegrantes: data.quantidadeIntegrantes,
                seConhecem: data.seConhecem,
                definidor: data.definidor,
                facilitador: data.facilitador,
                observador: data.observador,
                entrevistador: data.entrevistador,
                scrumMaster: data.scrumMaster,
                linkRetrospectiva1: data.linkRetrospectiva1,
                linkRetrospectiva2: data.linkRetrospectiva2,
                linkRetrospectiva3: data.linkRetrospectiva3 ? data.linkRetrospectiva3 : linkRetrospectiva,
                linkRetrospectiva4: data.linkRetrospectiva4 ? data.linkRetrospectiva4 : "",
                etapaFinalizada: "etapa3"
            })
        } 

        handleFinalizarAtividade()
    }

    const [atvCompleta, setAtvCompleta] = useState(false)
        
        const handleFinalizarAtividade = () => {
            if(linkRetrospectiva !== "") {
                setAtvCompleta(true)
            } else {
                setAtvCompleta(false)
            }
        }


    const [width, setWidth]   = useState(window.innerWidth);
    const updateDimensions = () => {
        setWidth(window.innerWidth);
    }
    useEffect(() => {
        window.addEventListener("resize", updateDimensions);
        
        return () => window.removeEventListener("resize", updateDimensions);

    }, []);

    const handleNextEtapa = () => {
        setTimeout(() => {
            navigate(`/etapa4`, { replace: true })             
       }, 1000)
    }

    const [infoRetrospectivaPreenchida, setInfoRetrospectivaPreenchida] = useState(false)

    useEffect(() => {

        const handleInfoPreenchida = async () => {
            if(auth.user) {
                const { data } = await axios.get(`/api/equipes/${auth.user.username}`)
                 
                if(JSON.parse(localStorage.getItem('novaSprint')) !== true) {
                    setLinkRetrospectiva(data.linkRetrospectiva3)

                    if(data.linkRetrospectiva3.length !== 0 ) {
                        setInfoRetrospectivaPreenchida(true)
                    }
                }
            } 

        }
        handleInfoPreenchida()
       

    }, [atvCompleta])



    return (
            <Container>

                <div className='wrapper'>

                    <div className="content-page">

                        <div className="content-info">
                            <h1>Bem vindos a terceira etapa{auth.user ? ", " + auth.user.username : ''}!</h1>
                        </div>


                        <div className="atividades-box">
                    

                            <Box sx={{ width: '100%' }} className="box-step">
                                <Stepper nonLinear alternativeLabel activeStep={activeStep} orientation={`${width <= 625 ? 'vertical' : 'horizontal'}`}  className={`${width <= 625  ? 'mobile' : ''}`}> 
                                    {steps.map((label, index) => (
                                    <Step key={label} completed={completed[index]} className={`step ${width <= 625  ? 'mobile' : ''}`} disabled={isActive}>
                                        <StepButton color="inherit" onClick={handleStep(index)}>
                                        {label}
                                        </StepButton>
                                    </Step>
                                    ))}
                                </Stepper>
                                <div>
                                    {allStepsCompleted() ? (
                                    <React.Fragment>
                                        <Typography sx={{ mt: 2, mb: 1 }}>
                                        Todas as atividades foram completadas
                                        </Typography>
                                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                        <Box sx={{ flex: '1 1 auto' }} />
                                        <Button onClick={handleReset}>Recomeçar Atividades</Button>
                                        <Button onClick={handleNextEtapa}>Ir para a próxima etapa</Button>
                                        </Box>
                                    </React.Fragment>
                                    ) : (
                                    <React.Fragment>
                                        
                                        <Paper
                                            square
                                            elevation={0}
                                            sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            height: 50,
                                            pl: 2,
                                            bgcolor: 'background.default',
                                            }}
                                            className={`step ${width <= 625  ? '' : 'mobile'}`}
                                        >
                                  
                                            <Stepper activeStep={activeStep} className={`${completed[activeStep]? 'completedStep' : 'notCompletedStep'}`}> 
                                                <Typography className={`counter ${completed[activeStep] ? 'counter-completed' :  ''}`}>{activeStep+1}</Typography>
                                                <Step completed={completed[activeStep]}>
                                                    {steps[activeStep]}
                                                </Step>
                                            </Stepper>
                                           
                                        </Paper>
                                            

                                        <TabPanel value={activeStep} index={0} className="aprimoramento-esboco" >

                                            <div className="info-etapa-text">

                                                <h2 className="text-title-etapa">Aprimoramento do Esboço</h2>
                                                <h4 className="text-subtitle">
                                                    Etapa em que os participantes irão fazer atividades que tem como objetivo realizar a aplicação de melhorias no esboço da solução com base
                                                    nas respostas obtidas das validações/questionários aplicados para possíveis usuários realizados nas atividades da segunda etapa.
                                                    Esta etapa contém atividades que permitem o aprimoramento do esboço e a revisão do esboço.
                                                    <br /> <strong>Lembrem-se</strong>, cada atividade possui um tempo estimado para serem realizadas. O tempo é disponibilizado em cada atividade 
                                                    e para acompanhar esse tempo lembre sempre de olhar para o relógio.

                                                </h4>
                                            </div>

                                            <div className={`container-accordion ${expanded === 'panel1a' ? 'contador-open' : ''}`}>
                                                <span className='contador'></span>

                                                <Accordion className={`box-accordion`} expanded={expanded === 'panel1a'} onChange={handleOpenBox('panel1a')} disabled={isActive}>
                                                    <AccordionSummary
                                                    expandIcon={<ExpandMoreIcon className="icon-exp" />}
                                                    aria-controls="panel1bh-content"
                                                    id="panel1bh-header"
                                                    className={`${boxState['reformulacaoEsboco'] ? 'finalizada' : ''}`}>
                                                    <Typography className={`text-title ${boxState['reformulacaoEsboco'] ? 'finalizada' : ''}`}>
                                                        Reformulação do esboço
                                                    </Typography>
                                                    
                                                    </AccordionSummary>
                                                    <AccordionDetails className={`${!isOpenAccordion ? 'aberto' : ''}`}>
                                        
                                                        <div className={`timer-box`}>
                                                            <div className="content-timer">
                                                                <Timer min={timeClock} isActive={isActive} setIsActive={setIsActive} setHasFinised={setHasFinised} />
                                                            </div>
                                                        </div>


                                                        <TabPanelInside value={valueInside} index={0} className="atv-containerOnly">
                                                    

                                                            <h4 className="text-title-inside">
                                                                Reformulação do esboço com base nas respostas de pesquisas
                                                            </h4>
                                                            <div className="box-atv">
                                                                Nesta atividade vocês deverão trabalhar em <strong>grupo</strong>. O grupo deve realizar a reformulação de pontos obtidos das pesquisas
                                                                aplicadas na etapa anterior, realizando a análise se é viável ou não aplicar as melhorias que foram apontadas pelas respostas dos questionários
                                                                e pesquisas realizadas.
                                                                <br />
                                                                <br />
                                                                
                                                                <div className="iniciar-atv">
                                                                    <p>Antes de inciar a atividade lembrem-se que vocês têm <strong>15 minutos</strong> para finalizar a mesma.</p> 
                                                                    <button className={`btn-atv ${isActive ? 'selected' : ''}`} onClick={() => setTimeClock(15)} disabled={isActive}>Iniciar Atividade</button>                                              
                                                                </div>
                                                                
                                                            </div>
                                                        </TabPanelInside>


                                                        <div className="finalizarAtv">
                                                            <label>Finalizar Atividade?</label>
                                                            <input checked={boxState['reformulacaoEsboco']} className="checkbox-fin" type="checkbox" name="definicao-papeis" id="definicao-papeis" onChange={() => handleFinalizar('reformulacaoEsboco')} /> Sim
                                                        </div>
                                                    </AccordionDetails>
                                                </Accordion>
                                              
                                            </div>

                                            <div className={`container-accordion ${expanded === 'panel2a' ? 'contador-open' : ''}`}>
                                                <span className='contador'></span>

                                                <Accordion className={`box-accordion`} expanded={expanded === 'panel2a'} onChange={handleOpenBox('panel2a')} disabled={isActive}>
                                                    <AccordionSummary
                                                    expandIcon={<ExpandMoreIcon className="icon-exp" />}
                                                    aria-controls="panel1bh-content"
                                                    id="panel1bh-header"
                                                    className={`${boxState['revisaoEsboco'] ? 'finalizada' : ''}`}>
                                                    <Typography className={`text-title ${boxState['revisaoEsboco'] ? 'finalizada' : ''}`}>
                                                        Revisão de esboço
                                                    </Typography>
                                                    
                                                    </AccordionSummary>
                                                    <AccordionDetails className={`${!isOpenAccordion ? 'aberto' : ''}`}>
                                        
                                                        
                                                        <div className={`timer-box`}>
                                                            <div className="content-timer">
                                                                <Timer min={timeClock} isActive={isActive} setIsActive={setIsActive} setHasFinised={setHasFinised} />
                                                            </div>
                                                        </div>

                                                        <TabPanelInside value={valueInside} index={0} className="atv-containerOnly">
                                                        

                                                            <h4 className="text-title-inside">
                                                                Revisão de esboço
                                                            </h4>
                                                            <div className="box-atv">
                                                            Nesta atividade vocês deverão trabalhar em <strong>grupo</strong>. O grupo deve realizar a revisão do esboço com base na reformulação
                                                            feita na atividade anterior, podendo levar em conta a análise feita, os comentários obtidos dos questionários aplicados
                                                            e novas ideias que podem vim a surgir dos integrantes após essa rodada de validação.
                                                            <br />
                                                            <br />

                                                                <div className="iniciar-atv">
                            
                                                                    <p>Antes de inciar a atividade lembrem-se que vocês têm <strong>10 minutos</strong> para finalizar a mesma.</p> 

                                                                    <button className={`btn-atv ${isActive ? 'selected' : ''}`} onClick={() => setTimeClock(10)} disabled={isActive}>Iniciar Atividade</button>

                                                                </div>
                                                                
                                                            </div>
                                                        </TabPanelInside>
                                                        
                                                        <div className="finalizarAtv">
                                                            <label>Finalizar Atividade?</label>
                                                            <input checked={boxState['revisaoEsboco']} className="checkbox-fin" type="checkbox" name="definicao-papeis" id="definicao-papeis" onChange={() => handleFinalizar('revisaoEsboco')} /> Sim
                                                        </div>
                                                    </AccordionDetails>
                                                    
                                                </Accordion>
                                              
                                            </div>
                                            
                                        </TabPanel>

                                        <TabPanel value={activeStep} index={1} className="testagem">

                                            <div className="info-etapa-text">

                                                <h2 className="text-title-etapa">Organização da testagem da solução ou protótipo</h2>
                                                <h4 className="text-subtitle">
                                                    Etapa em que os participantes os participantes são responsáveis por realizar a escolha da forma de materializar a solução/protótipo ideado,
                                                    e após a escolha, as equipes irão iniciar as atividades para a preparação dos testes com usuários.
                                                    <br /> <strong>Lembrem-se</strong>, cada atividade possui um tempo estimado para serem realizadas. O tempo é disponibilizado em 
                                                    cada atividade e para acompanhar esse tempo lembre sempre de olhar para o relógio.
                                                </h4>
                                            </div>

                                            <div className={`container-accordion ${expanded === 'panel1b' ? 'contador-open' : ''}`}>
                                                <span className='contador'></span>
                                                <Accordion className="box-accordion" expanded={expanded === 'panel1b'} onChange={handleOpenBox('panel1b')} disabled={isActive}>
                                                    <AccordionSummary
                                                    expandIcon={<ExpandMoreIcon />}
                                                    aria-controls="panel1bh-content"
                                                    id="panel1bh-header"
                                                    className={`${boxState['ferramentas'] ? 'finalizada' : ''}`}>
                                                    <Typography className={`text-title ${boxState['ferramentas'] ? 'finalizada' : ''}`}>
                                                        Escolha de ferramentas para construção de protótipo
                                                    </Typography>
                                                    
                                                    </AccordionSummary>
                                                    <AccordionDetails className={`${!isOpenAccordion ? 'aberto' : ''}`}>
                                                    <div>
                                                        
                                                        <div className={`timer-box`}>
                                                            <div className="content-timer">
                                                                <Timer min={timeClock} isActive={isActive} setIsActive={setIsActive} setHasFinised={setHasFinised}></Timer>
                                                            </div>
                                                        </div>


                                                        <TabPanelInside value={valueInside} index={0} className="atv-containerOnly">
                                    
                                                            <h4 className="text-title-inside">
                                                                Escolha de ferramenta para materializar solução ou protótipo ideado
                                                            </h4>
                                                            <div className="box-atv">
                                                                Nesta atividade vocês deverão trabalhar em <strong>grupo</strong>. Nesta atividade vocês irão realizar a escolha da ferramenta que será utilizada 
                                                                para realizar a construção solução ou protótipo. 
                                                            
                                                                <br />
                                                                <br />
                                                                <div className="iniciar-atv">
                                                                    <p>Antes de inciar a atividade lembrem-se que vocês têm <strong>30 minutos</strong> para finalizar a mesma.</p> 
                                                                    <button className={`btn-atv ${isActive ? 'selected' : ''}`} onClick={() => setTimeClock(30)} disabled={isActive}>Iniciar Atividade</button>
                                                                
                                                                </div>
                                                                
                                                            </div>
                                                        </TabPanelInside>

                                                        <div className="finalizarAtv">
                                                            <label>Finalizar Atividade?</label>
                                                            <input checked={boxState['ferramentas']} className="checkbox-fin" type="checkbox" name="definicao-papeis" id="definicao-papeis" onChange={() => handleFinalizar('ferramentas')} /> Sim
                                                        </div>
                                                    </div>
                                                    </AccordionDetails>
                                                </Accordion>
                                              
                                            </div>

                                            <div className={`container-accordion ${expanded === 'panel2b' ? 'contador-open' : ''}`}>
                                                <span className='contador'></span>
                                                <Accordion className="box-accordion" expanded={expanded === 'panel2b'} onChange={handleOpenBox('panel2b')} disabled={isActive}>
                                                    <AccordionSummary
                                                    expandIcon={<ExpandMoreIcon />}
                                                    aria-controls="panel2bh-content"
                                                    id="panel2bh-header"
                                                    className={`${boxState['preparacaoTestes'] ? 'finalizada' : ''}`}
                                                    >
                                                    <Typography className={`text-title ${boxState['preparacaoTestes'] ? 'finalizada' : ''}`}>Preparação de testes</Typography>
                                                    </AccordionSummary>
                                                    <AccordionDetails className={`${!isOpenAccordion ? 'aberto' : ''}`}>
                                                        <div className={`timer-box`}>
                                                            <div className="content-timer">
                                                                <Timer min={timeClock} isActive={isActive} setIsActive={setIsActive} setHasFinised={setHasFinised}></Timer>
                                                            </div>
                                                        </div>
                                                        
                                                        <TabPanelInside value={valueInside} index={0} className="atv-containerOnly">
                                                        
                                                            <h4 className="text-title-inside">
                                                                Preparação de testes com usuários
                                                            </h4>
                                                            <div className="box-atv">
                                                                Nesta atividade vocês deverão trabalhar em <strong>grupo</strong>. A equipe será responsável por realizar o preparo dos testes a serem
                                                                realizados no protótipo com os usuários escolhidos, sejam eles reais ou fictícios. Ficando a cargo da equipe o tipo de teste e a forma
                                                                como o mesmo será aplicado.
                                                                                                    
                                                                <br />
                                                                <br />

                                                                
                                                                <div className="iniciar-atv">
                                                                    <p>Antes de inciar a atividade lembrem-se que vocês têm <strong>30 minutos</strong> para finalizar a mesma.</p> 
                                                                    <button className={`btn-atv ${isActive ? 'selected' : ''}`} onClick={() => setTimeClock(30)} disabled={isActive}>Iniciar Atividade</button>
                                                                    
                                                                </div>
                                                                
                                                            </div>
                                                        </TabPanelInside>

                                                        <div className="finalizarAtv">
                                                            <label>Finalizar Atividade?</label>
                                                            <input checked={boxState['preparacaoTestes']} className="checkbox-fin" type="checkbox" name="definicao-papeis" id="definicao-papeis" onChange={() => handleFinalizar('preparacaoTestes')} /> Sim
                                                        </div>
                                                    </AccordionDetails>

                                                
                                                </Accordion>
                                              
                                            </div>

                                        </TabPanel>

                                        <TabPanel value={activeStep} index={2} className="desenvolvimento-testagem">
                                            
                                            <div className="info-etapa-text">

                                                <h2 className="text-title-etapa">Desenvolvimento e testagem da solução ou protótipo</h2>
                                                <h4 className="text-subtitle">
                                                    Etapa em que os participantes irão iniciar a confecção do protótipo na ferramenta escolhida na etapa anterior, após finalizar a construção 
                                                    do protótipo, a equipe iniciará atividades de aplicação dos testes com usuários. Esta etapa tem como objetivo 
                                                    iniciar o processo de confecção do protótipo e realizar a testagem desse protótipo. <br /> <strong>Lembrem-se</strong>, 
                                                    cada atividade possui um tempo estimado para serem realizadas. O tempo é disponibilizado em cada atividade e para acompanhar esse 
                                                    tempo lembre sempre de olhar para o relógio.

                                                </h4>
                                            </div>

                                            <div className={`container-accordion ${expanded === 'panel1c' ? 'contador-open' : ''}`}>
                                                <span className='contador'></span>
                                                <Accordion className="box-accordion" expanded={expanded === 'panel1c'} onChange={handleOpenBox('panel1c')} disabled={isActive}>
                                                    <AccordionSummary
                                                    expandIcon={<ExpandMoreIcon />}
                                                    aria-controls="panel3bh-content"
                                                    id="panel3bh-header"
                                                    className={`${boxState['construcao'] ? 'finalizada' : ''}`}
                                                    >
                                                    <Typography className={`text-title ${boxState['construcao'] ? 'finalizada' : ''}`}>
                                                        Construção de um modelo ou protótipo
                                                    </Typography>
                                                    </AccordionSummary>
                                                    <AccordionDetails className={`${!isOpenAccordion ? 'aberto' : ''}`}>
                                                        <div className={`timer-box`}>
                                                            <div className="content-timer">
                                                                <Timer min={timeClock} isActive={isActive} setIsActive={setIsActive} setHasFinised={setHasFinised}></Timer>
                                                            </div>
                                                        </div>

                                                        <TabPanelInside value={valueInside} index={0} className="atv-containerOnly" >
                                                        

                                                            <h4 className="text-title-inside">
                                                                Construção de um modelo ou protótipo
                                                            </h4>
                                                            <div className="box-atv">
                                                                Nesta atividade vocês deverão trabalhar em <strong>grupo</strong> ou <strong>individualmente</strong>. O grupo irá realizar a 
                                                                construção do protótipo na ferramenta escolhida.
                                                                <br />
                                                                <br />
                                                                
                                                                <div className="iniciar-atv">
                                                                    <p>Antes de inciar a atividade lembrem-se que vocês têm <strong>1 hora e 30 minutos</strong> para finalizar a mesma.</p> 
                                                                    <button className={`btn-atv ${isActive ? 'selected' : ''}`} onClick={() => setTimeClock(90)} disabled={isActive}>Iniciar Atividade</button>
                                                                
                                                                        
                                                                </div>
                                                                
                                                            </div>
                                                        </TabPanelInside>

                                                        <div className="finalizarAtv">
                                                            <label>Finalizar Atividade?</label>
                                                            <input checked={boxState['construcao']} className="checkbox-fin" type="checkbox" name="definicao-papeis" id="definicao-papeis" onChange={() => handleFinalizar('construcao')} /> Sim
                                                        </div>
                                                    </AccordionDetails>

                                                    
                                                </Accordion>
                                              
                                            </div>

                                            <div className={`container-accordion ${expanded === 'panel2c' ? 'contador-open' : ''}`}>
                                                <span className='contador'></span>
                                                <Accordion className="box-accordion" expanded={expanded === 'panel2c'} onChange={handleOpenBox('panel2c')} disabled={isActive}>
                                                    <AccordionSummary
                                                    expandIcon={<ExpandMoreIcon />}
                                                    aria-controls="panel3bh-content"
                                                    id="panel3bh-header"
                                                    className={`${boxState['testagem'] ? 'finalizada' : ''}`}
                                                    >
                                                    <Typography className={`text-title ${boxState['testagem'] ? 'finalizada' : ''}`}>
                                                        Testagem da solução ou protótipo
                                                    </Typography>
                                                    </AccordionSummary>
                                                    <AccordionDetails className={`${!isOpenAccordion ? 'aberto' : ''}`}>
                                                        <div className={`timer-box`}>
                                                            <div className="content-timer">
                                                                <Timer min={timeClock} isActive={isActive} setIsActive={setIsActive} setHasFinised={setHasFinised}></Timer>
                                                            </div>
                                                        </div>
                                                    
                                                        <TabPanelInside value={valueInside} index={0} className="atv-containerOnly" >
                                                        

                                                            <h4 className="text-title-inside">
                                                                Testagem da solução ou protótipo
                                                            </h4>
                                                            <div className="box-atv">
                                                                Nesta atividade vocês deverão trabalhar em <strong>grupo</strong>. O grupo irá realizar a aplicação dos testes preparados para os
                                                                usuários que o grupo selecionou e realizar a documentação dos resultados obtidos com a aplicação dos testes.
                                                                <br />
                                                                <br />
                                                                
                                                                <div className="iniciar-atv">
                                                                    <p>Antes de inciar a atividade lembrem-se que vocês têm <strong>30 minutos</strong> para finalizar a mesma.</p> 
                                                                    <button className={`btn-atv ${isActive ? 'selected' : ''}`} onClick={() => setTimeClock(30)} disabled={isActive}>Iniciar Atividade</button>
                                                                
                                                                        
                                                                </div>
                                                                
                                                            </div>
                                                        </TabPanelInside>

                                                        <div className="finalizarAtv">
                                                            <label>Finalizar Atividade?</label>
                                                            <input checked={boxState['testagem']} className="checkbox-fin" type="checkbox" name="definicao-papeis" id="definicao-papeis" onChange={() => handleFinalizar('testagem')} /> Sim
                                                        </div>
                                                    </AccordionDetails>

                                                    
                                                </Accordion>
                                            </div>

                                            <div className={`container-accordion ${expanded === 'panel3c' ? 'contador-open' : ''}`}>
                                                <span className='contador'></span>
                                                <Accordion className="box-accordion" expanded={expanded === 'panel3c'} onChange={handleOpenBox('panel3c')} disabled={isActive}>
                                                    <AccordionSummary
                                                    expandIcon={<ExpandMoreIcon />}
                                                    aria-controls="panel3bh-content"
                                                    id="panel3bh-header"
                                                    className={`${boxState['avaliacaoTestagem'] ? 'finalizada' : ''}`}
                                                    >
                                                    <Typography className={`text-title ${boxState['avaliacaoTestagem'] ? 'finalizada' : ''}`}>
                                                        Avaliação dos resultados da testagem
                                                    </Typography>
                                                    </AccordionSummary>
                                                    <AccordionDetails className={`${!isOpenAccordion ? 'aberto' : ''}`}>
                                                        <div className={`timer-box`}>
                                                            <div className="content-timer">
                                                                <Timer min={timeClock} isActive={isActive} setIsActive={setIsActive} setHasFinised={setHasFinised}></Timer>
                                                            </div>
                                                        </div>
                                                        
                                                        <TabPanelInside value={valueInside} index={0} className="atv-containerOnly" >
                                                        

                                                            <h4 className="text-title-inside">
                                                                Avaliação dos resultados da testagem e Melhoria da solução ou protótipo
                                                            </h4>
                                                            <div className="box-atv">
                                                                Nesta atividade vocês deverão trabalhar em <strong>grupo</strong>. O grupo deve realizar a análise dos resultados obtidos dos testes
                                                                aplicados na etapa anterior.
                                                                <br />
                                                                <br />
                                                                
                                                                <div className="iniciar-atv">
                                                                    <p>Antes de inciar a atividade lembrem-se que vocês têm <strong>40 minutos</strong> para finalizar a mesma.</p> 
                                                                    <button className={`btn-atv ${isActive ? 'selected' : ''}`} onClick={() => setTimeClock(40)} disabled={isActive}>Iniciar Atividade</button>
                                                                
                                                                        
                                                                </div>
                                                                
                                                            </div>
                                                        </TabPanelInside>

                                                    
                                                    <div className="finalizarAtv">
                                                            <label>Finalizar Atividade?</label>
                                                            <input checked={boxState['avaliacaoTestagem']} className="checkbox-fin" type="checkbox" name="definicao-papeis" id="definicao-papeis" onChange={() => handleFinalizar('avaliacaoTestagem')} /> Sim
                                                        </div>
                                                    </AccordionDetails>

                                                </Accordion>
                                              
                                            </div>

                                            <div className={`container-accordion ${expanded === 'panel4c' ? 'contador-open' : ''}`}>
                                                <span className='contador'></span>
                                                <Accordion className="box-accordion" expanded={expanded === 'panel4c'} onChange={handleOpenBox('panel4c')} disabled={isActive}>
                                                    <AccordionSummary
                                                    expandIcon={<ExpandMoreIcon />}
                                                    aria-controls="panel3bh-content"
                                                    id="panel3bh-header"
                                                    className={`${boxState['apresentacao'] ? 'finalizada' : ''}`}
                                                    >
                                                    <Typography className={`text-title ${boxState['apresentacao'] ? 'finalizada' : ''}`}>
                                                        Preparação da apresentação
                                                    </Typography>
                                                    </AccordionSummary>
                                                    <AccordionDetails className={`${!isOpenAccordion ? 'aberto' : ''}`}>
                                                        <div className={`timer-box`}>
                                                            <div className="content-timer">
                                                                <Timer min={timeClock} isActive={isActive} setIsActive={setIsActive} setHasFinised={setHasFinised}></Timer>
                                                            </div>
                                                        </div>
                                                    

                                                        <TabPanelInside value={valueInside} index={0} className="atv-containerOnly" >
                                                        

                                                            <h4 className="text-title-inside">
                                                                Preparação da apresentação para a mentoria
                                                            </h4>
                                                            <div className="box-atv">
                                                                Nesta atividade vocês deverão trabalhar em <strong>grupo</strong>. O grupo deve realizar a preparação da apresentação do seu grupo 
                                                                para o mentor. A apresentação pode ser rápida, apenas para que o mentor saiba qual solução sua equipe desenvolveu e mostrar o
                                                                protótipo desenvolvido.
                                                                <br />
                                                                <br />
                                                                
                                                                <div className="iniciar-atv">
                                                                    <p>Antes de inciar a atividade lembrem-se que vocês têm <strong>20 minutos</strong> para finalizar a mesma.</p> 
                                                                    <button className={`btn-atv ${isActive ? 'selected' : ''}`} onClick={() => setTimeClock(20)} disabled={isActive}>Iniciar Atividade</button>
                                                                
                                                                        
                                                                </div>
                                                                
                                                            </div>
                                                        </TabPanelInside>

                                                        <div className="finalizarAtv">
                                                            <label>Finalizar Atividade?</label>
                                                            <input checked={boxState['apresentacao']} className="checkbox-fin" type="checkbox" name="definicao-papeis" id="definicao-papeis" onChange={() => handleFinalizar('apresentacao')} /> Sim
                                                        </div>
                                                    </AccordionDetails>

                                                
                                                </Accordion>
                                              
                                            </div>

                                        </TabPanel>

                                        <TabPanel value={activeStep} index={3} className="mentoria">
                                            
                                            <div className="info-etapa-text">

                                                <h2 className="text-title-etapa">Mentoria</h2>
                                                <h4 className="text-subtitle">
                                                    Etapa em que os participantes irão realizar o agendamento de uma reunião com o mentor responsável pela equipe. Esta etapa tem como objetivo 
                                                    iniciar o processo de validação da ideia, pois contém atividades que incentivam a apresentação ao mentor e com isso gerar possíveis melhorias à
                                                    serem aplicadas no desenvolvimento do protótipo da solução/problema mapeado. 
                                                    <br /> <strong>Lembrem-se</strong>, cada atividade possui um tempo estimado para serem realizadas. O tempo é disponibilizado em 
                                                    cada atividade e para acompanhar esse tempo lembre sempre de olhar para o relógio.
                                                </h4>
                                            </div>
                                            <div className={`container-accordion ${expanded === 'panel1d' ? 'contador-open' : ''}`}>
                                                <span className='contador'></span>

                                                <Accordion className="box-accordion" expanded={expanded === 'panel1d'} onChange={handleOpenBox('panel1d')} disabled={isActive}>
                                                    <AccordionSummary
                                                    expandIcon={<ExpandMoreIcon />}
                                                    aria-controls="panel3bh-content"
                                                    id="panel3bh-header"
                                                    className={`${boxState['mentoria'] ? 'finalizada' : ''}`}
                                                    >
                                                    <Typography className={`text-title ${boxState['mentoria'] ? 'finalizada' : ''}`}>
                                                        Agendamento da mentoria
                                                    </Typography>
                                                    </AccordionSummary>
                                                    <AccordionDetails className={`${!isOpenAccordion ? 'aberto' : ''}`}>
                                                        <div className={`timer-box`}>
                                                            <div className="content-timer">
                                                                <Timer min={timeClock} isActive={isActive} setIsActive={setIsActive} setHasFinised={setHasFinised}></Timer>
                                                            </div>
                                                        </div>
                                                        <Tabs allowScrollButtonsMobile={true} sx={{ '& .MuiTabs-flexContainer': { flexWrap: 'wrap' } }} TabIndicatorProps={{ sx: { display: 'none' } }} value={valueInside} onChange={handleChangeInside} aria-label="basic tabs example" className="tab-box">
                                                            <Tab disabled={isActive} wrapped fullWidth className="text-title tab-etapas tab-etapasInside" label="Apresentação para o mentor" {...a22yProps(0)} />
                                                            <Tab disabled={isActive} wrapped fullWidth className="text-title tab-etapas tab-etapasInside" label="Retorno da Equipe" {...a22yProps(1)} />
                                                            <Tab disabled={isActive} wrapped fullWidth className="text-title tab-etapas tab-etapasInside" label="Apresentação para a turma" {...a22yProps(2)} />
                                                        </Tabs>

                                                        <TabPanelInside value={valueInside} index={0} className="atv-container border" >
                                                        

                                                            <h4 className="text-title-inside">
                                                                Apresentação da equipe e do problema/ideia escolhido para o mentor
                                                            </h4>
                                                            <div className="box-atv">
                                                                Nesta atividade vocês deverão trabalhar em <strong>grupo</strong>. O grupo deve realizar a apresentação do seu grupo (informando o nome da equipe, 
                                                                seus integrantes e a solução que irá desenvolver) para o mentor. A apresentação pode ser rápida, 
                                                                apenas para que o mentor saiba qual solução sua equipe irá desenvolver e mostrar como está o desenvolvimento do protótipo. Após a equipe
                                                                realizar a apresentação, o grupo pode realizar a primeira validação da ideia com o mentor, fazendo perguntas sobre o tema escolhido 
                                                                para desenvolver, sobre o protótipo desenvolvido, etc.
                                                                <br />
                                                                <br />
                                                                
                                                                <div className="iniciar-atv">
                                                                    <p>Antes de inciar a atividade lembrem-se que vocês têm <strong>15 minutos</strong> para finalizar a mesma.</p> 
                                                                    <button className={`btn-atv ${isActive ? 'selected' : ''}`} onClick={() => setTimeClock(15)} disabled={isActive}>Iniciar Atividade</button>
                                                                
                                                                        
                                                                </div>
                                                                
                                                            </div>
                                                        </TabPanelInside>

                                                        <TabPanelInside value={valueInside} index={1} className="atv-container border">
                                                        

                                                            <h4 className="text-title-inside">
                                                                Retorno da equipe
                                                            </h4>
                                                            <div className="box-atv">
                                                                Nesta atividade vocês deverão trabalhar em <strong>grupo</strong>. Após a apresentação da solução definida para o mentor, 
                                                                o grupo terá um tempo para se preparar para a próxima apresentação, que será feita para a turma.  
                                                                <br />
                                                                <br />
                                                                <div className="iniciar-atv">
                                                                    <p>Antes de inciar a atividade lembrem-se que vocês têm <strong>5 minutos</strong> para finalizar a mesma.</p> 
                                                                    <button className={`btn-atv ${isActive ? 'selected' : ''}`} onClick={() => setTimeClock(5)} disabled={isActive}>Iniciar Atividade</button> 
                                                                </div>
                                                                
                                                            </div>
                                                        </TabPanelInside>
                                                    
                                                        <TabPanelInside value={valueInside} index={2} className="atv-container border">
                                                        

                                                            <h4 className="text-title-inside">
                                                            Apresentação da equipe e do problema/ideia escolhido para a turma
                                                            </h4>
                                                            <div className="box-atv">
                                                                Nesta atividade vocês deverão trabalhar em <strong>grupo</strong>. O grupo deve realizar uma rápida apresentação do seu grupo 
                                                                (informando o nome da equipe, seus integrantes e a solução que irá desenvolver) para a turma. A apresentação pode ser rápida, 
                                                                apenas para que a turma conheça a solução que sua equipe irá desenvolver e mostrar mostrar o desenvolvimento do protótipo.
                                                                                            
                                                                <br />
                                                                <br />
                                                                <div className="iniciar-atv">
                                                                    <p>Antes de inciar a atividade lembrem-se que vocês têm <strong>5 minutos</strong> para finalizar a mesma.</p> 
                                                                    <button className={`btn-atv ${isActive ? 'selected' : ''}`} onClick={() => setTimeClock(5)} disabled={isActive}>Iniciar Atividade</button>
                                                                    
                                                                
                                                                        
                                                                </div>
                                                                
                                                            </div>
                                                        </TabPanelInside>
                                                        <div className="finalizarAtv">
                                                            <label>Finalizar Atividade?</label>
                                                            <input checked={boxState['mentoria']} className="checkbox-fin" type="checkbox" name="definicao-papeis" id="definicao-papeis" onChange={() => handleFinalizar('mentoria')} /> Sim
                                                        </div>
                                                    </AccordionDetails>

                                                
                                                </Accordion>
                                            </div>

                                        </TabPanel>

                                        <TabPanel value={activeStep} index={4} className="aprimoramento-prototipo" >

                                            <div className="info-etapa-text">

                                                <h2 className="text-title-etapa">Aprimoramento da solução ou protótipo</h2>
                                                <h4 className="text-subtitle">
                                                    Etapa em que os participantes irão fazer atividades que tem como objetivo realizar a aplicação de melhorias no protótipo da solução com base
                                                    nas respostas obtidas das validações realizadas nas etapas anteriores.
                                                    Esta etapa contém atividades que permitem o aprimoramento do protótipo e a revisão do protótipo, além de conter atividades de testagem do 
                                                    protótipo melhorado, se necessário.
                                                    <br /> <strong>Lembrem-se</strong>, cada atividade possui um tempo estimado para serem realizadas. O tempo é disponibilizado em cada atividade 
                                                    e para acompanhar esse tempo lembre sempre de olhar para o relógio.

                                                </h4>
                                            </div>

                                            <div className={`container-accordion ${expanded === 'panel1f' ? 'contador-open' : ''}`}>
                                                <span className='contador'></span>
                                                <Accordion className={`box-accordion`} expanded={expanded === 'panel1f'} onChange={handleOpenBox('panel1f')} disabled={isActive}>
                                                    <AccordionSummary
                                                    expandIcon={<ExpandMoreIcon className="icon-exp" />}
                                                    aria-controls="panel1bh-content"
                                                    id="panel1bh-header"
                                                    className={`${boxState['reformulacaoPrototipo'] ? 'finalizada' : ''}`}>
                                                    <Typography className={`text-title ${boxState['reformulacaoPrototipo'] ? 'finalizada' : ''}`}>
                                                        Reformulação da solução ou protótipo com base na mentoria
                                                    </Typography>
                                                    
                                                    </AccordionSummary>
                                                    <AccordionDetails className={`${!isOpenAccordion ? 'aberto' : ''}`}>

                                                            <div className={`timer-box`}>
                                                                <div className="content-timer">
                                                                    <Timer min={timeClock} isActive={isActive} setIsActive={setIsActive} setHasFinised={setHasFinised} />
                                                                </div>
                                                            </div>

                                                        
                                                            <TabPanelInside value={valueInside} index={0} className="atv-containerOnly">
                                                            

                                                                <h4 className="text-title-inside">
                                                                    Reformulação da solução ou protótipo com base nas respostas de pesquisas
                                                                </h4>
                                                                <div className="box-atv">
                                                                    Nesta atividade vocês deverão trabalhar em <strong>grupo</strong>. O grupo deve realizar a reformulação de pontos obtidos na
                                                                    reunião e apresentação para o mentor, realizando a análise se é viável ou não aplicar as melhorias que foram apontadas pelo mentor.
                                                                
                                                                    <br />
                                                                    <br />
                                                                    <div className="iniciar-atv">

                                                                        <p>Antes de inciar a atividade lembrem-se que vocês têm <strong>1 hora</strong> para finalizar a mesma.</p> 

                                                                        <button className={`btn-atv ${isActive ? 'selected' : ''}`} onClick={() => setTimeClock(60)} disabled={isActive}>Iniciar Atividade</button>

                                                                    </div>
                                                                    
                                                                </div>
                                                            </TabPanelInside>
                        
                                                        <div className="finalizarAtv">
                                                            <label>Finalizar Atividade?</label>
                                                            <input checked={boxState['reformulacaoPrototipo']} className="checkbox-fin" type="checkbox" name="definicao-papeis" id="definicao-papeis" onChange={() => handleFinalizar('reformulacaoPrototipo')} /> Sim
                                                        </div>
                                                    </AccordionDetails>
                                                </Accordion>
                                            </div>

                                            <div className={`container-accordion ${expanded === 'panel2f' ? 'contador-open' : ''}`}>
                                                <span className='contador'></span>
                                                <Accordion className={`box-accordion`} expanded={expanded === 'panel2f'} onChange={handleOpenBox('panel2f')} disabled={isActive}>
                                                    <AccordionSummary
                                                    expandIcon={<ExpandMoreIcon className="icon-exp" />}
                                                    aria-controls="panel1bh-content"
                                                    id="panel1bh-header"
                                                    className={`${boxState['revisaoPrototipo'] ? 'finalizada' : ''}`}>
                                                    <Typography className={`text-title ${boxState['revisaoPrototipo'] ? 'finalizada' : ''}`}>
                                                        Revisão da solução
                                                    </Typography>
                                                    
                                                    </AccordionSummary>
                                                    <AccordionDetails className={`${!isOpenAccordion ? 'aberto' : ''}`}>

                                                        
                                                        <div className={`timer-box`}>
                                                            <div className="content-timer">
                                                                <Timer min={timeClock} isActive={isActive} setIsActive={setIsActive} setHasFinised={setHasFinised} />
                                                            </div>
                                                        </div>

                                                        
                                                        <TabPanelInside value={valueInside} index={0} className="atv-containerOnly">
                                                        
                                                            <h4 className="text-title-inside">
                                                                Revisão da solução
                                                            </h4>
                                                            <div className="box-atv">
                                                                Nesta atividade vocês deverão trabalhar em <strong>grupo</strong>. O grupo deve realizar a revisão da solução construída com base na 
                                                                reformulação feita na atividade anterior, podendo levar em conta a análise feita, os comentários obtidos do mentor e novas ideias 
                                                                que podem vim a surgir dos integrantes após essa rodada de validação.
                                                                <br />
                                                                <br />
                                                                <div className="iniciar-atv">

                                                                    <p>Antes de inciar a atividade lembrem-se que vocês têm <strong>30 minutos</strong> para finalizar a mesma.</p> 

                                                                    <button className={`btn-atv ${ isActive ? 'selected' : ''}`} onClick={() => setTimeClock(30)} disabled={isActive}>Iniciar Atividade</button>

                                                                </div>
                                                                
                                                            </div>
                                                        </TabPanelInside>
                                                        

                                                        <div className="finalizarAtv">
                                                            <label>Finalizar Atividade?</label>
                                                            <input checked={boxState['revisaoPrototipo']} className="checkbox-fin" type="checkbox" name="definicao-papeis" id="definicao-papeis" onChange={() => handleFinalizar('revisaoPrototipo')} /> Sim
                                                        </div>
                                                    </AccordionDetails>
                                                </Accordion>
                                              
                                            </div>

                                            <div className={`container-accordion ${expanded === 'panel3f' ? 'contador-open' : ''}`}>
                                                <span className='contador'></span>
                                                <Accordion className={`box-accordion`} expanded={expanded === 'panel3f'} onChange={handleOpenBox('panel3f')} disabled={isActive}>
                                                    <AccordionSummary
                                                    expandIcon={<ExpandMoreIcon className="icon-exp" />}
                                                    aria-controls="panel1bh-content"
                                                    id="panel1bh-header"
                                                    className={`${boxState['testagemReformulada'] ? 'finalizada' : ''}`}>
                                                    <Typography className={`text-title ${boxState['testagemReformulada'] ? 'finalizada' : ''}`}>
                                                        Testagem da solução reformulada
                                                    </Typography>
                                                    
                                                    </AccordionSummary>
                                                    <AccordionDetails className={`${!isOpenAccordion ? 'aberto' : ''}`}>

                                                            <div className={`timer-box`}>
                                                                <div className="content-timer">
                                                                    <Timer min={timeClock} isActive={isActive} setIsActive={setIsActive} setHasFinised={setHasFinised} />
                                                                </div>
                                                            </div>

                                                            <TabPanelInside value={valueInside} index={0} className="atv-containerOnly">
                                                            

                                                                <h4 className="text-title-inside">
                                                                    Testagem da solução reformulada
                                                                </h4>
                                                                <div className="box-atv">
                                                                    Nesta atividade vocês deverão trabalhar em <strong>grupo</strong>. O grupo deve realizar a aplicação dos testes, com base na solução
                                                                    reformulada, para os usuários que o grupo selecionou e realizar a documentação dos resultados obtidos com a aplicação dos testes.
                                                                    <br />
                                                                    <br />
                                                                    <div className="iniciar-atv">

                                                                        <p>Antes de inciar a atividade lembrem-se que vocês têm <strong>15 minutos</strong> para finalizar a mesma.</p> 

                                                                        <button className={`btn-atv ${isActive ? 'selected' : ''}`} onClick={() => setTimeClock(15)} disabled={isActive}>Iniciar Atividade</button>

                                                                    </div>
                                                                    
                                                                </div>
                                                            </TabPanelInside>

                                                        <div className="finalizarAtv">
                                                            <label>Finalizar Atividade?</label>
                                                            <input checked={boxState['testagemReformulada']} className="checkbox-fin" type="checkbox" name="definicao-papeis" id="definicao-papeis" onChange={() => handleFinalizar('testagemReformulada')} /> Sim
                                                        </div>
                                                        
                                                    </AccordionDetails>
                                                
                                                </Accordion>
                                              
                                            </div>

                                        </TabPanel>

                                        <TabPanel value={activeStep} index={5} className="revisao-processo">

                                            <div className="info-etapa-text">

                                                <h2 className="text-title-etapa">Revisão do Processo</h2>
                                                <h4 className="text-subtitle">
                                                    Etapa em que os participantes irão realizar a revisão do processo. Esta etapa possui atividades que disponibilizam momentos para os integrantes 
                                                    das equipes analisarem tudo que foi feito nas atividades das etapas anteriores e se necessário realize melhorias para as próximas etapas.
                                                    <br /> <strong>Lembrem-se</strong>, cada atividade possui um tempo estimado para serem realizadas. O tempo é disponibilizado em cada atividade 
                                                    e para acompanhar esse tempo lembre sempre de olhar para o relógio.
                                                </h4>
                                            </div>

                                            <div className={`container-accordion ${expanded === 'panel1g' ? 'contador-open' : ''}`}>
                                                <span className='contador'></span>
                                                <Accordion className="box-accordion" expanded={expanded === 'panel1g'} onChange={handleOpenBox('panel1g')} disabled={isActive}>
                                                    <AccordionSummary
                                                    expandIcon={<ExpandMoreIcon />}
                                                    aria-controls="panel3bh-content"
                                                    id="panel3bh-header"
                                                    className={`${boxState['retrospectiva'] ? 'finalizada' : ''}`}
                                                    >
                                                    <Typography className={`text-title ${boxState['retrospectiva'] ? 'finalizada' : ''}`}>
                                                        Retrospectiva do processo
                                                    </Typography>
                                                    </AccordionSummary>
                                                    <AccordionDetails className={`${!isOpenAccordion ? 'aberto' : ''}`}>
                                                        <div className={`timer-box`}>
                                                            <div className="content-timer">
                                                                <Timer min={timeClock} isActive={isActive} setIsActive={setIsActive} setHasFinised={setHasFinised}></Timer>
                                                            </div>
                                                        </div>

                                                        <TabPanelInside value={valueInside} index={0} className="atv-containerOnly">
                                                        
                                                            <h4 className="text-title-inside">
                                                                Retrospectiva da Sprint
                                                            </h4>

                                                            <div className="box-atv">
                                                                Nesta atividade vocês deverão trabalhar em <strong>grupo</strong>. O grupo deve realizar uma retrospectiva, ponderando e pensando sobre todas as atividades
                                                                realizadas no dia e responder algumas questões, como: <strong> <em>O que tem funcionado?, O que não funcionou?, O que pode ser melhorado?</em> </strong>, sobre tudo que for realizado,
                                                                em individual e em grupo, para que nas próximas etapas os pontos encontrados nessa retrospectiva sejam aplicados ou evitados nas atividades a seguir. 
                                                                Para realizar essa atividade, é necessário clicar no link abaixo, vocês irão para uma plataforma especifica que contém essa perguntas, 
                                                                o facilitador deverá ser responsável por guiar todos da equipe, na realização da tarefa. Tanto na plataforma terá um relógio para que a equipe 
                                                                acompanhe o tempo.
                                                                <br />
                                                                <br />
                                                                O modelo da Retrospectiva está disponível no link: <br />
                                                                <a href="https://docs.google.com/drawings/d/1WWcMllAeZOwbzd_1VsRnoZHcBBUxnOYdbUMSq7UvPWQ/edit?usp=sharing" target="_blank">Clique aqui para abrir o modelo</a>
                                                                <br />
                                                                <br />
                                                                
                                                                <div className="iniciar-atv">
                                                                    <p>Antes de inciar a atividade lembrem-se que vocês têm <strong>10 minutos</strong> para finalizar a mesma.</p> 
                                                                    <button className={`btn-atv ${isActive ? 'selected' : ''}`} onClick={() => setTimeClock(10)} disabled={isActive}>Iniciar Atividade</button>
                                                                
                                                                </div>

                                                                <br />
                                                                <br />

                                                                <form onSubmit={handleInformacaoEquipe}>

                                                                    <FormControl fullWidth>
                                                                        <label className="text-papel">Link da Retrospectiva preenchida</label>
                                                                        <TextField disabled={infoRetrospectivaPreenchida} defaultValue={`${JSON.parse(localStorage.getItem('novaSprint')) !== true && linkRetrospectiva !== '' ? linkRetrospectiva : ''}`} required type={'text'} onChange={(e) => setLinkRetrospectiva(e.target.value)} fullWidth  margin="normal" size="small" placeholder="Informe o link da restrospectiva" variant="outlined" className="input-text" />
                                                                        <Button disabled={atvCompleta || infoRetrospectivaPreenchida} type="submit" className="btn-formulario">Enviar Informações</Button>
                                                                    </FormControl>

                                                                </form>
                                                            
                                                            </div>
                                                            
                                                        </TabPanelInside>

                                                        <div className="finalizarAtv">
                                                            <label>Finalizar Atividade?</label>
                                                            <input checked={boxState['retrospectiva']} className="checkbox-fin" type="checkbox" name="definicao-papeis" id="definicao-papeis" onChange={() => handleFinalizar('retrospectiva')} /> Sim
                                                        </div>
                                                    </AccordionDetails>
                                                
                                                </Accordion>

                                            </div>

                                           
                                        </TabPanel>

                                        <TabPanel value={activeStep} index={6} className="metodos-avaliacao">
                                            <div className="info-etapa-text">

                                                <h2 className="text-title-etapa">Avaliação</h2>
                                                <h4 className="text-subtitle">
                                                    Etapa em que os participantes irão realizar a avaliação das atividades realizadas. Esta etapa possui um link para uma avaliação
                                                    que deve ser respondida de forma individual. Lembre-se o questionário não é obrigatório, contudo sua resposta pode ajudar a melhorar as etapas 
                                                    e as atividades realizadas.
                                                </h4>
                                            </div>
                                            <Accordion className="box-accordion" expanded={expanded === 'panel1h'} onChange={handleOpenBox('panel1h')} disabled={isActive}>
                                                <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                aria-controls="panel3bh-content"
                                                id="panel3bh-header"
                                                >
                                                <Typography className="text-title">
                                                    Avaliação do processo
                                                </Typography>
                                                </AccordionSummary>
                                                <AccordionDetails className={`${!isOpenAccordion ? 'aberto' : ''}`}>
                                                    
                                                    <TabPanelInside value={valueInside} index={0} className="atv-containerOnly">
                                                        <h4 className="text-title-inside">
                                                            Avaliação do processo
                                                        </h4>

                                                        
                                                        <div className="box-atv">
                                                            
                                                            
                                                            <a href="https://forms.gle/hUEUTT8mvEfpzxYN7" target={'_blank'}>
                                                                Clique aqui para realizar a avaliação
                                                            </a>
                                                        </div>
                                                    </TabPanelInside>
                                                </AccordionDetails>
                                            </Accordion>
                                        </TabPanel>


                                        <MobileStepper
                                            className={`step ${width > 625  ? 'mobile' : ''}`}
                                            variant="text"
                                            steps={maxSteps}
                                            position="static"
                                            activeStep={activeStep}
                                            nextButton={
                                            <Button
                                                size="small"
                                                onClick={handleNext}
                                                disabled={activeStep === maxSteps - 1  || isActive}
                                            >
                                                Próxima
                                                {theme.direction === 'rtl' ? (
                                                <KeyboardArrowLeft />
                                                ) : (
                                                <KeyboardArrowRight />
                                                )}
                                            </Button>
                                            }
                                            backButton={
                                            <Button size="small" onClick={handleBack} disabled={activeStep === 0  || isActive}>
                                                {theme.direction === 'rtl' ? (
                                                <KeyboardArrowRight />
                                                ) : (
                                                <KeyboardArrowLeft />
                                                )}
                                                Voltar
                                            </Button>
                                            }
                                        />

                                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}  className={`${width <= 625  ? 'center' : ''}`}>
                                            <Button
                                                color="inherit"
                                                disabled={activeStep === 0  || isActive}
                                                onClick={handleBack}
                                                sx={{ mr: 1 }}
                                                className={`${width <= 625  ? 'mobile' : ''}`}
                                                
                                            >
                                                Voltar
                                            </Button>
                                            <Box sx={{ flex: '1 1 auto' }} className={`${width <= 625  ? 'mobile' : ''}`}/>
                                            <Button onClick={handleNext} sx={{ mr: 1 }} className={`${width <= 625  ? 'mobile' : ''}`} disabled={isActive}>
                                                Próxima Atividade
                                            </Button>
                                            {activeStep !== steps.length &&
                                                (completed[activeStep] ? (
                                                <Typography variant="caption" sx={{ display: 'inline-block' }} className={`${width <= 625  ? 'center' : ''}`}>
                                                    Atividade de <b>{steps[activeStep]}</b> já foi finalizada
                                                </Typography>
                                                ) : (
                                                <Button onClick={handleComplete} disabled={isActive}>
                                                    {completedSteps() === totalSteps() - 1
                                                    ? 'Finalizar Etapa'
                                                    : 'Completar Atividades'}
                                                </Button>
                                                ))}
                                        </Box>
                                    </React.Fragment>
                                    )}
                                </div>
                            </Box>

                        </div>

                    </div>

                </div>
               
            </Container>
        )
}