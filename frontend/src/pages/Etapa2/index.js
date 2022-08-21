import React, { useEffect, useState } from "react";

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

  
export const Etapa2 = (props) => {
    const [value, setValue] = useState(0);
    const [valueInside, setValueInside] = useState(0);

    const [timeClock, setTimeClock] = useState(0)
    const [isActive, setIsActive] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

    const [hasFinised, setHasFinised] = useState(false);

    const [expanded, setExpanded] = useState(false);

    const [isOpenAccordion, setOpenAccordion] = useState(false)

    const [isFinished, setIsFinished] = useState(false)

    const boxInitial = JSON.parse(localStorage.getItem('boxState2'))

    const [boxState, setBoxState] = useState(boxInitial ? boxInitial :{
        discussao: false,
        esbocoSolucao: false,
        preparacaoApresentacao: false,
        mentoria: false,
        reformulacaoEsboco: false,
        revisaoEsboco: false,
        pesquisaValidacao: false,
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
        localStorage.setItem('boxState2', JSON.stringify(boxState))
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

    return(
        <Container>
            <div className="wrapper">

                <div className="content-page">

                    <div className="content-info">
                        <h1>Bem vindos a segunda etapa!</h1>
                    </div>


                    <div className="content-etapas">
                    
                        <Tabs allowScrollButtonsMobile={true} sx={{ '& .MuiTabs-flexContainer': { flexWrap: 'wrap' } }} TabIndicatorProps={{ sx: { display: 'none' } }} value={value} onChange={handleChange} aria-label="basic tabs example" className="tab-box">
                            <Tab disabled={isActive} wrapped fullWidth className="text-title tab-etapas" label="Discussão da solução" {...a11yProps(0)} />
                            <Tab disabled={isActive} wrapped fullWidth className="text-title tab-etapas" label="Esboço do protótipo" {...a11yProps(1)} />
                            <Tab disabled={isActive} wrapped fullWidth className="text-title tab-etapas" label="Mentoria" {...a11yProps(2)} />
                            <Tab disabled={isActive} wrapped fullWidth className="text-title tab-etapas" label="Aprimoramento Esboço" {...a11yProps(3)} />
                            <Tab disabled={isActive} wrapped fullWidth className="text-title tab-etapas" label="Validação do Esboço" {...a11yProps(4)} />
                            <Tab disabled={isActive} wrapped fullWidth className="text-title tab-etapas" label="Revisão do Processo" {...a11yProps(5)} />
                            <Tab disabled={isActive} wrapped fullWidth className="text-title tab-etapas" label="Avaliação" {...a11yProps(6)} />
                        </Tabs>
                        

                        <TabPanel value={value} index={0} className="border discussao-solução" >

                
                            <div className="info-etapa-text">

                                <h2 className="text-title-etapa">Discussão da Solução</h2>
                                <h4 className="text-subtitle">
                                    Etapa em que os participantes irão realizar atividades que tem como objetivo definir a solução que será implementada pela equipe. Esta Etapa
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
                     
                                        Nesta atividade vocês devem realizar a separação da equipe, ou seja, irão realizar algumas atividades
                                        individuais para que ao chegar na atividade de definição de papéis da equipe, todos já tenham se conhecido melhor. 
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
                                                deve realizar a confecção do Jamboard disponível no link: <br />
                                                <a href="/etapa1" target="_blank">LINK AQUI</a>
                                                <br />
                                                <br />
                                                <div className="iniciar-atv">
             
                                                    <p>Antes de inciar a atividade lembrem-se que vocês têm <strong>30 minutos</strong> para finalizar a mesma.</p> 

                                                    <button className={`btn-atv ${isPaused || isActive ? 'selected' : ''}`} onClick={() => setTimeClock(1)} disabled={isActive}>Iniciar Atividade</button>

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

                                    <div className="finalizarAtv">
                                        <label>Finalizar Atividade?</label>
                                        <input className="checkbox-fin" type="checkbox" name="definicao-papeis" id="definicao-papeis" onChange={() => handleFinalizar('discussao')} /> Sim
                                    </div>
                                </AccordionDetails>
                            </Accordion>

                            <div className="btn-Box">
                                <button disabled={isActive} className={`btn-proxAtv ${isActive ? 'disabled' : ''}`} onClick={() => setValue((prev) => prev+1)}>Ir para as próximas atividades</button>
                            </div>

                        </TabPanel>

                        <TabPanel value={value} index={1} className="border esboco-problema">


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
                                    Nesta atividade vocês irão realizar pesquisas individuais sobre possíveis temas em qualquer área, que você deseje que a equipe desenvolva/mapeie alguma solução.
                                    <br />
                                    <br />

                                    <div className={`timer-box`}>
                                        <div className="content-timer">
                                            <Timer min={timeClock} isActive={isActive} setIsActive={setIsActive} setHasFinised={setHasFinised}></Timer>
                                        </div>
                                    </div>

                                    <Tabs allowScrollButtonsMobile={true} sx={{ '& .MuiTabs-flexContainer': { flexWrap: 'wrap' } }} TabIndicatorProps={{ sx: { display: 'none' } }} value={valueInside} onChange={handleChangeInside} aria-label="basic tabs example" className="tab-box">
                                        <Tab disabled={isActive} wrapped fullWidth className="text-title tab-etapas" label="Esboço da solução ou do protótipo" {...a22yProps(0)} />
                                    </Tabs>

                                    <TabPanelInside value={valueInside} index={0} className="atv-container border">
                
                                        <h4 className="text-title-inside">
                                            Esboço da solução ou do protótipo 
                                        </h4>
                                        <div className="box-atv">
                                            Nesta atividade vocês deverão trabalhar <strong>individualmente</strong>. Cada integrante da equipe
                                            deve realizar a pesquisa de possíveis soluções que deseja que a equipe desenvolva uma solução. 
                                        
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
                                        <input className="checkbox-fin" type="checkbox" name="definicao-papeis" id="definicao-papeis" onChange={() => handleFinalizar('esbocoSolucao')} /> Sim
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
                                    <Tabs allowScrollButtonsMobile={true} sx={{ '& .MuiTabs-flexContainer': { flexWrap: 'wrap' } }} TabIndicatorProps={{ sx: { display: 'none' } }} value={valueInside} onChange={handleChangeInside} aria-label="basic tabs example" className="tab-box">
                                        <Tab disabled={isActive} wrapped fullWidth className="text-title tab-etapas" label="Preparação de apresentação" {...a22yProps(0)} />
                                    </Tabs>

                                    <TabPanelInside value={valueInside} index={0} className="atv-container border">
                                    

                                        <h4 className="text-title-inside">
                                            Preparação de apresentação do esboço da solução/protótipo
                                        </h4>
                                        <div className="box-atv">
                                            Nesta atividade vocês deverão trabalhar em <strong>grupo</strong>. Cada integrante da equipe
                                            deve realizar a apresentação dos temas encontrados na atividade anterior para a equipe. A apresentação pode ser rápida, apenas para que os
                                            integrantes tenham uma ideia geral do tema para que possa facilitar na hora de realizar a votação nos temas de interesse.
                                                                                
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
                                        <input className="checkbox-fin" type="checkbox" name="definicao-papeis" id="definicao-papeis" onChange={() => handleFinalizar('preparacaoApresentacao')} /> Sim
                                    </div>
                            </Accordion>

                            <div className="btn-Box">
                                <button disabled={isActive} className={`btn-proxAtv ${isActive ? 'disabled' : ''}`} onClick={() => setValue((prev) => prev+1)}>Ir para as próximas atividades</button>
                            </div>

                        </TabPanel>

                        <TabPanel value={value} index={2} className="border mentoria">
                            
                            <div className="info-etapa-text">

                                <h2 className="text-title-etapa">Mentoria</h2>
                                <h4 className="text-subtitle">
                                    Etapa em que os participantes irão realizar o agendamento de uma reunião com o mentor responsável pela equipe. Esta etapa tem como objetivo 
                                    iniciar o processo de validação da ideia, pois contém atividades que incentivam a apresentação ao mentor e com isso gerar possíveis melhorias à
                                    serem aplicadas na solução/problema mapeado. <br /> <strong>Lembrem-se</strong>, cada atividade possui um tempo estimado para serem realizadas. O tempo é disponibilizado em 
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
                                            Nesta atividade vocês deverão trabalhar em <strong>grupo</strong>. Após a apresentação da solução definida para o mentor, o grupo terá um tempo para se 
                                            preparar para a próxima apresentação, que será feita para a turma. 
                                            
                                                                        
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
                                            seus integrantes, quantos são os integrantes, além de informar o papel de cada um) para a turma. A apresentação pode ser rápida, 
                                            apenas para que a turma conheça a solução que sua equipe irá desenvolver e mostrar quais são os integrantes da equipe.
                                                                        
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
                                        <input className="checkbox-fin" type="checkbox" name="definicao-papeis" id="definicao-papeis" onChange={() => handleFinalizar('mentoria')} /> Sim
                                    </div>
                            </Accordion>

                            <div className="btn-Box">
                                <button disabled={isActive} className={`btn-proxAtv ${isActive ? 'disabled' : ''}`} onClick={() => setValue((prev) => prev+1)}>Ir para as próximas atividades</button>
                            </div>
                        

                        </TabPanel>

                        <TabPanel value={value} index={3} className="border aprimoramento-esboco">

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
                                <Typography className={`text-title ${boxState['reformulacaoEsboco'] ? 'finalizada' : ''}`}>Reformulação do esboço com base na mentoria</Typography>
                                </AccordionSummary>
                                <AccordionDetails className={`${!isOpenAccordion ? 'aberto' : ''}`}>
                                    <div className={`timer-box`}>
                                        <div className="content-timer">
                                            <Timer min={timeClock} isActive={isActive} setIsActive={setIsActive} setHasFinised={setHasFinised}></Timer>
                                        </div>
                                    </div>
                                    <Tabs allowScrollButtonsMobile={true} sx={{ '& .MuiTabs-flexContainer': { flexWrap: 'wrap' } }} TabIndicatorProps={{ sx: { display: 'none' } }} value={valueInside} onChange={handleChangeInside} aria-label="basic tabs example" className="tab-box">
                                        <Tab disabled={isActive} wrapped fullWidth className="text-title tab-etapas" label="Reformulação do esboço" {...a22yProps(0)} />
                                        
                                    </Tabs>

                                    <TabPanelInside value={valueInside} index={0} className="atv-container border">
                                    

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
                                                <p>Antes de inciar a atividade lembrem-se que vocês têm <strong>1 hora</strong> para finalizar a mesma.</p> 
                                                <button className={`btn-atv ${isPaused || isActive ? 'selected' : ''}`} onClick={() => setTimeClock(60)} disabled={isActive}>Iniciar Atividade</button>
                                              
                                                    
                                            </div>
                                            
                                        </div>
                                    </TabPanelInside>
                                </AccordionDetails>
                                <div className="finalizarAtv">
                                        <label>Finalizar Atividade?</label>
                                        <input className="checkbox-fin" type="checkbox" name="definicao-papeis" id="definicao-papeis" onChange={() => handleFinalizar('reformulacaoEsboco')} /> Sim
                                    </div>
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
                                    <Tabs allowScrollButtonsMobile={true} sx={{ '& .MuiTabs-flexContainer': { flexWrap: 'wrap' } }} TabIndicatorProps={{ sx: { display: 'none' } }} value={valueInside} onChange={handleChangeInside} aria-label="basic tabs example" className="tab-box">
                                        <Tab disabled={isActive} wrapped fullWidth className="text-title tab-etapas" label="Revisão do esboço" {...a22yProps(0)} />
                                        
                                    </Tabs>

                                    <TabPanelInside value={valueInside} index={0} className="atv-container border">
                                    

                                        <h4 className="text-title-inside">
                                            Revisão de esboço da ideia/solução
                                        </h4>
                                        <div className="box-atv">
                                            Nesta atividade vocês deverão trabalhar em <strong>grupo</strong>. O grupo deve realizar a análise da respostas obtidas dos formulários e pesquisas aplicadas
                                            na atividade anterior. Nesta atividade o interessante é que o grupo tenha recolhido o máximo de feedback possível sobre a ideia para que se 
                                            houver ajustes os mesmos sejam mapeados e definidos, e assim, possam ser aplicados nas próximas etapas. Com a análise é possível que a 
                                            equipe entenda a percepção de pessoas de fora do grupo sobre a solução se ela é interessante de ser desenvolvida ou se é necessário realizar mais pesquisas.
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
                                        <input className="checkbox-fin" type="checkbox" name="definicao-papeis" id="definicao-papeis" onChange={() => handleFinalizar('revisaoEsboco')} /> Sim
                                    </div>
                            </Accordion>

                            <div className="btn-Box">
                                <button disabled={isActive} className={`btn-proxAtv ${isActive ? 'disabled' : ''}`} onClick={() => setValue((prev) => prev+1)}>Ir para as próximas atividades</button>
                            </div>
                        

                        </TabPanel>

                        <TabPanel value={value} index={4} className="border validacao-esboco">

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
                                    <Tabs allowScrollButtonsMobile={true} sx={{ '& .MuiTabs-flexContainer': { flexWrap: 'wrap' } }} TabIndicatorProps={{ sx: { display: 'none' } }} value={valueInside} onChange={handleChangeInside} aria-label="basic tabs example" className="tab-box">
                                        <Tab disabled={isActive} wrapped fullWidth className="text-title tab-etapas" label="Pesquisa de validação" {...a22yProps(0)} />
                                        
                                    </Tabs>

                                    <TabPanelInside value={valueInside} index={0} className="atv-container border">
                                    

                                        <h4 className="text-title-inside">
                                            Pesquisa rápida com conhecidos sobre o esboço do problema/ideia definido
                                        </h4>
                                        <div className="box-atv">
                                            Nesta atividade vocês deverão trabalhar em <strong>grupo</strong>. O grupo deve realizar uma rápida apresentação e pesquisa sobre a solução com conhecidos, 
                                            podendo ser apresentados em formulários para poder recolher a percepção de pessoas de fora do grupo sobre a solução escolhida. 
                                            O formulário pode ser curto para que seja fácil de recolher as repostas, fazendo perguntas sobre o tema escolhido para desenvolver, , se é viável/interessante ou não
                                            o desenvolvimento da solução.
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
                                        <input className="checkbox-fin" type="checkbox" name="definicao-papeis" id="definicao-papeis" onChange={() => handleFinalizar('pesquisaValidacao')} /> Sim
                                    </div>
                            </Accordion>

                            <div className="btn-Box">
                                <button disabled={isActive} className={`btn-proxAtv ${isActive ? 'disabled' : ''}`} onClick={() => setValue((prev) => prev+1)}>Ir para as próximas atividades</button>
                            </div>
                        

                        </TabPanel>

                        <TabPanel value={value} index={5} className="border revisao-processo">

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
                                            
                                            <div className="iniciar-atv">
                                                <p>Antes de inciar a atividade lembrem-se que vocês têm <strong>10 minutos</strong> para finalizar a mesma.</p> 
                                                <button className={`btn-atv ${isPaused || isActive ? 'selected' : ''}`} onClick={() => setTimeClock(10)} disabled={isActive}>Iniciar Atividade</button>
                                               
                                            </div>

                                            <br />
                                            <br />
                                        
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
                        </TabPanel>

                        <TabPanel value={value} index={6} className="border metodos-avaliacao">
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
                                    

                                    <Tabs allowScrollButtonsMobile={true} sx={{ '& .MuiTabs-flexContainer': { flexWrap: 'wrap' } }} TabIndicatorProps={{ sx: { display: 'none' } }} value={valueInside} onChange={handleChangeInside} aria-label="basic tabs example" className="tab-box">
                                        <Tab disabled={isActive} wrapped fullWidth className="text-title tab-etapas" label="Avaliação" {...a22yProps(0)} />
                                        
                                    </Tabs>
                                    
                                    <TabPanelInside value={valueInside} index={0} className="atv-container border">
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

                    </div>

                </div>

            </div>
           

        </Container>
    )
}