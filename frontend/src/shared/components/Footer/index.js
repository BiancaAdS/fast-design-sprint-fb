import React, { useContext } from "react";
import { Link } from 'react-router-dom'

import { AuthContext } from "../../../contexts/Auth/AuthContext";

import { Container,
    FooterContainer,
    Footer,
    Container17,
    Text44,
    Nav,
    Text47,
    Text48,
    Text49,
    Text52,
    Text55,
    Separator,
    Container18,
    Text56 } from "./styles";

export const Footers = (props) => {

    const auth = useContext(AuthContext)

    const handleFinalizar = () => {
      auth.logoutUser()
    }

    return(
        <Container>
            <FooterContainer>
            <Footer>
              <Container17>
                <Text44>Fast Design Sprint</Text44>
                <Nav>
                  <Link className="linkPages" to="/home">Inicio</Link>
                  <Link className="linkPages" to="/etapa1">Etapa 1</Link>
                  <Link className="linkPages" to="/etapa2">Etapa 2</Link>
                  <Link className="linkPages" to="/etapa3">Etapa 3</Link>
                  <Link className="linkPages" to="/etapa4">Etapa 4</Link>
                  <Link className="linkPages" to="/" onClick={handleFinalizar}>Finalizar Sprint</Link>
                </Nav>
              </Container17>
              <Separator></Separator>
              <Container18>
                <Text56>© 2022 Fast Design Sprint.</Text56>
              </Container18>
            </Footer>
          </FooterContainer>
        </Container>
    )
}