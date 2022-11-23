import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { atividadesEtapa as instance } from '../../services/api';

import { useNavigate } from 'react-router-dom'

import { AuthContext } from "../../contexts/Auth/AuthContext";

import { Timer } from '../../shared/components/Timer'
import { MenuLateral } from "../../shared/components/MenuLateral";
import { FooterAtv } from '../../shared/components/FooterAtv';
import { AtividadeBox } from '../../shared/components/AtividadeBox';

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { FormControl, TextField } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

import { Container } from './styles'

import notification from '../../shared/assets/notification.wav'

export const Etapa3 = (props) => {

    const navigate = useNavigate();

    const auth = useContext(AuthContext)

    const [activeStep, setActiveStep] = React.useState(0);
    const [completed, setCompleted] = React.useState({});
    const [isActive, setIsActive] = useState(false);
    const [hasFinised, setHasFinised] = useState(false);
    const [timeClock, setTimeClock] = useState(0)
    const [linkRetrospectiva, setLinkRetrospectiva] = useState("")

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

    const totalSteps = () => {
        return titleAtividadesEtapa.length;
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
                titleAtividadesEtapa.findIndex((step, i) => !(i in completed))
                : activeStep + 1;
        setActiveStep(newActiveStep);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleDictCompleted = (indice=activeStep) => {
        const newCompleted = completed;
        newCompleted[indice] = true;
        setCompleted(newCompleted);
    }

    const handleComplete = (tituloAtividade, informacaoExtra="") => {
        handleDictCompleted(activeStep)
        handleNext();
        handleConclusaoAtividades(auth.user.username, tituloAtividade)
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
                // linkRetrospectiva1: data.linkRetrospectiva1,
                // linkRetrospectiva2: data.linkRetrospectiva2,
                // linkRetrospectiva3: data.linkRetrospectiva3 ? data.linkRetrospectiva3 : linkRetrospectiva,
                // linkRetrospectiva4: data.linkRetrospectiva4 ? data.linkRetrospectiva4 : "",
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
                const etapaAtualAt = 3
                const id_atividade = 51
                const { data } = await axios.get(`/api/equipes/${auth.user.username}`)
                const infoExtra = await instance.get(`/historicoAtividades/?id_equipe=${data.id}&etapaAtividade=${etapaAtualAt}&id_atividade=${id_atividade}`)
                 
                if(JSON.parse(localStorage.getItem('novaSprint')) !== true) {
                    if(infoExtra.data.length !== 0) {
                        setLinkRetrospectiva(infoExtra.data[0].informacaoExtra)
                        if(infoExtra.data[0].informacaoExtra) {
                            if (infoExtra.data[0].informacaoExtra.length !== 0) {
                                setInfoRetrospectivaPreenchida(true)
                            }
                        }
                    }
                    
                }
            } 

        }
        handleInfoPreenchida()
       

    }, [atvCompleta])

    const [atividadeCompleted, setAtividadeCompleted] = useState([])
    const [listaAtividadeCompleted, setListaAtividadeCompleted] = useState([])

    const [atividadesFoiFinalizada, setAtividadesFoiFinalizada] = useState(false)

    const etapaAtividadePertence = 3
    const handleAtividadesConcluidas = async (nomeEquipe) => {

        const infoEquipe = await axios.get(`api/equipes/${nomeEquipe}`)
        const historicoAtiv = await instance.get(`historicoAtividades/?id_equipe=${infoEquipe.data.id}&etapaAtividade=${etapaAtividadePertence}`)
        setAtividadeCompleted(historicoAtiv.data)
        setListaAtividadeCompleted(infoEquipe.data.atividades)
        setAtividadesFoiFinalizada(true)
    }

    
    useEffect(() => {
        const handleAtividadesPertenceEtapa = async () => {
            let lstAtividadePertencente = []
            for(var i = 0; i < atividadeCompleted.length; i ++) {
                const infoAtividade = await instance.get(`/atividades/${atividadeCompleted[i].id_atividade}/`)
                if(infoAtividade.data.etapaPertencente === 3) {
                    lstAtividadePertencente.push(atividadeCompleted[i])
                }
            }
        }
        handleAtividadesPertenceEtapa()
        atividadeCompleted.sort(function(a, b){return a - b}).forEach((atividadeConcluida, i) => {
            handleDictCompleted(i)
            setActiveStep(i+1)
        })
        
    }, [atividadesFoiFinalizada])

    const [atividadesAntesLogin, setAtividadesAntesLogin] = useState([])

    const handleConclusaoAtividades = async (nomeEquipe, tituloAtividade, informacaoExtra=linkRetrospectiva) => {

        const infoEquipe = await axios.get(`api/equipes/${nomeEquipe}`)
        const etapa = 3
        const infoAtividade = await instance.get(`atividades/?etapaPertencente=${etapa}&tituloAtividade=${tituloAtividade}`)

        let idEquipe = infoEquipe.data.id
        let idAtividade = infoAtividade.data[0].id_atividade
        
        instance.post('historicoAtividades/', {
            id_atividade: idAtividade,
            id_equipe: idEquipe,
            informacaoExtra: informacaoExtra,
            etapaAtividade: 3,
        }).catch((err) => console.log(err.response.data.non_field_errors[0], idAtividade))
    }

    useEffect(() => {
        const handleAtividadesConcluidasAntesLogin = async () => {
            if(auth.user) {
                if(atividadesAntesLogin.length !== 0) {
                    for(var i = 0; i < atividadesAntesLogin.length; i++) {

                        const infoEquipe = await axios.get(`api/equipes/${auth.user.username}`)
                        const infoAtividade = await instance.get(`atividades/?tituloAtividade=${atividadesAntesLogin[i].id_atividade}`)
            
                        let idEquipe = infoEquipe.data.id
                        let idAtividade = infoAtividade.data[0].id_atividade
                        
                        if(listaAtividadeCompleted.includes(idAtividade)) {
                            atividadesAntesLogin.splice(i,1)
                        } else {
                            instance.post('historicoAtividades/', {
                                id_atividade: idAtividade,
                                id_equipe: idEquipe,
                                informacaoExtra: linkRetrospectiva,
                                etapaAtividade: 3,
                            }).catch((err) => console.log(err.response.data.non_field_errors[0], idAtividade))
                        }
                        
                        
                    }
                }
            }
        }
      
        handleAtividadesConcluidasAntesLogin()
        
    }, [auth.user, atividadesAntesLogin])

    useEffect(() => {
        if(auth.user) {
            handleAtividadesConcluidas(auth.user.username)
        }
    }, [])


    

    const [acabouAtv, setAcabouAtv] = useState(false)
    const [tempoAtvAtual, setTempoAtvAtual] = useState(0)
    const [tempoAtvAtualEstimado, setTempoAtvAtualEstimado] = useState(0)

    const handleTempoEstimado = (time) => {
        setTempoAtvAtualEstimado(time * 60)
        setTimeClock(time)
    }

    const [pathName, setPathName] = useState("")
    
    useEffect(() => {
        const pathName = window.location.pathname
        setPathName(pathName)
    }, [])

    const [atividadesEtapa, setAtividadesEtapa] = useState([])
    const [titleAtividadesEtapa, setTitleAtividadesEtapa] = useState([])

    const sequenciaEtapa = 2
    useEffect(() => {

        const loadAtividades = async () => {
            const { data: etapaAtualAtv } = await instance.get(`etapas/?ordering=proxima`)
            const idEtapaAtual = etapaAtualAtv[sequenciaEtapa].id_etapa

            const { data } = await instance.get(`atividades/?ordering=proxima&etapaPertencente=${idEtapaAtual}`)
            setAtividadesEtapa(data)
        }

        loadAtividades()
    }, [])

    useEffect(() => {

        let lst = []
        const handleTitleAtividadesApi = () => {

            atividadesEtapa.forEach(atividade => {
                
                if(atividade.tituloAtividade !== '') {
                    lst.push(atividade.tituloAtividade)
                } else {
                    lst.push(atividade.titulo)
                }
                  
                
            })
        }
        handleTitleAtividadesApi()
        setTitleAtividadesEtapa(lst)
    }, [atividadesEtapa])

    return (
            <Container>
                <MenuLateral completed={completed} isActive={isActive} etapaAtual={'3'} pathname={pathName} activeStep={activeStep} setActiveStep={setActiveStep} tempoEstimado={tempoAtvAtualEstimado} tempoRestante={tempoAtvAtual} atvsTotais={titleAtividadesEtapa} completedAtv={completedSteps} atividades={titleAtividadesEtapa} nomeEquipe={auth.user.username}>
                    <div style={{ height: '100%', marginBottom: '85px' }}>
                        {atividadesEtapa.map((item, i) => (
                            <AtividadeBox setLinkRetrospectiva={setLinkRetrospectiva} etapaAtual={'3'} atvCompleta={atvCompleta} linkRetrospectiva={linkRetrospectiva} infoRetrospectivaPreenchida={infoRetrospectivaPreenchida} handleInformacaoEquipe={handleInformacaoEquipe}  isActive={isActive} activeStep={activeStep} item={item} i={i} handleTempoEstimado={handleTempoEstimado}>
                                <div className={`timer-box ${width < 600 ? 'mobile-timer' : 'destkop-timer'}`}>
                                    <div className="content-timer">
                                        <Timer setTempoAtvAtual={setTempoAtvAtual} min={timeClock} isActive={isActive} setIsActive={setIsActive} setHasFinised={setHasFinised} />
                                    </div>
                                </div>
                            </AtividadeBox>
                        ))}
                        {allStepsCompleted() ?
                            <div className='bloco-atvFinalizada'>
                                {atividadesEtapa.length !== 0 ? 
                                <Typography sx={{ mt: 2, mb: 1, fontWeight: 700  }}>
                                    Todas as atividades foram completadas. Vocês podem seguir para a próxima etapa ou recomeçar as atividades.
                                </Typography> : <CircularProgress></CircularProgress>}
                            </div> : null
                        }
                    </div>
                </MenuLateral>
                <FooterAtv handleConclusaoAtividades={handleConclusaoAtividades} setAcabouAtv={setAcabouAtv} allStepsCompleted={allStepsCompleted} handleNextEtapa={handleNextEtapa} handleReset={handleReset} completedSteps={completedSteps} totalSteps={totalSteps} width={width} activeStep={activeStep} isActive={isActive} handleBack={handleBack} handleNext={handleNext} steps={titleAtividadesEtapa} completed={completed} handleComplete={handleComplete} disabled={isActive}></FooterAtv>
            </Container>
        )
}