import React, { useEffect, useState } from "react";

import { TabPanel } from '../../shared/components/TabPanel'
import { TabPanelInside } from '../../shared/components/TabPanelInside'
import { Timer } from '../../shared/components/Timer'

import { Tabs, Tab} from '@mui/material';
import { Accordion, AccordionDetails, AccordionSummary, FormControl, TextField, Button } from '@mui/material';
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

  
export const Etapa3 = (props) => {
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
        localStorage.setItem('boxState3', JSON.stringify(boxState))
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

    useEffect(() => {

        var count = 0

        for(var elem in boxState) {
            if(boxState[elem]) {
                count++
            }
        }

        if(count === Object.keys(boxState).length) {
            setEtapaFinalizada(true)
        } else {
            setEtapaFinalizada(false)
        }

    }, [boxState])

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

    const [etapaFinalizada, setEtapaFinalizada] = useState(false);

    const handleFinalizarEtapas = (e) => {
        e.preventDefault()
        alert('Tudo finalizado na primeira etapa, liberado para a segunda etapa')
    }

    return(
        <Container>
            <div className="wrapper">

                <div className="content-page">

                    <div className="content-info">
                        <h1>Bem vindos a terceira etapa!</h1>
                    </div>


                    <div className="content-etapas">
                    
                        <Tabs allowScrollButtonsMobile={true} sx={{ '& .MuiTabs-flexContainer': { flexWrap: 'wrap' } }} TabIndicatorProps={{ sx: { display: 'none' } }} value={value} onChange={handleChange} aria-label="basic tabs example" className="tab-box">
                            <Tab disabled={isActive} wrapped fullWidth className="text-title tab-etapas" label="Aprimoramento Esboço" {...a11yProps(0)} />
                            <Tab disabled={isActive} wrapped fullWidth className="text-title tab-etapas" label="Organização da testagem " {...a11yProps(1)} />
                            <Tab disabled={isActive} wrapped fullWidth className="text-title tab-etapas" label="Desenvolvimento e testagem" {...a11yProps(2)} />
                            <Tab disabled={isActive} wrapped fullWidth className="text-title tab-etapas" label="Mentoria" {...a11yProps(3)} />
                            <Tab disabled={isActive} wrapped fullWidth className="text-title tab-etapas" label="Validação Solução" {...a11yProps(4)} />
                            <Tab disabled={isActive} wrapped fullWidth className="text-title tab-etapas" label="Aprimoramento Protótipo" {...a11yProps(5)} />
                            <Tab disabled={isActive} wrapped fullWidth className="text-title tab-etapas" label="Revisão do Processo" {...a11yProps(6)} />
                            <Tab disabled={isActive} wrapped fullWidth className="text-title tab-etapas" label="Avaliação" {...a11yProps(7)} />
                        </Tabs>
                        

                        <TabPanel value={value} index={0} className="border aprimoramento-esboco" >

                
                            <div className="info-etapa-text">

                                <h2 className="text-title-etapa">Aprimoramento do Esboço</h2>
                                <h4 className="text-subtitle">
                                    Etapa em que os participantes irão fazer atividades que tem como objetivo realizar a aplicação de melhorias no esboço da solução com base
                                    nas respostas obtidas das validações/questionários aplicados para possíveis usuários realizados nas atividades da segunda etapa.
                                    Esta etapa contém atividades que permitem o aprimoramento do esboço e a revisão do esboço.
                                    <br /> <strong>Lembrem-se</strong>, cada atividade possui um tempo estimado para serem realizadas. O tempo é disponibilizado em cada atividade 
                                    e para acompanhar esse tempo lembre sempre de olhar para o relógio.

                                </h4>
                            </div>
                            
                            <Accordion className={`box-accordion`} expanded={expanded === 'panel1a'} onChange={handleOpenBox('panel1a')} disabled={isActive}>
                                <AccordionSummary
                                expandIcon={<ExpandMoreIcon className="icon-exp" />}
                                aria-controls="panel1bh-content"
                                id="panel1bh-header"
                                className={`${boxState['reformulacaoEsboco'] ? 'finalizada' : ''}`}>
                                <Typography className={`text-title ${boxState['reformulacaoEsboco'] ? 'finalizada' : ''}`}>
                                    Reformulação do esboço
                                </Typography>
                                
                                </AccordionSummary>
                                <AccordionDetails className={`${!isOpenAccordion ? 'aberto' : ''}`}>
                     
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
                                                Reformulação do esboço com base nas respostas de pesquisas
                                            </h4>
                                            <div className="box-atv">
                                                Nesta atividade vocês deverão trabalhar em <strong>grupo</strong>. O grupo deve realizar a reformulação de pontos obtidos das pesquisas
                                                aplicadas na etapa anterior, realizando a análise se é viável ou não aplicar as melhorias que foram apontadas pelas respostas dos questionários
                                                e pesquisas realizadas.
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
                                        <input checked={boxState['reformulacaoEsboco']} className="checkbox-fin" type="checkbox" name="definicao-papeis" id="definicao-papeis" onChange={() => handleFinalizar('reformulacaoEsboco')} /> Sim
                                    </div>
                                </AccordionDetails>
                            </Accordion>

                            <Accordion className={`box-accordion`} expanded={expanded === 'panel2a'} onChange={handleOpenBox('panel2a')} disabled={isActive}>
                                <AccordionSummary
                                expandIcon={<ExpandMoreIcon className="icon-exp" />}
                                aria-controls="panel1bh-content"
                                id="panel1bh-header"
                                className={`${boxState['revisaoEsboco'] ? 'finalizada' : ''}`}>
                                <Typography className={`text-title ${boxState['revisaoEsboco'] ? 'finalizada' : ''}`}>
                                    Revisão de esboço
                                </Typography>
                                
                                </AccordionSummary>
                                <AccordionDetails className={`${!isOpenAccordion ? 'aberto' : ''}`}>
                     
                                       
                                        <div className={`timer-box`}>
                                            <div className="content-timer">
                                                <Timer min={timeClock} isActive={isActive} setIsActive={setIsActive} setHasFinised={setHasFinised} setTimeStop={setTimeStop} />
                                            </div>
                                        </div>

                                        <Tabs allowScrollButtonsMobile={true} sx={{ '& .MuiTabs-flexContainer': { flexWrap: 'wrap' } }} TabIndicatorProps={{ sx: { display: 'none' } }} value={valueInside} onChange={handleChangeInside} aria-label="basic tabs example" className="tab-box">
                                            <Tab aria-selected={true} disabled={isActive} wrapped fullWidth className="text-title tab-etapas" label="Revisão de esboço" {...a22yProps(0)} />
                                        </Tabs>


                                        <TabPanelInside value={valueInside} index={0} className="atv-container border">
                                        

                                            <h4 className="text-title-inside">
                                                Revisão de esboço
                                            </h4>
                                            <div className="box-atv">
                                            Nesta atividade vocês deverão trabalhar em <strong>grupo</strong>. O grupo deve realizar a revisão do esboço com base na reformulação
                                            feita na atividade anterior, podendo levar em conta a análise feita, os comentários obtidos dos questionários aplicados
                                            e novas ideias que podem vim a surgir dos integrantes após essa rodada de validação.
                                            <br />
                                            <br />

                                                <div className="iniciar-atv">
             
                                                    <p>Antes de inciar a atividade lembrem-se que vocês têm <strong>10 minutos</strong> para finalizar a mesma.</p> 

                                                    <button className={`btn-atv ${isPaused || isActive ? 'selected' : ''}`} onClick={() => setTimeClock(10)} disabled={isActive}>Iniciar Atividade</button>

                                                </div>
                                                
                                            </div>
                                        </TabPanelInside>
                                       
                                   
                                </AccordionDetails>
                                <div className="finalizarAtv">
                                        <label>Finalizar Atividade?</label>
                                        <input checked={boxState['revisaoEsboco']} className="checkbox-fin" type="checkbox" name="definicao-papeis" id="definicao-papeis" onChange={() => handleFinalizar('revisaoEsboco')} /> Sim
                                    </div>
                            </Accordion>

                            <div className="btn-Box">
                                <button disabled={isActive} className={`btn-proxAtv ${isActive ? 'disabled' : ''}`} onClick={() => setValue((prev) => prev+1)}>Ir para as próximas atividades</button>
                            </div>

                        </TabPanel>

                        <TabPanel value={value} index={1} className="border testagem">

                            <div className="info-etapa-text">

                                <h2 className="text-title-etapa">Organização da testagem da solução ou protótipo</h2>
                                <h4 className="text-subtitle">
                                    Etapa em que os participantes os participantes são responsáveis por realizar a escolha da forma de materializar a solução/protótipo ideado,
                                    e após a escolha, as equipes irão iniciar as atividades para a preparação dos testes com usuários.
                                    <br /> <strong>Lembrem-se</strong>, cada atividade possui um tempo estimado para serem realizadas. O tempo é disponibilizado em 
                                    cada atividade e para acompanhar esse tempo lembre sempre de olhar para o relógio.
                                </h4>
                            </div>

                            <Accordion className="box-accordion" expanded={expanded === 'panel1b'} onChange={handleOpenBox('panel1b')} disabled={isActive}>
                                <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1bh-content"
                                id="panel1bh-header"
                                className={`${boxState['ferramentas'] ? 'finalizada' : ''}`}>
                                <Typography className={`text-title ${boxState['ferramentas'] ? 'finalizada' : ''}`}>
                                    Escolha de ferramentas para construção de protótipo
                                </Typography>
                                
                                </AccordionSummary>
                                <AccordionDetails className={`${!isOpenAccordion ? 'aberto' : ''}`}>
                                <div>
                                    Nesta atividade vocês irão realizar a escolha da ferramenta que será utilizada para realizar a construção solução mapeada.
                                    <br />
                                    <br />

                                    <div className={`timer-box`}>
                                        <div className="content-timer">
                                            <Timer min={timeClock} isActive={isActive} setIsActive={setIsActive} setHasFinised={setHasFinised}></Timer>
                                        </div>
                                    </div>

                                    <Tabs allowScrollButtonsMobile={true} sx={{ '& .MuiTabs-flexContainer': { flexWrap: 'wrap' } }} TabIndicatorProps={{ sx: { display: 'none' } }} value={valueInside} onChange={handleChangeInside} aria-label="basic tabs example" className="tab-box">
                                        <Tab disabled={isActive} wrapped fullWidth className="text-title tab-etapas" label="Escolha de ferramenta" {...a22yProps(0)} />
                                    </Tabs>

                                    <TabPanelInside value={valueInside} index={0} className="atv-container border">
                
                                        <h4 className="text-title-inside">
                                            Escolha de ferramenta para materializar solução ou protótipo ideado
                                        </h4>
                                        <div className="box-atv">
                                            Nesta atividade vocês deverão trabalhar <strong>individualmente</strong>. Cada integrante da equipe
                                            deve realizar a pesquisa de possíveis soluções que deseja que a equipe desenvolva uma solução. 
                                        
                                            <br />
                                            <br />
                                            <div className="iniciar-atv">
                                                <p>Antes de inciar a atividade lembrem-se que vocês têm <strong>30 minutos</strong> para finalizar a mesma.</p> 
                                                <button className={`btn-atv ${isPaused || isActive ? 'selected' : ''}`} onClick={() => setTimeClock(30)} disabled={isActive}>Iniciar Atividade</button>
                                             
                                            </div>
                                            
                                        </div>
                                    </TabPanelInside>

                                    <div className="finalizarAtv">
                                        <label>Finalizar Atividade?</label>
                                        <input checked={boxState['ferramentas']} className="checkbox-fin" type="checkbox" name="definicao-papeis" id="definicao-papeis" onChange={() => handleFinalizar('ferramentas')} /> Sim
                                    </div>
                                </div>
                                </AccordionDetails>
                            </Accordion>

                            <Accordion className="box-accordion" expanded={expanded === 'panel2b'} onChange={handleOpenBox('panel2b')} disabled={isActive}>
                                <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel2bh-content"
                                id="panel2bh-header"
                                className={`${boxState['preparacaoTestes'] ? 'finalizada' : ''}`}
                                >
                                <Typography className={`text-title ${boxState['preparacaoTestes'] ? 'finalizada' : ''}`}>Preparação de testes</Typography>
                                </AccordionSummary>
                                <AccordionDetails className={`${!isOpenAccordion ? 'aberto' : ''}`}>
                                    <div className={`timer-box`}>
                                        <div className="content-timer">
                                            <Timer min={timeClock} isActive={isActive} setIsActive={setIsActive} setHasFinised={setHasFinised}></Timer>
                                        </div>
                                    </div>
                                    <Tabs allowScrollButtonsMobile={true} sx={{ '& .MuiTabs-flexContainer': { flexWrap: 'wrap' } }} TabIndicatorProps={{ sx: { display: 'none' } }} value={valueInside} onChange={handleChangeInside} aria-label="basic tabs example" className="tab-box">
                                        <Tab disabled={isActive} wrapped fullWidth className="text-title tab-etapas" label="Preparação de testes" {...a22yProps(0)} />
                                    </Tabs>

                                    <TabPanelInside value={valueInside} index={0} className="atv-container border">
                                    
                                        <h4 className="text-title-inside">
                                            Preparação de testes com usuários
                                        </h4>
                                        <div className="box-atv">
                                            Nesta atividade vocês deverão trabalhar em <strong>grupo</strong>. A equipe será responsável por realizar o preparo dos testes a serem
                                            realizados no protótipo com os usuários escolhidos, sejam eles reais ou fictícios. Ficando a cargo da equipe o tipo de teste e a forma
                                            como o mesmo será aplicado.
                                                                                
                                            <br />
                                            <br />

                                            
                                            <div className="iniciar-atv">
                                                <p>Antes de inciar a atividade lembrem-se que vocês têm <strong>30 minutos</strong> para finalizar a mesma.</p> 
                                                <button className={`btn-atv ${isPaused || isActive ? 'selected' : ''}`} onClick={() => setTimeClock(30)} disabled={isActive}>Iniciar Atividade</button>
                                                
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
                                                <button className={`btn-atv ${isPaused || isActive ? 'selected' : ''}`} onClick={() => setTimeClock(5)} disabled={isActive}>Iniciar Atividade</button>
                                             
                                                    
                                            </div>
                                            
                                        </div>
                                    </TabPanelInside>
                                </AccordionDetails>

                                <div className="finalizarAtv">
                                        <label>Finalizar Atividade?</label>
                                        <input checked={boxState['preparacaoTestes']} className="checkbox-fin" type="checkbox" name="definicao-papeis" id="definicao-papeis" onChange={() => handleFinalizar('preparacaoTestes')} /> Sim
                                    </div>
                            </Accordion>

                            <div className="btn-Box">
                                <button disabled={isActive} className={`btn-proxAtv ${isActive ? 'disabled' : ''}`} onClick={() => setValue((prev) => prev+1)}>Ir para as próximas atividades</button>
                            </div>

                        </TabPanel>

                        <TabPanel value={value} index={2} className="border desenvolvimento-testagem">
                            
                            <div className="info-etapa-text">

                                <h2 className="text-title-etapa">Desenvolvimento e testagem da solução ou protótipo</h2>
                                <h4 className="text-subtitle">
                                    Etapa em que os participantes irão iniciar a confecção do protótipo na ferramenta escolhida na etapa anterior, após finalizar a construção 
                                    do protótipo, a equipe iniciará atividades de aplicação dos testes com usuários. Esta etapa tem como objetivo 
                                    iniciar o processo de confecção do protótipo e realizar a testagem desse protótipo. <br /> <strong>Lembrem-se</strong>, 
                                    cada atividade possui um tempo estimado para serem realizadas. O tempo é disponibilizado em cada atividade e para acompanhar esse 
                                    tempo lembre sempre de olhar para o relógio.

                                </h4>
                            </div>

                            <Accordion className="box-accordion" expanded={expanded === 'panel1c'} onChange={handleOpenBox('panel1c')} disabled={isActive}>
                                <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel3bh-content"
                                id="panel3bh-header"
                                className={`${boxState['construcao'] ? 'finalizada' : ''}`}
                                >
                                <Typography className={`text-title ${boxState['construcao'] ? 'finalizada' : ''}`}>
                                    Construção de um modelo ou protótipo
                                </Typography>
                                </AccordionSummary>
                                <AccordionDetails className={`${!isOpenAccordion ? 'aberto' : ''}`}>
                                    <div className={`timer-box`}>
                                        <div className="content-timer">
                                            <Timer min={timeClock} isActive={isActive} setIsActive={setIsActive} setHasFinised={setHasFinised}></Timer>
                                        </div>
                                    </div>
                                    <Tabs allowScrollButtonsMobile={true} sx={{ '& .MuiTabs-flexContainer': { flexWrap: 'wrap' } }} TabIndicatorProps={{ sx: { display: 'none' } }} value={valueInside} onChange={handleChangeInside} aria-label="basic tabs example" className="tab-box">
                                        <Tab disabled={isActive} wrapped fullWidth className="text-title tab-etapas" label="Construção do modelo ou protótipo" {...a22yProps(0)} />
                                    </Tabs>

                                    <TabPanelInside value={valueInside} index={0} className="atv-container border" >
                                    

                                        <h4 className="text-title-inside">
                                            Construção de um modelo ou protótipo
                                        </h4>
                                        <div className="box-atv">
                                            Nesta atividade vocês deverão trabalhar em <strong>grupo</strong> ou <strong>individualmente</strong>. O grupo irá realizar a 
                                            construção do protótipo na ferramenta escolhida.
                                            <br />
                                            <br />
                                            
                                            <div className="iniciar-atv">
                                                <p>Antes de inciar a atividade lembrem-se que vocês têm <strong>1 hora e 30 minutos</strong> para finalizar a mesma.</p> 
                                                <button className={`btn-atv ${isPaused || isActive ? 'selected' : ''}`} onClick={() => setTimeClock(60)} disabled={isActive}>Iniciar Atividade</button>
                                              
                                                    
                                            </div>
                                            
                                        </div>
                                    </TabPanelInside>

                                   
                                </AccordionDetails>

                                <div className="finalizarAtv">
                                        <label>Finalizar Atividade?</label>
                                        <input checked={boxState['construcao']} className="checkbox-fin" type="checkbox" name="definicao-papeis" id="definicao-papeis" onChange={() => handleFinalizar('construcao')} /> Sim
                                    </div>
                            </Accordion>

                            <Accordion className="box-accordion" expanded={expanded === 'panel2c'} onChange={handleOpenBox('panel2c')} disabled={isActive}>
                                <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel3bh-content"
                                id="panel3bh-header"
                                className={`${boxState['testagem'] ? 'finalizada' : ''}`}
                                >
                                <Typography className={`text-title ${boxState['testagem'] ? 'finalizada' : ''}`}>
                                    Testagem da solução ou protótipo
                                </Typography>
                                </AccordionSummary>
                                <AccordionDetails className={`${!isOpenAccordion ? 'aberto' : ''}`}>
                                    <div className={`timer-box`}>
                                        <div className="content-timer">
                                            <Timer min={timeClock} isActive={isActive} setIsActive={setIsActive} setHasFinised={setHasFinised}></Timer>
                                        </div>
                                    </div>
                                    <Tabs allowScrollButtonsMobile={true} sx={{ '& .MuiTabs-flexContainer': { flexWrap: 'wrap' } }} TabIndicatorProps={{ sx: { display: 'none' } }} value={valueInside} onChange={handleChangeInside} aria-label="basic tabs example" className="tab-box">
                                        <Tab disabled={isActive} wrapped fullWidth className="text-title tab-etapas" label="Testagem da solução ou protótipo" {...a22yProps(0)} />
                                    </Tabs>

                                    <TabPanelInside value={valueInside} index={0} className="atv-container border" >
                                    

                                        <h4 className="text-title-inside">
                                            Testagem da solução ou protótipo
                                        </h4>
                                        <div className="box-atv">
                                            Nesta atividade vocês deverão trabalhar em <strong>grupo</strong>. O grupo deve irá realizar a aplicação dos testes preparados para os
                                            usuários que o grupo selecionou e realizar a documentação dos resultados obtidos com a aplicação dos testes.
                                            <br />
                                            <br />
                                            
                                            <div className="iniciar-atv">
                                                <p>Antes de inciar a atividade lembrem-se que vocês têm <strong>30 minutos</strong> para finalizar a mesma.</p> 
                                                <button className={`btn-atv ${isPaused || isActive ? 'selected' : ''}`} onClick={() => setTimeClock(30)} disabled={isActive}>Iniciar Atividade</button>
                                              
                                                    
                                            </div>
                                            
                                        </div>
                                    </TabPanelInside>

                                   
                                </AccordionDetails>

                                <div className="finalizarAtv">
                                        <label>Finalizar Atividade?</label>
                                        <input checked={boxState['testagem']} className="checkbox-fin" type="checkbox" name="definicao-papeis" id="definicao-papeis" onChange={() => handleFinalizar('testagem')} /> Sim
                                    </div>
                            </Accordion>

                            <Accordion className="box-accordion" expanded={expanded === 'panel3c'} onChange={handleOpenBox('panel3c')} disabled={isActive}>
                                <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel3bh-content"
                                id="panel3bh-header"
                                className={`${boxState['avaliacaoTestagem'] ? 'finalizada' : ''}`}
                                >
                                <Typography className={`text-title ${boxState['avaliacaoTestagem'] ? 'finalizada' : ''}`}>
                                    Avaliação dos resultados da testagem
                                </Typography>
                                </AccordionSummary>
                                <AccordionDetails className={`${!isOpenAccordion ? 'aberto' : ''}`}>
                                    <div className={`timer-box`}>
                                        <div className="content-timer">
                                            <Timer min={timeClock} isActive={isActive} setIsActive={setIsActive} setHasFinised={setHasFinised}></Timer>
                                        </div>
                                    </div>
                                    <Tabs allowScrollButtonsMobile={true} sx={{ '& .MuiTabs-flexContainer': { flexWrap: 'wrap' } }} TabIndicatorProps={{ sx: { display: 'none' } }} value={valueInside} onChange={handleChangeInside} aria-label="basic tabs example" className="tab-box">
                                        <Tab disabled={isActive} wrapped fullWidth className="text-title tab-etapas" label="Avaliação dos resultados" {...a22yProps(0)} />
                                    </Tabs>

                                    <TabPanelInside value={valueInside} index={0} className="atv-container border" >
                                    

                                        <h4 className="text-title-inside">
                                            Avaliação dos resultados da testagem
                                        </h4>
                                        <div className="box-atv">
                                            Nesta atividade vocês deverão trabalhar em <strong>grupo</strong>. O grupo deve realizar a análise dos resultados obtidos dos testes
                                            aplicados na etapa anterior.
                                            <br />
                                            <br />
                                            
                                            <div className="iniciar-atv">
                                                <p>Antes de inciar a atividade lembrem-se que vocês têm <strong>40 minutos</strong> para finalizar a mesma.</p> 
                                                <button className={`btn-atv ${isPaused || isActive ? 'selected' : ''}`} onClick={() => setTimeClock(40)} disabled={isActive}>Iniciar Atividade</button>
                                              
                                                    
                                            </div>
                                            
                                        </div>
                                    </TabPanelInside>

                                   
                                </AccordionDetails>

                                <div className="finalizarAtv">
                                        <label>Finalizar Atividade?</label>
                                        <input checked={boxState['avaliacaoTestagem']} className="checkbox-fin" type="checkbox" name="definicao-papeis" id="definicao-papeis" onChange={() => handleFinalizar('avaliacaoTestagem')} /> Sim
                                    </div>
                            </Accordion>

                            <Accordion className="box-accordion" expanded={expanded === 'panel4c'} onChange={handleOpenBox('panel4c')} disabled={isActive}>
                                <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel3bh-content"
                                id="panel3bh-header"
                                className={`${boxState['apresentacao'] ? 'finalizada' : ''}`}
                                >
                                <Typography className={`text-title ${boxState['apresentacao'] ? 'finalizada' : ''}`}>
                                    Preparação da apresentação
                                </Typography>
                                </AccordionSummary>
                                <AccordionDetails className={`${!isOpenAccordion ? 'aberto' : ''}`}>
                                    <div className={`timer-box`}>
                                        <div className="content-timer">
                                            <Timer min={timeClock} isActive={isActive} setIsActive={setIsActive} setHasFinised={setHasFinised}></Timer>
                                        </div>
                                    </div>
                                    <Tabs allowScrollButtonsMobile={true} sx={{ '& .MuiTabs-flexContainer': { flexWrap: 'wrap' } }} TabIndicatorProps={{ sx: { display: 'none' } }} value={valueInside} onChange={handleChangeInside} aria-label="basic tabs example" className="tab-box">
                                        <Tab disabled={isActive} wrapped fullWidth className="text-title tab-etapas" label="Preparação da apresentação" {...a22yProps(0)} />
                                    </Tabs>

                                    <TabPanelInside value={valueInside} index={0} className="atv-container border" >
                                    

                                        <h4 className="text-title-inside">
                                            Preparação da apresentação para a mentoria
                                        </h4>
                                        <div className="box-atv">
                                            Nesta atividade vocês deverão trabalhar em <strong>grupo</strong>. O grupo deve realizar a preparação da apresentação do seu grupo 
                                            para o mentor. A apresentação pode ser rápida, apenas para que o mentor saiba qual solução sua equipe desenvolveu e mostrar o
                                            protótipo desenvolvido.
                                            <br />
                                            <br />
                                            
                                            <div className="iniciar-atv">
                                                <p>Antes de inciar a atividade lembrem-se que vocês têm <strong>20 minutos</strong> para finalizar a mesma.</p> 
                                                <button className={`btn-atv ${isPaused || isActive ? 'selected' : ''}`} onClick={() => setTimeClock(20)} disabled={isActive}>Iniciar Atividade</button>
                                              
                                                    
                                            </div>
                                            
                                        </div>
                                    </TabPanelInside>

                                   
                                </AccordionDetails>

                                <div className="finalizarAtv">
                                        <label>Finalizar Atividade?</label>
                                        <input checked={boxState['apresentacao']} className="checkbox-fin" type="checkbox" name="definicao-papeis" id="definicao-papeis" onChange={() => handleFinalizar('apresentacao')} /> Sim
                                    </div>
                            </Accordion>


                            <div className="btn-Box">
                                <button disabled={isActive} className={`btn-proxAtv ${isActive ? 'disabled' : ''}`} onClick={() => setValue((prev) => prev+1)}>Ir para as próximas atividades</button>
                            </div>
                        

                        </TabPanel>

                        <TabPanel value={value} index={3} className="border mentoria">
                            
                            <div className="info-etapa-text">

                                <h2 className="text-title-etapa">Mentoria</h2>
                                <h4 className="text-subtitle">
                                    Etapa em que os participantes irão realizar o agendamento de uma reunião com o mentor responsável pela equipe. Esta etapa tem como objetivo 
                                    iniciar o processo de validação da ideia, pois contém atividades que incentivam a apresentação ao mentor e com isso gerar possíveis melhorias à
                                    serem aplicadas no desenvolvimento do protótipo da solução/problema mapeado. 
                                    <br /> <strong>Lembrem-se</strong>, cada atividade possui um tempo estimado para serem realizadas. O tempo é disponibilizado em 
                                    cada atividade e para acompanhar esse tempo lembre sempre de olhar para o relógio.
                                </h4>
                            </div>

                            <Accordion className="box-accordion" expanded={expanded === 'panel1d'} onChange={handleOpenBox('panel1d')} disabled={isActive}>
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
                                            seus integrantes e a solução que irá desenvolver) para o mentor. A apresentação pode ser rápida, 
                                            apenas para que o mentor saiba qual solução sua equipe irá desenvolver e mostrar como está o desenvolvimento do protótipo. Após a equipe
                                            realizar a apresentação, o grupo pode realizar a primeira validação da ideia com o mentor, fazendo perguntas sobre o tema escolhido 
                                            para desenvolver, sobre o protótipo desenvolvido, etc.
                                            <br />
                                            <br />
                                            
                                            <div className="iniciar-atv">
                                                <p>Antes de inciar a atividade lembrem-se que vocês têm <strong>15 minutos</strong> para finalizar a mesma.</p> 
                                                <button className={`btn-atv ${isPaused || isActive ? 'selected' : ''}`} onClick={() => setTimeClock(15)} disabled={isActive}>Iniciar Atividade</button>
                                              
                                                    
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
                                            Nesta atividade vocês deverão trabalhar em <strong>grupo</strong>. O grupo deve realizar uma rápida apresentação do seu grupo 
                                            (informando o nome da equipe, seus integrantes e a solução que irá desenvolver) para a turma. A apresentação pode ser rápida, 
                                            apenas para que a turma conheça a solução que sua equipe irá desenvolver e mostrar mostrar o desenvolvimento do protótipo.
                                                                        
                                            <br />
                                            <br />
                                            <div className="iniciar-atv">
                                                <p>Antes de inciar a atividade lembrem-se que vocês têm <strong>5 minutos</strong> para finalizar a mesma.</p> 
                                                <button className={`btn-atv ${isPaused || isActive ? 'selected' : ''}`} onClick={() => setTimeClock(5)} disabled={isActive}>Iniciar Atividade</button>
                                                
                                               
                                                    
                                            </div>
                                            
                                        </div>
                                    </TabPanelInside>
                                </AccordionDetails>

                                <div className="finalizarAtv">
                                        <label>Finalizar Atividade?</label>
                                        <input checked={boxState['mentoria']} className="checkbox-fin" type="checkbox" name="definicao-papeis" id="definicao-papeis" onChange={() => handleFinalizar('mentoria')} /> Sim
                                    </div>
                            </Accordion>

                            <div className="btn-Box">
                                <button disabled={isActive} className={`btn-proxAtv ${isActive ? 'disabled' : ''}`} onClick={() => setValue((prev) => prev+1)}>Ir para as próximas atividades</button>
                            </div>
                        

                        </TabPanel>

                        <TabPanel value={value} index={4} className="border validacao-solucao">

                            <div className="info-etapa-text">

                                <h2 className="text-title-etapa">Validação da Solução</h2>
                                <h4 className="text-subtitle">
                                    Etapa em que os participantes irão realizar a validação do protótipo confeccionado nas etapas anteriores. A etapa possui 
                                    atividades que visam incentivar o processo de validação, disponibilizando tempo para aplicar questionários sobre o protótipo desenvolvido.
                                    <br /> <strong>Lembrem-se</strong>, cada atividade possui um tempo estimado para serem realizadas. O tempo é disponibilizado em 
                                    cada atividade e para acompanhar esse tempo lembre sempre de olhar para o relógio.
                                </h4>
                            </div>
                        
                            <Accordion className="box-accordion" expanded={expanded === 'panel1e'} onChange={handleOpenBox('panel1e')} disabled={isActive}>
                                <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel2bh-content"
                                id="panel2bh-header"
                                className={`${boxState['pesquisaValidacao'] ? 'finalizada' : ''}`}
                                >
                                <Typography className={`text-title ${boxState['pesquisaValidacao'] ? 'finalizada' : ''}`}>Pesquisa de validação do protótipo</Typography>
                                </AccordionSummary>
                                <AccordionDetails className={`${!isOpenAccordion ? 'aberto' : ''}`}>
                                    <div className={`timer-box`}>
                                        <div className="content-timer">
                                            <Timer min={timeClock} isActive={isActive} setIsActive={setIsActive} setHasFinised={setHasFinised}></Timer>
                                        </div>
                                    </div>
                                    <Tabs allowScrollButtonsMobile={true} sx={{ '& .MuiTabs-flexContainer': { flexWrap: 'wrap' } }} TabIndicatorProps={{ sx: { display: 'none' } }} value={valueInside} onChange={handleChangeInside} aria-label="basic tabs example" className="tab-box">
                                        <Tab disabled={isActive} wrapped fullWidth className="text-title tab-etapas" label="Pesquisa de validação" {...a22yProps(0)} />
                                        
                                    </Tabs>

                                    <TabPanelInside value={valueInside} index={0} className="atv-container border">
                                    

                                        <h4 className="text-title-inside">
                                            Pesquisa rápida com conhecidos sobre o protótipo do problema/ideia confeccionado
                                        </h4>
                                        <div className="box-atv">
                                            Nesta atividade vocês deverão trabalhar em <strong>grupo</strong>. O grupo deve realizar uma rápida apresentação e pesquisa sobre
                                            o protótipo com conhecidos, podendo ser apresentados em formulários, curtos para que seja fácil de recolher a percepção de pessoas
                                            de fora do grupo sobre o protótipo construído. 
                                            <br />
                                            <br />
                                            
                                            <div className="iniciar-atv">
                                                <p>Antes de inciar a atividade lembrem-se que vocês têm <strong>30 minutos</strong> para finalizar a mesma.</p> 
                                                <button className={`btn-atv ${isPaused || isActive ? 'selected' : ''}`} onClick={() => setTimeClock(30)} disabled={isActive}>Iniciar Atividade</button>
                                              
                                                    
                                            </div>
                                            
                                        </div>
                                    </TabPanelInside>
                                </AccordionDetails>
                                <div className="finalizarAtv">
                                        <label>Finalizar Atividade?</label>
                                        <input checked={boxState['pesquisaValidacao']} className="checkbox-fin" type="checkbox" name="definicao-papeis" id="definicao-papeis" onChange={() => handleFinalizar('pesquisaValidacao')} /> Sim
                                    </div>
                            </Accordion>

                            <div className="btn-Box">
                                <button disabled={isActive} className={`btn-proxAtv ${isActive ? 'disabled' : ''}`} onClick={() => setValue((prev) => prev+1)}>Ir para as próximas atividades</button>
                            </div>
                        

                        </TabPanel>

                        <TabPanel value={value} index={5} className="border aprimoramento-prototipo" >

                            <div className="info-etapa-text">

                                <h2 className="text-title-etapa">Aprimoramento da solução ou protótipo</h2>
                                <h4 className="text-subtitle">
                                    Etapa em que os participantes irão fazer atividades que tem como objetivo realizar a aplicação de melhorias no protótipo da solução com base
                                    nas respostas obtidas das validações/questionários aplicados nas etapas anteriores.
                                    Esta etapa contém atividades que permitem o aprimoramento do protótipo e a revisão do protótipo, além de conter atividades de testagem do 
                                    protótipo melhorado, se necessário.
                                    <br /> <strong>Lembrem-se</strong>, cada atividade possui um tempo estimado para serem realizadas. O tempo é disponibilizado em cada atividade 
                                    e para acompanhar esse tempo lembre sempre de olhar para o relógio.

                                </h4>
                            </div>

                            <Accordion className={`box-accordion`} expanded={expanded === 'panel1f'} onChange={handleOpenBox('panel1f')} disabled={isActive}>
                                <AccordionSummary
                                expandIcon={<ExpandMoreIcon className="icon-exp" />}
                                aria-controls="panel1bh-content"
                                id="panel1bh-header"
                                className={`${boxState['reformulacaoPrototipo'] ? 'finalizada' : ''}`}>
                                <Typography className={`text-title ${boxState['reformulacaoPrototipo'] ? 'finalizada' : ''}`}>
                                    Reformulação da solução ou protótipo com base nas respostas de pesquisas
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
                                            <Tab aria-selected={true} disabled={isActive} wrapped fullWidth className="text-title tab-etapas" label="Reformulação do protótipo" {...a22yProps(0)} />
                                        </Tabs>


                                        <TabPanelInside value={valueInside} index={0} className="atv-container border">
                                        

                                            <h4 className="text-title-inside">
                                                Reformulação da solução ou protótipo com base nas respostas de pesquisas
                                            </h4>
                                            <div className="box-atv">
                                                Nesta atividade vocês irão trabalhar <strong>individualmente</strong>. Cada integrante da equipe
                                                deve realizar a confecção do Jamboard disponível no link: <br />
                                                <a href="/etapa1" target="_blank">LINK AQUI</a>
                                                <br />
                                                <br />
                                                <div className="iniciar-atv">

                                                    <p>Antes de inciar a atividade lembrem-se que vocês têm <strong>1 hora</strong> para finalizar a mesma.</p> 

                                                    <button className={`btn-atv ${isPaused || isActive ? 'selected' : ''}`} onClick={() => setTimeClock(60)} disabled={isActive}>Iniciar Atividade</button>

                                                </div>
                                                
                                            </div>
                                        </TabPanelInside>
    
                                    <div className="finalizarAtv">
                                        <label>Finalizar Atividade?</label>
                                        <input checked={boxState['reformulacaoPrototipo']} className="checkbox-fin" type="checkbox" name="definicao-papeis" id="definicao-papeis" onChange={() => handleFinalizar('reformulacaoPrototipo')} /> Sim
                                    </div>
                                </AccordionDetails>
                            </Accordion>

                            <Accordion className={`box-accordion`} expanded={expanded === 'panel2f'} onChange={handleOpenBox('panel2f')} disabled={isActive}>
                                <AccordionSummary
                                expandIcon={<ExpandMoreIcon className="icon-exp" />}
                                aria-controls="panel1bh-content"
                                id="panel1bh-header"
                                className={`${boxState['revisaoPrototipo'] ? 'finalizada' : ''}`}>
                                <Typography className={`text-title ${boxState['revisaoPrototipo'] ? 'finalizada' : ''}`}>
                                    Revisão da solução
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
                                            <Tab aria-selected={true} disabled={isActive} wrapped fullWidth className="text-title tab-etapas" label="Revisão da solução" {...a22yProps(0)} />
                                        </Tabs>


                                        <TabPanelInside value={valueInside} index={0} className="atv-container border">
                                        

                                            <h4 className="text-title-inside">
                                                Revisão da solução
                                            </h4>
                                            <div className="box-atv">
                                                Nesta atividade vocês irão trabalhar <strong>individualmente</strong>. Cada integrante da equipe
                                                deve realizar a confecção do Jamboard disponível no link: <br />
                                                <a href="/etapa1" target="_blank">LINK AQUI</a>
                                                <br />
                                                <br />
                                                <div className="iniciar-atv">

                                                    <p>Antes de inciar a atividade lembrem-se que vocês têm <strong>30 minutos</strong> para finalizar a mesma.</p> 

                                                    <button className={`btn-atv ${isPaused || isActive ? 'selected' : ''}`} onClick={() => setTimeClock(30)} disabled={isActive}>Iniciar Atividade</button>

                                                </div>
                                                
                                            </div>
                                        </TabPanelInside>
                                        

                                    <div className="finalizarAtv">
                                        <label>Finalizar Atividade?</label>
                                        <input checked={boxState['revisaoPrototipo']} className="checkbox-fin" type="checkbox" name="definicao-papeis" id="definicao-papeis" onChange={() => handleFinalizar('revisaoPrototipo')} /> Sim
                                    </div>
                                </AccordionDetails>
                            </Accordion>

                            <Accordion className={`box-accordion`} expanded={expanded === 'panel3f'} onChange={handleOpenBox('panel3f')} disabled={isActive}>
                                <AccordionSummary
                                expandIcon={<ExpandMoreIcon className="icon-exp" />}
                                aria-controls="panel1bh-content"
                                id="panel1bh-header"
                                className={`${boxState['testagemReformulada'] ? 'finalizada' : ''}`}>
                                <Typography className={`text-title ${boxState['testagemReformulada'] ? 'finalizada' : ''}`}>
                                    Testagem da solução reformulada
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
                                            <Tab aria-selected={true} disabled={isActive} wrapped fullWidth className="text-title tab-etapas" label="Testagem" {...a22yProps(0)} />
                                        </Tabs>


                                        <TabPanelInside value={valueInside} index={0} className="atv-container border">
                                        

                                            <h4 className="text-title-inside">
                                                Testagem da solução reformulada
                                            </h4>
                                            <div className="box-atv">
                                                Nesta atividade vocês irão trabalhar <strong>individualmente</strong>. Cada integrante da equipe
                                                deve realizar a confecção do Jamboard disponível no link: <br />
                                                <a href="/etapa1" target="_blank">LINK AQUI</a>
                                                <br />
                                                <br />
                                                <div className="iniciar-atv">

                                                    <p>Antes de inciar a atividade lembrem-se que vocês têm <strong>15 minutos</strong> para finalizar a mesma.</p> 

                                                    <button className={`btn-atv ${isPaused || isActive ? 'selected' : ''}`} onClick={() => setTimeClock(15)} disabled={isActive}>Iniciar Atividade</button>

                                                </div>
                                                
                                            </div>
                                        </TabPanelInside>
                                        
                                        <TabPanelInside value={valueInside} index={1} className="atv-container border" >

                                            <h4 className="text-title-inside">
                                            Organização individual de propostas para o problema/ideia a ser implementado
                                            </h4>
                                            <div className="box-atv">
                                                Nesta atividade vocês irão trabalhar <strong>individualmente</strong>. Cada integrante da equipe
                                                deve realizar a apresentação do Jamboard preenchido na atividade anterior para toda a equipe.
                                                <br />
                                                <br />
                                                <div className="iniciar-atv">
                                                    <p>Antes de inciar a atividade lembrem-se que vocês têm <strong>20 minutos</strong> para finalizar a mesma.</p> 
                                                    <button className={`btn-atv ${isPaused || isActive ? 'selected' : ''}`} onClick={() => setTimeClock(20)} disabled={isActive}>Iniciar Atividade</button>

                                                </div>
                                                
                                            </div>
                                        </TabPanelInside>

                                        <TabPanelInside value={valueInside} index={2} className="atv-container border" >

                                            <h4 className="text-title-inside">
                                                Brainstorm sobre as propostas para o problema/ideia a ser implementado
                                            </h4>
                                            <div className="box-atv">
                                                Nesta atividade vocês irão trabalhar em <strong>grupo</strong>. Cada integrante da equipe
                                                deve realizar a apresentação do Jamboard preenchido na atividade anterior para toda a equipe.
                                                <br />
                                                <br />
                                                <div className="iniciar-atv">
                                                    <p>Antes de inciar a atividade lembrem-se que vocês têm <strong>40 minutos</strong> para finalizar a mesma.</p> 
                                                    <button className={`btn-atv ${isPaused || isActive ? 'selected' : ''}`} onClick={() => setTimeClock(40)} disabled={isActive}>Iniciar Atividade</button>

                                                </div>
                                                
                                            </div>
                                        </TabPanelInside>

                                        <TabPanelInside value={valueInside} index={3} className="atv-container border" >

                                            <h4 className="text-title-inside">
                                                Escolha de quais propostas serão desenvolvidas e transformadas em protótipos
                                            </h4>
                                            <div className="box-atv">
                                                Nesta atividade vocês irão trabalhar em <strong>grupo</strong>. Cada integrante da equipe
                                                deve realizar a apresentação do Jamboard preenchido na atividade anterior para toda a equipe.
                                                <br />
                                                <br />
                                                <div className="iniciar-atv">
                                                    <p>Antes de inciar a atividade lembrem-se que vocês têm <strong>25 minutos</strong> para finalizar a mesma.</p> 
                                                    <button className={`btn-atv ${isPaused || isActive ? 'selected' : ''}`} onClick={() => setTimeClock(25)} disabled={isActive}>Iniciar Atividade</button>

                                                </div>
                                                
                                            </div>
                                        </TabPanelInside>

                                    
                                </AccordionDetails>
                                <div className="finalizarAtv">
                                        <label>Finalizar Atividade?</label>
                                        <input checked={boxState['testagemReformulacao']} className="checkbox-fin" type="checkbox" name="definicao-papeis" id="definicao-papeis" onChange={() => handleFinalizar('testagemReformulada')} /> Sim
                                    </div>
                            </Accordion>

                            <div className="btn-Box">
                                <button disabled={isActive} className={`btn-proxAtv ${isActive ? 'disabled' : ''}`} onClick={() => setValue((prev) => prev+1)}>Ir para as próximas atividades</button>
                            </div>

                        </TabPanel>

                        <TabPanel value={value} index={6} className="border revisao-processo">

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
                                        <input checked={boxState['retrospectiva']} className="checkbox-fin" type="checkbox" name="definicao-papeis" id="definicao-papeis" onChange={() => handleFinalizar('retrospectiva')} /> Sim
                                    </div>
                            </Accordion>
                            
                            <div className="btn-Box">
                                <button disabled={isActive} className={`btn-proxAtv ${isActive ? 'disabled' : ''}`} onClick={() => setValue((prev) => prev+1)}>Ir para as próximas atividades</button>
                            </div>
                        </TabPanel>

                        <TabPanel value={value} index={7} className="border metodos-avaliacao">
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
                                            
                                            
                                            <a href="https://forms.gle/hUEUTT8mvEfpzxYN7" target={'_blank'}>
                                                Clique aqui para realizar a avaliação
                                            </a>
                                        </div>
                                    </TabPanelInside>
                                </AccordionDetails>
                            </Accordion>
                        </TabPanel>

                    </div>

                </div>

            </div>

            <div className="finalizar-etapa">
                <button type="submit" className={`btn-finalEtapa ${etapaFinalizada ? 'finalizada-etapa' : ''}`} onClick={handleFinalizarEtapas}>FINALIZAR ETAPA</button>
            </div>

        </Container>
    )
}