import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'

import { AuthContext } from "../../contexts/Auth/AuthContext";

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { FormControl, TextField } from '@mui/material';

import { Container } from './styles'

import { Timer } from '../../shared/components/Timer'

import { MenuLateral } from "../../shared/components/MenuLateral";
import { FooterAtv } from '../../shared/components/FooterAtv';
import { AtividadeBox } from '../../shared/components/AtividadeBox';

import notification from '../../shared/assets/notification.wav'

export const Etapa4 = (props) => {

    const auth = useContext(AuthContext)

    const [activeStep, setActiveStep] = React.useState(0);
    const [completed, setCompleted] = React.useState({});
    const [isActive, setIsActive] = useState(false);
    const [hasFinised, setHasFinised] = useState(false);
    const [timeClock, setTimeClock] = useState(0)

    const [linkRetrospectiva, setLinkRetrospectiva] = useState("")

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

    const totalSteps = () => {
        return atvsTitle.length;
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
                atvsTitle.findIndex((step, i) => !(i in completed))
                : activeStep + 1;
        setActiveStep(newActiveStep);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
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

    const geral = ['Aprimoramento da Solução', 'Apresentação da Solução', 'Revisão', 'Avaliação']

    const atvs = [
        {
            title: 'REFORMULAÇÃO DO PROTÓTIPO',
            titleAtv: 'Reformulação do protótipo com base nas respostas de pesquisas',
            tipo: 'Grupo',
            descr: <>O grupo deve realizar a reformulação do protótipo com base nos 
            pontos obtidos das pesquisas aplicadas na etapa três, realizando a análise se é viável ou não aplicar as melhorias que foram 
            apontadas nos resultados das análises.
            <br /></>,
            link: '',
            descrLink: '',
            descrTemp: <p>Antes de inciar a atividade lembrem-se que vocês têm <strong>15 minutos</strong> para finalizar a mesma.</p> ,
            tempo: 15,
            macro: 'Aprimoramento da solução ou protótipo'
        },
        {
            title: 'REVISÃO DA SOLUÇÃO',
            titleAtv: 'Revisão da solução ou protótipo',
            tipo: 'Grupo',
            descr: <>O grupo deve realizar a revisão da solução/protótipo com base na 
            reformulação feita na atividade anterior, podendo levar em conta a análise feita, os comentários obtidos do mentor e novas ideias 
            que podem vim a surgir dos integrantes após essa rodada de validação.
            <br /></>,
            link: '',
            descrLink: '',
            descrTemp: <p>Antes de inciar a atividade lembrem-se que vocês têm <strong>10 minutos</strong> para finalizar a mesma.</p>,
            tempo: 10,
            macro: 'Aprimoramento da solução ou protótipo'
        },

        {
            title: 'APRESENTAÇÃO PARA O MENTOR',
            titleAtv: 'Apresentação da equipe e do problema/ideia escolhido para o mentor',
            tipo: 'Grupo',
            descr: <>O grupo deve realizar a apresentação do seu grupo (informando o nome da equipe, 
                seus integrantes e como a solução foi finalizada) para o mentor. A apresentação pode ser rápida, 
                apenas para que o mentor saiba como ficou o desenvolvimento completo da solução escolhida pela equipe.
                Deixando tempo para possíveis considerações do mentor acerca da solução implementada pela equipe.
                <br /></>,
            link: '',
            descrLink: '',
            descrTemp: <p>Antes de inciar a atividade lembrem-se que vocês têm <strong>5 minutos</strong> para finalizar a mesma.</p> ,
            tempo: 5,
            macro: 'Mentoria'
        },
        {
            title: 'RETORNO DA EQUIPE',
            titleAtv: 'Retorno da equipe',
            tipo: 'Grupo',
            descr: <>Após a apresentação da solução definida para o mentor, 
            o grupo terá um tempo para se preparar para a próxima apresentação, que será feita para a turma. 
            <br /></>,
            link: '',
            descrLink: '',
            descrTemp: <p>Antes de inciar a atividade lembrem-se que vocês têm <strong>5 minutos</strong> para finalizar a mesma.</p> ,
            tempo: 5,
            macro: 'Mentoria'
        },
        {
            title: 'APRESENTAÇÃO PARA A TURMA',
            titleAtv: 'Apresentação da equipe e do problema/ideia escolhido para a turma',
            tipo: 'Grupo',
            descr: <>O grupo deve realizar uma rápida apresentação do seu grupo (informando o nome da equipe, 
                seus integrantes e como a solução foi finalizada)para a turma. A apresentação pode ser rápida, 
                apenas para que a turma saiba como ficou o desenvolvimento completo da solução escolhida pela equipe.                
                <br /></>,
            link: '',
            descrLink: '',
            descrTemp: <p>Antes de inciar a atividade lembrem-se que vocês têm <strong>3 minutos</strong> para finalizar a mesma.</p>,
            tempo: 3,
            macro: 'Mentoria'
        },

        {
            title: 'RETROSPECTIVA DA SPRINT',
            titleAtv: 'Retrospectiva da Sprint',
            tipo: 'Grupo',
            descr: <>O grupo deve realizar uma retrospectiva, ponderando e pensando sobre todas as atividades
            realizadas no dia e responder algumas questões, como: <strong> <em>O que tem funcionado?, O que não funcionou?, O que pode ser melhorado?</em> </strong>, sobre tudo que for realizado,
            em individual e em grupo, para que nas próximas etapas os pontos encontrados nessa retrospectiva sejam aplicados ou evitados nas atividades a seguir. 
            Para realizar essa atividade, é necessário clicar no link abaixo, vocês irão para uma plataforma especifica que contém essa perguntas, 
            o facilitador deverá ser responsável por guiar todos da equipe, na realização da tarefa. Tanto na plataforma terá um relógio para que a equipe 
            acompanhe o tempo.
            <br />
                <form onSubmit={handleInformacaoEquipe}>

                <FormControl fullWidth>
                    <label className="text-papel">Link da Retrospectiva preenchida</label>
                    <TextField disabled={infoRetrospectivaPreenchida} value={linkRetrospectiva} defaultValue={`${JSON.parse(localStorage.getItem('novaSprint')) !== true && linkRetrospectiva !== '' ? linkRetrospectiva : ''}`} required type={'text'} onChange={(e) => setLinkRetrospectiva(e.target.value)} fullWidth  margin="normal" size="small" placeholder="Informe o link da retrospectiva" variant="outlined" className="input-text" />
                    <Button disabled={atvCompleta || infoRetrospectivaPreenchida} type="submit" className="btn-formulario">Enviar Informações</Button>
                </FormControl>

            </form><br /><br />
            O modelo da Retrospectiva está disponível no link: <br /></>,
            link: 'https://docs.google.com/drawings/d/1WWcMllAeZOwbzd_1VsRnoZHcBBUxnOYdbUMSq7UvPWQ/edit?usp=sharing',
            descrLink: 'Clique aqui para abrir o modelo',
            descrTemp: <p>Antes de inciar a atividade lembrem-se que vocês têm <strong>10 minutos</strong> para finalizar a mesma.</p>,
            tempo: 10,
            macro: 'Retrospectiva do Processo'
        },

        {
            title: 'AVALIAÇÃO DO PROCESSO',
            titleAtv: 'Avaliação do processo',
            tipo: 'Individual',
            descr: <>Nesta etapa vocês irão realizar a avaliação das atividades realizadas. Esta etapa possui um link para uma avaliação
            que deve ser respondida de forma individual. Lembre-se o questionário não é obrigatório, contudo sua resposta pode ajudar a
            melhorar as etapas, as atividades realizadas e até a aplicação. <br /><br /></>,
            link: 'https://forms.gle/awyN4q8yUKmS6r6i6',
            descrLink: 'Clique aqui para realizar a avaliação',
            descrTemp: '',
            tempo: 0,
            macro: 'Avaliação do Processo'
        }
    ]

    const atvsTitle = [
        'Reformulação do protótipo com base nas respostas de pesquisas',
        'Revisão da solução ou protótipo',
        'Apresentação da equipe e do problema/ideia escolhido para o mentor',
        'Retorno da equipe',
        'Apresentação da equipe e do problema/ideia escolhido para a turma',
        'Retrospectiva da Sprint',
        'Avaliação do processo',
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


    return (
            <Container>
                <MenuLateral pathname={pathName} activeStep={activeStep} setActiveStep={setActiveStep} tempoEstimado={tempoAtvAtualEstimado} tempoRestante={tempoAtvAtual} atvsTotais={atvsTitle} completedAtv={completedSteps} atividades={atvsTitle} geral={geral} nomeEquipe={auth.user.username}>
                    <div style={{ height: '100%', marginBottom: '85px' }}>
                        {atvs.map((item, i) => (
                            <AtividadeBox isActive={isActive} activeStep={activeStep} item={item} i={i} handleTempoEstimado={handleTempoEstimado}>
                                <div className={`timer-box ${width < 600 ? 'mobile-timer' : 'destkop-timer'}`}>
                                    <div className="content-timer">
                                        <Timer setTempoAtvAtual={setTempoAtvAtual} min={timeClock} isActive={isActive} setIsActive={setIsActive} setHasFinised={setHasFinised} />
                                    </div>
                                </div>
                            </AtividadeBox>
                        ))}
                        {acabouAtv ?
                            <div className='bloco-atvFinalizada'>
                                <Typography sx={{ mt: 2, mb: 1 }}>
                                    Todas as atividades foram completadas. Vocês terminaram todas as etapas :).
                                </Typography>
                            </div> : null
                        }
                    </div>
                </MenuLateral>
                <FooterAtv setAcabouAtv={setAcabouAtv} allStepsCompleted={allStepsCompleted} handleReset={handleReset} completedSteps={completedSteps} totalSteps={totalSteps} width={width} activeStep={activeStep} isActive={isActive} handleBack={handleBack} handleNext={handleNext} steps={atvsTitle} completed={completed} handleComplete={handleComplete} disabled={isActive}></FooterAtv>
            </Container>
        )
}