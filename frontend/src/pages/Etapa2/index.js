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

export const Etapa2 = (props) => {

    const navigate = useNavigate();

    const auth = useContext(AuthContext)

    const [activeStep, setActiveStep] = React.useState(0);
    const [completed, setCompleted] = React.useState({});
    const [isActive, setIsActive] = useState(false);
    const [hasFinised, setHasFinised] = useState(false);
    const [timeClock, setTimeClock] = useState(0)
    const [linkRetrospectiva, setLinkRetrospectiva] = useState("")

    const boxInitial = JSON.parse(localStorage.getItem('boxState2'))

    const [boxState, setBoxState] = useState(boxInitial ? boxInitial :{
            discussao: false,
            esbocoSolucao: false,
            mentoria: false,
            pesquisaValidacao: false,
            preparacaoApresentacao: false,
            reformulacaoEsboco: false,
            retrospectiva: false,
            revisaoEsboco: false,
        }
    )

    const handleFinalizar = (boxName) => {
        setBoxState({
            ...boxState,
            [boxName]: !boxState[boxName]
        })
    }

    useEffect(() => {
        localStorage.setItem('boxState2', JSON.stringify(boxState))
    }, [boxState])

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

    const [carregar, setCarregar] = useState(false)

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
                etapaFinalizada: "etapa2"
            })
        } 
        handleFinalizarAtividade()
        if (carregar) {
            setCarregar(false)
        } else {
            setCarregar(true)
        }
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

    const [infoRetrospectivaPreenchida, setInfoRetrospectivaPreenchida] = useState(false)

    useEffect(() => {

        const handleInfoPreenchida = async () => {
            if(auth.user) {
                const etapaAtualAt = 2
                const id_atividade = 35
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

    const etapaAtividadePertence = 2
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
                if(infoAtividade.data.etapaPertencente === 2) {
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
        const etapa = 2
        const infoAtividade = await instance.get(`atividades/?etapaPertencente=${etapa}&tituloAtividade=${tituloAtividade}`)

        let idEquipe = infoEquipe.data.id
        let idAtividade = infoAtividade.data[0].id_atividade
        
        instance.post('historicoAtividades/', {
            id_atividade: idAtividade,
            id_equipe: idEquipe,
            informacaoExtra: informacaoExtra,
            etapaAtividade: 2,
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
                                etapaAtividade: 2,
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
            title: 'PESQUISA INDIVIDUAL SOBRE O PROBLEMA',
            titleAtv: 'Pesquisa individual sobre o problema/ideia a ser implementado',
            tipo: 'Individual',
            descr: <div>Cada integrante da equipe deve realizar uma pesquisa individual sobre o problema escolhido para solucionar ou pesquisar soluções já existentes, sobre o problema escolhido, que desejam melhorar.<br /></div>,
            link: '',
            descrLink: '',
            tempo: 30,
        },
        {
            title: 'ORGANIZAÇÃO INDIVIDUAL DE PROPOSTAS',
            titleAtv: 'Organização individual de propostas para o problema/ideia a ser implementado',
            tipo: 'Individual',
            descr: <div>Cada integrante da equipe deve realizar a organização das ideias encontradas na atividade anterior e preparar uma rápida apresentação sobre as mesmas para toda a equipe.</div>,
            link: '',
            descrLink: '',
            tempo: 20,
        },
        {
            title: 'BRAINSTORM SOBRE PROPOSTAS',
            titleAtv: 'Brainstorm sobre as propostas para o problema/ideia a ser implementado',
            tipo: 'Grupo',
            descr: <div>Cada integrante da equipe deve realizar a apresentação das informações encontradas nas atividades anteriores sobre as soluções/problemas para toda a equipe, deixando espaço para possíveis questionamentos dos integrantes. A apresentação pode ser rápida, apenas para que os integrantes da equipe tenham uma ideia geral sobre o problema, para que possa facilitar na hora de realizar a votação das soluções/problemas. <br /></div>,
            link: '',
            descrLink: '',
            tempo: 40,
        },
        {
            title: 'ESCOLHA DAS PROPOSTAS PARA SEREM DESENVOLVIDAS',
            titleAtv: 'Escolha de quais propostas serão desenvolvidas e transformadas em protótipos',
            tipo: 'Grupo',
            descr: <div>Cada integrante da equipe deve realizar a votação na solução/problema que mais gosta e achar interessante para a equipe desenvolver no decorrer das etapas. Nesta atividade vocês deverão trabalhar em <strong>grupo</strong>. Após realizar as apresentações na atividade anterior, cada integrante da equipe irá realizar a votação na proposta de seu interesse, que mais gostou. <br />Lembre-se, cada integrante tem <strong>três</strong> votos para gastar, ou seja, ele deve votar três vezes, seja em apenas uma proposta ou em mais. Para que a votação  não acabe empatada ou sem solução, o <strong>Definidor </strong> tem seu papel posto em prova nessa votação, por ele ser responsável por tomar as decisões de maior importância na equipe, seu voto é duplicado nessa  votação.</div>,
            link: '',
            descrLink: '',
            tempo: 25,
        },

        {
            title: 'ESBOÇO DA SOLUÇÃO',
            titleAtv: 'Esboço da solução ou do protótipo',
            tipo: 'Grupo',
            descr: <div>Cada integrante da equipe deve fazer um esboço da solução ou do protótipo votado na atividade anterior, podendo conter qualquer funcionalidade que o mesmo ache ideal para contribuir na resolução do problema. A forma de confecção do esboço fica a cargo do integrante, podendo escolher o que achar mais fácil utilizar.<br /></div>,
            link: '',
            descrLink: '',
            tempo: 60,
        },
        {
            title: 'PREPARAÇÃO DE APRESENTAÇÃO DE ESBOÇO',
            titleAtv: 'Preparação de apresentação do esboço da solução/protótipo',
            tipo: 'Grupo',
            descr: <div>A equipe é responsável por preparar uma apresentação sobre o esboço feito na atividade anterior para o mentor e a turma. A apresentação pode ser rápida, apenas para que os mentor fique familiarizado com a solução escolhida e como a mesma vai ser implementada. A equipe pode preparar questionamentos para o mentor facilitando na hora de recolher o feedback do mentor.<br /></div>,
            link: '',
            descrLink: '',
            tempo: 30,
        },

        {
            title: 'APRESENTAÇÃO PARA O MENTOR',
            titleAtv: 'Apresentação do esboço do problema/ideia escolhido para o mentor',
            tipo: 'Grupo',
            descr: <div>O grupo deve realizar a apresentação do seu grupo (informando o nome da equipe e solução escolhida para desenvolver) para o mentor. A apresentação pode ser rápida, apenas para que o mentor saiba qual é a sua equipe e a solução sua equipe irá desenvolver e mostrar o esboço preparado nas atividades anteriores. Após a equipe realizar a apresentação, o grupo pode realizar a primeira validação da ideia com o mentor, fazendo perguntas sobre o tema escolhido para desenvolver, sobre o esboço feito: se é uma boa idea a forma escolhida para implementar, etc.<br /></div>,
            link: '',
            descrLink: '',
            tempo: 15,
        },
        {
            title: 'RETORNO DA EQUIPE',
            titleAtv: 'Retorno da equipe',
            tipo: 'Grupo',
            descr: <div>Após a apresentação da solução definida para o mentor, o grupo terá um tempo para se preparar para a próxima apresentação, que será feita para a turma.<br /></div>,
            link: '',
            descrLink: '',
            tempo: 5,
        },
        {
            title: 'APRESENTAÇÃO PARA A TURMA',
            titleAtv: 'Apresentação da equipe e do problema/ideia escolhido para a turma',
            tipo: 'Grupo',
            descr: <div>O grupo deve realizar uma rápida apresentação do seu grupo (informando o nome da equipe e solução escolhida para desenvolver) para a turma. A apresentação pode ser rápida, apenas para que a turma conheça a solução que sua equipe irá desenvolver e mostrar o esboço realizado e como o mesmo foi feito.<br /></div>,
            link: '',
            descrLink: '',
            tempo: 5,
        },

        {
            title: 'REFORMULAÇÃO DO ESBOÇO',
            titleAtv: 'Reformulação de pontos do esboço com base no feedback da mentoria',
            tipo: 'Grupo',
            descr: <div>O grupo deve realizar a reformulação de pontos obtidos na reunião e apresentação para o mentor, realizando a análise se é viável ou não aplicar as melhorias que foram apontadas pelo mentor.<br /></div>,
            link: '',
            descrLink: '',
            tempo: 60,
        },
        {
            title: 'REVISÃO DO ESBOÇO',
            titleAtv: 'Revisão de esboço da ideia/solução',
            tipo: 'Grupo',
            descr: <div>O grupo deve realizar a revisão do esboço com base na reformulação feita na atividade anterior, podendo levar em conta a análise feita, os comentários obtidos do mentor e novas ideias que podem vim a surgir dos integrantes após essa rodada de validação.<br /></div>,
            link: '',
            descrLink: '',
            tempo: 30,
        },
       
        {
            title: 'PESQUISA RÁPIDA',
            titleAtv: 'Pesquisa rápida com conhecidos sobre o esboço do problema/ideia definido',
            tipo: 'Grupo',
            descr: <div>O grupo deve realizar uma rápida apresentação e pesquisa sobre a solução com conhecidos, podendo ser apresentados em formulários para poder recolher a percepção de pessoas de fora do grupo sobre o esboço da solução confeccionado. O formulário pode ser curto para que seja fácil de recolher as repostas, fazendo perguntas sobre o tema escolhido para desenvolver, sobre o esboço, se é viável/interessante ou não continuar com o desenvolvimento do esboço.<br /></div>,
            link: '',
            descrLink: '',
            tempo: 30,
        },

        {
            title: 'RETROSPECTIVA DA SPRINT',
            titleAtv: 'Retrospectiva da Sprint',
            tipo: 'Grupo',
            descr: <div>O grupo deve realizar uma retrospectiva, ponderando e pensando sobre todas as atividades realizadas no dia e responder algumas questões, como: <strong> <em>O que tem funcionado?, O que não funcionou?, O que pode ser melhorado?</em> </strong>, sobre tudo que for realizado, em individual e em grupo, para que nas próximas etapas os pontos encontrados nessa retrospectiva sejam aplicados ou evitados nas atividades a seguir. Para realizar essa atividade, é necessário clicar no link abaixo, vocês irão para uma plataforma especifica que contém essa perguntas, o facilitador deverá ser responsável por guiar todos da equipe, na realização da tarefa. Tanto na plataforma terá um relógio para que a equipe acompanhe o tempo.<br /><form onSubmit={handleInformacaoEquipe}><FormControl fullWidth><label className="text-papel">Link da Retrospectiva preenchida</label><TextField disabled={infoRetrospectivaPreenchida} value={linkRetrospectiva} defaultValue={`${JSON.parse(localStorage.getItem('novaSprint')) !== true && linkRetrospectiva !== '' ? linkRetrospectiva : ''}`} required type={'text'} onChange={(e) => setLinkRetrospectiva(e.target.value)} fullWidth  margin="normal" size="small" placeholder="Informe o link da retrospectiva" variant="outlined" className="input-text" /><Button disabled={atvCompleta || infoRetrospectivaPreenchida} type="submit" className="btn-formulario">Enviar Informações</Button></FormControl></form><br /><br /> O modelo da Retrospectiva está disponível no link: <br /></div>,
            link: 'https://docs.google.com/drawings/d/1WWcMllAeZOwbzd_1VsRnoZHcBBUxnOYdbUMSq7UvPWQ/edit?usp=sharing',
            descrLink: 'Clique aqui para abrir o modelo',
            tempo: 10,
        },

        {
            title: 'AVALIAÇÃO DO PROCESSO',
            titleAtv: 'Avaliação do processo',
            tipo: 'Individual',
            descr: <div>Nesta etapa vocês irão realizar a avaliação das atividades realizadas. Esta etapa possui um link para uma avaliação que deve ser respondida de forma individual. Lembre-se o questionário não é obrigatório, contudo sua resposta pode ajudar a melhorar as etapas, as atividades realizadas e até a aplicação.<br /> <br /></div>,
            link: 'https://forms.gle/Fxrhr2k2VuwYa7Pk9',
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

    const sequenciaEtapa = 1
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
                <MenuLateral completed={completed} isActive={isActive} etapaAtual={'2'} pathname={pathName} activeStep={activeStep} setActiveStep={setActiveStep} tempoEstimado={tempoAtvAtualEstimado} tempoRestante={tempoAtvAtual} atvsTotais={titleAtividadesEtapa} completedAtv={completedSteps} atividades={titleAtividadesEtapa} nomeEquipe={auth.user.username}>
                    <div style={{ height: '100%', marginBottom: '85px' }}>
                        {atividadesEtapa.map((item, i) => (
                            <AtividadeBox setLinkRetrospectiva={setLinkRetrospectiva} etapaAtual={'2'} atvCompleta={atvCompleta} linkRetrospectiva={linkRetrospectiva} infoRetrospectivaPreenchida={infoRetrospectivaPreenchida} handleInformacaoEquipe={handleInformacaoEquipe} isActive={isActive} activeStep={activeStep} item={item} i={i} handleTempoEstimado={handleTempoEstimado}>
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