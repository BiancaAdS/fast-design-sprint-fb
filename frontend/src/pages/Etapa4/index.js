import React, { useEffect, useState } from "react";
import axios from 'axios'

import { TabPanel } from '../../shared/components/TabPanel'
import { TabPanelInside } from '../../shared/components/TabPanelInside'
import { Timer } from '../../shared/components/Timer'

import { Tabs, Tab} from '@mui/material';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import Typography from '@mui/material/Typography';


import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { Container } from "./styles";

function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`, 
    };
}

function a22yProps(index) {
    return {
      id: `simple-tab-${index}-inside`,
      'aria-controls': `simple-tabpanel-${index}-inside`, 
    };
}

  
export const Etapa4 = (props) => {
    const [value, setValue] = useState(0);
    const [valueInside, setValueInside] = useState(0);

    const [timeClock, setTimeClock] = useState(0)
    const [isActive, setIsActive] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

    const [hasFinised, setHasFinised] = useState(false);

    const [expanded, setExpanded] = useState(false);

    const [isOpenAccordion, setOpenAccordion] = useState(false)

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const [isFinished, setIsFinished] = useState(false)

    const boxInitial = JSON.parse(localStorage.getItem('boxState4'))

    const [boxState, setBoxState] = useState(boxInitial ? boxInitial :{
        
            reformulacaoPrototipo: false,
            revisaoSolucao: false,
            apresentacaoSolucao: false,
            retrospectiva: false,
        }
    )

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeInside = (event, newValue) => {
        setValueInside(newValue);
    };

    const handleOpenBox = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
        setValueInside(isExpanded ? valueInside : 0);
        setOpenAccordion(isExpanded ? false : true)
    };

    const startCountdown = () => {
        setIsActive(true);
    }

    const [timeStop, setTimeStop] = useState(timeClock)

    const startNewChallenge = () => {
        
        if(Notification.permission == 'granted'){
            new Notification("Tempo para realizar a atividade finalizado ", {
                body: `:) Já é possível iniciar as próximas atividades.`
            });
        }
    }
    
    const handleFinalizar = (boxName) => {
        setBoxState({
            ...boxState,
            [boxName]: !boxState[boxName]
        })
    }

    useEffect(() => {
        localStorage.setItem('boxState4', JSON.stringify(boxState))
    }, [boxState])

    useEffect(() => {

        if(timeClock !== 0) {
            startCountdown()
        }

        if(!isActive && timeClock !== 0  && !isPaused) {
            setTimeClock(0)
        }

    }, [timeClock, isActive, isPaused])


    useEffect(() => {

        if(hasFinised) {
            startNewChallenge()
            setIsFinished(false)
        }
    }, [hasFinised])

    useEffect(() => {
        Notification.requestPermission();
    }, []);

    const handleInformacaoEquipe = async (e) => {
        e.preventDefault()

        // const { data } = await axios.get(`/api/view-equipe/${nomeDaEquipe}`)
       
        // if(Object.keys(data).length !== 0) {
        //     axios.post('/api/create-equipe', {
        //         nomeDaEquipe: data.nomeDaEquipe ? data.nomeDaEquipe : nomeDaEquipe,
        //         quantidadeIntegrantes: data.quantidadeIntegrantes ? data.quantidadeIntegrantes : quantidadeIntegrantes,
        //         seConhecem: data.seConhecem ? data.seConhecem : seConhecem,
        //         definidor: data.definidor ? data.definidor : definidor,
        //         facilitador: data.facilitador ? data.facilitador : facilitador,
        //         responsavelTempo: data.responsavelTempo ? data.responsavelTempo : responsavelTempo,
        //         linkRetrospectiva1: data.linkRetrospectiva1 ? data.linkRetrospectiva1 : linkRetrospectiva1,
        //         linkRetrospectiva2: data.linkRetrospectiva2 ? data.linkRetrospectiva2 : "",
        //         linkRetrospectiva3: data.linkRetrospectiva3 ? data.linkRetrospectiva3 : "",
        //         linkRetrospectiva4: data.linkRetrospectiva4 ? data.linkRetrospectiva4 : "",
        //         etapaFinalizada: data.qualEtapaFinalizada ? data.qualEtapaFinalizada : qualEtapaFinalizada
        //     })
        // } else {
        //     axios.post('/api/create-equipe', {
        //         nomeDaEquipe: nomeDaEquipe,
        //         quantidadeIntegrantes: quantidadeIntegrantes,
        //         seConhecem: seConhecem,
        //         definidor: definidor,
        //         facilitador: facilitador,
        //         responsavelTempo: responsavelTempo,
        //         linkRetrospectiva1:linkRetrospectiva1,
        //         linkRetrospectiva2:"",
        //         linkRetrospectiva3:"",
        //         linkRetrospectiva4:"",
        //         etapaFinalizada: qualEtapaFinalizada
        //     })
        // }
       
    }

    const handleFinalizarEtapas = (e) => {
        e.preventDefault()
        alert('Tudo finalizado na primeira etapa, liberado para a segunda etapa')
    }

    return(
        <Container>
            <div className="wrapper">

                <div className="content-page">

                    <div className="content-info">
                        <h1>Bem vindos a quarta etapa!</h1>
                    </div>


                    <div className="content-etapas">
                    
                        <Tabs allowScrollButtonsMobile={true} sx={{ '& .MuiTabs-flexContainer': { flexWrap: 'wrap' } }} TabIndicatorProps={{ sx: { display: 'none' } }} value={value} onChange={handleChange} aria-label="basic tabs example" className="tab-box">
                            <Tab disabled={isActive} wrapped fullWidth className="text-title tab-etapas" label="Aprimoramento da solução ou protótipo" {...a11yProps(0)} />
                            <Tab disabled={isActive} wrapped fullWidth className="text-title tab-etapas" label="Apresentação da Solução" {...a11yProps(1)} />
                            <Tab disabled={isActive} wrapped fullWidth className="text-title tab-etapas" label="Revisão do Processo" {...a11yProps(2)} />
                            <Tab disabled={isActive} wrapped fullWidth className="text-title tab-etapas" label="Avaliação" {...a11yProps(3)} />
                        </Tabs>
                        

                        <TabPanel value={value} index={0} className="border aprimoramento-solucao" >

                
                            <div className="info-etapa-text">

                                <h2 className="text-title-etapa">Aprimoramento da solução ou protótipo</h2>
                                <h4 className="text-subtitle">
                                    Etapa em que os participantes irão fazer atividades que tem como objetivo realizar a aplicação de melhorias no protótipo da solução com base
                                    nas respostas obtidas das validações/questionários aplicados para possíveis usuários realizados nas atividades da segunda etapa.
                                    Esta etapa contém atividades que permitem o aprimoramento do protótipo e a revisão do protótipo.
                                    <br /> <strong>Lembrem-se</strong>, cada atividade possui um tempo estimado para serem realizadas. O tempo é disponibilizado em cada atividade 
                                    e para acompanhar esse tempo lembre sempre de olhar para o relógio.

                                </h4>
                            </div>
                            
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
                     
                                        Nesta atividade vocês devem realizar a separação da equipe, ou seja, irão realizar algumas atividades
                                        individuais para que ao chegar na atividade de definição de papéis da equipe, todos já tenham se conhecido melhor. 
                                        <br />
                                        <br />

                                        <div className={`timer-box`}>
                                            <div className="content-timer">
                                                <Timer min={timeClock} isActive={isActive} setIsActive={setIsActive} setHasFinised={setHasFinised} setTimeStop={setTimeStop} />
                                            </div>
                                        </div>

                                        <Tabs allowScrollButtonsMobile={true} sx={{ '& .MuiTabs-flexContainer': { flexWrap: 'wrap' } }} TabIndicatorProps={{ sx: { display: 'none' } }} value={valueInside} onChange={handleChangeInside} aria-label="basic tabs example" className="tab-box">
                                            <Tab aria-selected={true} disabled={isActive} wrapped fullWidth className="text-title tab-etapas" label="Reformulação do esboço" {...a22yProps(0)} />
                                        </Tabs>

                                        <TabPanelInside value={valueInside} index={0} className="atv-container border">
                                    

                                            <h4 className="text-title-inside">
                                                Reformulação do protótipo com base nas respostas de pesquisas
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
                                                    <button className={`btn-atv ${isPaused || isActive ? 'selected' : ''}`} onClick={() => setTimeClock(15)} disabled={isActive}>Iniciar Atividade</button>
                                                
                                                        
                                                </div>
                                                
                                            </div>
                                        </TabPanelInside>


                                    <div className="finalizarAtv">
                                        <label>Finalizar Atividade?</label>
                                        <input className="checkbox-fin" type="checkbox" name="definicao-papeis" id="definicao-papeis" onChange={() => handleFinalizar('reformulacaoPrototipo')} /> Sim
                                    </div>
                                </AccordionDetails>
                            </Accordion>

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
                     
                                        Nesta atividade vocês devem realizar a separação da equipe, ou seja, irão realizar algumas atividades
                                        individuais para que ao chegar na atividade de definição de papéis da equipe, todos já tenham se conhecido melhor. 
                                        <br />
                                        <br />

                                        <div className={`timer-box`}>
                                            <div className="content-timer">
                                                <Timer min={timeClock} isActive={isActive} setIsActive={setIsActive} setHasFinised={setHasFinised} setTimeStop={setTimeStop} />
                                            </div>
                                        </div>

                                        <Tabs allowScrollButtonsMobile={true} sx={{ '& .MuiTabs-flexContainer': { flexWrap: 'wrap' } }} TabIndicatorProps={{ sx: { display: 'none' } }} value={valueInside} onChange={handleChangeInside} aria-label="basic tabs example" className="tab-box">
                                            <Tab aria-selected={true} disabled={isActive} wrapped fullWidth className="text-title tab-etapas" label="Revisão da solução ou protótipo" {...a22yProps(0)} />
                                        </Tabs>


                                        <TabPanelInside value={valueInside} index={0} className="atv-container border">
                                        

                                            <h4 className="text-title-inside">
                                                Revisão da solução ou protótipo
                                            </h4>
                                            <div className="box-atv">
                                                Nesta atividade vocês irão trabalhar <strong>individualmente</strong>. Cada integrante da equipe
                                                deve realizar a confecção do Jamboard disponível no link: <br />
                                                <a href="/etapa1" target="_blank">LINK AQUI</a>
                                                <br />
                                                <br />
                                                <div className="iniciar-atv">
             
                                                    <p>Antes de inciar a atividade lembrem-se que vocês têm <strong>10 minutos</strong> para finalizar a mesma.</p> 

                                                    <button className={`btn-atv ${isPaused || isActive ? 'selected' : ''}`} onClick={() => setTimeClock(10)} disabled={isActive}>Iniciar Atividade</button>

                                                </div>
                                                
                                            </div>
                                        </TabPanelInside>
                                       
                                    <div className="finalizarAtv">
                                        <label>Finalizar Atividade?</label>
                                        <input className="checkbox-fin" type="checkbox" name="definicao-papeis" id="definicao-papeis" onChange={() => handleFinalizar('revisaoSolucao')} /> Sim
                                    </div>
                                </AccordionDetails>
                            </Accordion>

                            <div className="btn-Box">
                                <button disabled={isActive} className={`btn-proxAtv ${isActive ? 'disabled' : ''}`} onClick={() => setValue((prev) => prev+1)}>Ir para as próximas atividades</button>
                            </div>

                        </TabPanel>

                        <TabPanel value={value} index={1} className="border apresentacao-solucao">
                            
                            <div className="info-etapa-text">

                                <h2 className="text-title-etapa">Apresentação da Solução</h2>
                                <h4 className="text-subtitle">
                                    Etapa em que os participantes irão realizar o agendamento de uma reunião com o mentor responsável pela equipe. Esta etapa tem como objetivo 
                                    finalizar o processo de desenvolvimento da solução, contendo atividades de apresentação da solução, para que a equipe mostre para o 
                                    mentor e a turma o protótipo confeccionado. 
                                    <br /> <strong>Lembrem-se</strong>, cada atividade possui um tempo estimado para serem realizadas. O tempo é disponibilizado em 
                                    cada atividade e para acompanhar esse tempo lembre sempre de olhar para o relógio.
                                </h4>
                            </div>

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
                                                <button className={`btn-atv ${isPaused || isActive ? 'selected' : ''}`} onClick={() => setTimeClock(5)} disabled={isActive}>Iniciar Atividade</button>  
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
                                                <button className={`btn-atv ${isPaused || isActive ? 'selected' : ''}`} onClick={() => setTimeClock(5)} disabled={isActive}>Iniciar Atividade</button>
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
                                                <button className={`btn-atv ${isPaused || isActive ? 'selected' : ''}`} onClick={() => setTimeClock(3)} disabled={isActive}>Iniciar Atividade</button>
                                            </div>
                                            
                                        </div>
                                    </TabPanelInside>
                                </AccordionDetails>

                                <div className="finalizarAtv">
                                        <label>Finalizar Atividade?</label>
                                        <input className="checkbox-fin" type="checkbox" name="definicao-papeis" id="definicao-papeis" onChange={() => handleFinalizar('apresentacaoSolucao')} /> Sim
                                    </div>
                            </Accordion>

                            <div className="btn-Box">
                                <button disabled={isActive} className={`btn-proxAtv ${isActive ? 'disabled' : ''}`} onClick={() => setValue((prev) => prev+1)}>Ir para as próximas atividades</button>
                            </div>
                        </TabPanel> {/*JA FOI FEITO*/}

                        <TabPanel value={value} index={2} className="border revisao-processo">

                            <div className="info-etapa-text">

                                <h2 className="text-title-etapa">Revisão do Processo</h2>
                                <h4 className="text-subtitle">
                                    Etapa em que os participantes irão realizar a revisão do processo. Esta etapa possui atividades que disponibilizam momentos para os integrantes 
                                    das equipes analisarem tudo que foi feito nas atividades das etapas anteriores e se necessário realize melhorias para as próximas etapas.
                                    <br /> <strong>Lembrem-se</strong>, cada atividade possui um tempo estimado para serem realizadas. O tempo é disponibilizado em cada atividade 
                                    e para acompanhar esse tempo lembre sempre de olhar para o relógio.
                                </h4>
                            </div>

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
                                                <button className={`btn-atv ${isPaused || isActive ? 'selected' : ''}`} onClick={() => setTimeClock(10)} disabled={isActive}>Iniciar Atividade</button>
                                               
                                            </div>

                                            <br />
                                            <br />

                                            <form onSubmit={handleInformacaoEquipe}>

                                                <FormControl fullWidth>
                                                    <label className="text-papel">Link da Retrospectiva preenchida</label>
                                                    <TextField required type={'text'} onChange={(e) => setLinkRetrospectiva(e.target.value)} fullWidth  margin="normal" size="small" placeholder="Informe o nome da equipe" variant="outlined" className="input-text" />                                                  
                                                    <Button type="submit" className="btn-formulario">Enviar Informações</Button>
                                                </FormControl>

                                            </form>
                                        
                                        </div>
                                        
                                    </TabPanelInside>

                                </AccordionDetails>
                                <div className="finalizarAtv">
                                        <label>Finalizar Atividade?</label>
                                        <input className="checkbox-fin" type="checkbox" name="definicao-papeis" id="definicao-papeis" onChange={() => handleFinalizar('retrospectiva')} /> Sim
                                    </div>
                            </Accordion>
                            
                            <div className="btn-Box">
                                <button disabled={isActive} className={`btn-proxAtv ${isActive ? 'disabled' : ''}`} onClick={() => setValue((prev) => prev+1)}>Ir para as próximas atividades</button>
                            </div>
                        </TabPanel> {/*JA FOI FEITO - FALTA COLOCAR O INPUT DE TEXTO*/}

                        <TabPanel value={value} index={3} className="border metodos-avaliacao">
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
                                    

                                    <Tabs allowScrollButtonsMobile={true} sx={{ '& .MuiTabs-flexContainer': { flexWrap: 'wrap' } }} TabIndicatorProps={{ sx: { display: 'none' } }} value={valueInside} onChange={handleChangeInside} aria-label="basic tabs example" className="tab-box">
                                        <Tab disabled={isActive} wrapped fullWidth className="text-title tab-etapas" label="Avaliação" {...a22yProps(0)} />
                                        
                                    </Tabs>
                                    
                                    <TabPanelInside value={valueInside} index={0} className="atv-container border">
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
                        </TabPanel> {/*JA FOI FEITO*/}

                    </div>

                </div>

            </div>

            <div className="finalizar-etapa">
                <button type="submit" className={`btn-finalEtapa ${etapaFinalizada ? 'finalizada-etapa' : ''}`} onClick={handleFinalizarEtapas}>FINALIZAR ETAPA</button>
            </div>

        </Container>
    )
}