import React, { useState } from "react";

import { Container } from "./styles";


export const Inicio = () => {

    const [open, setOpen] = useState(false)

      
    return(
        <Container>
            <div className="wrapper">

                <div>

                    <h1>Já iniciou uma Sprint?</h1>
                    
                    <h2>Continue a sprint</h2>
                    <input type="text" name="" id="" /> Insira o nome de sua equipe
                    <button type="submit">Continuar sprint</button>

                    
                    ou 

                    <h2>Inicie a sprint</h2>
                    <button type="submit">Iniciar sprint</button>


                </div>
               
                
                
                

            </div>
        
        </Container>
    )
}