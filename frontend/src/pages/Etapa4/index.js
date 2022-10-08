import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'

import { AuthContext } from "../../contexts/Auth/AuthContext";

import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { Tabs, Tab, Accordion, AccordionDetails, AccordionSummary, FormControl, TextField, Modal } from '@mui/material';

import { Container } from './styles'

import { Timer } from '../../shared/components/Timer'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { TabPanel } from '../../shared/components/TabPanel'
import { TabPanelInside } from '../../shared/components/TabPanelInside'

import MobileStepper from '@mui/material/MobileStepper';
import { useTheme } from '@mui/material/styles';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import Paper from '@mui/material/Paper';

import notification from '../../shared/assets/notification.wav'

const steps = ['Aprimoramento da solução ou protótipo', 'Apresentação da Solução', 'Revisão do Processo', 'Avaliação'];


function a22yProps(index) {
    return {
      id: `simple-tab-${index}-inside`,
      'aria-controls': `simple-tabpanel-${index}-inside`, 
    };
}


export const Etapa4 = (props) => {
    const theme = useTheme();

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

    const boxInitial = JSON.parse(localStorage.getItem('boxState4'))

    const [boxState, setBoxState] = useState(boxInitial ? boxInitial :{
        
            reformulacaoPrototipo: false,
            revisaoSolucao: false,
            apresentacaoSolucao: false,
            retrospectiva: false,
        }
    )


    const handleFinalizar = (boxName) => {
        setBoxState({
            ...boxState,
            [boxName]: !boxState[boxName]
        })
    }

    useEffect(() => {
        localStorage.setItem('boxState4', JSON.stringify(boxState))
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
                linkRetrospectiva3: data.linkRetrospectiva3,
                linkRetrospectiva4: data.linkRetrospectiva4 ? data.linkRetrospectiva4 : linkRetrospectiva,
                etapaFinalizada: "etapa4"
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

    const [infoRetrospectivaPreenchida, setInfoRetrospectivaPreenchida] = useState(false)


    useEffect(() => {

        const handleInfoPreenchida = async () => {
            if(auth.user) {
                const { data } = await axios.get(`/api/equipes/${auth.user.username}`)
                 
                if(JSON.parse(localStorage.getItem('novaSprint')) !== true) {
                    setLinkRetrospectiva(data.linkRetrospectiva4)

                    if(data.linkRetrospectiva4.length !== 0 ) {
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
                            <h1>Bem vindos a quarta etapa{auth.user ? ", " + auth.user.username : ''}!</h1>
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
                                        {/* <Button onClick={handleReset}>Ir para a próxima etapa</Button> */}
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
                                            

                                        <TabPanel value={activeStep} index={0} className="aprimoramento-solucao" >

                    
                                            <div className="info-etapa-text">

                                                <h2 className="text-title-etapa">Aprimoramento da solução ou protótipo</h2>
                                                <h4 className="text-subtitle">
                                                    Nesta etapa vocês irão fazer atividades que tem como objetivo realizar a aplicação de melhorias no protótipo da solução com base
                                                    nas respostas obtidas das validações/questionários aplicados para possíveis usuários realizados nas atividades da terceira etapa.
                                                    Esta etapa contém atividades que permitem o aprimoramento do protótipo e a revisão do protótipo.
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
                                                    className={`${boxState['reformulacaoPrototipo'] ? 'finalizada' : ''}`}>
                                                    <Typography className={`text-title ${boxState['reformulacaoPrototipo'] ? 'finalizada' : ''}`}>
                                                        Reformulação do protótipo
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
                                                                    Reformulação do protótipo com base nas respostas de pesquisas
                                                                </h4>
                                                                <div className="box-atv">
                                                                Nesta atividade vocês deverão trabalhar em <strong>grupo</strong>. O grupo deve realizar a reformulação do protótipo com base nos 
                                                                pontos obtidos das pesquisas aplicadas na etapa três, realizando a análise se é viável ou não aplicar as melhorias que foram 
                                                                apontadas nos resultados das análises.
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
                                                            <input checked={boxState['reformulacaoPrototipo']} className="checkbox-fin" type="checkbox" name="definicao-papeis" id="definicao-papeis" onChange={() => handleFinalizar('reformulacaoPrototipo')} /> Sim
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
                                                    className={`${boxState['revisaoSolucao'] ? 'finalizada' : ''}`}>
                                                    <Typography className={`text-title ${boxState['revisaoSolucao'] ? 'finalizada' : ''}`}>
                                                        Revisão da solução ou protótipo
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
                                                                    Revisão da solução ou protótipo
                                                                </h4>
                                                                <div className="box-atv">
                                                                    Nesta atividade vocês deverão trabalhar em <strong>grupo</strong>. O grupo deve realizar a revisão da solução/protótipo com base na 
                                                                    reformulação feita na atividade anterior, podendo levar em conta a análise feita, os comentários obtidos do mentor e novas ideias 
                                                                    que podem vim a surgir dos integrantes após essa rodada de validação.
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
                                                            <input checked={boxState['revisaoSolucao']} className="checkbox-fin" type="checkbox" name="definicao-papeis" id="definicao-papeis" onChange={() => handleFinalizar('revisaoSolucao')} /> Sim
                                                        </div>
                                                    </AccordionDetails>
                                                </Accordion>

                                            </div>

                                        </TabPanel> 

                                        <TabPanel value={activeStep} index={1} className="apresentacao-solucao">

                                            <div className="info-etapa-text">

                                                <h2 className="text-title-etapa">Apresentação da Solução</h2>
                                                <h4 className="text-subtitle">
                                                    Nesta etapa vocês irão realizar o agendamento de uma reunião com o mentor responsável pela sua equipe. Esta etapa tem como objetivo 
                                                    finalizar o processo de desenvolvimento da solução, contendo atividades de apresentação da solução, para que vocês possam mostrar para o 
                                                    mentor e a turma o protótipo confeccionado. 
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
                                                    className={`${boxState['apresentacaoSolucao'] ? 'finalizada' : ''}`}
                                                    >
                                                    <Typography className={`text-title ${boxState['apresentacaoSolucao'] ? 'finalizada' : ''}`}>
                                                        Apresentação da Solução
                                                    </Typography>
                                                    </AccordionSummary>
                                                    <AccordionDetails className={`${!isOpenAccordion ? 'aberto' : ''}`}>
                                                        <div className={`timer-box`}>
                                                            <div className="content-timer">
                                                                <Timer min={timeClock} isActive={isActive} setIsActive={setIsActive} setHasFinised={setHasFinised}></Timer>
                                                            </div>
                                                        </div>
                                                        <Tabs allowScrollButtonsMobile={true} sx={{ '& .MuiTabs-flexContainer': { flexWrap: 'wrap' } }} TabIndicatorProps={{ sx: { display: 'none' } }} value={valueInside} onChange={handleChangeInside} aria-label="basic tabs example" className="tab-box">
                                                            <Tab disabled={isActive} wrapped fullWidth className="text-title tab-etapas" label="Apresentação para o mentor" {...a22yProps(0)} />
                                                            <Tab disabled={isActive} wrapped fullWidth className="text-title tab-etapas" label="Retorno da Equipe" {...a22yProps(1)} />
                                                            <Tab disabled={isActive} wrapped fullWidth className="text-title tab-etapas" label="Apresentação para a turma" {...a22yProps(2)} />
                                                        </Tabs>

                                                        <TabPanelInside value={valueInside} index={0} className="atv-container border" >
                                                        
                                                            <h4 className="text-title-inside">
                                                                Apresentação da equipe e do problema/ideia escolhido para o mentor
                                                            </h4>
                                                            <div className="box-atv">
                                                                Nesta atividade vocês deverão trabalhar em <strong>grupo</strong>. O grupo deve realizar a apresentação do seu grupo (informando o nome da equipe, 
                                                                seus integrantes e como a solução foi finalizada) para o mentor. A apresentação pode ser rápida, 
                                                                apenas para que o mentor saiba como ficou o desenvolvimento completo da solução escolhida pela equipe.
                                                                Deixando tempo para possíveis considerações do mentor acerca da solução implementada pela equipe.
                                                                <br />
                                                                <br />
                                                                
                                                                <div className="iniciar-atv">
                                                                    <p>Antes de inciar a atividade lembrem-se que vocês têm <strong>5 minutos</strong> para finalizar a mesma.</p> 
                                                                    <button className={`btn-atv ${isActive ? 'selected' : ''}`} onClick={() => setTimeClock(5)} disabled={isActive}>Iniciar Atividade</button>  
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
                                                                Nesta atividade vocês deverão trabalhar em <strong>grupo</strong>. O grupo deve realizar uma rápida apresentação do seu grupo (informando o nome da equipe, 
                                                                seus integrantes e como a solução foi finalizada)para a turma. A apresentação pode ser rápida, 
                                                                apenas para que a turma saiba como ficou o desenvolvimento completo da solução escolhida pela equipe.
                                                                                            
                                                                <br />
                                                                <br />
                                                                <div className="iniciar-atv">
                                                                    <p>Antes de inciar a atividade lembrem-se que vocês têm <strong>3 minutos</strong> para finalizar a mesma.</p> 
                                                                    <button className={`btn-atv ${isActive ? 'selected' : ''}`} onClick={() => setTimeClock(3)} disabled={isActive}>Iniciar Atividade</button>
                                                                </div>
                                                                
                                                            </div>
                                                        </TabPanelInside>
                                                        <div className="finalizarAtv">
                                                            <label>Finalizar Atividade?</label>
                                                            <input checked={boxState['apresentacaoSolucao']} className="checkbox-fin" type="checkbox" name="definicao-papeis" id="definicao-papeis" onChange={() => handleFinalizar('apresentacaoSolucao')} /> Sim
                                                        </div>
                                                    </AccordionDetails>

                                                    
                                                </Accordion>


                                            </div>

                                           
                                        </TabPanel>

                                        <TabPanel value={activeStep} index={2} className="revisao-processo">

                                            <div className="info-etapa-text">

                                                <h2 className="text-title-etapa">Revisão do Processo</h2>
                                                <h4 className="text-subtitle">
                                                    Nesta etapa vocês irão realizar a revisão do processo. Sua equipe irá realizar atividades que disponibilizam momentos para que vocês
                                                    possam analisar tudo que foi feito nas atividades das etapas anteriores e se necessário realize as melhorias necessárias para as próximas etapas.
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

                                                        <Tabs allowScrollButtonsMobile={true} sx={{ '& .MuiTabs-flexContainer': { flexWrap: 'wrap' } }} TabIndicatorProps={{ sx: { display: 'none' } }} value={valueInside} onChange={handleChangeInside} aria-label="basic tabs example" className="tab-box">
                                                            <Tab disabled={isActive} wrapped fullWidth className="text-title tab-etapas" label="Retrospectiva" {...a22yProps(0)} />
                                                            
                                                        </Tabs>
                                                        
                                                        <TabPanelInside value={valueInside} index={0} className="atv-container border">

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
                                                                        <TextField disabled={infoRetrospectivaPreenchida} value={linkRetrospectiva} defaultValue={`${JSON.parse(localStorage.getItem('novaSprint')) !== true && linkRetrospectiva !== '' ? linkRetrospectiva : ''}`} required type={'text'} onChange={(e) => setLinkRetrospectiva(e.target.value)} fullWidth  margin="normal" size="small" placeholder="Informe o link da retrospectiva" variant="outlined" className="input-text" />
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

                                        <TabPanel value={activeStep} index={3} className="metodos-avaliacao">
                                            <div className="info-etapa-text">

                                                <h2 className="text-title-etapa">Avaliação</h2>
                                                <h4 className="text-subtitle">
                                                    Nesta etapa vocês irão realizar a avaliação das atividades realizadas. Esta etapa possui um link para uma avaliação
                                                    que deve ser respondida de forma individual. Lembre-se o questionário não é obrigatório, contudo sua resposta pode ajudar a
                                                    melhorar as etapas, as atividades realizadas e até a aplicação.
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
                                                            <a href="https://forms.gle/awyN4q8yUKmS6r6i6" target={'_blank'}>
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
                                                disabled={activeStep === maxSteps - 1 || isActive}
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
                                            <Button size="small" onClick={handleBack} disabled={activeStep === 0 || isActive}>
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
                                                disabled={activeStep === 0 || isActive}
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