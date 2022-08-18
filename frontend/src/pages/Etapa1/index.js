import React, { useEffect, useState } from "react";

import { Tabs, Tab} from '@mui/material';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import Typography from '@mui/material/Typography';
import { FormControl, TextField } from "@mui/material";
import { Button } from "@mui/material";
import PropTypes from 'prop-types';
import { Timer } from '../../shared/components/Timer'
import Box from '@mui/material/Box';

import { Container } from "./styles";

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import BoardSprint from './components/BoardSprint'



function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box >
            <div>{children}</div>
          </Box>
        )}
      </div>
    );
}

function TabPanelInside(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}-inside`}
        aria-labelledby={`simple-tab-${index}-inside`}
        {...other}
      >
        {value === index && (
          <Box >
            <div>{children}</div>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

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

  

export const Etapa1 = (props) => {

    const [value, setValue] = useState(0);
    const [valueInside, setValueInside] = useState(0);
    const [seConhecem, setSeConhecem] = useState(false)

    const [timeClock, setTimeClock] = useState(0)
    const [timeClockPause, setTimeClockPause] = useState(0)
    const [isActive, setIsActive] = useState(false);
    const [isPaused, setIsPaused] = useState(false);


    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeInside = (event, newValue) => {
        setValueInside(newValue);
      };

   
    const [expanded, setExpanded] = React.useState(false);

    const handleOpenBox = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
        setValueInside(isExpanded ? valueInside : 0);
    };

    const handleSeConhecem = (e) => {
        if(e.target.id === 'sim') {
            setSeConhecem(!seConhecem)
            return
        } 
        setSeConhecem(false)
    }


    const startCountdown = () => {
        setIsActive(true);
    }

    const handlePauseTimer = () => {
        setIsActive(!isActive)
        setTimeClockPause(timeClock)
        setIsPaused(!isPaused)
    }

    const handleStartTime = (time) => {
        if(isPaused) {
            setTimeClockPause(timeClock)
        } else {
            setTimeClock(time)
        }
    }

    useEffect(() => {

        console.log('opa', timeClock)
        console.log('opa', isPaused)
        console.log('value inside', valueInside)
        console.log('value ', value)

        if(timeClock !== 0) {
            startCountdown()
        }

        if(!isActive && timeClock !== 0  && !isPaused) {
            setTimeClock(0)
        }

    }, [timeClock, isActive, isPaused])

    

    return(
        <Container>
            <div className="wrapper">

                <div className="content-page">

                    <div className="content-info">
                        <h1>Bem vindos a primeira etapa!</h1>
                    </div>


                    <div className="content-etapas">
                    
                        <Tabs allowScrollButtonsMobile={true} sx={{ '& .MuiTabs-flexContainer': { flexWrap: 'wrap' } }} TabIndicatorProps={{ sx: { display: 'none' } }} value={value} onChange={handleChange} aria-label="basic tabs example" className="tab-box">
                            <Tab wrapped fullWidth className="text-title tab-etapas" label="Definição de equipe" {...a11yProps(0)} />
                            <Tab wrapped fullWidth className="text-title tab-etapas" label="Mapeamento do Problema" {...a11yProps(1)} />
                            <Tab wrapped fullWidth className="text-title tab-etapas" label="Mentoria" {...a11yProps(2)} />
                            <Tab wrapped fullWidth className="text-title tab-etapas" label="Validação do Problema" {...a11yProps(3)} />
                            <Tab wrapped fullWidth className="text-title tab-etapas" label="Revisão do Processo" {...a11yProps(4)} />
                            <Tab wrapped fullWidth className="text-title tab-etapas" label="Avaliação" {...a11yProps(5)} />
                        </Tabs>
                        

                        <TabPanel value={value} index={0} className="border formacao-equipe" >

                
                            <div className="info-etapa-text">

                                <h2 className="text-title-etapa">Definição de equipe</h2>
                                <h4 className="text-subtitle">
                                    Etapa em que os participantes irão realizar atividades que tem como objetivo realizar a formação da equipe. 
                                    Contendo atividades que visam, aproximar os integrantes da equipe e definir seus papéis. <br /> <strong>Lembrem-se</strong>, cada atividade
                                    possui um tempo estimado para serem realizadas. O tempo é disponibilizado em cada atividade e para acompanhar esse tempo
                                    lembre sempre de olhar para o relógio.

                                </h4>
                            </div>
                            
                            <Accordion className="box-accordion" expanded={expanded === 'panel1a'} onChange={handleOpenBox('panel1a')}>
                                <AccordionSummary
                                expandIcon={<ExpandMoreIcon className="icon-exp" />}
                                aria-controls="panel1bh-content"
                                id="panel1bh-header">
                                <Typography className="text-title">
                                    Separação da equipe
                                </Typography>
                                
                                </AccordionSummary>
                                <AccordionDetails>
                                    <div>
                                        

                                        Nesta atividade vocês devem realizar a separação da equipe, ou seja, irão realizar algumas atividades
                                        individuais para que ao chegar na atividade de definição de papéis da equipe, todos já tenham se conhecido melhor. 
                                        <br />
                                        <br />

                                        <div className={`timer-box`}>
                                            <div className="content-timer">
                                                <Timer minutes={timeClock} isActive={isActive} setIsActive={setIsActive} setTimeClockPause={setTimeClockPause}></Timer>
                                            </div>
                                        </div>

                                        <Tabs allowScrollButtonsMobile={true} sx={{ '& .MuiTabs-flexContainer': { flexWrap: 'wrap' } }} TabIndicatorProps={{ sx: { display: 'none' } }} value={valueInside} onChange={handleChangeInside} aria-label="basic tabs example" className="tab-box">
                                            <Tab wrapped fullWidth className="text-title tab-etapas" label="Definição de informações da equipe" {...a22yProps(0)} />
                                            <Tab wrapped fullWidth className="text-title tab-etapas" label="Mapeamento do Problema" {...a22yProps(1)} />

                                        </Tabs>


                                        <TabPanelInside value={valueInside} index={0} className="atv-container border">
                                        

                                            <h4 className="text-title-inside">
                                                Jamboard
                                            </h4>
                                            <div className="box-atv">
                                                Nesta atividade vocês irão trabalhar <strong>individualmente</strong>. Cada integrante da equipe
                                                deve realizar a confecção do Jamboard disponível no link: <br />
                                                <a href="/etapa1" target="_blank">LINK AQUI</a>
                                                <br />
                                                <br />
                                                <div className="iniciar-atv">
                                                    {console.log('pause ',timeClockPause)}
                                                    <p>Antes de inciar a atividade lembrem-se que vocês têm <strong>5 minutos</strong> para finalizar a mesma.</p> 

                                                    <button className={`btn-atv ${isPaused || isActive ? 'selected' : ''}`} onClick={() => setTimeClock(5)} disabled={isActive}>Iniciar Atividade</button>

                                                    { isPaused ?  
                                                        <button className="btn-atv" onClick={() => setTimeClock(timeClockPause)} disabled={!isActive}>Continuar Atividade</button> :
                                                        <button className="btn-atv btn-pause" onClick={handlePauseTimer} disabled={!isActive}>Pausar Atividade</button>
                                                    }

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
                                                     <button className={`btn-atv ${isPaused || isActive ? 'selected' : ''}`} onClick={() => setTimeClock(10)} disabled={isActive}>Iniciar Atividade</button>

                                                    { isPaused ?  
                                                        <button className="btn-atv" onClick={() => setTimeClock(timeClockPause)} disabled={!isActive}>Continuar Atividade</button> :
                                                        <button className="btn-atv btn-pause" onClick={handlePauseTimer} disabled={!isActive}>Pausar Atividade</button>
                                                    }
                                                </div>
                                                
                                            </div>
                                        </TabPanelInside>


                                        <br />
                                        <br />
                                        Antes de seguir para a realização da próxima etapa de atividades, favor informar se todos da equipe se conhecem.
                                        <div className="seConhecem">
                                            <input className="radio-s" type="radio" name="opcoes" id="sim" onChange={handleSeConhecem} /> Sim
                                            <input className="radio-n" type="radio" name="opcoes" id="nao" onChange={handleSeConhecem}/> Não
                                        </div>
                                        <br />
                                        <br />                        
                                    </div>
                                </AccordionDetails>
                            </Accordion>

                            <div className={`${seConhecem ? "info-seConhecem" : "info-naoSeConhecem"}`}>
                                Não é necessário realizar as atividades abaixo se todos os integrantes da equipe se conhecerem.  :)
                            </div>
                            <Accordion className="box-accordion" expanded={expanded === 'panel2a'} onChange={handleOpenBox('panel2a')} disabled={seConhecem}>
                                <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel2bh-content"
                                id="panel2bh-header"
                                >
                                <Typography className="text-title">Aquecimento da equipe</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                <div>
                                    Nesta atividade vocês devem realizar uma dinâmica de equipe, ou seja, irão realizar algumas atividades
                                    individuais para que cada integrante se conheça e fique confortável um com o outro.
                                    <br />
                                    <br />

                                    <div className={`timer-box`}>
                                        <div className="content-timer">
                                            <Timer minutes={timeClock} isActive={isActive} setIsActive={setIsActive}></Timer>
                                        </div>
                                    </div>

                                    <Tabs allowScrollButtonsMobile={true} sx={{ '& .MuiTabs-flexContainer': { flexWrap: 'wrap' } }} TabIndicatorProps={{ sx: { display: 'none' } }} value={valueInside} onChange={handleChangeInside} aria-label="basic tabs example" className="tab-box">
                                        <Tab wrapped fullWidth className="text-title tab-etapas" label="Canvas de Aquecimento" {...a22yProps(0)} />
                                        <Tab wrapped fullWidth className="text-title tab-etapas" label="Apresentação Canvas de Aquecimento" {...a22yProps(1)} />

                                    </Tabs>

                                    <TabPanelInside value={valueInside} index={0} className="atv-container border">
                                    

                                        <h4 className="text-title-inside">
                                            Preenchimento Canvas de Aquecimento 
                                        </h4>
                                        <div className="box-atv">
                                            Nesta atividade vocês irão trabalhar <strong>individualmente</strong>. Cada integrante da equipe
                                            deve realizar a confecção do Canvas de Aquecimento disponível no link: <br />
                                            <a href="/etapa1" target="_blank" rel="noopener noreferrer">LINK AQUI</a>
                                            <br />
                                            <br />
                                            <div className="iniciar-atv">
                                                <p>Antes de inciar a atividade lembrem-se que vocês têm <strong>5 minutos</strong> para finalizar a mesma.</p> 
                                                <button className={`btn-atv ${isPaused || isActive ? 'selected' : ''}`} onClick={() => setTimeClock(5)} disabled={isActive}>Iniciar Atividade</button>
                                                
                                                { isPaused ?  
                                                    <button className="btn-atv" onClick={() => setTimeClock(timeClockPause)} disabled={!isActive}>Continuar Atividade</button> :
                                                    <button className="btn-atv btn-pause" onClick={handlePauseTimer} disabled={!isActive}>Pausar Atividade</button>
                                                }
                                                    
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
                                                <button className={`btn-atv ${isPaused || isActive ? 'selected' : ''}`} onClick={() => setTimeClock(10)} disabled={isActive}>Iniciar Atividade</button>
                                                
                                                { isPaused ?  
                                                    <button className="btn-atv" onClick={() => setTimeClock(timeClockPause)} disabled={!isActive}>Continuar Atividade</button> :
                                                    <button className="btn-atv btn-pause" onClick={handlePauseTimer} disabled={!isActive}>Pausar Atividade</button>
                                                }
                                                    
                                            </div>
                                            
                                        </div>
                                    </TabPanelInside>
                                
                                </div>
                                </AccordionDetails>
                            </Accordion>
                            

                            <Accordion className="box-accordion" expanded={expanded === 'panel3a'} onChange={handleOpenBox('panel3a')}>
                                <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel3bh-content"
                                id="panel3bh-header"
                                >
                                <Typography className="text-title">
                                    Definição de papéis da equipe
                                </Typography>
                                </AccordionSummary>
                                <AccordionDetails>

                                
                                    <div className="papeis-etapa">
                                        Nesta atividade vocês devem realizar a definição de papéis para a equipe, ou seja, irão realizar a escolha de qual integrante
                                        vai ficar com uma determinada responsabilidade, além de preencher algumas informações sobre a equipe.
                                        <br />
                                        <br />

                                        <div className={`timer-box`}>
                                            <div className="content-timer">
                                                <Timer minutes={timeClock} isActive={isActive} setIsActive={setIsActive}></Timer>
                                            </div>
                                        </div>

                                        <Tabs allowScrollButtonsMobile={true} sx={{ '& .MuiTabs-flexContainer': { flexWrap: 'wrap' } }} TabIndicatorProps={{ sx: { display: 'none' } }} value={valueInside} onChange={handleChangeInside} aria-label="basic tabs example" className="tab-box">
                                            <Tab wrapped fullWidth className="text-title tab-etapas" label="Definição de informações da equipe" {...a22yProps(0)} />
                                            <Tab wrapped fullWidth className="text-title tab-etapas" label="Mapeamento do Problema" {...a22yProps(1)} />

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
                                                    <button className={`btn-atv ${isPaused || isActive ? 'selected' : ''}`} onClick={() => setTimeClock(5)} disabled={isActive}>Iniciar Atividade</button>
                                                    
                                                    { isPaused ?  
                                                        <button className="btn-atv" onClick={() => setTimeClock(timeClockPause)} disabled={!isActive}>Continuar Atividade</button> :
                                                        <button className="btn-atv btn-pause" onClick={handlePauseTimer} disabled={!isActive}>Pausar Atividade</button>
                                                    }
                                                    
                                                </div>

                                                <div className="papeis">
                                                    <h4>Favor preencher as informações da equipe abaixo:</h4>
                                                    <FormControl fullWidth required>
                                                        <label className="text-papel">Nome da Equipe</label>
                                                        <TextField fullWidth  margin="normal" size="small" placeholder="Informe o nome da equipe" variant="outlined" className="input-text" />
                                                        <label className="text-papel">Quantidade de Integrantes</label>
                                                        <TextField type={'number'} fullWidth margin="normal" size="small" placeholder="Informe a quantidade de integrantes" variant="outlined" className="input-text" />
                                                        <label className="text-papel">?????</label>
                                                        <TextField fullWidth margin="normal" size="small" placeholder="Informe o nome do integrante" variant="outlined" className="input-text"  />
                                                    </FormControl>

                                                    <Button className="btn-formulario">Enviar Informações</Button>
                                                    
                                                </div>
                                                
                                            </div>
                                        </TabPanelInside>


                                        <TabPanelInside value={valueInside} index={1} className="atv-container border">
            

                                            <h4 className="text-title-inside">
                                                Definição de representantes da equipe 
                                            </h4>
                                            <div className="box-atv">
                                                Nesta atividade vocês irão trabalhar em <strong>grupo</strong>. A equipe deve escolher, dentre os integrantes, um facilitador,
                                                um definidor e o responsável pelo tempo.
                                                <br />
                                                <br />
                                                <div className="iniciar-atv">
                                                    <p>Antes de inciar a atividade lembrem-se que vocês têm <strong>5 minutos</strong> para finalizar a mesma.</p> 
                                                    <button className={`btn-atv ${isPaused || isActive ? 'selected' : ''}`} onClick={() => setTimeClock(5)} disabled={isActive}>Iniciar Atividade</button>
                                                    
                                                    { isPaused ?  
                                                        <button className="btn-atv" onClick={() => setTimeClock(timeClockPause)} disabled={!isActive}>Continuar Atividade</button> :
                                                        <button className="btn-atv btn-pause" onClick={handlePauseTimer} disabled={!isActive}>Pausar Atividade</button>
                                                    }
                                                    
                                                </div>
                                                <div className="papeis">
                                                    <h4>Favor preencher os nomes dos representante abaixo:</h4>
                                                    <FormControl fullWidth>
                                                        <label className="text-papel">Facilitador</label>
                                                        <TextField fullWidth  margin="normal" size="small" placeholder="Informe o nome do integrante" variant="outlined" className="input-text" />
                                                        <label className="text-papel">Definidor</label>
                                                        <TextField fullWidth margin="normal" size="small" placeholder="Informe o nome do integrante" variant="outlined" className="input-text" />
                                                        <label className="text-papel">Responsável pelo tempo</label>
                                                        <TextField fullWidth margin="normal" size="small" placeholder="Informe o nome do integrante" variant="outlined" className="input-text"  />
                                                    </FormControl>

                                                    <Button className="btn-formulario">Enviar Informações</Button>
                                                </div>
                                                
                                            </div>
                                        </TabPanelInside>
                                        

                                    
                                    </div>
                                </AccordionDetails>
                            </Accordion>
                            <div className="btn-Box">
                                <button className="btn-proxAtv" onClick={() => setValue((prev) => prev+1)}>Ir para as próximas atividades</button>
                            </div>

                        </TabPanel>

                        <TabPanel value={value} index={1} className="border mapeamento-problema">


                            <div className="info-etapa-text">

                                <h2 className="text-title-etapa">Mapeamento do Problema</h2>
                                <h4 className="text-subtitle">
                                    Etapa em que os participantes irão realizar atividades que tem como objetivo iniciar a preparação do problema/ideia a ser solucionado. 
                                    Contendo atividades que visam, fazer pesquisas individuais e em grupo, além de incentivar momentos de discussões entre os integrantes da equipe 
                                    para realizar a escolha da ideia. <br /> <strong>Lembrem-se</strong>, cada atividade possui um tempo estimado para serem realizadas. O tempo é disponibilizado em 
                                    cada atividade e para acompanhar esse tempo lembre sempre de olhar para o relógio.
                                </h4>
                            </div>

                            
                            <Accordion className="box-accordion" expanded={expanded === 'panel1b'} onChange={handleOpenBox('panel1b')}>
                                <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1bh-content"
                                id="panel1bh-header">
                                <Typography className="text-title">
                                    Primeira Pesquisa individual
                                </Typography>
                                
                                </AccordionSummary>
                                <AccordionDetails>
                                <div>
                                    Nesta atividade vocês irão realizar pesquisas individuais sobre possíveis temas em qualquer área, que você deseje que a equipe desenvolva/mapeie alguma solução.
                                    <br />
                                    <br />

                                    <div className={`timer-box`}>
                                        <div className="content-timer">
                                            <Timer minutes={timeClock} isActive={isActive} setIsActive={setIsActive}></Timer>
                                        </div>
                                    </div>

                                    <Tabs allowScrollButtonsMobile={true} sx={{ '& .MuiTabs-flexContainer': { flexWrap: 'wrap' } }} TabIndicatorProps={{ sx: { display: 'none' } }} value={valueInside} onChange={handleChangeInside} aria-label="basic tabs example" className="tab-box">
                                        <Tab wrapped fullWidth className="text-title tab-etapas" label="Primeira Pesquisa" {...a22yProps(0)} />
                                    </Tabs>

                                    <TabPanelInside value={valueInside} index={0} className="atv-container border">
                                    

                                        <h4 className="text-title-inside">
                                            Pesquisa individual sobre possíveis temas a serem desenvolvidos 
                                        </h4>
                                        <div className="box-atv">
                                            Nesta atividade vocês deverão trabalhar <strong>individualmente</strong>. Cada integrante da equipe
                                            deve realizar a pesquisa de possíveis soluções que deseja que a equipe desenvolva uma solução. 
                                        
                                            <br />
                                            <br />
                                            <div className="iniciar-atv">
                                                <p>Antes de inciar a atividade lembrem-se que vocês têm <strong>10 minutos</strong> para finalizar a mesma.</p> 
                                                <button className={`btn-atv ${isPaused || isActive ? 'selected' : ''}`} onClick={() => setTimeClock(10)} disabled={isActive}>Iniciar Atividade</button>
                                                
                                                { isPaused ?  
                                                    <button className="btn-atv" onClick={() => setTimeClock(timeClockPause)} disabled={!isActive}>Continuar Atividade</button> :
                                                    <button className="btn-atv btn-pause" onClick={handlePauseTimer} disabled={!isActive}>Pausar Atividade</button>
                                                }
                                                    
                                            </div>
                                            
                                        </div>
                                    </TabPanelInside>
                                
                                </div>
                                </AccordionDetails>
                            </Accordion>

                            <Accordion className="box-accordion" expanded={expanded === 'panel2b'} onChange={handleOpenBox('panel2b')}>
                                <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel2bh-content"
                                id="panel2bh-header"
                                >
                                <Typography className="text-title">Discussão para definição do problema</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <div className={`timer-box`}>
                                        <div className="content-timer">
                                            <Timer minutes={timeClock} isActive={isActive} setIsActive={setIsActive}></Timer>
                                        </div>
                                    </div>
                                    <Tabs allowScrollButtonsMobile={true} sx={{ '& .MuiTabs-flexContainer': { flexWrap: 'wrap' } }} TabIndicatorProps={{ sx: { display: 'none' } }} value={valueInside} onChange={handleChangeInside} aria-label="basic tabs example" className="tab-box">
                                        <Tab wrapped fullWidth className="text-title tab-etapas" label="Primeira Discussão" {...a22yProps(0)} />
                                        <Tab wrapped fullWidth className="text-title tab-etapas" label="Votação nos temas" {...a22yProps(1)} />
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
                                                <button className={`btn-atv ${isPaused || isActive ? 'selected' : ''}`} onClick={() => setTimeClock(10)} disabled={isActive}>Iniciar Atividade</button>
                                                
                                                { isPaused ?  
                                                    <button className="btn-atv" onClick={() => setTimeClock(timeClockPause)} disabled={!isActive}>Continuar Atividade</button> :
                                                    <button className="btn-atv btn-pause" onClick={handlePauseTimer} disabled={!isActive}>Pausar Atividade</button>
                                                }
                                                    
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
                                                
                                                { isPaused ?  
                                                    <button className="btn-atv" onClick={() => setTimeClock(timeClockPause)} disabled={!isActive}>Continuar Atividade</button> :
                                                    <button className="btn-atv btn-pause" onClick={handlePauseTimer} disabled={!isActive}>Pausar Atividade</button>
                                                }
                                                    
                                            </div>
                                            
                                        </div>
                                    </TabPanelInside>
                                </AccordionDetails>
                            </Accordion>
                            
                            <Accordion className="box-accordion" expanded={expanded === 'panel3b'} onChange={handleOpenBox('panel3b')}>
                                <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel3bh-content"
                                id="panel3bh-header"
                                >
                                <Typography className="text-title">
                                    Segunda Pesquisa individual
                                </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <div className={`timer-box`}>
                                        <div className="content-timer">
                                            <Timer minutes={timeClock} isActive={isActive} setIsActive={setIsActive}></Timer>
                                        </div>
                                    </div>
                                    <Tabs allowScrollButtonsMobile={true} sx={{ '& .MuiTabs-flexContainer': { flexWrap: 'wrap' } }} TabIndicatorProps={{ sx: { display: 'none' } }} value={valueInside} onChange={handleChangeInside} aria-label="basic tabs example" className="tab-box">
                                        <Tab wrapped fullWidth className="text-title tab-etapas" label="Segunda Pesquisa" {...a22yProps(0)} />
                                    </Tabs>

                                    <TabPanelInside value={valueInside} index={0} className="atv-container border">
                                    

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
                                                <button className={`btn-atv ${isPaused || isActive ? 'selected' : ''}`} onClick={() => setTimeClock(10)} disabled={isActive}>Iniciar Atividade</button>
                                                
                                                { isPaused ?  
                                                    <button className="btn-atv" onClick={() => setTimeClock(timeClockPause)} disabled={!isActive}>Continuar Atividade</button> :
                                                    <button className="btn-atv btn-pause" onClick={handlePauseTimer} disabled={!isActive}>Pausar Atividade</button>
                                                }
                                                    
                                            </div>
                                            
                                        </div>
                                    </TabPanelInside>

                                </AccordionDetails>
                            </Accordion>

                            <Accordion className="box-accordion" expanded={expanded === 'panel4b'} onChange={handleOpenBox('panel4b')}>
                                <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel4bh-content"
                                id="panel4bh-header"
                                >
                                <Typography className="text-title">
                                    Discussão em equipe para definição do problema/ideia 
                                </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <div className={`timer-box`}>
                                        <div className="content-timer">
                                            <Timer minutes={timeClock} isActive={isActive} setIsActive={setIsActive}></Timer>
                                        </div>
                                    </div>
                                    <Tabs allowScrollButtonsMobile={true} sx={{ '& .MuiTabs-flexContainer': { flexWrap: 'wrap' } }} TabIndicatorProps={{ sx: { display: 'none' } }} value={valueInside} onChange={handleChangeInside} aria-label="basic tabs example" className="tab-box">
                                        <Tab wrapped fullWidth className="text-title tab-etapas" label="Segunda Discussão" {...a22yProps(0)} />
                                        <Tab wrapped fullWidth className="text-title tab-etapas" label="Votação nas Soluções" {...a22yProps(1)} />
                                    </Tabs>

                                    <TabPanelInside value={valueInside} index={0} className="atv-container border">
                                    

                                        <h4 className="text-title-inside">
                                            Discussão em equipe para definição do problema/ideia a ser implementado
                                        </h4>
                                        <div className="box-atv">
                                            Nesta atividade vocês deverão trabalhar em <strong>grupo</strong>. Cada integrante da equipe
                                            deve realizar a apresentação das soluções encontradas na atividade anterior para a equipe. A apresentação pode ser rápida, apenas para que os
                                            integrantes tenham uma ideia geral sobre a solução/ideia encontrada para que possa facilitar na hora de realizar a votação 
                                            nos problemas/ideias de interesse da equipe.
                                                                                
                                            <br />
                                            <br />
                                            <div className="iniciar-atv">
                                                <p>Antes de inciar a atividade lembrem-se que vocês têm <strong>10 minutos</strong> para finalizar a mesma.</p> 
                                                <button className={`btn-atv ${isPaused || isActive ? 'selected' : ''}`} onClick={() => setTimeClock(10)} disabled={isActive}>Iniciar Atividade</button>
                                                
                                                { isPaused ?  
                                                    <button className="btn-atv" onClick={() => setTimeClock(timeClockPause)} disabled={!isActive}>Continuar Atividade</button> :
                                                    <button className="btn-atv btn-pause" onClick={handlePauseTimer} disabled={!isActive}>Pausar Atividade</button>
                                                }
                                                    
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
                                                <button className={`btn-atv ${isPaused || isActive ? 'selected' : ''}`} onClick={() => setTimeClock(5)} disabled={isActive}>Iniciar Atividade</button>
                                                
                                                { isPaused ?  
                                                    <button className="btn-atv" onClick={() => setTimeClock(timeClockPause)} disabled={!isActive}>Continuar Atividade</button> :
                                                    <button className="btn-atv btn-pause" onClick={handlePauseTimer} disabled={!isActive}>Pausar Atividade</button>
                                                }
                                                    
                                            </div>
                                            
                                        </div>
                                    </TabPanelInside>
                                </AccordionDetails>
                            </Accordion>

                            <div className="btn-Box">
                                <button className="btn-proxAtv" onClick={() => setValue((prev) => prev+1)}>Ir para as próximas atividades</button>
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

                            <Accordion className="box-accordion" expanded={expanded === 'panel1c'} onChange={handleOpenBox('panel1c')}>
                                <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel3bh-content"
                                id="panel3bh-header"
                                >
                                <Typography className="text-title">
                                    Agendamento da mentoria
                                </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <div className={`timer-box`}>
                                        <div className="content-timer">
                                            <Timer minutes={timeClock} isActive={isActive} setIsActive={setIsActive}></Timer>
                                        </div>
                                    </div>
                                    <Tabs allowScrollButtonsMobile={true} sx={{ '& .MuiTabs-flexContainer': { flexWrap: 'wrap' } }} TabIndicatorProps={{ sx: { display: 'none' } }} value={valueInside} onChange={handleChangeInside} aria-label="basic tabs example" className="tab-box">
                                        <Tab wrapped fullWidth className="text-title tab-etapas" label="Apresentação para o mentor" {...a22yProps(0)} />
                                        <Tab wrapped fullWidth className="text-title tab-etapas" label="Retorno da Equipe" {...a22yProps(1)} />
                                        <Tab wrapped fullWidth className="text-title tab-etapas" label="Apresentação para a turma" {...a22yProps(2)} />
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
                                                
                                                { isPaused ?  
                                                    <button className="btn-atv" onClick={() => setTimeClock(timeClockPause)} disabled={!isActive}>Continuar Atividade</button> :
                                                    <button className="btn-atv btn-pause" onClick={handlePauseTimer} disabled={!isActive}>Pausar Atividade</button>
                                                }
                                                    
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
                                                
                                                { isPaused ?  
                                                    <button className="btn-atv" onClick={() => setTimeClock(timeClockPause)} disabled={!isActive}>Continuar Atividade</button> :
                                                    <button className="btn-atv btn-pause" onClick={handlePauseTimer} disabled={!isActive}>Pausar Atividade</button>
                                                }
                                                    
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
                                                
                                                { isPaused ?  
                                                    <button className="btn-atv" onClick={() => setTimeClock(timeClockPause)} disabled={!isActive}>Continuar Atividade</button> :
                                                    <button className="btn-atv btn-pause" onClick={handlePauseTimer} disabled={!isActive}>Pausar Atividade</button>
                                                }
                                                    
                                            </div>
                                            
                                        </div>
                                    </TabPanelInside>
                                </AccordionDetails>
                            </Accordion>

                            <div className="btn-Box">
                                <button className="btn-proxAtv" onClick={() => setValue((prev) => prev+1)}>Ir para as próximas atividades</button>
                            </div>
                        

                        </TabPanel>

                        <TabPanel value={value} index={3} className="border validacao-problema">

                            <div className="info-etapa-text">

                                <h2 className="text-title-etapa">Validação do Problema</h2>
                                <h4 className="text-subtitle">
                                    Etapa em que os participantes irão realizar a validação do problema/solução mapeado nas etapas anteriores. Esta etapa utiliza as respostas obtidas
                                    da reunião com o mentor como possíveis melhorias. A etapa possui atividades que visam incentivar momentos de discussões entre os integrantes da equipe sobre o problema mapeado
                                    e se é houver melhorias e aplica-las na solução.<br /> <strong>Lembrem-se</strong>, cada atividade possui um tempo estimado para serem realizadas. O tempo é disponibilizado em 
                                    cada atividade e para acompanhar esse tempo lembre sempre de olhar para o relógio.
                                </h4>
                            </div>
                        
                            <Accordion className="box-accordion" expanded={expanded === 'panel1d'} onChange={handleOpenBox('panel1d')}>
                                <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel2bh-content"
                                id="panel2bh-header"
                                >
                                <Typography className="text-title">Pesquisa rápida sobre o problema/ideia</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <div className={`timer-box`}>
                                        <div className="content-timer">
                                            <Timer minutes={timeClock} isActive={isActive} setIsActive={setIsActive}></Timer>
                                        </div>
                                    </div>
                                    <Tabs allowScrollButtonsMobile={true} sx={{ '& .MuiTabs-flexContainer': { flexWrap: 'wrap' } }} TabIndicatorProps={{ sx: { display: 'none' } }} value={valueInside} onChange={handleChangeInside} aria-label="basic tabs example" className="tab-box">
                                        <Tab wrapped fullWidth className="text-title tab-etapas" label="Validação do problema" {...a22yProps(0)} />
                                        
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
                                                <p>Antes de inciar a atividade lembrem-se que vocês têm <strong>15 minutos</strong> para finalizar a mesma.</p> 
                                                <button className={`btn-atv ${isPaused || isActive ? 'selected' : ''}`} onClick={() => setTimeClock(15)} disabled={isActive}>Iniciar Atividade</button>
                                                
                                                { isPaused ?  
                                                    <button className="btn-atv" onClick={() => setTimeClock(timeClockPause)} disabled={!isActive}>Continuar Atividade</button> :
                                                    <button className="btn-atv btn-pause" onClick={handlePauseTimer} disabled={!isActive}>Pausar Atividade</button>
                                                }
                                                    
                                            </div>
                                            
                                        </div>
                                    </TabPanelInside>
                                </AccordionDetails>
                            </Accordion>
                            
                            <Accordion className="box-accordion" expanded={expanded === 'panel2d'} onChange={handleOpenBox('panel2d')}>
                                <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel3bh-content"
                                id="panel3bh-header"
                                >
                                <Typography className="text-title">
                                    Discussão
                                </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <div className={`timer-box`}>
                                        <div className="content-timer">
                                            <Timer minutes={timeClock} isActive={isActive} setIsActive={setIsActive}></Timer>
                                        </div>
                                    </div>
                                    <Tabs allowScrollButtonsMobile={true} sx={{ '& .MuiTabs-flexContainer': { flexWrap: 'wrap' } }} TabIndicatorProps={{ sx: { display: 'none' } }} value={valueInside} onChange={handleChangeInside} aria-label="basic tabs example" className="tab-box">
                                        <Tab wrapped fullWidth className="text-title tab-etapas" label="Discussão sobre a Validação do problema" {...a22yProps(0)} />
                                        
                                    </Tabs>

                                    <TabPanelInside value={valueInside} index={0} className="atv-container border">
                                    

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
                                                <button className={`btn-atv ${isPaused || isActive ? 'selected' : ''}`} onClick={() => setTimeClock(25)} disabled={isActive}>Iniciar Atividade</button>
                                                
                                                { isPaused ?  
                                                    <button className="btn-atv" onClick={() => setTimeClock(timeClockPause)} disabled={!isActive}>Continuar Atividade</button> :
                                                    <button className="btn-atv btn-pause" onClick={handlePauseTimer} disabled={!isActive}>Pausar Atividade</button>
                                                }
                                                    
                                            </div>
                                            
                                        </div>
                                    </TabPanelInside>
                                </AccordionDetails>
                            </Accordion>

                            <div className="btn-Box">
                                <button className="btn-proxAtv" onClick={() => setValue((prev) => prev+1)}>Ir para as próximas atividades</button>
                            </div>
                        

                        </TabPanel>

                        <TabPanel value={value} index={4} className="border revisao-processo">

                            <div className="info-etapa-text">

                                <h2 className="text-title-etapa">Revisão do Processo</h2>
                                <h4 className="text-subtitle">
                                    Etapa em que os participantes irão realizar a revisão do processo. Esta etapa possui atividades que disponibilizam momentos para os integrantes 
                                    das equipes analisarem tudo que foi feito nas atividades das etapas anteriores e se necessário realize melhorias para as próximas etapas.
                                    <br /> <strong>Lembrem-se</strong>, cada atividade possui um tempo estimado para serem realizadas. O tempo é disponibilizado em cada atividade 
                                    e para acompanhar esse tempo lembre sempre de olhar para o relógio.
                                </h4>
                            </div>

                            <Accordion className="box-accordion" expanded={expanded === 'panel1e'} onChange={handleOpenBox('panel1e')}>
                                <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel3bh-content"
                                id="panel3bh-header"
                                >
                                <Typography className="text-title">
                                    Retrospectiva do processo
                                </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <div className={`timer-box`}>
                                        <div className="content-timer">
                                            <Timer minutes={timeClock} isActive={isActive} setIsActive={setIsActive}></Timer>
                                        </div>
                                    </div>

                                    <Tabs allowScrollButtonsMobile={true} sx={{ '& .MuiTabs-flexContainer': { flexWrap: 'wrap' } }} TabIndicatorProps={{ sx: { display: 'none' } }} value={valueInside} onChange={handleChangeInside} aria-label="basic tabs example" className="tab-box">
                                        <Tab wrapped fullWidth className="text-title tab-etapas" label="Retrospectiva" {...a22yProps(0)} />
                                        
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
                                                <p>Antes de inciar a atividade lembrem-se que vocês têm <strong>5 minutos</strong> para finalizar a mesma.</p> 
                                                <button className={`btn-atv ${isPaused || isActive ? 'selected' : ''}`} onClick={() => setTimeClock(5)} disabled={isActive}>Iniciar Atividade</button>
                                                
                                                { isPaused ?  
                                                    <button className="btn-atv" onClick={() => setTimeClock(timeClockPause)} disabled={!isActive}>Continuar Atividade</button> :
                                                    <button className="btn-atv btn-pause" onClick={handlePauseTimer} disabled={!isActive}>Pausar Atividade</button>
                                                }
                                                    
                                            </div>

                                            <br />
                                            <br />
                                            
                                                <BoardSprint></BoardSprint>
                                        
                                        </div>
                                        
                                    </TabPanelInside>

                                    
                                </AccordionDetails>
                            </Accordion>
                            
                            <div className="btn-Box">
                                <button className="btn-proxAtv" onClick={() => setValue((prev) => prev+1)}>Ir para as próximas atividades</button>
                            </div>
                        </TabPanel>

                        <TabPanel value={value} index={5} className="border metodos-avaliacao">
                            <div className="info-etapa-text">

                                <h2 className="text-title-etapa">Avaliação</h2>
                                <h4 className="text-subtitle">
                                    Etapa em que os participantes irão realizar a avaliação das atividades realizadas. Esta etapa possui um link para uma avaliação
                                    que deve ser respondida de forma individual. Lembre-se o questionário não é obrigatório, contudo sua resposta pode ajudar a melhorar as etapas 
                                    e as atividades realizadas.
                                </h4>
                            </div>
                            <Accordion className="box-accordion" expanded={expanded === 'panel1f'} onChange={handleOpenBox('panel1f')}>
                                <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel3bh-content"
                                id="panel3bh-header"
                                >
                                <Typography className="text-title">
                                    Avaliação do processo
                                </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    

                                    <Tabs allowScrollButtonsMobile={true} sx={{ '& .MuiTabs-flexContainer': { flexWrap: 'wrap' } }} TabIndicatorProps={{ sx: { display: 'none' } }} value={valueInside} onChange={handleChangeInside} aria-label="basic tabs example" className="tab-box">
                                        <Tab wrapped fullWidth className="text-title tab-etapas" label="Avaliação" {...a22yProps(0)} />
                                        
                                    </Tabs>
                                    
                                    <TabPanelInside value={valueInside} index={0} className="atv-container border">
                                        <h4 className="text-title-inside">
                                            Avaliação do processo
                                        </h4>

                                        
                                    
                                        <div className="box-atv">
                                            
                                            
                                            <a href="https://docs.google.com/forms/d/e/1FAIpQLSfZSKR03O2QCmltpj-3d85kmdi9N35tQSWuW7j8tdrf5NxkKA/viewform?embedded=true" target={'_blank'}>
                                                Clique para realizar a avaliação
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