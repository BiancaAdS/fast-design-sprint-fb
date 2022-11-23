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

import CircularProgress from '@mui/material/CircularProgress';

import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

import { FormControl, TextField } from '@mui/material';

import QuestionMarkIcon from '@mui/icons-material/QuestionMark';

import { Container } from './styles'

import notification from '../../shared/assets/notification.wav'


export const Etapa1 = (props) => {

    const navigate = useNavigate();

    const auth = useContext(AuthContext)

    const [activeStep, setActiveStep] = React.useState(0);
    const [completed, setCompleted] = React.useState({});
    const [isActive, setIsActive] = useState(false);

    const [hasFinised, setHasFinised] = useState(false);
    const [timeClock, setTimeClock] = useState(0)

    const [facilitador, setFacilitador] = useState("")
    const [definidor, setDefinidor] = useState("")
    const [observador, setObservador] = useState("")
    const [entrevistador, setEntrevistador] = useState("")
    const [scrumMaster, setScrumMaster] = useState("")
    const [nomeDaEquipe, setNomeDaEquipe] = useState(auth.user ? auth.user.username : "")
    const [quantidadeIntegrantes, setQuantidadeIntegrantes] = useState(0)
    const qualEtapaFinalizada = 'etapa1'

    const boxInitial = JSON.parse(localStorage.getItem('boxState'))

    const [boxState, setBoxState] = useState(boxInitial ? boxInitial : {
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

    const [youtubeIDSeparacaoEquipe] = useState('me73nXuSIJI')
    const [youtubeIDAquecimentoEquipe] = useState('I0Oq3saF_JU')

    const [youtubeIDDefinicaoPapeis] = useState('6xAvGshgwjI')

    const [atvCompleta1, setAtvCompleta1] = useState(false)
    const [atvCompleta2, setAtvCompleta2] = useState(false)
    const [atvCompleta3, setAtvCompleta3] = useState(false)

    useEffect(() => {
        const nova = localStorage.getItem('novaSprint')
        if (JSON.parse(nova) === true) {
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
        localStorage.setItem('boxState', JSON.stringify(boxState))
    }, [boxState])

    useEffect(() => {

        if (timeClock !== 0) {
            startCountdown()
        }

        if (!isActive && timeClock !== 0) {
            setTimeClock(0)
        }

    }, [timeClock, isActive])

    useEffect(() => {

        if (hasFinised) {
            startNewChallenge()
            setHasFinised(false)
        }
    }, [hasFinised])

    useEffect(() => {
        Notification.requestPermission();
    }, []);

    useEffect(() => {

        var count = 0

        for (var elem in boxState) {
            if (boxState[elem]) {
                count++
            }
        }

    }, [boxState])

    const startCountdown = () => {
        setIsActive(true);
    }

    const startNewChallenge = () => {
        const audio = new Audio(notification);
        audio.load();
        if (Notification.permission == 'granted') {
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
        handleConclusaoAtividades(nomeDaEquipe, tituloAtividade)
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

        if (existe.data.authenticate) {
            return true
        } else {
            return false
        }
    }

    const [equipeExiste, setEquipeExiste] = useState(false)
    
    const handleNomeEquipe = async (e) => {
        e.preventDefault()

        const equipeJaExiste = await handleEquipeExiste(nomeDaEquipe)

        if (equipeJaExiste) {
            setEquipeExiste(true)
        } else {
            axios.post('/api/create-equipe', {
                nomeDaEquipe: nomeDaEquipe,
                quantidadeIntegrantes: quantidadeIntegrantes,
                definidor: definidor,
                facilitador: facilitador,
                observador: observador,
                entrevistador: entrevistador,
                scrumMaster: scrumMaster,
                etapaFinalizada: '',
            })
            setEquipeExiste(false)

            if (!isLogged) {
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

        if (Object.keys(data).length !== 0) {
            axios.post('/api/create-equipe', {
                nomeDaEquipe: data.nomeDaEquipe ? data.nomeDaEquipe : nomeDaEquipe,
                quantidadeIntegrantes: data.quantidadeIntegrantes ? data.quantidadeIntegrantes : quantidadeIntegrantes,
                definidor: data.definidor ? data.definidor : definidor,
                facilitador: data.facilitador ? data.facilitador : facilitador,
                observador: data.observador ? data.observador : observador,
                entrevistador: data.entrevistador ? data.entrevistador : entrevistador,
                scrumMaster: data.scrumMaster ? data.scrumMaster : scrumMaster,
                etapaFinalizada: data.qualEtapaFinalizada ? data.qualEtapaFinalizada : qualEtapaFinalizada
            })
        }
        handleFinalizarAtividade2()
        handleFinalizarAtividade3()
        if (carregar) {
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

    const [width, setWidth] = useState(window.innerWidth);
    const updateDimensions = () => {
        setWidth(window.innerWidth);
    }
    useEffect(() => {
        window.addEventListener("resize", updateDimensions);

        return () => window.removeEventListener("resize", updateDimensions);

    }, []);

    const handleFinalizarAtividade1 = () => {
        if (nomeDaEquipe !== "" && quantidadeIntegrantes !== 0) {
            setAtvCompleta1(true)
        } else {
            setAtvCompleta1(false)
        }
    }

    const handleFinalizarAtividade2 = () => {
        if (definidor !== "" && facilitador !== "" && observador !== "" && entrevistador !== "" && scrumMaster !== "") {
            setAtvCompleta2(true)
        } else {
            setAtvCompleta2(false)
        }
    }

    const handleFinalizarAtividade3 = () => {
        if (linkRetrospectiva !== "") {
            setAtvCompleta3(true)
        } else {
            setAtvCompleta3(false)
        }
    }

    const [infoPapeisPreenchida, setInfoPapeisPreenchida] = useState(false)
    const [infoPrincipalPreenchida, setInfoPrincipalPreenchida] = useState(false)
    const [infoRetrospectivaPreenchida, setInfoRetrospectivaPreenchida] = useState(false)

    const [atividadeCompleted, setAtividadeCompleted] = useState([])
    const [listaAtividadeCompleted, setListaAtividadeCompleted] = useState([])

    const [atividadesFoiFinalizada, setAtividadesFoiFinalizada] = useState(false)

    const etapaAtividadePertence = 1
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
                if(infoAtividade.data.etapaPertencente === 1) {
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

        let lst = []

        lst.push({id_atividade: tituloAtividade, id_equipe: nomeEquipe, informacaoExtra: informacaoExtra})
        setAtividadesAntesLogin([...atividadesAntesLogin, ...lst])
    }

    useEffect(() => {
        const handleAtividadesConcluidasAntesLogin = async () => {

            if(auth.user) {

                if(atividadesAntesLogin.length !== 0) {
                    const etapa = 1
                    for(var i = 0; i < atividadesAntesLogin.length; i++) {
                        
                        const infoEquipe = await axios.get(`api/equipes/${auth.user.username}`)

                        const infoAtividade = await instance.get(`atividades/?etapaPertencente=${etapa}&tituloAtividade=${atividadesAntesLogin[i].id_atividade}`)

                        
                        let idEquipe = infoEquipe.data.id
                        let idAtividade = infoAtividade.data[0].id_atividade
                        // if(listaAtividadeCompleted.includes(idAtividade)) {
                        //     atividadesAntesLogin.splice(i,1)
                        // } else {
                            instance.post('historicoAtividades/', {
                                id_atividade: idAtividade,
                                id_equipe: idEquipe,
                                informacaoExtra: linkRetrospectiva,
                                etapaAtividade: 1,
                            }).catch((err) => console.log(err.response.data.non_field_errors[0], idAtividade))
                            handleFinalizarAtividade3()
                            atividadesAntesLogin.splice(i,1)

                        // }

                        
                    }
                }
            }
        }
        if(auth.user) {
            handleAtividadesConcluidas(auth.user.username)
        }

        handleAtividadesConcluidasAntesLogin()
        
    }, [auth.user, atividadesAntesLogin])

    useEffect(() => {
        if(auth.user) {
            handleAtividadesConcluidas(auth.user.username)
        }
    }, [])

    useEffect(() => {

        const handleInfoPreenchida = async () => {

            if (auth.user) {
                const etapaAtualAt = 1
                const id_atividade = 21
                const { data } = await axios.get(`/api/equipes/${auth.user.username}`)
                const infoExtra = await instance.get(`/historicoAtividades/?id_equipe=${data.id}&etapaAtividade=${etapaAtualAt}&id_atividade=${id_atividade}`)

                if (JSON.parse(localStorage.getItem('novaSprint')) !== true) {
                    setDefinidor(data.definidor)
                    setFacilitador(data.facilitador)
                    setObservador(data.observador)
                    setEntrevistador(data.entrevistador)
                    setScrumMaster(data.scrumMaster)
                    if(infoExtra.data.length !== 0) {
                        setLinkRetrospectiva(infoExtra.data[0].informacaoExtra)
                    } else {
                        setLinkRetrospectiva("")
                    }
                    setQuantidadeIntegrantes(data.quantidadeIntegrantes)
                    setNomeDaEquipe(data.nomeDaEquipe)

                    if (data.definidor.length !== 0 && data.facilitador.length !== 0 && data.observador.length !== 0 && data.entrevistador.length !== 0 && data.scrumMaster.length !== 0) {
                        setInfoPapeisPreenchida(true)
                    }

                    if(infoExtra.data.length !== 0 ) {
                        if(infoExtra.data[0].informacaoExtra) {
                            if (infoExtra.data[0].informacaoExtra.length !== 0) {
                                setInfoRetrospectivaPreenchida(true)
                            }
                        }
                    }
                   
                    if (data.nomeDaEquipe !== "" && data.quantidadeIntegrantes !== "") {
                        setInfoPrincipalPreenchida(true)
                    }
                }
            }
        }
        handleInfoPreenchida()

        

    }, [carregar])

    

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

    const sequenciaEtapa = 0
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
            <MenuLateral completed={completed} isActive={isActive} etapaAtual={'1'} pathname={pathName} activeStep={activeStep} setActiveStep={setActiveStep} tempoEstimado={tempoAtvAtualEstimado} tempoRestante={tempoAtvAtual} atvsTotais={titleAtividadesEtapa} completedAtv={completedSteps} atividades={titleAtividadesEtapa} nomeEquipe={nomeDaEquipe}>
                <div style={{ height: '100%', marginBottom: '85px' }}>
                    {atividadesEtapa.map((item, i) => (
                        <>
                            <AtividadeBox setInfoRetrospectivaPreenchida={setInfoRetrospectivaPreenchida} setLinkRetrospectiva={setLinkRetrospectiva} setQuantidadeIntegrantes={setQuantidadeIntegrantes} setNomeDaEquipe={setNomeDaEquipe} atvCompleta1={atvCompleta1} quantidadeIntegrantes={quantidadeIntegrantes} setEquipeExiste={setEquipeExiste} equipeExiste={equipeExiste} nomeDaEquipe={nomeDaEquipe} infoPrincipalPreenchida={infoPrincipalPreenchida} handleNomeEquipe={handleNomeEquipe} setScrumMaster={setScrumMaster} setEntrevistador={setEntrevistador} setObservador={setObservador} setDefinidor={setDefinidor} setFacilitador={setFacilitador} infoPapeisPreenchida={infoPapeisPreenchida} facilitador={facilitador} definidor={definidor} observador={observador} entrevistador={entrevistador} scrumMaster={scrumMaster} atvCompleta2={atvCompleta2} etapaAtual={'1'} atvCompleta3={atvCompleta3} linkRetrospectiva={linkRetrospectiva} infoRetrospectivaPreenchida={infoRetrospectivaPreenchida} handleInformacaoEquipe={handleInformacaoEquipe}  isActive={isActive} activeStep={activeStep} item={item} i={i} handleTempoEstimado={handleTempoEstimado}>
                                <div className={`timer-box ${width < 600 ? 'mobile-timer' : 'destkop-timer'}`}>
                                    <div className="content-timer">
                                        <Timer setTempoAtvAtual={setTempoAtvAtual} min={timeClock} isActive={isActive} setIsActive={setIsActive} setHasFinised={setHasFinised} />
                                    </div>
                                </div>
                            </AtividadeBox>
                        </>
                    ))}
                     
                    {allStepsCompleted() ?
                        <div className={`bloco-atvFinalizada`}>
                            {atividadesEtapa.length !== 0 ? 
                                <Typography sx={{ mt: 2, mb: 1, fontWeight: 700 }}>
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