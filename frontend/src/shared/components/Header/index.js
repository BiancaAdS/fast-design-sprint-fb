import React, { useState, useContext }  from "react";
import { Link } from 'react-router-dom'

import { AuthContext } from "../../../contexts/Auth/AuthContext";

import { Container, 
    NavbarContainer, 
    Navbar, 
    Heading,
    LinksContainer, 
    BurgerMenu,
    Icon,
    MobileMenu,
    Container01,
    Heading1,
    CloseMenu,
    Icon02,
    LinksContainer1, 
} from "./styles";

export const Header = (props) => {

  const [open, setOpen] = useState(false)

  const auth = useContext(AuthContext)

  const openMenu = () => {
    setOpen(!open)
  }

  const handleFinalizarMob = () => {
    auth.logoutUser()
    setOpen(!open)
  }

  const handleFinalizar = () => {
    auth.logoutUser()
  }

    return(
        <Container>
            <NavbarContainer data-role="Header">
            <Navbar>
              <Heading projVariant="cardHeading">
                <Link className="linkPages" to="/home">Fast Design Sprint</Link>
              </Heading>
              <LinksContainer>
                <Link className="linkPages" to="/home">Inicio</Link>
                <Link className="linkPages" to="/etapa1">Etapa 1</Link>
                <Link className="linkPages" to="/etapa2">Etapa 2</Link>
                <Link className="linkPages" to="/etapa3">Etapa 3</Link>
                <Link className="linkPages" to="/etapa4">Etapa 4</Link>
                <Link className="linkPages" to="/" onClick={handleFinalizar}>Finalizar Sprint</Link>
              </LinksContainer>
              <BurgerMenu data-type="BurgerMenu"  onClick={openMenu}>
                <Icon viewBox="0 0 1024 1024">
                  <path d="M128 256h768v86h-768v-86zM128 554v-84h768v84h-768zM128 768v-86h768v86h-768z"></path>
                </Icon>
              </BurgerMenu>
              <MobileMenu className={`${open ? 'open' : ''}`} data-type="MobileMenu">
                <Container01>
                  <Heading1 projVariant="cardHeading"><Link className="linkPages" to="/home">Fast Design Sprint</Link></Heading1>
                  <CloseMenu data-type="CloseMobileMenu" onClick={openMenu}>
                    <Icon02 viewBox="0 0 1024 1024">
                      <path d="M810 274l-238 238 238 238-60 60-238-238-238 238-60-60 238-238-238-238 60-60 238 238 238-238z"></path>
                    </Icon02>
                  </CloseMenu>
                </Container01>
                <hr />
                <LinksContainer1>
                  <Link className="linkPagesMob" to="/home" onClick={openMenu}>Inicio</Link>
                  <Link className="linkPagesMob" to="/etapa1" onClick={openMenu}>Etapa 1</Link>
                  <Link className="linkPagesMob" to="/etapa2" onClick={openMenu}>Etapa 2</Link>
                  <Link className="linkPagesMob" to="/etapa3" onClick={openMenu}>Etapa 3</Link>
                  <Link className="linkPagesMob" to="/etapa4" onClick={openMenu}>Etapa 4</Link>
                  <Link className="linkPagesMob" to="/" onClick={handleFinalizarMob}>Finalizar Sprint</Link>
                </LinksContainer1>
              </MobileMenu>
            </Navbar>
          </NavbarContainer>
        </Container>
    )
}