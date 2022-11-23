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
                        
                        const infoAtividade = await instance.get(`atividades/?etapaPertencente=${etapa}tituloAtividade=${atividadesAntesLogin[i].id_atividade}`)
                        let idEquipe = infoEquipe.data.id
                        let idAtividade = infoAtividade.data[0].id_atividade
                        if(listaAtividadeCompleted.includes(idAtividade)) {
                            atividadesAntesLogin.splice(i,1)
                        } else {
                            instance.post('historicoAtividades/', {
                                id_atividade: idAtividade,
                                id_equipe: idEquipe,
                                informacaoExtra: linkRetrospectiva,
                                etapaAtividade: 1,
                            }).catch((err) => console.log(err.response.data.non_field_errors[0], idAtividade))
                        }
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

                    if(infoExtra.data.length !== 0) {
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

    const atvs = [
        {
            title: '',
            titleAtv: 'Video de Apresentação',
            tipo: 'Grupo',
            descr: <div><div className={` ${activeStep === 0 ? 'atvAtual' : 'atvAnt'}`} style={{ margin: '25px' }}><div><div className="video-box"><iframe className='video' title='Video de Apresentação' sandbox='allow-same-origin allow-forms allow-popups allow-scripts allow-presentation' allowFullScreen='allowFullScreen' src='https://youtube.com/embed/me73nXuSIJI?autoplay=0'></iframe></div></div></div></div>,
            link: '',
            descrLink: "",
            tempo: 0,
        },
        {
            title: 'DEFINIÇÃO DE INFORMAÇÕES DA EQUIPE',
            titleAtv: 'Jamboard',
            tipo: 'Individual',
            descr: <div>Cada integrante da equipe deve realizar a confecção do seu Jamboard, o modelo está disponível no link: <br /></div>,
            link: 'https://jamboard.google.com/d/1SB6ea3udT-UhZwt-c_ZPLb0a8sCNoPatpTfGqTtqUxs/edit?usp=sharing',
            descrLink: 'Clique aqui para abrir o Jamboard',
            tempo: 5,
        },
        {
            title: 'APROXIMAÇÃO DE PARTICIPANTES',
            titleAtv: 'Aproximação de participantes e formação de equipe',
            tipo: 'Grupo',
            descr: <div>Cada integrante da equipe deve realizar a apresentação do Jamboard preenchido na atividade anterior para toda a equipe.</div>,
            link: '',
            descrLink: '',
            tempo: 10,
        },
        {
            title: '',
            titleAtv: 'Video de Aquecimento',
            tipo: 'Grupo',
            descr: <div>Vocês irão realizar atividades que tem como objetivo realizar a aproximação dos integrantes de sua equipe. Realizando o preenchimento e apresentação do Canvas de Aquecimento.<br /><br /><div className="video-box"><iframe className='video' title='Atividade Aquecimento da Equipe' sandbox='allow-same-origin allow-forms allow-popups allow-scripts allow-presentation' src='https://youtube.com/embed/I0Oq3saF_JU?autoplay=0'></iframe></div></div>,
            link: '',
            descrLink: '',
            tempo: 0,
        },
        {
            title: 'CANVAS DE AQUECIMENTO',
            titleAtv: 'Preenchimento Canvas de Aquecimento',
            tipo: 'Individual',
            descr: <div>Cada integrante da equipe deve realizar a confecção do Canvas de Aquecimento, o modelo está disponível no link:<br /></div>,
            link: 'https://jamboard.google.com/d/19lkrUINcbUKPrD5X-t3rKilXbVL0wEgzGtvPCeQKxCk/edit?usp=sharing',
            descrLink: 'Clique aqui para abrir o Canvas',
            tempo: 5,
        },
        {
            title: 'APRESENTAÇÃO CANVAS DE AQUECIMENTO',
            titleAtv: 'Apresentação do Canvas para a equipe',
            tipo: 'Grupo',
            descr: <div>Cada integrante da equipe deve realizar a apresentação do Canvas de Aquecimento preenchido na atividade anterior para toda a equipe.</div>,
            link: '',
            descrLink: '',
            tempo: 10,
        },
        {
            title: '',
            titleAtv: 'Video de Definição de informações da equipe',
            tipo: 'Grupo',
            descr: <div>Vocês irão realizar a definição de papéis para a equipe, ou seja, irão realizar a escolha de qual integrante vai ficar com uma determinada responsabilidade, além de preencher algumas informações sobre a equipe. <br /><br /><div className="video-box"><iframe className='video' title='Atividade Definição de Papéis' sandbox='allow-same-origin allow-forms allow-popups allow-scripts allow-presentation' allowFullScreen='allowFullScreen' src='https://youtube.com/embed/6xAvGshgwjI?autoplay=0'></iframe></div></div>,
            link: '',
            descrLink: '',
            tempo: 0,
        },
        {
            title: 'DEFINIÇÃO DE INFORMAÇÕES DA EQUIPE',
            titleAtv: 'Definição de informações da equipe',
            tipo: 'Grupo',
            descr: <div>Vocês precisarão preencher algumas informações sobre a equipe, como: o nome escolhido para a equipe e quantos integrantes compõem a equipe.<div className="papeis"><h4>Favor preencher as informações da equipe abaixo:</h4><form onSubmit={handleNomeEquipe}><FormControl fullWidth><label className="text-papel">Nome da Equipe</label><TextField disabled={infoPrincipalPreenchida} value={nomeDaEquipe} defaultValue={`${JSON.parse(localStorage.getItem('novaSprint')) !== true && nomeDaEquipe !== '' ? nomeDaEquipe : ''}`} onMouseLeave={() => setEquipeExiste(false)} required type={'text'} onChange={(e) => setNomeDaEquipe(e.target.value)} fullWidth margin="normal" size="small" placeholder="Informe o nome da equipe" variant="outlined" className={`input-text ${equipeExiste ? 'equipeExisteInput' : ''}`} /><div className={`${equipeExiste ? 'equipeExiste' : 'equipeNaoExiste'}`} onMouseLeave={() => setEquipeExiste(false)}>Nome de Equipe já existe.</div><label className="text-papel">Quantidade de Integrantes</label><TextField disabled={infoPrincipalPreenchida} value={quantidadeIntegrantes} defaultValue={`${JSON.parse(localStorage.getItem('novaSprint')) !== true && quantidadeIntegrantes !== 0 ? quantidadeIntegrantes : ''}`} required onChange={(e) => setQuantidadeIntegrantes(e.target.value)} type={'number'} fullWidth margin="normal" size="small" placeholder="Informe a quantidade de integrantes" variant="outlined" className="input-text" /><Button disabled={atvCompleta1 || infoPrincipalPreenchida} type="submit" className="btn-formulario">Enviar Informações</Button></FormControl></form></div></div>,
            link: '',
            descrLink: '',
            tempo: 5,
        },
        {
            title: 'MAPEAMENTO DO PROBLEMA',
            titleAtv: 'Definição de representantes da equipe',
            tipo: 'Grupo',
            descr: <div> A equipe deve escolher, dentre os integrantes, um facilitador, um definidor, o observador, o entrevistador e o Scrum Master.<div className="papeis"><h4>Favor preencher os nomes dos representante abaixo:</h4><form onSubmit={handleInformacaoEquipe}><FormControl fullWidth><label className="text-papel" >Facilitador</label><Popup trigger={<QuestionMarkIcon className="icon-pop"></QuestionMarkIcon>} position="right center"><div>Responsável por guiar a equipe nas atividades realizadas. Controla o tempo e a próxima atividade.</div></Popup><TextField disabled={infoPapeisPreenchida} value={facilitador} defaultValue={`${JSON.parse(localStorage.getItem('novaSprint')) !== true && facilitador !== '' ? facilitador : ''}`} required onChange={(e) => setFacilitador(e.target.value)} fullWidth margin="normal" size="small" placeholder="Informe o nome do integrante" variant="outlined" className="input-text" /><label className="text-papel">Definidor</label><Popup trigger={<QuestionMarkIcon className="icon-pop2"></QuestionMarkIcon>} position="right center"><div>Responsável por realizar as decisões mais importantes de cada atividade.</div></Popup><TextField disabled={infoPapeisPreenchida} value={definidor} defaultValue={`${JSON.parse(localStorage.getItem('novaSprint')) !== true && definidor !== '' ? definidor : ''}`} required onChange={(e) => setDefinidor(e.target.value)} fullWidth margin="normal" size="small" placeholder="Informe o nome do integrante" variant="outlined" className="input-text" /><label className="text-papel">Observador</label><Popup trigger={<QuestionMarkIcon className="icon-pop3"></QuestionMarkIcon>} position="right center"><div>Responsável por realizar anotações durante as entrevistas.</div></Popup><TextField disabled={infoPapeisPreenchida} value={observador} defaultValue={`${JSON.parse(localStorage.getItem('novaSprint')) !== true && observador !== '' ? observador : ''}`} required onChange={(e) => setObservador(e.target.value)} fullWidth margin="normal" size="small" placeholder="Informe o nome do integrante" variant="outlined" className="input-text" /><label className="text-papel">Entrevistador</label><Popup trigger={<QuestionMarkIcon className="icon-pop4"></QuestionMarkIcon>} position="right center"><div>Responsável por fazer perguntas nas atividades de entrevistas.</div></Popup><TextField disabled={infoPapeisPreenchida} value={entrevistador} defaultValue={`${JSON.parse(localStorage.getItem('novaSprint')) !== true && entrevistador !== '' ? entrevistador : ''}`} required onChange={(e) => setEntrevistador(e.target.value)} fullWidth margin="normal" size="small" placeholder="Informe o nome do integrante" variant="outlined" className="input-text" /><label className="text-papel">Scrum Master</label><Popup trigger={<QuestionMarkIcon className="icon-pop5"></QuestionMarkIcon>} position="right center"><div>Responsável por cobrar as atividades de planejamento, reuniões e controla a participação do definidor/cliente/dono do produto.</div></Popup><TextField disabled={infoPapeisPreenchida} value={scrumMaster} defaultValue={`${JSON.parse(localStorage.getItem('novaSprint')) !== true && scrumMaster !== '' ? scrumMaster : ''}`} required onChange={(e) => setScrumMaster(e.target.value)} fullWidth margin="normal" size="small" placeholder="Informe o nome do integrante" variant="outlined" className="input-text" /><Button disabled={atvCompleta2 || infoPapeisPreenchida} type="submit" className="btn-formulario">Enviar Informações</Button></FormControl></form></div></div>,
            link: '',
            descrLink: '',
            tempo: 5,
        },

        {
            title: 'PRIMEIRA PESQUISA INDIVIDUAL',
            titleAtv: 'Pesquisa individual sobre possíveis temas a serem desenvolvidos',
            tipo: 'Grupo',
            descr: <div>Cada integrante da equipe deve realizar a pesquisa de possíveis soluções/temas em qualquer área, que você deseje que a equipe desenvolva/mapeie alguma solução.</div>,
            link: '',
            descrLink: '',
            tempo: 10,
        },
        {
            title: 'DISCUSSÃO PARA DEFINIÇÃO DO PROBLEMA',
            titleAtv: 'Discussão para definição do(s) problema(s) correlato(s) sobre o(s) tema(s) encontrado(s) de interesse da equipe',
            tipo: 'Grupo',
            descr: <div>Cada integrante da equipe deve realizar a apresentação dos temas encontrados na atividade anterior para a equipe. A apresentação pode ser rápida, apenas para que os integrantes tenham uma ideia geral do tema para que possa facilitar na hora de realizar a votação nos temas de interesse.</div>,
            link: '',
            descrLink: '',
            tempo: 10,
        },
        {
            title: 'VOTAÇÃO NOS TEMAS',
            titleAtv: 'Votação nos temas de interesse da equipe',
            tipo: 'Grupo',
            descr: <div>Após a apresentação dos temas realizados pelos integrantes da equipe na atividade anterior, cada integrante da equipe irá realizar a votação nos temas de seu interesse. Cada integrante tem três votos para gastar, ou seja, ele deve votar três vezes, seja em apenas um tema ou em mais.</div>,
            link: '',
            descrLink: '',
            tempo: 5,
        },
        {
            title: 'SEGUNDA PESQUISA INDIVIDUAL',
            titleAtv: 'Pesquisa individual sobre o(s) problema(s) escolhido(s) pela equipe',
            tipo: 'Grupo',
            descr: <div>Cada integrante da equipe deve realizar pesquisas sobre os problemas que foram selecionados pela equipe na atividade anterior. A pesquisa pode ter como base soluções já existem no mercado.</div>,
            link: '',
            descrLink: '',
            tempo: 10,
        },
        {
            title: 'DISCUSSÃO EM EQUIPE PARA DEFINIÇÃO DO PROBLEMA',
            titleAtv: 'Discussão em equipe para definição do problema/ideia a ser implementado',
            tipo: 'Grupo',
            descr: <div>Cada integrante da equipe deve realizar a apresentação das soluções encontradas na atividade anterior para a equipe. A apresentação pode ser rápida, apenas para que os integrantes tenham uma ideia geral sobre a solução/ideia encontrada para que possa facilitar na hora de realizar a votação nos problemas/ideias de interesse da equipe.</div>,
            link: '',
            descrLink: '',
            tempo: 10,
        },
        {
            title: 'VOTAÇÃO NAS SOLUÇÕES',
            titleAtv: 'Votação nos temas de interesse da equipe',
            tipo: 'Grupo',
            descr: <div>Após a apresentação das soluções encontradas pelos integrantes da equipe na atividade anterior, cada integrante da equipe irá realizar a votação na solução de seu interesse, que mais gostou. Cada integrante tem <strong>três votos</strong> para gastar, ou seja, ele deve votar três vezes, seja em apenas uma solução ou em mais. Para que a votação não acabe empatada ou sem solução, o <strong>Definidor</strong> tem seu papel posto em prova nessa votação, por ele ser responsável por tomar as decisões de maior importância na equipe, seu voto é duplicado nessa votação.</div>,
            link: '',
            descrLink: '',
            tempo: 5,
        },

        {
            title: 'APRESENTAÇÃO PARA MENTOR',
            titleAtv: 'Apresentação da equipe e do problema/ideia escolhido para o mentor',
            tipo: 'Grupo',
            descr: <div>O grupo deve realizar a apresentação sobre as informações de seu grupo (informando o nome da equipe, seus integrantes, quantos são os integrantes, além de informar o papel de cada um) para o mentor. A apresentação pode ser rápida, apenas para que o mentor saiba qual solução sua equipe irá desenvolver e mostrar quais são as pessoas que compõe a equipe. Após a equipe realizar a apresentação, o grupo pode realizar a primeira validação da ideia com o mentor, fazendo perguntas sobre o tema escolhido para desenvolver, como: se é uma boa escolha ou modos de se iniciar o desenvolvimento. <br /><br />A equipe pode usar o modelo abaixo como exemplo de apresentação ou criar um próprio (mas lembre-se de que a apresentação deve conter as informações pedidas na atividade):<br /></div>,
            link: 'https://docs.google.com/presentation/d/1gS9qICbTL7AoWgWC064GOYiVJUP7zees_wwk4gmG_8g/edit',
            descrLink: 'Clique aqui para abrir o modelo',
            tempo: 15,
        },
        {
            title: 'RETORNO',
            titleAtv: 'Retorno da equipe',
            tipo: 'Grupo',
            descr: <div>Após a apresentação da solução definida para o mentor, o grupo terá um tempo para se preparar para a próxima apresentação, que será feita para a turma.</div>,
            link: '',
            descrLink: '',
            tempo: 5,
        },
        {
            title: 'APRESENTAÇÃO PARA TURMA',
            titleAtv: 'Apresentação da equipe e do problema/ideia escolhido para a turma',
            tipo: 'Grupo',
            descr: <div>O grupo deve realizar uma rápida apresentação do seu grupo (informando o nome da equipe, seus integrantes, quantos são os integrantes, além de informar o papel de cada um) para a turma. A apresentação pode ser rápida, apenas para que a turma conheça a solução que sua equipe irá desenvolver e mostrar quais são os integrantes da equipe.</div>,
            link: '',
            descrLink: '',
            tempo: 5,
        },

        {
            title: 'PESQUISA RÁPIDA SOBRE O PROBLEMA/IDEIA',
            titleAtv: 'Pesquisa rápida com conhecidos sobre o problema/ideia definido nas atividades anteriores',
            tipo: 'Grupo',
            descr: <div>O grupo deve realizar uma rápida apresentação e pesquisa sobre a solução com conhecidos, podendo ser apresentados em formulários para poder recolher a percepção de pessoas de fora do grupo sobre a solução escolhida. O formulário pode ser curto para que seja fácil de recolher as repostas, fazendo perguntas sobre o tema escolhido para desenvolver, , se é viável/interessante ou não o desenvolvimento da solução.</div>,
            link: '',
            descrLink: '',
            tempo: 15,
        },
        {
            title: 'DISCUSSÃO',
            titleAtv: 'Discussão em equipe sobre os resultados obtidos da validação da ideia/solução',
            tipo: 'Grupo',
            descr: <div>O grupo deve realizar a análise da respostas obtidas dos formulários e pesquisas aplicadas na atividade anterior. Nesta atividade o interessante é que o grupo tenha recolhido o máximo de feedback possível sobre a ideia para que se houver ajustes os mesmos sejam mapeados e definidos, e assim, possam ser aplicados nas próximas etapas. Com a análise é possível que a equipe entenda a percepção de pessoas de fora do grupo sobre a solução se ela é interessante de ser desenvolvida ou se é necessário realizar mais pesquisas.</div>,
            link: '',
            descrLink: '',
            tempo: 25,
        },

        {
            title: 'RETROSPECTIVA DO PROCESSO',
            titleAtv: 'Retrospectiva da Sprint',
            tipo: 'Grupo',
            descr: <div>O grupo deve realizar uma retrospectiva, ponderando e pensando sobre todas as atividades realizadas no dia e responder algumas questões, como: <strong> <em>O que tem funcionado?, O que não funcionou?, O que pode ser melhorado?</em> </strong>, sobre tudo que for realizado, em individual e em grupo, para que nas próximas etapas os pontos encontrados nessa retrospectiva sejam aplicados ou evitados nas atividades a seguir. Para realizar essa atividade, é necessário clicar no link abaixo, vocês irão para uma plataforma especifica que contém essa perguntas, o facilitador deverá ser responsável por guiar todos da equipe, na realização da tarefa. Tanto na plataforma terá um relógio para que a equipe acompanhe o tempo.<br /><form onSubmit={handleInformacaoEquipe}><FormControl fullWidth><label className="text-papel">Link da Retrospectiva preenchida</label><TextField disabled={infoRetrospectivaPreenchida} value={linkRetrospectiva} defaultValue={`${JSON.parse(localStorage.getItem('novaSprint')) !== true && linkRetrospectiva !== '' ? linkRetrospectiva : ''}`} required type={'text'} onChange={(e) => setLinkRetrospectiva(e.target.value)} fullWidth margin="normal" size="small" placeholder="Informe o link da restrospectiva" variant="outlined" className="input-text" /><Button disabled={atvCompleta3 || infoRetrospectivaPreenchida} type="submit" className="btn-formulario">Enviar Informações</Button></FormControl></form><br />O modelo da Retrospectiva está disponível no link: <br /></div>,
            link: 'https://docs.google.com/drawings/d/1WWcMllAeZOwbzd_1VsRnoZHcBBUxnOYdbUMSq7UvPWQ/edit',
            descrLink: 'Clique aqui para abrir o modelo',
            tempo: 10,
        },

        {
            title: 'AVALIAÇÃO DO PROCESSO',
            titleAtv: 'Avaliação do processo',
            tipo: 'Grupo',
            descr: <div>Nesta etapa vocês irão realizar a avaliação das atividades realizadas. Esta etapa possui um link para uma avaliação que deve ser respondida de forma individual. Lembre-se o questionário não é obrigatório, contudo sua resposta pode ajudar a melhorar as etapas, as atividades realizadas e até a aplicação.<br /><br /></div>,
            link: 'https://docs.google.com/forms/d/e/1FAIpQLSfZSKR03O2QCmltpj-3d85kmdi9N35tQSWuW7j8tdrf5NxkKA/viewform?embedded=true',
            descrLink: 'Clique aqui para realizar a avaliação',
            tempo: 0,
        },

    ]

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
                            <AtividadeBox setLinkRetrospectiva={setLinkRetrospectiva} setQuantidadeIntegrantes={setQuantidadeIntegrantes} setNomeDaEquipe={setNomeDaEquipe} atvCompleta1={atvCompleta1} quantidadeIntegrantes={quantidadeIntegrantes} setEquipeExiste={setEquipeExiste} equipeExiste={equipeExiste} nomeDaEquipe={nomeDaEquipe} infoPrincipalPreenchida={infoPrincipalPreenchida} handleNomeEquipe={handleNomeEquipe} setScrumMaster={setScrumMaster} setEntrevistador={setEntrevistador} setObservador={setObservador} setDefinidor={setDefinidor} setFacilitador={setFacilitador} infoPapeisPreenchida={infoPapeisPreenchida} facilitador={facilitador} definidor={definidor} observador={observador} entrevistador={entrevistador} scrumMaster={scrumMaster} atvCompleta2={atvCompleta2} etapaAtual={'1'} atvCompleta3={atvCompleta3} linkRetrospectiva={linkRetrospectiva} infoRetrospectivaPreenchida={infoRetrospectivaPreenchida} handleInformacaoEquipe={handleInformacaoEquipe}  isActive={isActive} activeStep={activeStep} item={item} i={i} handleTempoEstimado={handleTempoEstimado}>
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