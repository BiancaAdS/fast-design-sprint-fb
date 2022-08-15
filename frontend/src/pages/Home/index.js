import React, { useState } from "react";
import { Link } from "react-router-dom";

import { Container } from "./styles";

import { Button } from "@mui/material";

export const Home = () => {

    const [open, setOpen] = useState(false)

    const etapas = [
        { name: 'Etapa 1', body: ['Formar Equipes', 'Estabelecer ideia/problema'] },
        { name: 'Etapa 2', body: ['Buscar soluções existentes para o problema escolhido', 'Validar a solução escolhida parcialmente'] },
        { name: 'Etapa 3', body: ['Aprimorar solução', 'Preparar testes', 'Aplicar testes'] },
        { name: 'Etapa 4', body: ['Apresentar a ideia'] },
    ]

   
    
    const handleClick = () => {

        setOpen(!open)
    }

    
    return(
        <Container>
            <div className="wrapper">
                
                <h1>Bem-vindos ao Fast Design Sprint!</h1>

              
                <div className="container-etapas" >
                    

                    {etapas.map((item, i) => (
                        <div key={i}>
                            <Button key={i} className="btn-etapa" onClick={handleClick}>{item.name}</Button>
                            <div key={item.name} className={`etapa ${open ? '--active' : ''}`}>
                                <div id="popover-basic" className={`pop ${item.name}`}>
                                    <div>
                                        <div className={`${item.name}`}>
                                            <ul>
                                                {item.body.map((cont, i) => (
                                                    <li key={i}>{cont}</li>
                                                ))}
                                            </ul>                  
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        

                    ))}

                   
                   
                </div>

                <br />
   
                <div className="video-apres">

                    <h4>Vídeo de apresentação</h4>
                    <p>
                        Abaixo contém um vídeo que resume todas as atividades que serão realizada para que sua equipe possa chegar
                        ao final dos dias com uma solução definida, validada e prótipada. 
                    </p>
                    <div>
                        INSERIR VÍDEO AQUI?
                    </div>

                </div>

                <br />
                <hr />
                <br />

                

                <button><Link to={'/etapa1'}>Iniciar Etapa 1</Link></button>

            </div>
        
        </Container>
    )
}