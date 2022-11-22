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


    const atvs = [
        {
            title: 'REFORMULAÇÃO DO ESBOÇO',
            titleAtv: 'Reformulação do esboço com base nas respostas de pesquisas',
            tipo: 'Grupo',
            descr: <div>O grupo deve realizar a reformulação de pontos obtidos das pesquisas aplicadas na etapa anterior, realizando a análise se é viável ou não aplicar as melhorias que foram apontadas pelas respostas dos questionários e pesquisas realizadas.<br /></div>,
            link: '',
            descrLink: '',
            tempo: 15,
        },
        {
            title: 'REVISÃO DO ESBOÇO',
            titleAtv: 'Revisão de esboço',
            tipo: 'Grupo',
            descr: <div>O grupo deve realizar a revisão do esboço com base na reformulação feita na atividade anterior, podendo levar em conta a análise feita, os comentários obtidos dos questionários aplicados e novas ideias que podem vim a surgir dos integrantes após essa rodada de validação.<br /></div>,
            link: '',
            descrLink: '',
            tempo: 10,
        },

        {
            title: 'ESCOLHA DE FERRAMENTA',
            titleAtv: 'Escolha de ferramenta para materializar solução ou protótipo ideado',
            tipo: 'Grupo',
            descr: <div>Nesta atividade vocês irão realizar a escolha da ferramenta que será utilizada para realizar a construção solução ou protótipo.<br /></div>,
            link: '',
            descrLink: '',
            tempo: 30,
        },
        {
            title: 'PREPARAÇÃO DE TESTES',
            titleAtv: 'Preparação de testes com usuários',
            tipo: 'Grupo',
            descr: <div>A equipe será responsável por realizar o preparo dos testes a serem realizados no protótipo com os usuários escolhidos, sejam eles reais ou fictícios. Ficando a cargo da equipe o tipo de teste e a forma como o mesmo será aplicado.<br /></div>,
            link: '',
            descrLink: '',
            tempo: 30,
        },

        {
            title: 'CONSTRUÇÃO DO MODELO OU PROTÓTIPO',
            titleAtv: 'Construção de um modelo ou protótipo',
            tipo: 'Grupo ou Individual',
            descr: <div> O grupo ou o integrante irá realizar a construção do protótipo na ferramenta escolhida.<br /></div>,
            link: '',
            descrLink: '',
            tempo: 90,
        },
        {
            title: 'TESTAGEM DA SOLUÇÃO',
            titleAtv: 'Testagem da solução ou protótipo',
            tipo: 'Grupo',
            descr: <div>O grupo irá realizar a aplicação dos testes preparados para os usuários que o grupo selecionou e realizar a documentação dos resultados obtidos com a aplicação dos testes.<br /></div>,
            link: '',
            descrLink: '',
            tempo: 30,
        },
        {
            title: 'AVALIAÇÃO DE TESTAGEM E MELHORIA DA SOLUÇÃO',
            titleAtv: 'Avaliação dos resultados da testagem e Melhoria da solução ou protótipo',
            tipo: 'Grupo',
            descr: <div>O grupo deve realizar a análise dos resultados obtidos dos testes aplicados na etapa anterior.<br /></div>,
            link: '',
            descrLink: '',
            tempo: 30,
        },
        {
            title: 'PREPARAÇÃO DA APRESENTAÇÃO PARA O MENTOR',
            titleAtv: 'Preparação da apresentação para a mentoria',
            tipo: 'Grupo',
            descr: <div>O grupo deve realizar a preparação da apresentação do seu grupo para o mentor. A apresentação pode ser rápida, apenas para que o mentor saiba qual solução sua equipe desenvolveu e mostrar o protótipo desenvolvido.<br /></div>,
            link: '',
            descrLink: '',
            tempo: 20,
        },

        {
            title: 'APRESENTAÇÃO PARA O MENTOR',
            titleAtv: 'Apresentação da equipe e do problema/ideia escolhido para o mentor',
            tipo: 'Grupo',
            descr: <div>O grupo deve realizar a apresentação do seu grupo (informando o nome da equipe, seus integrantes e a solução que irá desenvolver) para o mentor. A apresentação pode ser rápida, apenas para que o mentor saiba qual solução sua equipe irá desenvolver e mostrar como está o desenvolvimento do protótipo. Após a equipe realizar a apresentação, o grupo pode realizar a primeira validação da ideia com o mentor, fazendo perguntas sobre o tema escolhido para desenvolver, sobre o protótipo desenvolvido, etc.<br /></div>,
            link: '',
            descrLink: '',
            tempo: 15,
        },
        {
            title: 'RETORNO DA EQUIPE',
            titleAtv: 'Retorno da equipe',
            tipo: 'Grupo',
            descr: <div>Nesta atividade vocês deverão trabalhar em <strong>grupo</strong>. Após a apresentação da solução definida para o mentor, o grupo terá um tempo para se preparar para a próxima apresentação, que será feita para a turma.<br /></div>,
            link: '',
            descrLink: '',
            tempo: 5,
        },
        {
            title: 'APRESENTAÇÃO PARA A TURMA',
            titleAtv: 'Apresentação da equipe e do problema/ideia escolhido para a turma',
            tipo: 'Grupo',
            descr: <div>O grupo deve realizar uma rápida apresentação do seu grupo (informando o nome da equipe, seus integrantes e a solução que irá desenvolver) para a turma. A apresentação pode ser rápida, apenas para que a turma conheça a solução que sua equipe irá desenvolver e mostrar mostrar o desenvolvimento do protótipo.<br /></div>,
            link: '',
            descrLink: '',
            tempo: 5,
        },

        {
            title: 'REFORMULAÇÃO DA SOLUÇÃO',
            titleAtv: 'Reformulação da solução ou protótipo com base nas respostas de pesquisas',
            tipo: 'Grupo',
            descr: <div>O grupo deve realizar a reformulação de pontos obtidos na reunião e apresentação para o mentor, realizando a análise se é viável ou não aplicar as melhorias que foram apontadas pelo mentor.<br /></div>,
            link: '',
            descrLink: '',
            tempo: 60,
        },
        {
            title: 'REVISÃO DA SOLUÇÃO',
            titleAtv: 'Revisão da solução',
            tipo: 'Grupo',
            descr: <div>O grupo deve realizar a revisão da solução construída com base na reformulação feita na atividade anterior, podendo levar em conta a análise feita, os comentários obtidos do mentor e novas ideias que podem vim a surgir dos integrantes após essa rodada de validação.<br /></div>,
            link: '',
            descrLink: '',
            tempo: 30,
        },
        {
            title: 'TESTAGEM DA SOLUÇÃO',
            titleAtv: 'Testagem da solução reformulada',
            tipo: 'Grupo',
            descr: <div>O grupo deve realizar a aplicação dos testes, com base na solução reformulada, para os usuários que o grupo selecionou e realizar a documentação dos resultados obtidos com a aplicação dos testes.<br /></div>,
            link: '',
            descrLink: '',
            tempo: 15,
        },

        {
            title: 'RETROSPECTIVA DA SPRINT',
            titleAtv: 'Retrospectiva da Sprint',
            tipo: 'Grupo',
            descr: <div>O grupo deve realizar uma retrospectiva, ponderando e pensando sobre todas as atividades realizadas no dia e responder algumas questões, como: <strong> <em>O que tem funcionado?, O que não funcionou?, O que pode ser melhorado?</em> </strong>, sobre tudo que for realizado, em individual e em grupo, para que nas próximas etapas os pontos encontrados nessa retrospectiva sejam aplicados ou evitados nas atividades a seguir. Para realizar essa atividade, é necessário clicar no link abaixo, vocês irão para uma plataforma especifica que contém essa perguntas, o facilitador deverá ser responsável por guiar todos da equipe, na realização da tarefa. Tanto na plataforma terá um relógio para que a equipe acompanhe o tempo.<br /><form onSubmit={handleInformacaoEquipe}><FormControl fullWidth><label className="text-papel">Link da Retrospectiva preenchida</label><TextField disabled={infoRetrospectivaPreenchida} value={linkRetrospectiva} defaultValue={`${JSON.parse(localStorage.getItem('novaSprint')) !== true && linkRetrospectiva !== '' ? linkRetrospectiva : ''}`} required type={'text'} onChange={(e) => setLinkRetrospectiva(e.target.value)} fullWidth  margin="normal" size="small" placeholder="Informe o link da restrospectiva" variant="outlined" className="input-text" /><Button disabled={atvCompleta || infoRetrospectivaPreenchida} type="submit" className="btn-formulario">Enviar Informações</Button></FormControl></form><br /><br />O modelo da Retrospectiva está disponível no link: <br /></div>,
            link: 'https://docs.google.com/drawings/d/1WWcMllAeZOwbzd_1VsRnoZHcBBUxnOYdbUMSq7UvPWQ/edit?usp=sharing',
            descrLink: 'Clique aqui para abrir o modelo',
            tempo: 10,
        },

        {
            title: 'AVALIAÇÃO DO PROCESSO',
            titleAtv: 'Avaliação do processo',
            tipo: 'Individual',
            descr: <div>Nesta etapa vocês irão realizar a avaliação das atividades realizadas. Esta etapa possui um link para uma avaliação que deve ser respondida de forma individual. Lembre-se o questionário não é obrigatório, contudo sua resposta pode ajudar a melhorar as etapas, as atividades realizadas e até a aplicação. <br /></div>,
            link: 'https://forms.gle/hUEUTT8mvEfpzxYN7',
            descrLink: 'Clique aqui para realizar a avaliação',
        }
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