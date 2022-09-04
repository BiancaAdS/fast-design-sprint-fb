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

import { Tabs, Tab, Accordion, AccordionDetails, AccordionSummary, FormControl, TextField } from '@mui/material';

import MobileStepper from '@mui/material/MobileStepper';
import { useTheme } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

import { Container } from './styles'

import notification from '../../shared/assets/notification.wav'


const steps = ['Discussão da solução', 'Esboço do protótipo', 'Mentoria', 'Aprimoramento Esboço', "Validação do Esboço", "Revisão do Processo", "Avaliação"];


function a22yProps(index) {
    return {
      id: `simple-tab-${index}-inside`,
      'aria-controls': `simple-tabpanel-${index}-inside`, 
    };
}


export const Etapa2 = (props) => {
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
            reformulacaoEsboco: false,
            revisaoEsboco: false,
            ferramentas: false,
            preparacaoTestes: false,
            construcao: false,
            testagem: false,
            avaliacaoTestagem: false,
            apresentacao: false,
            mentoria: false,
            pesquisaValidacao: false,
            reformulacaoPrototipo: false,
            revisaoPrototipo: false,
            testagemReformulada: false,
            retrospectiva: false
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
                linkRetrospectiva2: data.linkRetrospectiva2 ? data.linkRetrospectiva2 : linkRetrospectiva,
                linkRetrospectiva3: data.linkRetrospectiva3 ? data.linkRetrospectiva3 : "",
                linkRetrospectiva4: data.linkRetrospectiva4 ? data.linkRetrospectiva4 : "",
                etapaFinalizada: "etapa2"
            })
        } 
        handleFinalizarAtividade()
    }

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

    const [width, setWidth]   = useState(window.innerWidth);
    const updateDimensions = () => {
        setWidth(window.innerWidth);
    }
    useEffect(() => {
        window.addEventListener("resize", updateDimensions);
        
        return () => window.removeEventListener("resize", updateDimensions);

    }, []);

    const [atvCompleta, setAtvCompleta] = useState(false)

    const handleFinalizarAtividade = () => {
        if(linkRetrospectiva !== "") {
            setAtvCompleta(true)
        } else {
            setAtvCompleta(false)
        }
    }

    const handleNextEtapa = () => {
        setTimeout(() => {
            navigate(`/etapa3`, { replace: true })               
       }, 1000)
    }



    return (
            <Container>

                <div className='wrapper'>

                    <div className="content-page">

                        <div className="content-info">
                            <h1>Bem vindos a segunda etapa{auth.user ? ", " + auth.user.username : ''}!</h1>
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
                                            

                                        <TabPanel value={activeStep} index={0} className="discussao-solução" >
                                            
                                            <div className="info-etapa-text">

                                                <h2 className="text-title-etapa">Discussão da Solução</h2>
                                                <h4 className="text-subtitle">
                                                    Etapa em que os participantes irão realizar atividades que tem como objetivo definir a solução que será implementada pela equipe. Esta etapa
                                                    contém atividades que permitem a equipe a fazer pesquisas individuais e em grupo, para facilitar na escolha de uma solução para ser implementada. 
                                                    <br /> <strong>Lembrem-se</strong>, cada atividade possui um tempo estimado para serem realizadas. O tempo é disponibilizado em cada atividade 
                                                    e para acompanhar esse tempo lembre sempre de olhar para o relógio.

                                                </h4>
                                            </div>

                                            <Accordion className={`box-accordion`} expanded={expanded === 'panel1a'} onChange={handleOpenBox('panel1a')} disabled={isActive}>
                                                <AccordionSummary
                                                expandIcon={<ExpandMoreIcon className="icon-exp" />}
                                                aria-controls="panel1bh-content"
                                                id="panel1bh-header"
                                                className={`${boxState['discussao'] ? 'finalizada' : ''}`}>
                                                <Typography className={`text-title ${boxState['discussao'] ? 'finalizada' : ''}`}>
                                                    Discussão da Solução para o problema mapeado
                                                </Typography>
                                                
                                                </AccordionSummary>
                                                <AccordionDetails className={`${!isOpenAccordion ? 'aberto' : ''}`}>

                                                        Nesta atividade vocês irão trabalhar em <strong>grupo</strong> e <strong>individualmente</strong>. Vocês irão realizar atividades
                                                        para pesquisar possíveis soluções a serem desenvolvidas e irão votar na solução que a equipe tem mais interesse em implementar. 
                                                        <br />
                                                        <br />

                                                        <div className={`timer-box`}>
                                                            <div className="content-timer">
                                                                <Timer min={timeClock} isActive={isActive} setIsActive={setIsActive} setHasFinised={setHasFinised} />
                                                            </div>
                                                        </div>

                                                        <Tabs allowScrollButtonsMobile={true} sx={{ '& .MuiTabs-flexContainer': { flexWrap: 'wrap' } }} TabIndicatorProps={{ sx: { display: 'none' } }} value={valueInside} onChange={handleChangeInside} aria-label="basic tabs example" className="tab-box">
                                                            <Tab aria-selected={true} disabled={isActive} wrapped fullWidth className="text-title tab-etapas" label="Pesquisa Individual" {...a22yProps(0)} />
                                                            <Tab disabled={isActive} wrapped fullWidth className="text-title tab-etapas" label="Organização das propostas" {...a22yProps(1)} />
                                                            <Tab disabled={isActive} wrapped fullWidth className="text-title tab-etapas" label="Brainstorm" {...a22yProps(2)} />
                                                            <Tab disabled={isActive} wrapped fullWidth className="text-title tab-etapas" label="Votação das Propostas" {...a22yProps(3)} />
                                                        </Tabs>


                                                        <TabPanelInside value={valueInside} index={0} className="atv-container border">
                                                        
                                                            <h4 className="text-title-inside">
                                                                Pesquisa individual sobre o problema/ideia a ser implementado
                                                            </h4>
                                                            <div className="box-atv">
                                                                Nesta atividade vocês irão trabalhar <strong>individualmente</strong>. Cada integrante da equipe
                                                                deve realizar uma pesquisa individual sobre o problema escolhido para solucionar ou pesquisar soluções já existentes, 
                                                                sobre o problema escolhido, que desejam melhorar.
                                                                
                                                                <br />
                                                                <br />
                                                                <div className="iniciar-atv">

                                                                    <p>Antes de inciar a atividade lembrem-se que vocês têm <strong>30 minutos</strong> para finalizar a mesma.</p> 

                                                                    <button className={`btn-atv ${isActive ? 'selected' : ''}`} onClick={() => setTimeClock(30)} disabled={isActive}>Iniciar Atividade</button>

                                                                </div>
                                                                
                                                            </div>
                                                        </TabPanelInside>
                                                        
                                                        <TabPanelInside value={valueInside} index={1} className="atv-container border" >

                                                            <h4 className="text-title-inside">
                                                                Organização individual de propostas para o problema/ideia a ser implementado
                                                            </h4>
                                                            <div className="box-atv">
                                                                Nesta atividade vocês irão trabalhar <strong>individualmente</strong>. Cada integrante da equipe
                                                                deve realizar a organização das ideias encontradas na atividade anterior e preparar uma rápida apresentação sobre as mesmas
                                                                para toda a equipe.
                                                                <br />
                                                                <br />
                                                                <div className="iniciar-atv">
                                                                    <p>Antes de inciar a atividade lembrem-se que vocês têm <strong>20 minutos</strong> para finalizar a mesma.</p> 
                                                                    <button className={`btn-atv ${isActive ? 'selected' : ''}`} onClick={() => setTimeClock(20)} disabled={isActive}>Iniciar Atividade</button>

                                                                </div>
                                                                
                                                            </div>
                                                        </TabPanelInside>

                                                        <TabPanelInside value={valueInside} index={2} className="atv-container border" >

                                                            <h4 className="text-title-inside">
                                                                Brainstorm sobre as propostas para o problema/ideia a ser implementado
                                                            </h4>
                                                            <div className="box-atv">
                                                                Nesta atividade vocês irão trabalhar em <strong>grupo</strong>. Cada integrante da equipe
                                                                deve realizar a apresentação das informações encontradas nas atividades anteriores sobre as soluções/problemas para toda a equipe, 
                                                                deixando espaço para possíveis questionamentos dos integrantes. A apresentação pode ser rápida, apenas para que os integrantes da 
                                                                equipe tenham uma ideia geral sobre o problema, para que possa facilitar na hora de realizar a votação das soluções/problemas. 
                                                                <br />
                                                                <br />
                                                                <div className="iniciar-atv">
                                                                    <p>Antes de inciar a atividade lembrem-se que vocês têm <strong>40 minutos</strong> para finalizar a mesma.</p> 
                                                                    <button className={`btn-atv ${isActive ? 'selected' : ''}`} onClick={() => setTimeClock(40)} disabled={isActive}>Iniciar Atividade</button>

                                                                </div>
                                                                
                                                            </div>
                                                        </TabPanelInside>

                                                        <TabPanelInside value={valueInside} index={3} className="atv-container border" >

                                                            <h4 className="text-title-inside">
                                                                Escolha de quais propostas serão desenvolvidas e transformadas em protótipos
                                                            </h4>
                                                            <div className="box-atv">
                                                                Nesta atividade vocês irão trabalhar em <strong>grupo</strong>. Cada integrante da equipe
                                                                deve realizar a votação na solução/problema que mais gosta e achar interessante para a equipe desenvolver no decorrer das etapas.
                                                                Nesta atividade vocês deverão trabalhar em <strong>grupo</strong>. Após realizar as apresentações na atividade anterior, 
                                                                cada integrante da equipe irá realizar a votação na proposta de seu interesse, que mais gostou. <br />
                                                                Lembre-se, cada integrante tem <strong>três</strong> votos para gastar, ou seja, ele deve votar três vezes, seja em apenas uma 
                                                                proposta ou em mais. Para que a votação  não acabe empatada ou sem solução, 
                                                                o <strong>Definidor </strong> tem seu papel posto em prova nessa votação, por ele ser
                                                                responsável por tomar as decisões de maior importância na equipe, seu voto é duplicado nessa  votação.

                                                                <br />
                                                                <br />
                                                                <div className="iniciar-atv">
                                                                    <p>Antes de inciar a atividade lembrem-se que vocês têm <strong>25 minutos</strong> para finalizar a mesma.</p> 
                                                                    <button className={`btn-atv ${isActive ? 'selected' : ''}`} onClick={() => setTimeClock(25)} disabled={isActive}>Iniciar Atividade</button>

                                                                </div>
                                                                
                                                            </div>
                                                        </TabPanelInside>

                                                    <div className="finalizarAtv">
                                                        <label>Finalizar Atividade?</label>
                                                        <input checked={boxState['discussao']} className="checkbox-fin" type="checkbox" name="definicao-papeis" id="definicao-papeis" onChange={() => handleFinalizar('discussao')} /> Sim
                                                    </div>
                                                </AccordionDetails>
                                            </Accordion>

                                        </TabPanel> 

                                        <TabPanel value={activeStep} index={1} className="esboco-problema">

                                            <div className="info-etapa-text">

                                                <h2 className="text-title-etapa">Esboço da Solução ou do Protótipo</h2>
                                                <h4 className="text-subtitle">
                                                    Etapa em que os participantes irão realizar atividades que tem como objetivo iniciar a preparação do esboço da solução ou problema/ideia a ser 
                                                    implementado.  Contendo atividades que permitem, iniciar o esboço da solução definida na etapa anterior e preparar a apresentação do mesmo para 
                                                    realizar a validação da solução.
                                                    <br /> <strong>Lembrem-se</strong>, cada atividade possui um tempo estimado para serem realizadas. O tempo é disponibilizado em 
                                                    cada atividade e para acompanhar esse tempo lembre sempre de olhar para o relógio.
                                                </h4>
                                            </div>

                                            <Accordion className="box-accordion" expanded={expanded === 'panel1b'} onChange={handleOpenBox('panel1b')} disabled={isActive}>
                                                <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                aria-controls="panel1bh-content"
                                                id="panel1bh-header"
                                                className={`${boxState['esbocoSolucao'] ? 'finalizada' : ''}`}>
                                                <Typography className={`text-title ${boxState['esbocoSolucao'] ? 'finalizada' : ''}`}>
                                                    Esboço da solução ou do protótipo
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
                                                                Esboço da solução ou do protótipo 
                                                            </h4>
                                                            <div className="box-atv">
                                                                Nesta atividade vocês irão trabalhar em <strong>grupo</strong>. Cada integrante da equipe
                                                                deve fazer um esboço da solução ou do protótipo votado na atividade anterior, podendo conter qualquer funcionalidade 
                                                                que o mesmo ache ideal para contribuir na resolução do problema. A forma de confecção do esboço fica a cargo do integrante, podendo
                                                                escolher o que achar mais fácil utilizar.
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
                                                            <input checked={boxState['esbocoSolucao']} className="checkbox-fin" type="checkbox" name="definicao-papeis" id="definicao-papeis" onChange={() => handleFinalizar('esbocoSolucao')} /> Sim
                                                        </div>
                                                    </div>
                                                </AccordionDetails>
                                            </Accordion>

                                            <Accordion className="box-accordion" expanded={expanded === 'panel2b'} onChange={handleOpenBox('panel2b')} disabled={isActive}>
                                                <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                aria-controls="panel2bh-content"
                                                id="panel2bh-header"
                                                className={`${boxState['preparacaoApresentacao'] ? 'finalizada' : ''}`}
                                                >
                                                <Typography className={`text-title ${boxState['preparacaoApresentacao'] ? 'finalizada' : ''}`}>Preparação de apresentação do esboço do esboço</Typography>
                                                </AccordionSummary>
                                                <AccordionDetails className={`${!isOpenAccordion ? 'aberto' : ''}`}>
                                                    <div className={`timer-box`}>
                                                        <div className="content-timer">
                                                            <Timer min={timeClock} isActive={isActive} setIsActive={setIsActive} setHasFinised={setHasFinised}></Timer>
                                                        </div>
                                                    </div>
                                                    
                                                    <TabPanelInside value={valueInside} index={0} className="atv-containerOnly">
                                                    
                                                        <h4 className="text-title-inside">
                                                            Preparação de apresentação do esboço da solução/protótipo
                                                        </h4>
                                                        <div className="box-atv">
                                                            Nesta atividade vocês deverão trabalhar em <strong>grupo</strong>. A equipe é responsável por preparar uma apresentação sobre
                                                            o esboço feito na atividade anterior para o mentor e a turma. A apresentação pode ser rápida, apenas para que os
                                                            mentor fique familiarizado com a solução escolhida e como a mesma vai ser implementada. A equipe pode preparar questionamentos para o 
                                                            mentor facilitando na hora de recolher o feedback do mentor.                             
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
                                                        <input checked={boxState['preparacaoApresentacao']} className="checkbox-fin" type="checkbox" name="definicao-papeis" id="definicao-papeis" onChange={() => handleFinalizar('preparacaoApresentacao')} /> Sim
                                                    </div>
                                                </AccordionDetails>

                                            
                                            </Accordion>

                                        </TabPanel>

                                        <TabPanel value={activeStep} index={2} className="mentoria">

                                            <div className="info-etapa-text">

                                                <h2 className="text-title-etapa">Mentoria</h2>
                                                <h4 className="text-subtitle">
                                                    Etapa em que os participantes irão realizar o agendamento de uma reunião com o mentor responsável pela equipe. Esta etapa tem como objetivo 
                                                    iniciar o processo de validação da ideia, pois contém atividades que incentivam a apresentação do esboço preparado ao mentor e 
                                                    com isso gerar possíveis melhorias que podem ser aplicadas no esboço da solução/problema feito. 
                                                    <br /> <strong>Lembrem-se</strong>, cada atividade possui um tempo estimado para serem realizadas. O tempo é disponibilizado em 
                                                    cada atividade e para acompanhar esse tempo lembre sempre de olhar para o relógio.
                                                </h4>
                                            </div>

                                            <Accordion className="box-accordion" expanded={expanded === 'panel1c'} onChange={handleOpenBox('panel1c')} disabled={isActive}>
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
                                                        <Tab disabled={isActive} wrapped fullWidth className="text-title tab-etapas" label="Apresentação para o mentor" {...a22yProps(0)} />
                                                        <Tab disabled={isActive} wrapped fullWidth className="text-title tab-etapas" label="Retorno da Equipe" {...a22yProps(1)} />
                                                        <Tab disabled={isActive} wrapped fullWidth className="text-title tab-etapas" label="Apresentação para a turma" {...a22yProps(2)} />
                                                    </Tabs>

                                                    <TabPanelInside value={valueInside} index={0} className="atv-container border" >
                                                    

                                                        <h4 className="text-title-inside">
                                                            Apresentação do esboço do problema/ideia escolhido para o mentor
                                                        </h4>
                                                        <div className="box-atv">
                                                            Nesta atividade vocês deverão trabalhar em <strong>grupo</strong>. O grupo deve realizar a apresentação do seu grupo (informando o 
                                                            nome da equipe e solução escolhida para desenvolver) para o mentor. A apresentação pode ser rápida, 
                                                            apenas para que o mentor saiba qual é a sua equipe e a solução sua equipe irá desenvolver e mostrar o esboço preparado nas atividades
                                                            anteriores. Após a equipe realizar a apresentação, o grupo pode realizar a primeira validação da ideia com o mentor, 
                                                            fazendo perguntas sobre o tema escolhido para desenvolver, sobre o esboço feito: se é uma boa idea a forma escolhida para implementar, etc.
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
                                                            Nesta atividade vocês deverão trabalhar em <strong>grupo</strong>. Após a apresentação da solução definida para o mentor, o grupo 
                                                            terá um tempo para se preparar para a próxima apresentação, que será feita para a turma. 
                                                            
                                                                                        
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
                                                            (informando o nome da equipe e solução escolhida para desenvolver) para a turma. A apresentação pode ser rápida, 
                                                            apenas para que a turma conheça a solução que sua equipe irá desenvolver e mostrar o esboço realizado e como o mesmo foi feito.
                                                                                        
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

                                        </TabPanel> 

                                        <TabPanel value={activeStep} index={3} className="aprimoramento-esboco">

                                            <div className="info-etapa-text">

                                                <h2 className="text-title-etapa">Aprimoramento do Esboço</h2>
                                                <h4 className="text-subtitle">
                                                    Etapa em que os participantes irão realizar a aplicação de melhorias no esboço iniciado na etapa anterior. Esta etapa utiliza as 
                                                    respostas obtidas da reunião com o mentor como possíveis melhorias. A etapa possui atividades que visam incentivar momentos de 
                                                    discussões entre os integrantes da equipe sobre o problema mapeado e se é houver melhorias e aplica-las na solução.
                                                    <br /> <strong>Lembrem-se</strong>, cada atividade possui um tempo estimado para serem realizadas. O tempo é disponibilizado em 
                                                    cada atividade e para acompanhar esse tempo lembre sempre de olhar para o relógio.
                                                </h4>
                                            </div>

                                            <Accordion className="box-accordion" expanded={expanded === 'panel1d'} onChange={handleOpenBox('panel1d')} disabled={isActive}>
                                                <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                aria-controls="panel2bh-content"
                                                id="panel2bh-header"
                                                className={`${boxState['reformulacaoEsboco'] ? 'finalizada' : ''}`}
                                                >
                                                <Typography className={`text-title ${boxState['reformulacaoEsboco'] ? 'finalizada' : ''}`}>Reformulação de pontos do esboço com base na mentoria</Typography>
                                                </AccordionSummary>
                                                <AccordionDetails className={`${!isOpenAccordion ? 'aberto' : ''}`}>
                                                    <div className={`timer-box`}>
                                                        <div className="content-timer">
                                                            <Timer min={timeClock} isActive={isActive} setIsActive={setIsActive} setHasFinised={setHasFinised}></Timer>
                                                        </div>
                                                    </div>
                                                 
                                                    <TabPanelInside value={valueInside} index={0} className="atv-containerOnly">
                                                    
                                                        <h4 className="text-title-inside">
                                                            Reformulação de pontos do esboço com base no feedback da mentoria
                                                        </h4>
                                                        <div className="box-atv">
                                                            Nesta atividade vocês deverão trabalhar em <strong>grupo</strong>. O grupo deve realizar a reformulação de pontos obtidos na reunião 
                                                            e apresentação para o mentor, realizando a análise se é viável ou não aplicar as melhorias que foram apontadas pelo mentor.
                                                            
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
                                                        <input checked={boxState['reformulacaoEsboco']} className="checkbox-fin" type="checkbox" name="definicao-papeis" id="definicao-papeis" onChange={() => handleFinalizar('reformulacaoEsboco')} /> Sim
                                                    </div>
                                                </AccordionDetails>
                                                
                                            </Accordion>

                                            <Accordion className="box-accordion" expanded={expanded === 'panel2d'} onChange={handleOpenBox('panel2d')} disabled={isActive}>
                                                <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                aria-controls="panel3bh-content"
                                                id="panel3bh-header"
                                                className={`${boxState['revisaoEsboco'] ? 'finalizada' : ''}`}
                                                >
                                                <Typography className={`text-title ${boxState['revisaoEsboco'] ? 'finalizada' : ''}`}>
                                                    Revisão de esboço
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
                                                            Revisão de esboço da ideia/solução
                                                        </h4>
                                                        <div className="box-atv">
                                                            Nesta atividade vocês deverão trabalhar em <strong>grupo</strong>. O grupo deve realizar a revisão do esboço com base na reformulação
                                                            feita na atividade anterior, podendo levar em conta a análise feita, os comentários obtidos do mentor e novas ideias que podem vim a surgir
                                                            dos integrantes após essa rodada de validação.
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
                                                        <input checked={boxState['revisaoEsboco']} className="checkbox-fin" type="checkbox" name="definicao-papeis" id="definicao-papeis" onChange={() => handleFinalizar('revisaoEsboco')} /> Sim
                                                    </div>
                                                </AccordionDetails>
                                            
                                            </Accordion>

                                        </TabPanel> 

                                        <TabPanel value={activeStep} index={4} className="validacao-esboco">

                                            <div className="info-etapa-text">

                                                <h2 className="text-title-etapa">Validação do Esboço</h2>
                                                <h4 className="text-subtitle">
                                                    Etapa em que os participantes irão realizar a validação do esboço do problema/solução confeccionado nas etapas anteriores. A etapa possui 
                                                    atividades que visam incentivar o processo de validação, disponibilizando tempo para aplicar questionários sobre o esboço desenvolvido.
                                                    <br /> <strong>Lembrem-se</strong>, cada atividade possui um tempo estimado para serem realizadas. O tempo é disponibilizado em 
                                                    cada atividade e para acompanhar esse tempo lembre sempre de olhar para o relógio.
                                                </h4>
                                            </div>

                                            <Accordion className="box-accordion" expanded={expanded === 'panel1d'} onChange={handleOpenBox('panel1d')} disabled={isActive}>
                                                <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                aria-controls="panel2bh-content"
                                                id="panel2bh-header"
                                                className={`${boxState['pesquisaValidacao'] ? 'finalizada' : ''}`}
                                                >
                                                <Typography className={`text-title ${boxState['pesquisaValidacao'] ? 'finalizada' : ''}`}>Pesquisa de validação do esboço</Typography>
                                                </AccordionSummary>
                                                <AccordionDetails className={`${!isOpenAccordion ? 'aberto' : ''}`}>
                                                    <div className={`timer-box`}>
                                                        <div className="content-timer">
                                                            <Timer min={timeClock} isActive={isActive} setIsActive={setIsActive} setHasFinised={setHasFinised}></Timer>
                                                        </div>
                                                    </div>
                                                   
                                                    <TabPanelInside value={valueInside} index={0} className="atv-containerOnly">

                                                        <h4 className="text-title-inside">
                                                            Pesquisa rápida com conhecidos sobre o esboço do problema/ideia definido
                                                        </h4>
                                                        <div className="box-atv">
                                                            Nesta atividade vocês deverão trabalhar em <strong>grupo</strong>. O grupo deve realizar uma rápida apresentação e pesquisa sobre a solução com conhecidos, 
                                                            podendo ser apresentados em formulários para poder recolher a percepção de pessoas de fora do grupo sobre o esboço da solução confeccionado. 
                                                            O formulário pode ser curto para que seja fácil de recolher as repostas, fazendo perguntas sobre o tema escolhido para desenvolver, 
                                                            sobre o esboço, se é viável/interessante ou não continuar com o desenvolvimento do esboço.
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
                                                        <input checked={boxState['pesquisaValidacao']} className="checkbox-fin" type="checkbox" name="definicao-papeis" id="definicao-papeis" onChange={() => handleFinalizar('pesquisaValidacao')} /> Sim
                                                    </div>
                                                </AccordionDetails>
                                                
                                            </Accordion>

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

                                            <Accordion className="box-accordion" expanded={expanded === 'panel1e'} onChange={handleOpenBox('panel1e')} disabled={isActive}>
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
                                                                    <TextField required type={'text'} onChange={(e) => setLinkRetrospectiva(e.target.value)} fullWidth  margin="normal" size="small" placeholder="Informe o nome da equipe" variant="outlined" className="input-text" />                                                  
                                                                    <Button disabled={atvCompleta} type="submit" className="btn-formulario">Enviar Informações</Button>
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
                                            <Accordion className="box-accordion" expanded={expanded === 'panel1f'} onChange={handleOpenBox('panel1f')} disabled={isActive}>
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
                                                            
                                                            <a href="https://forms.gle/Fxrhr2k2VuwYa7Pk9" target={'_blank'}>
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