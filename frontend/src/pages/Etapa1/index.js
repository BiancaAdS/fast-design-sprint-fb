import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

import { AuthContext } from "../../contexts/Auth/AuthContext";

import { TabPanel } from '../../shared/components/TabPanel'
import { TabPanelInside } from '../../shared/components/TabPanelInside'
import { Timer } from '../../shared/components/Timer'

import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import MobileStepper from '@mui/material/MobileStepper';

import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

import { Tabs, Tab, Accordion, AccordionDetails, AccordionSummary, FormControl, TextField } from '@mui/material';

import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { Container } from './styles'

import { useTheme } from '@mui/material/styles';

import notification from '../../shared/assets/notification.wav'


const steps = ['Definição de equipe', 'Mapeamento do Problema', 'Mentoria', 'Validação do Problema', "Revisão do Processo", "Avaliação"];


function a22yProps(index) {
    return {
      id: `simple-tab-${index}-inside`,
      'aria-controls': `simple-tabpanel-${index}-inside`, 
    };
}


export const Etapa1 = (props) => {

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

    const maxSteps = steps.length;

    const [seConhecem, setSeConhecem] = useState(JSON.parse(localStorage.getItem('seConhecem')) ? JSON.parse(localStorage.getItem('seConhecem')) : false)
    const [facilitador, setFacilitador] = useState("")
    const [definidor, setDefinidor] = useState("")
    const [observador, setObservador] = useState("")
    const [entrevistador, setEntrevistador] = useState("")
    const [scrumMaster, setScrumMaster] = useState("")
    const [nomeDaEquipe, setNomeDaEquipe] = useState(auth.user ? auth.user.username : "")
    const [quantidadeIntegrantes, setQuantidadeIntegrantes] = useState(0)
    const qualEtapaFinalizada = 'etapa1'
    
    const boxInitial = JSON.parse(localStorage.getItem('boxState'))

    const [boxState, setBoxState] = useState(boxInitial ? boxInitial :{
        separacaoEquipe: false,
        aquecimentoEquipe: false,
        definicaoPapeis: false,
        primeiraPesquisa: false,
        definicaoProblema: false,
        segundaPesquisa: false,
        definicaoEquipeProblema: false,
        mentoria: false,
        pesquisaRapida: false,
        discussaoValidacao: false,
        retrospectiva: false
    })

    const [youtubeIDSeparacaoEquipe] = useState('wq3MnTvRV-Y')
    const [youtubeIDAquecimentoEquipe] = useState('sM7BrKIMNk4')
    const [youtubeIDDefinicaoPapeis] = useState('6xAvGshgwjI')

    const [atvCompleta1, setAtvCompleta1] = useState(false)
    const [atvCompleta2, setAtvCompleta2] = useState(false)
    const [atvCompleta3, setAtvCompleta3] = useState(false)

    useEffect(() => {
        const nova = localStorage.getItem('novaSprint')
        if(JSON.parse(nova) === true) {
            auth.logoutUser()

            setBoxState({
                separacaoEquipe: false,
                aquecimentoEquipe: false,
                definicaoPapeis: false,
                primeiraPesquisa: false,
                definicaoProblema: false,
                segundaPesquisa: false,
                definicaoEquipeProblema: false,
                mentoria: false,
                pesquisaRapida: false,
                discussaoValidacao: false,
                retrospectiva: false
            })
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('seConhecem', JSON.stringify(seConhecem))
    }, [seConhecem])

    useEffect(() => {
        localStorage.setItem('boxState', JSON.stringify(boxState))
    }, [boxState])

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

    useEffect(() => {

        var count = 0

        for(var elem in boxState) {
            if(boxState[elem]) {
                count++
            }
        }

    }, [boxState])

    const handleSeConhecem = (e) => {
        if(e.target.id === 'sim') {
            setSeConhecem(true)
            handleFinalizarAquecimento('aquecimentoEquipe', true)
        } else {
            setSeConhecem(false)
            handleFinalizarAquecimento('aquecimentoEquipe', false)
        }
    }

    const startCountdown = () => {
        setIsActive(true);
    }

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

    const [linkRetrospectiva, setLinkRetrospectiva] = useState("")
    
    const handleFinalizar = (boxName) => {
        setBoxState({
            ...boxState,
            [boxName]: !boxState[boxName]
        })
    }

    const handleFinalizarAquecimento = (boxName, precisa) => {
        setBoxState({
            ...boxState,
            [boxName]: precisa
        })
    }

    useEffect(() => {
        localStorage.setItem('boxState', JSON.stringify(boxState))
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

    const [isLogged, setIsLogged] = useState(false);

    const handleEquipeExiste = async (nomeDaEquipe) => {

        const existe = await axios.post("/api/login/", {
            username: nomeDaEquipe,
            password: nomeDaEquipe
        })

        if(existe.data.authenticate) {
            return true
        } else {
            return false
        }
    }

    const [equipeExiste, setEquipeExiste] = useState(false)

    const handleNomeEquipe = async (e) => {
        e.preventDefault()

        const equipeJaExiste =  await handleEquipeExiste(nomeDaEquipe)

        if(equipeJaExiste) {
            setEquipeExiste(true)
        } else {
            axios.post('/api/create-equipe', {
                nomeDaEquipe: nomeDaEquipe,
                quantidadeIntegrantes: quantidadeIntegrantes,
                seConhecem: seConhecem,
                definidor: definidor,
                facilitador: facilitador,
                observador: observador,
                entrevistador: entrevistador,
                scrumMaster: scrumMaster,               
                linkRetrospectiva1:"",
                linkRetrospectiva2:"",
                linkRetrospectiva3:"",
                linkRetrospectiva4:"",
                etapaFinalizada: '',
            })
            setEquipeExiste(false)

            if(!isLogged) {

                setTimeout(() => {
                    handleLoginNew()      
               }, 1000)
                setIsLogged(true)
                localStorage.setItem('novaSprint', JSON.stringify(false))
            }
            handleFinalizarAtividade1()
        }
    }

    const [carregar, setCarregar] = useState(false)

    const handleInformacaoEquipe = async (e) => {
        e.preventDefault()

        const { data } = await axios.get(`/api/equipes/${nomeDaEquipe}`)

        if(Object.keys(data).length !== 0) {
            axios.post('/api/create-equipe', {
                nomeDaEquipe: data.nomeDaEquipe ? data.nomeDaEquipe : nomeDaEquipe,
                quantidadeIntegrantes: data.quantidadeIntegrantes ? data.quantidadeIntegrantes : quantidadeIntegrantes,
                seConhecem: data.seConhecem ? data.seConhecem : seConhecem,
                definidor: data.definidor ? data.definidor : definidor,
                facilitador: data.facilitador ? data.facilitador : facilitador,
                observador: data.observador ? data.observador : observador,
                entrevistador: data.entrevistador ? data.entrevistador : entrevistador,
                scrumMaster: data.scrumMaster ? data.scrumMaster : scrumMaster,
                linkRetrospectiva1: data.linkRetrospectiva1 ? data.linkRetrospectiva1 : linkRetrospectiva,
                linkRetrospectiva2: data.linkRetrospectiva2 ? data.linkRetrospectiva2 : "",
                linkRetrospectiva3: data.linkRetrospectiva3 ? data.linkRetrospectiva3 : "",
                linkRetrospectiva4: data.linkRetrospectiva4 ? data.linkRetrospectiva4 : "",
                etapaFinalizada: data.qualEtapaFinalizada ? data.qualEtapaFinalizada : qualEtapaFinalizada
            })
        } 
        
        handleFinalizarAtividade2()
        handleFinalizarAtividade3()
        if(carregar) {
            setCarregar(false)
        } else {
            setCarregar(true)
        }
        
    }

    const handleNextEtapa = () => {
        setTimeout(() => {
            navigate(`/etapa2`, { replace: true })       
       }, 1000)
    }


    const handleLoginNew = async () => {

        const logged = await auth.loginUser(nomeDaEquipe, nomeDaEquipe)

        return logged
    }

    const [width, setWidth]   = useState(window.innerWidth);
    const updateDimensions = () => {
        setWidth(window.innerWidth);
    }
    useEffect(() => {
        window.addEventListener("resize", updateDimensions);
        
        return () => window.removeEventListener("resize", updateDimensions);

    }, []);

    const handleFinalizarAtividade1 = () => {
        if(nomeDaEquipe !== "" && quantidadeIntegrantes !== 0) {
            setAtvCompleta1(true)
        } else {
            setAtvCompleta1(false)
        }
    }

    const handleFinalizarAtividade2 = () => {
        if(definidor !== "" && facilitador !== "" && observador !== "" && entrevistador !== "" && scrumMaster !== "") {
            setAtvCompleta2(true)
        } else {
            setAtvCompleta2(false)
        }
    }

    const handleFinalizarAtividade3 = () => {
        if(linkRetrospectiva !== "") {
            setAtvCompleta3(true)
        } else {
            setAtvCompleta3(false)
        }
    }

    const [infoPapeisPreenchida, setInfoPapeisPreenchida] = useState(false)
    const [infoPrincipalPreenchida, setInfoPrincipalPreenchida] = useState(false)
    const [infoRetrospectivaPreenchida, setInfoRetrospectivaPreenchida] = useState(false)

    useEffect(() => {

        const handleInfoPreenchida = async () => {
            
            if(auth.user) {
                const { data } = await axios.get(`/api/equipes/${auth.user.username}`)

                if(JSON.parse(localStorage.getItem('novaSprint')) !== true) {
                    setDefinidor(data.definidor)
                    setFacilitador(data.facilitador)
                    setObservador(data.observador)
                    setEntrevistador(data.entrevistador)
                    setScrumMaster(data.scrumMaster)
                    setLinkRetrospectiva(data.linkRetrospectiva1)
                    setQuantidadeIntegrantes(data.quantidadeIntegrantes)
                    setNomeDaEquipe(data.nomeDaEquipe)

                    if(data.definidor.length !== 0 && data.facilitador.length !== 0 && data.observador.length !== 0 && data.entrevistador.length !== 0 && data.scrumMaster.length !== 0 ) {
                        setInfoPapeisPreenchida(true)
                    }
            
                    if(data.linkRetrospectiva1.length !== 0 ) {
                        setInfoRetrospectivaPreenchida(true)
                    }
                    
                    if(data.nomeDaEquipe !== "" && data.quantidadeIntegrantes !== "") {
                        setInfoPrincipalPreenchida(true)
                    }

                }
            }
        }
        handleInfoPreenchida()
       
    }, [carregar])

    

    return (
            <Container>
                <div className='wrapper'>
                    <div className="content-page">

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


                                        <TabPanel value={activeStep} index={0} className="formacao-equipe" >
                                                            
                                            <div className="info-etapa-text">

                                                <h2 className="text-title-etapa">Definição de equipe</h2>
                                                <h4 className="text-subtitle">
                                                    Nesta etapa vocês irão realizar atividades que tem como objetivo iniciar a formação/aproximação de sua equipe.
                                                    Contendo atividades que visam, aproximar vocês e definir seus papéis na equipes. <br /> <strong>Lembrem-se</strong>, cada atividade
                                                    possui um tempo estimado para serem realizadas. O tempo é disponibilizado em cada atividade e para acompanhar esse tempo
                                                    lembre sempre de olhar para o relógio.

                                                </h4>
                                            </div>

                                            <div className={`container-accordion ${expanded === 'panel1a' ? 'contador-open' : ''}`}>
                                                <span className='contador'></span>
                                                <Accordion className={`box-accordion`} expanded={expanded === 'panel1a'} onChange={handleOpenBox('panel1a')} disabled={isActive}>
                                                    <AccordionSummary
                                                    expandIcon={<ExpandMoreIcon className="icon-exp" />}
                                                    aria-controls="panel1bh-content"
                                                    id="panel1bh-header"
                                                    className={`${boxState['separacaoEquipe'] ? 'finalizada' : ''}`}>
                                                    <Typography className={`text-title ${boxState['separacaoEquipe'] ? 'finalizada' : ''}`}>
                                                        Separação da equipe
                                                    </Typography>
                                                    
                                                    </AccordionSummary>
                                                    <AccordionDetails className={`${!isOpenAccordion ? 'aberto' : ''}`}>

                                                        <div className="video-box">

                                                            <iframe 
                                                                    className='video'
                                                                    title='Atividade Separação da Equipe'
                                                                    sandbox='allow-same-origin allow-forms allow-popups allow-scripts allow-presentation'
                                                                    allowFullScreen='allowFullScreen'
                                                                    src={`https://youtube.com/embed/${youtubeIDSeparacaoEquipe}?autoplay=0`}>
                                                            </iframe>

                                                        </div>

                                                        <div className={`timer-box`}>
                                                            <div className="content-timer">
                                                                <Timer min={timeClock} isActive={isActive} setIsActive={setIsActive} setHasFinised={setHasFinised}/>
                                                            </div>
                                                        </div>

                                                        <Tabs allowScrollButtonsMobile={true} sx={{ '& .MuiTabs-flexContainer': { flexWrap: 'wrap' } }} TabIndicatorProps={{ sx: { display: 'none' } }} value={valueInside} onChange={handleChangeInside} aria-label="basic tabs example" className="tab-box">
                                                            <Tab aria-selected={true} disabled={isActive} wrapped fullWidth className="text-title tab-etapas" label="Definição de informações da equipe" {...a22yProps(0)} />
                                                            <Tab disabled={isActive} wrapped fullWidth className="text-title tab-etapas" label="Aproximação de participantes" {...a22yProps(1)} />
                                                        </Tabs>


                                                        <TabPanelInside value={valueInside} index={0} className="atv-container border">
                                                    
                                                            <h4 className="text-title-inside">
                                                                Jamboard
                                                            </h4>
                                                            <div className="box-atv">
                                                                Nesta atividade vocês irão trabalhar <strong>individualmente</strong>. Cada integrante da equipe
                                                                deve realizar a confecção do seu Jamboard, o modelo está disponível no link: <br />
                                                                <a href="https://jamboard.google.com/d/1SB6ea3udT-UhZwt-c_ZPLb0a8sCNoPatpTfGqTtqUxs/edit?usp=sharing" target="_blank">Clique aqui para abrir o Jamboard</a>
                                                                <br />
                                                                <br />
                                                                <div className="iniciar-atv">

                                                                    <p>Antes de inciar a atividade lembrem-se que vocês têm <strong>5 minutos</strong> para finalizar a mesma.</p> 

                                                                    <button className={`btn-atv ${isActive ? 'selected' : ''}`} onClick={() => setTimeClock(5)} disabled={isActive}>Iniciar Atividade</button>

                                                                </div>
                                                                
                                                            </div>
                                                        </TabPanelInside>
                                                        
                                                        <TabPanelInside value={valueInside} index={1} className="atv-container border" >

                                                            <h4 className="text-title-inside">
                                                                Aproximação de participantes e formação de equipe
                                                            </h4>
                                                            <div className="box-atv">
                                                                Nesta atividade vocês irão trabalhar em <strong>grupo</strong>. Cada integrante da equipe
                                                                deve realizar a apresentação do Jamboard preenchido na atividade anterior para toda a equipe.
                                                                <br />
                                                                <br />
                                                                <div className="iniciar-atv">
                                                                    <p>Antes de inciar a atividade lembrem-se que vocês têm <strong>10 minutos</strong> para finalizar a mesma.</p> 
                                                                    <button className={`btn-atv ${isActive ? 'selected' : ''}`} onClick={() => setTimeClock(10)} disabled={isActive}>Iniciar Atividade</button>

                                                                </div>
                                                                
                                                            </div>
                                                        </TabPanelInside>


                                                        <br />
                                                        <br />
                                                        Antes de seguir para a realização da próxima etapa de atividades, favor informar se todos da equipe se conhecem.
                                                        <div className="seConhecem">
                                                            <input className="radio-s" type="radio" name="opcoes" id="sim" onChange={handleSeConhecem} /> Sim
                                                            <input className="radio-n" type="radio" name="opcoes" id="nao" onChange={handleSeConhecem} /> Não
                                                        </div>
                                                        <br />
                                                        <br />                        
                                                    

                                                        <div className="finalizarAtv">
                                                            <label>Finalizar Atividade?</label>
                                                            <input checked={boxState['separacaoEquipe']} className="checkbox-fin" type="checkbox" name="definicao-papeis" id="definicao-papeis" onChange={() => handleFinalizar('separacaoEquipe')} /> Sim
                                                        </div>
                                                    </AccordionDetails>
                                                </Accordion>
                                            </div>

                                            <div className={`container-accordion ${expanded === 'panel2a' ? 'contador-open' : ''}`}>
                                                <div className={`${seConhecem ? "info-seConhecem" : "info-naoSeConhecem"}`}>
                                                    Não é necessário realizar as atividades abaixo se todos os integrantes da equipe se conhecerem.  :) 
                                                </div>
                                                <span className='contador'></span>
                                                <Accordion className="box-accordion" expanded={expanded === 'panel2a'} onChange={handleOpenBox('panel2a')} disabled={seConhecem || isActive}>
                                                    <AccordionSummary
                                                    expandIcon={<ExpandMoreIcon />}
                                                    aria-controls="panel2bh-content"
                                                    id="panel2bh-header"
                                                    className={`${boxState['aquecimentoEquipe'] ? 'finalizada' : ''}`}
                                                    >
                                                    <Typography className={`text-title ${boxState['aquecimentoEquipe'] ? 'finalizada' : ''}`}>Aquecimento da equipe</Typography>
                                                    </AccordionSummary>
                                                    <AccordionDetails className={`${!isOpenAccordion ? 'aberto' : ''}`}>
                                                    <div>
                                                    
                                                        <div className="video-box">

                                                            <iframe className='video'
                                                                    title='Atividade Aquecimento da Equipe'
                                                                    sandbox='allow-same-origin allow-forms allow-popups allow-scripts allow-presentation'
                                                                    src={`https://youtube.com/embed/${youtubeIDAquecimentoEquipe}?autoplay=0`}>
                                                            </iframe>

                                                        </div>

                                                        <div className={`timer-box`}>
                                                            <div className="content-timer">
                                                                <Timer min={timeClock} isActive={isActive} setIsActive={setIsActive} setHasFinised={setHasFinised}></Timer>
                                                            </div>
                                                        </div>

                                                        <Tabs allowScrollButtonsMobile={true} sx={{ '& .MuiTabs-flexContainer': { flexWrap: 'wrap' } }} TabIndicatorProps={{ sx: { display: 'none' } }} value={valueInside} onChange={handleChangeInside} aria-label="basic tabs example" className="tab-box">
                                                            <Tab disabled={isActive} wrapped fullWidth className="text-title tab-etapas" label="Canvas de Aquecimento" {...a22yProps(0)} />
                                                            <Tab disabled={isActive} wrapped fullWidth className="text-title tab-etapas" label="Apresentação Canvas de Aquecimento" {...a22yProps(1)} />

                                                        </Tabs>

                                                        <TabPanelInside value={valueInside} index={0} className="atv-container border">
                                                        

                                                            <h4 className="text-title-inside">
                                                                Preenchimento Canvas de Aquecimento 
                                                            </h4>
                                                            <div className="box-atv">
                                                                Nesta atividade vocês irão trabalhar <strong>individualmente</strong>. Cada integrante da equipe
                                                                deve realizar a confecção do Canvas de Aquecimento, o modelo está disponível no link: <br />
                                                                <a href="https://jamboard.google.com/d/19lkrUINcbUKPrD5X-t3rKilXbVL0wEgzGtvPCeQKxCk/edit?usp=sharing" target="_blank" rel="noopener noreferrer">Clique aqui para abrir o Canvas</a>
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
                                                                Apresentação do Canvas para a equipe
                                                            </h4>
                                                            <div className="box-atv">
                                                                Nesta atividade vocês irão trabalhar em <strong>grupo</strong>. Cada integrante da equipe
                                                                deve realizar a apresentação do Canvas de Aquecimento preenchido na atividade anterior para toda a equipe.
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
                                                            <input checked={boxState['aquecimentoEquipe']} className="checkbox-fin" type="checkbox" name="definicao-papeis" id="definicao-papeis" onChange={() => handleFinalizar('aquecimentoEquipe')} /> Sim
                                                        </div>
                                                    </div>
                                                    </AccordionDetails>
                                                </Accordion>
                                            </div>

                                            <div className={`container-accordion ${expanded === 'panel3a' ? 'contador-open' : ''}`}>
                                                <span className='contador'></span>
                                                <Accordion className="box-accordion" expanded={expanded === 'panel3a'} onChange={handleOpenBox('panel3a')} disabled={isActive}>
                                                    <AccordionSummary
                                                    expandIcon={<ExpandMoreIcon />}
                                                    aria-controls="panel3bh-content"
                                                    id="panel3bh-header"
                                                    className={`${boxState['definicaoPapeis'] ? 'finalizada' : ''}`}
                                                    >
                                                    <Typography className={`text-title ${boxState['definicaoPapeis'] ? 'finalizada' : ''}`}>
                                                        Definição de papéis da equipe 
                                                    </Typography>
                                                    </AccordionSummary>
                                                    <AccordionDetails className={`${!isOpenAccordion ? 'aberto' : ''}`}>

                                                    
                                                        <div className="papeis-etapa">
                                                            Nesta atividade vocês devem realizar a definição de papéis para a equipe, ou seja, irão realizar a escolha de qual integrante
                                                            vai ficar com uma determinada responsabilidade, além de preencher algumas informações sobre a equipe.
                                                            <br />
                                                            <br />

                                                            <div className="video-box">

                                                                <iframe className='video'
                                                                        title='Atividade Definição de Papéis'
                                                                        sandbox='allow-same-origin allow-forms allow-popups allow-scripts allow-presentation'
                                                                        allowFullScreen='allowFullScreen'
                                                                        src={`https://youtube.com/embed/${youtubeIDDefinicaoPapeis}?autoplay=0`}>
                                                                </iframe>

                                                            </div>

                                                            <div className={`timer-box`}>
                                                                <div className="content-timer">
                                                                    <Timer min={timeClock} isActive={isActive} setIsActive={setIsActive} setHasFinised={setHasFinised}></Timer>
                                                                </div>
                                                            </div>

                                                            <Tabs allowScrollButtonsMobile={true} sx={{ '& .MuiTabs-flexContainer': { flexWrap: 'wrap' } }} TabIndicatorProps={{ sx: { display: 'none' } }} value={valueInside} onChange={handleChangeInside} aria-label="basic tabs example" className="tab-box">
                                                                <Tab disabled={isActive} wrapped fullWidth className="text-title tab-etapas" label="Definição de informações da equipe" {...a22yProps(0)} />
                                                                <Tab disabled={isActive} wrapped fullWidth className="text-title tab-etapas" label="Mapeamento do Problema" {...a22yProps(1)} />

                                                            </Tabs>

                                                            <TabPanelInside value={valueInside} index={0} className="atv-container border" >
                                                                <h4 className="text-title-inside">
                                                                    Definição de informações da equipe
                                                                </h4>

                                                                <div className="box-atv">
                                                                    Nesta atividade vocês irão trabalhar em <strong>grupo</strong>. Vocês precisarão preencher algumas informações sobre a equipe,
                                                                    como: o nome escolhido para a equipe e quantos integrantes compõem a equipe.
                                                                    <br />
                                                                    <br />

                                                                    <div className="iniciar-atv">
                                                                        <p>Antes de inciar a atividade lembrem-se que vocês têm <strong>5 minutos</strong> para finalizar a mesma.</p> 
                                                                        <button className={`btn-atv ${isActive ? 'selected' : ''}`} onClick={() => setTimeClock(5)} disabled={isActive}>Iniciar Atividade</button>
                                                                    
                                                                        
                                                                    </div>

                                                                    <div className="papeis">
                                                                        <h4>Favor preencher as informações da equipe abaixo:</h4>

                                                                        <form onSubmit={handleNomeEquipe}>

                                                                            <FormControl fullWidth>
                                                                                <label className="text-papel">Nome da Equipe</label>
                                                                                <TextField disabled={infoPrincipalPreenchida} value={nomeDaEquipe} defaultValue={`${JSON.parse(localStorage.getItem('novaSprint')) !== true && nomeDaEquipe !== ''? nomeDaEquipe : ''}`} onMouseLeave={() => setEquipeExiste(false)} required type={'text'} onChange={(e) => setNomeDaEquipe(e.target.value)} fullWidth  margin="normal" size="small" placeholder="Informe o nome da equipe" variant="outlined" className={`input-text ${equipeExiste ? 'equipeExisteInput' : ''}`} />
                                                                                <div className={`${equipeExiste ? 'equipeExiste' : 'equipeNaoExiste'}`} onMouseLeave={() => setEquipeExiste(false)}>
                                                                                    Nome de Equipe já existe.
                                                                                </div>
                                                                                <label className="text-papel">Quantidade de Integrantes</label>
                                                                                <TextField disabled={infoPrincipalPreenchida} value={quantidadeIntegrantes} defaultValue={`${JSON.parse(localStorage.getItem('novaSprint')) !== true && quantidadeIntegrantes !== 0 ? quantidadeIntegrantes : ''}`}  required onChange={(e) => setQuantidadeIntegrantes(e.target.value)} type={'number'} fullWidth margin="normal" size="small" placeholder="Informe a quantidade de integrantes" variant="outlined" className="input-text" />
                                                                                
                                                                                <Button disabled={atvCompleta1 || infoPrincipalPreenchida} type="submit" className="btn-formulario">Enviar Informações</Button>

                                                                            </FormControl>

                                                                        </form>

                                                                    </div>
                                                                </div>
                                                            </TabPanelInside>


                                                            <TabPanelInside value={valueInside} index={1} className="atv-container border">


                                                                <h4 className="text-title-inside">
                                                                    Definição de representantes da equipe 
                                                                </h4>
                                                                <div className="box-atv">
                                                                    Nesta atividade vocês irão trabalhar em <strong>grupo</strong>. A equipe deve escolher, dentre os integrantes, um facilitador,
                                                                    um definidor, o observador, o entrevistador e o Scrum Master.
                                                                    <br />
                                                                    <br />
                                                                    <div className="iniciar-atv">
                                                                        <p>Antes de inciar a atividade lembrem-se que vocês têm <strong>5 minutos</strong> para finalizar a mesma.</p> 
                                                                        <button className={`btn-atv ${isActive ? 'selected' : ''}`} onClick={() => setTimeClock(5)} disabled={isActive}>Iniciar Atividade</button>
                                                                    
                                                                    </div>
                                                                    <div className="papeis">
                                                                        <h4>Favor preencher os nomes dos representante abaixo:</h4>

                                                                        <form onSubmit={handleInformacaoEquipe}>

                                                                            <FormControl fullWidth>
                                                                                
                                                                                <label className="text-papel" >Facilitador</label>
                                                                                <Popup trigger={<QuestionMarkIcon className="icon-pop"></QuestionMarkIcon>} position="right center">
                                                                                    <div>Responsável por guiar a equipe nas atividades realizadas. Controla o tempo e a próxima atividade.</div>
                                                                                </Popup>
                                                                                <TextField disabled={infoPapeisPreenchida} value={facilitador} defaultValue={`${JSON.parse(localStorage.getItem('novaSprint')) !== true && facilitador !== '' ? facilitador : ''}`} required onChange={(e) => setFacilitador(e.target.value)} fullWidth  margin="normal" size="small" placeholder="Informe o nome do integrante" variant="outlined" className="input-text" />
                                                                                
                                                                                <label className="text-papel">Definidor</label>
                                                                                <Popup trigger={<QuestionMarkIcon className="icon-pop2"></QuestionMarkIcon>} position="right center">
                                                                                    <div>Responsável por realizar as decisões mais importantes de cada atividade.</div>
                                                                                </Popup>
                                                                                <TextField disabled={infoPapeisPreenchida} value={definidor} defaultValue={`${JSON.parse(localStorage.getItem('novaSprint')) !== true && definidor !== '' ? definidor : ''}`} required onChange={(e) => setDefinidor(e.target.value)} fullWidth margin="normal" size="small" placeholder="Informe o nome do integrante" variant="outlined" className="input-text" />
                                                                                
                                                                                <label className="text-papel">Observador</label>
                                                                                <Popup trigger={<QuestionMarkIcon className="icon-pop3"></QuestionMarkIcon>} position="right center">
                                                                                    <div>Responsável por realizar anotações durante as entrevistas.</div>
                                                                                </Popup>
                                                                                <TextField disabled={infoPapeisPreenchida} value={observador}  defaultValue={`${JSON.parse(localStorage.getItem('novaSprint')) !== true && observador !== '' ? observador : ''}`} required onChange={(e) => setObservador(e.target.value)} fullWidth margin="normal" size="small" placeholder="Informe o nome do integrante" variant="outlined" className="input-text"  />

                                                                                <label className="text-papel">Entrevistador</label>
                                                                                <Popup trigger={<QuestionMarkIcon className="icon-pop4"></QuestionMarkIcon>} position="right center">
                                                                                    <div>Responsável por fazer perguntas nas atividades de entrevistas.</div>
                                                                                </Popup>
                                                                                <TextField disabled={infoPapeisPreenchida} value={entrevistador} defaultValue={`${JSON.parse(localStorage.getItem('novaSprint')) !== true && entrevistador !== '' ? entrevistador : ''}`} required onChange={(e) => setEntrevistador(e.target.value)} fullWidth margin="normal" size="small" placeholder="Informe o nome do integrante" variant="outlined" className="input-text"  />

                                                                                <label className="text-papel">Scrum Master</label>
                                                                                <Popup trigger={<QuestionMarkIcon className="icon-pop5"></QuestionMarkIcon>} position="right center">
                                                                                    <div>Responsável por cobrar as atividades de planejamento, reuniões e controla a participação do definidor/cliente/dono do produto.</div>
                                                                                </Popup>
                                                                                <TextField disabled={infoPapeisPreenchida} value={scrumMaster} defaultValue={`${JSON.parse(localStorage.getItem('novaSprint')) !== true && scrumMaster !== '' ? scrumMaster : ''}`} required onChange={(e) => setScrumMaster(e.target.value)} fullWidth margin="normal" size="small" placeholder="Informe o nome do integrante" variant="outlined" className="input-text"  />

                                                                                <Button disabled={atvCompleta2 || infoPapeisPreenchida} type="submit" className="btn-formulario">Enviar Informações</Button>
                                                                            </FormControl>

                                                                        </form>

                                                                    
                                                                    </div>
                                                                    
                                                                </div>
                                                            </TabPanelInside>
                                                        
                                                            <div className="finalizarAtv">
                                                                <label>Finalizar Atividade?</label>
                                                                <input checked={boxState['definicaoPapeis']} className="checkbox-fin" type="checkbox" name="definicao-papeis" id="definicao-papeis" onChange={() => handleFinalizar('definicaoPapeis')} /> Sim
                                                            </div>
                                                        
                                                        </div>
                                                    </AccordionDetails>
                                                </Accordion>

                                            </div>
                                        </TabPanel>

                                        <TabPanel value={activeStep} index={1} className="mapeamento-problema">
                                            <div className="info-etapa-text">

                                                <h2 className="text-title-etapa">Mapeamento do Problema</h2>
                                                <h4 className="text-subtitle">
                                                    Nesta etapa vocês irão realizar atividades que permitem que vocês possam iniciar a preparação do problema/ideia a ser solucionado. 
                                                    Ou seja, vocês irão fazer atividades que os permitam fazer pesquisas individuais e em grupo, 
                                                    além de incentivar momentos de discussões entre vocês para que a escolha da da ideia possa ser feita. <br /> <strong>Lembrem-se</strong>, cada atividade possui um tempo estimado para serem realizadas. O tempo é disponibilizado em 
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
                                                    className={`${boxState['primeiraPesquisa'] ? 'finalizada' : ''}`}>
                                                    <Typography className={`text-title ${boxState['primeiraPesquisa'] ? 'finalizada' : ''}`}>
                                                        Primeira Pesquisa individual
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
                                                                Pesquisa individual sobre possíveis temas a serem desenvolvidos 
                                                            </h4>
                                                            <div className="box-atv">
                                                                Nesta atividade vocês deverão trabalhar <strong>individualmente</strong>. Cada integrante da equipe
                                                                deve realizar a pesquisa de possíveis soluções/temas em qualquer área, que você deseje que a equipe desenvolva/mapeie alguma solução.

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
                                                            <input checked={boxState['primeiraPesquisa']} className="checkbox-fin" type="checkbox" name="definicao-papeis" id="definicao-papeis" onChange={() => handleFinalizar('primeiraPesquisa')} /> Sim
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
                                                    className={`${boxState['definicaoProblema'] ? 'finalizada' : ''}`}
                                                    >
                                                    <Typography className={`text-title ${boxState['definicaoProblema'] ? 'finalizada' : ''}`}>Discussão para definição do problema</Typography>
                                                    </AccordionSummary>
                                                    <AccordionDetails className={`${!isOpenAccordion ? 'aberto' : ''}`}>
                                                        <div className={`timer-box`}>
                                                            <div className="content-timer">
                                                                <Timer min={timeClock} isActive={isActive} setIsActive={setIsActive} setHasFinised={setHasFinised}></Timer>
                                                            </div>
                                                        </div>
                                                        <Tabs allowScrollButtonsMobile={true} sx={{ '& .MuiTabs-flexContainer': { flexWrap: 'wrap' } }} TabIndicatorProps={{ sx: { display: 'none' } }} value={valueInside} onChange={handleChangeInside} aria-label="basic tabs example" className="tab-box">
                                                            <Tab disabled={isActive} wrapped fullWidth className="text-title tab-etapas" label="Primeira discussão" {...a22yProps(0)} />
                                                            <Tab disabled={isActive} wrapped fullWidth className="text-title tab-etapas" label="Votação nos temas" {...a22yProps(1)} />
                                                        </Tabs>

                                                        <TabPanelInside value={valueInside} index={0} className="atv-container border">
                                                        

                                                            <h4 className="text-title-inside">
                                                                Discussão para definição do(s) problema(s) correlato(s) sobre o(s) tema(s) encontrado(s) de interesse da equipe
                                                            </h4>
                                                            <div className="box-atv">
                                                                Nesta atividade vocês deverão trabalhar em <strong>grupo</strong>. Cada integrante da equipe
                                                                deve realizar a apresentação dos temas encontrados na atividade anterior para a equipe. A apresentação pode ser rápida, apenas para que os
                                                                integrantes tenham uma ideia geral do tema para que possa facilitar na hora de realizar a votação nos temas de interesse.
                                                                                                    
                                                                <br />
                                                                <br />

                                                                <div className="iniciar-atv">
                                                                    <p>Antes de inciar a atividade lembrem-se que vocês têm <strong>10 minutos</strong> para finalizar a mesma.</p> 
                                                                    <button className={`btn-atv ${isActive ? 'selected' : ''}`} onClick={() => setTimeClock(10)} disabled={isActive}>Iniciar Atividade</button>

                                                                </div>
                                                                
                                                            </div>
                                                        </TabPanelInside>

                                                        <TabPanelInside value={valueInside} index={1} className="atv-container border">
                                                        

                                                            <h4 className="text-title-inside">
                                                                Votação nos temas de interesse da equipe
                                                            </h4>
                                                            <div className="box-atv">
                                                                Nesta atividade vocês deverão trabalhar em <strong>grupo</strong>. Após a apresentação dos temas realizados pelos integrantes da equipe
                                                                na atividade anterior, cada integrante da equipe irá realizar a votação nos temas de seu interesse. <br />
                                                                Cada integrante tem <strong>três</strong> votos para gastar, ou seja, ele deve votar três vezes, seja em apenas um tema ou em mais.
                                                                                            
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
                                                            <input checked={boxState['definicaoProblema']} className="checkbox-fin" type="checkbox" name="definicao-papeis" id="definicao-papeis" onChange={() => handleFinalizar('definicaoProblema')} /> Sim
                                                        </div>
                                                    </AccordionDetails>

                                            
                                                </Accordion>
                                            </div>

                                            <div className={`container-accordion ${expanded === 'panel3b' ? 'contador-open' : ''}`}>
                                                <span className='contador'></span>
                                                <Accordion className="box-accordion" expanded={expanded === 'panel3b'} onChange={handleOpenBox('panel3b')} disabled={isActive}>
                                                    <AccordionSummary
                                                    expandIcon={<ExpandMoreIcon />}
                                                    aria-controls="panel3bh-content"
                                                    id="panel3bh-header"
                                                    className={`${boxState['segundaPesquisa'] ? 'finalizada' : ''}`}
                                                    >
                                                    <Typography className={`text-title ${boxState['segundaPesquisa'] ? 'finalizada' : ''}`}>
                                                        Segunda Pesquisa individual
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
                                                                Pesquisa individual sobre o(s) problema(s) escolhido(s) pela equipe
                                                            </h4>
                                                            <div className="box-atv">
                                                                Nesta atividade vocês deverão trabalhar <strong>individualmente</strong>. Cada integrante da equipe
                                                                deve realizar pesquisas sobre os problemas que foram selecionados pela equipe na atividade anterior. A pesquisa pode ter como base
                                                                soluções já existem no mercado.                                       
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
                                                            <input checked={boxState['segundaPesquisa']} className="checkbox-fin" type="checkbox" name="definicao-papeis" id="definicao-papeis" onChange={() => handleFinalizar('segundaPesquisa')} /> Sim
                                                        </div>

                                                    </AccordionDetails>

                                                
                                                </Accordion>

                                            </div>

                                            <div className={`container-accordion ${expanded === 'panel4b' ? 'contador-open' : ''}`}>
                                                <span className='contador'></span>
                                                <Accordion className="box-accordion" expanded={expanded === 'panel4b'} onChange={handleOpenBox('panel4b')} disabled={isActive}>
                                                    <AccordionSummary
                                                    expandIcon={<ExpandMoreIcon />}
                                                    aria-controls="panel4bh-content"
                                                    id="panel4bh-header"
                                                    className={`${boxState['definicaoEquipeProblema'] ? 'finalizada' : ''}`}
                                                    >
                                                    <Typography className={`text-title ${boxState['definicaoEquipeProblema'] ? 'finalizada' : ''}`}>
                                                        Discussão em equipe para definição do problema/ideia 
                                                    </Typography>
                                                    </AccordionSummary>
                                                    <AccordionDetails className={`${!isOpenAccordion ? 'aberto' : ''}`}>
                                                        <div className={`timer-box`}>
                                                            <div className="content-timer">
                                                                <Timer min={timeClock} isActive={isActive} setIsActive={setIsActive} setHasFinised={setHasFinised}></Timer>
                                                            </div>
                                                        </div>
                                                        <Tabs allowScrollButtonsMobile={true} sx={{ '& .MuiTabs-flexContainer': { flexWrap: 'wrap' } }} TabIndicatorProps={{ sx: { display: 'none' } }} value={valueInside} onChange={handleChangeInside} aria-label="basic tabs example" className="tab-box">
                                                            <Tab disabled={isActive} wrapped fullWidth className="text-title tab-etapas" label="Segunda Discussão" {...a22yProps(0)} />
                                                            <Tab disabled={isActive} wrapped fullWidth className="text-title tab-etapas" label="Votação nas Soluções" {...a22yProps(1)} />
                                                        </Tabs>

                                                        <TabPanelInside value={valueInside} index={0} className="atv-container border">
                                                        

                                                            <h4 className="text-title-inside">
                                                                Discussão em equipe para definição do problema/ideia a ser implementado
                                                            </h4>
                                                            <div className="box-atv">
                                                                Nesta atividade vocês deverão trabalhar em <strong>grupo</strong>. Cada integrante da equipe
                                                                deve realizar a apresentação das soluções encontradas na atividade anterior para a equipe. A apresentação pode ser rápida, apenas para que os integrantes tenham uma ideia geral sobre a solução/ideia encontrada para que possa facilitar na hora de realizar a votação 
                                                                nos problemas/ideias de interesse da equipe.
                                                                                                    
                                                                <br />
                                                                <br />
                                                                <div className="iniciar-atv">
                                                                    <p>Antes de inciar a atividade lembrem-se que vocês têm <strong>10 minutos</strong> para finalizar a mesma.</p> 
                                                                    <button className={`btn-atv ${isActive ? 'selected' : ''}`} onClick={() => setTimeClock(10)} disabled={isActive}>Iniciar Atividade</button>
                                                                    
                                                                
                                                                        
                                                                </div>
                                                                
                                                            </div>
                                                        </TabPanelInside>

                                                        <TabPanelInside value={valueInside} index={1} className="atv-container border">
                                                        

                                                            <h4 className="text-title-inside">
                                                                Votação nos temas de interesse da equipe
                                                            </h4>
                                                            <div className="box-atv">
                                                                Nesta atividade vocês deverão trabalhar em <strong>grupo</strong>. Após a apresentação das soluções encontradas pelos integrantes da equipe
                                                                na atividade anterior, cada integrante da equipe irá realizar a votação na solução de seu interesse, que mais gostou. <br />
                                                                Cada integrante tem <strong>três</strong> votos para gastar, ou seja, ele deve votar três vezes, seja em apenas uma solução ou em mais. Para que a votação
                                                                não acabe empatada ou sem solução, o <strong>Definidor</strong> tem seu papel posto em prova nessa votação, por ele ser responsável por tomar as decisões de 
                                                                maior importância na equipe, seu voto é duplicado nessa  votação.
                                                                                            
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
                                                            <input checked={boxState['definicaoEquipeProblema']} className="checkbox-fin" type="checkbox" name="definicao-papeis" id="definicao-papeis" onChange={() => handleFinalizar('definicaoEquipeProblema')} /> Sim
                                                        </div>
                                                    </AccordionDetails>

                                                </Accordion>
                                            </div>

                                        </TabPanel>

                                        <TabPanel value={activeStep} index={2} className="mentoria">

                                            <div className="info-etapa-text">

                                                <h2 className="text-title-etapa">Mentoria</h2>
                                                <h4 className="text-subtitle">
                                                    Nesta etapa vocês irão realizar o agendamento de uma reunião com o mentor responsável pela sua equipe. Esta etapa tem como 
                                                    objetivo permitir que vocês iniciem o processo de validação da ideia, pois irá conter atividades que incentivam a 
                                                    apresentação ao mentor e com isso gerar possíveis melhorias à serem aplicadas na solução/problema mapeado. 
                                                    <br /> <strong>Lembrem-se</strong>, cada atividade possui um tempo estimado para serem realizadas. O tempo é disponibilizado em 
                                                    cada atividade e para acompanhar esse tempo lembre sempre de olhar para o relógio.
                                                </h4>
                                            </div>

                                            <div className={`container-accordion ${expanded === 'panel1c' ? 'contador-open' : ''}`}>
                                                <span className='contador'></span>
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
                                                                Apresentação da equipe e do problema/ideia escolhido para o mentor
                                                            </h4>
                                                            <div className="box-atv">
                                                                Nesta atividade vocês deverão trabalhar em <strong>grupo</strong>. O grupo deve realizar a apresentação do seu grupo (informando o nome da equipe, 
                                                                seus integrantes, quantos são os integrantes, além de informar o papel de cada um) para o mentor. A apresentação pode ser rápida, 
                                                                apenas para que o mentor saiba qual solução sua equipe irá desenvolver e mostrar quais são as pessoas que compõe a equipe. Após a equipe
                                                                realizar a apresentação, o grupo pode realizar a primeira validação da ideia com o mentor, fazendo perguntas sobre o tema escolhido para desenvolver, como:
                                                                se é uma boa escolha ou modos de se iniciar o desenvolvimento.
                                                                <br />
                                                                <br />

                                                                A equipe pode usar o modelo abaixo como exemplo de apresentação ou criar um próprio (mas lembre-se de que a apresentação deve
                                                                conter as informações pedidas na atividade):
                                                                <br />
                                                                <a href="https://docs.google.com/presentation/d/1gS9qICbTL7AoWgWC064GOYiVJUP7zees_wwk4gmG_8g/edit?usp=sharing" target="_blank">Clique aqui para abrir o modelo</a>
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
                                                                Nesta atividade vocês deverão trabalhar em <strong>grupo</strong>. Após a apresentação da solução definida para o mentor, o grupo terá um tempo para se 
                                                                preparar para a próxima apresentação, que será feita para a turma. 
                                                                
                                                                                            
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
                                                                seus integrantes, quantos são os integrantes, além de informar o papel de cada um) para a turma. A apresentação pode ser rápida, 
                                                                apenas para que a turma conheça a solução que sua equipe irá desenvolver e mostrar quais são os integrantes da equipe.
                                                                                            
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

                                        <TabPanel value={activeStep} index={3} className="validacao-problema">

                                            <div className="info-etapa-text">

                                                <h2 className="text-title-etapa">Validação do Problema</h2>
                                                <h4 className="text-subtitle">
                                                    Nesta etapa vocês irão realizar a validação do problema/solução que foi mapeado nas etapas anteriores. 
                                                    Ao iniciar esta etapa, vocês irão utilizar as respostas e feedbacks obtidos da reunião com o mentor como possíveis melhorias. 
                                                    A etapa possui atividades para incentivar momentos de discussões entre vocês sobre o problema mapeado
                                                    e se é houver melhorias e aplica-las na solução.<br /> <strong>Lembrem-se</strong>, cada atividade possui um tempo estimado para serem realizadas. O tempo é disponibilizado em 
                                                    cada atividade e para acompanhar esse tempo lembre sempre de olhar para o relógio.
                                                </h4>
                                            </div>

                                            <div className={`container-accordion ${expanded === 'panel1d' ? 'contador-open' : ''}`}>
                                                <span className='contador'></span>
                                                <Accordion className="box-accordion" expanded={expanded === 'panel1d'} onChange={handleOpenBox('panel1d')} disabled={isActive}>
                                                    <AccordionSummary
                                                    expandIcon={<ExpandMoreIcon />}
                                                    aria-controls="panel2bh-content"
                                                    id="panel2bh-header"
                                                    className={`${boxState['pesquisaRapida'] ? 'finalizada' : ''}`}
                                                    >
                                                    <Typography className={`text-title ${boxState['pesquisaRapida'] ? 'finalizada' : ''}`}>Pesquisa rápida sobre o problema/ideia</Typography>
                                                    </AccordionSummary>
                                                    <AccordionDetails className={`${!isOpenAccordion ? 'aberto' : ''}`}>
                                                        <div className={`timer-box`}>
                                                            <div className="content-timer">
                                                                <Timer min={timeClock} isActive={isActive} setIsActive={setIsActive} setHasFinised={setHasFinised}></Timer>
                                                            </div>
                                                        </div>

                                                        <TabPanelInside value={valueInside} index={0} className="atv-containerOnly">

                                                            <h4 className="text-title-inside">
                                                                Pesquisa rápida com conhecidos sobre o problema/ideia definido nas atividades anteriores
                                                            </h4>
                                                            <div className="box-atv">
                                                                Nesta atividade vocês deverão trabalhar em <strong>grupo</strong>. O grupo deve realizar uma rápida apresentação e pesquisa sobre a solução com conhecidos, 
                                                                podendo ser apresentados em formulários para poder recolher a percepção de pessoas de fora do grupo sobre a solução escolhida. 
                                                                O formulário pode ser curto para que seja fácil de recolher as repostas, fazendo perguntas sobre o tema escolhido para desenvolver, , se é viável/interessante ou não
                                                                o desenvolvimento da solução.
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
                                                            <input checked={boxState['pesquisaRapida']} className="checkbox-fin" type="checkbox" name="definicao-papeis" id="definicao-papeis" onChange={() => handleFinalizar('pesquisaRapida')} /> Sim
                                                        </div>
                                                    </AccordionDetails>
                                                    
                                                </Accordion>
                                            </div>

                                            <div  className={`container-accordion ${expanded === 'panel2d' ? 'contador-open' : ''}`}>
                                                <span className='contador'></span>
                                                <Accordion className="box-accordion" expanded={expanded === 'panel2d'} onChange={handleOpenBox('panel2d')} disabled={isActive}>
                                                    <AccordionSummary
                                                    expandIcon={<ExpandMoreIcon />}
                                                    aria-controls="panel3bh-content"
                                                    id="panel3bh-header"
                                                    className={`${boxState['discussaoValidacao'] ? 'finalizada' : ''}`}
                                                    >
                                                    <Typography className={`text-title ${boxState['discussaoValidacao'] ? 'finalizada' : ''}`}>
                                                        Discussão
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
                                                                Discussão em equipe sobre os resultados obtidos da validação da ideia/solução
                                                            </h4>
                                                            <div className="box-atv">
                                                                Nesta atividade vocês deverão trabalhar em <strong>grupo</strong>. O grupo deve realizar a análise da respostas obtidas dos formulários e pesquisas aplicadas
                                                                na atividade anterior. Nesta atividade o interessante é que o grupo tenha recolhido o máximo de feedback possível sobre a ideia para que se 
                                                                houver ajustes os mesmos sejam mapeados e definidos, e assim, possam ser aplicados nas próximas etapas. Com a análise é possível que a 
                                                                equipe entenda a percepção de pessoas de fora do grupo sobre a solução se ela é interessante de ser desenvolvida ou se é necessário realizar mais pesquisas.
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
                                                            <input checked={boxState['discussaoValidacao']} className="checkbox-fin" type="checkbox" name="definicao-papeis" id="definicao-papeis" onChange={() => handleFinalizar('discussaoValidacao')} /> Sim
                                                        </div>
                                                    </AccordionDetails>
                                                
                                                </Accordion>
                                            </div>

                                            

                                            

                                        </TabPanel>

                                        <TabPanel value={activeStep} index={4} className="revisao-processo">

                                            <div className="info-etapa-text">

                                                <h2 className="text-title-etapa">Revisão do Processo</h2>
                                                <h4 className="text-subtitle">
                                                    Nesta etapa vocês irão realizar a revisão do processo. Sua equipe irá realizar atividades que disponibilizam momentos para que vocês
                                                    possam analisar tudo que foi feito nas atividades das etapas anteriores e se necessário realize as melhorias necessárias para as próximas etapas.
                                                    <br /> <strong>Lembrem-se</strong>, cada atividade possui um tempo estimado para serem realizadas. O tempo é disponibilizado em cada atividade 
                                                    e para acompanhar esse tempo lembre sempre de olhar para o relógio.
                                                </h4>
                                            </div>

                                            <div className={`container-accordion ${expanded === 'panel1e' ? 'contador-open' : ''}`}>
                                                <span className='contador'></span>
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
                                                                        <TextField disabled={infoRetrospectivaPreenchida} value={linkRetrospectiva} defaultValue={`${JSON.parse(localStorage.getItem('novaSprint')) !== true && linkRetrospectiva !== '' ? linkRetrospectiva : ''}`} required type={'text'} onChange={(e) => setLinkRetrospectiva(e.target.value)} fullWidth  margin="normal" size="small" placeholder="Informe o link da restrospectiva" variant="outlined" className="input-text" />
                                                                        <Button disabled={atvCompleta3 || infoRetrospectivaPreenchida} type="submit" className="btn-formulario">Enviar Informações</Button>
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

                                        <TabPanel value={activeStep} index={5} className="metodos-avaliacao">
                                            <div className="info-etapa-text">

                                                <h2 className="text-title-etapa">Avaliação</h2>
                                                <h4 className="text-subtitle">
                                                    Nesta etapa vocês irão realizar a avaliação das atividades realizadas. Esta etapa possui um link para uma avaliação
                                                    que deve ser respondida de forma individual. Lembre-se o questionário não é obrigatório, contudo sua resposta pode ajudar a
                                                    melhorar as etapas, as atividades realizadas e até a aplicação.
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
                                                                
                                                                <a href="https://docs.google.com/forms/d/e/1FAIpQLSfZSKR03O2QCmltpj-3d85kmdi9N35tQSWuW7j8tdrf5NxkKA/viewform?embedded=true" target={'_blank'}>
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
                                            <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
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