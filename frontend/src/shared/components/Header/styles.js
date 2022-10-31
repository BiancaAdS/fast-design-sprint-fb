import styled from "styled-components";

export const Container = styled.div`
  .open {
    display: block;
  }

  .desktop {
    width: 30%;
  }

  .linkPages {
    text-decoration: none;
    margin: 0 10px;
    color: #ffffff;
    font-weight: bold;

    text-align: center;
  }

  .linkPagesMob {
    width: 100%;
    height: 50px;
    text-decoration: none;
    color: #ffffff;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: flex-start;

    text-align: center;

    margin-top: 15px;
    margin-bottom: 15px;
    padding-left: 15px;
  }

  .linkPagesMob:hover {
    background-color: white;
    color: black;
    transition: all 0.5s;
  }
`;

export const NavbarContainer = styled.div`
  width: 100%;
  z-index: 100;
  display: flex;
  top: 0;
  position: fixed;
  box-shadow: 5px 5px 10px 0px #d4d4d4;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  background-color: #1565c0;
`;

export const Navbar = styled.div`
  width: 100%;
  display: flex;
  height: 70px;
  align-items: center;
  max-width: 1440px;
  flex-direction: row;
  justify-content: space-between;
  background-color: #1565c0;

  @media (max-width: 1440px) {
    justify-content: space-between;
    padding: 0 50px;
  }
  @media (max-width: 767px) {
    position: relative;
  } ;
`;

export const Heading = styled.div`
  color: white;
  font-weight: bold;
  text-align: center;

  .box-infoUser {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }

  .nome-user {
    border-left: 3px solid white;
    padding-left: 8px;
  }

  @media screen and (max-width: 969px) {
    .nome-user {
      border-left: 0;
      padding-left: 0;
      margin: 0 10px;
    }
  }

  @media screen and (max-width: 768px) {
    .nome-user {
      border-left: 3px solid white;
      padding-left: 8px;
      margin: 0;
    }
  }

  @media screen and (max-width: 467px) {
    .nome-user {
      border-left: 0;
      padding-left: 0;
      margin: 0 10px;
    }
  }
`;

export const LinksContainer = styled.div`
  display: flex;
  position: relative;
  align-self: center;
  align-items: center;
  flex-direction: row;
  justify-content: center;

  @media (max-width: 991px) {
    width: auto;
    align-items: center;
    justify-content: center;
  }

  @media (max-width: 767px) {
    display: none;
  } ;
`;

export const Link = styled.span`
  color: gray;

  @media (max-width: 991px) {
    text-align: center;
  } ;
`;

export const BurgerMenu = styled.div`
  display: none;
  align-items: flex-start;
  flex-direction: column;

  @media (max-width: 767px) {
    display: flex;

    background-color: #1565c0;
  }
`;

export const Icon = styled.svg`
  width: 36px;
  height: 36px;
  @media (max-width: 767px) {
    fill: white;
  } ;
`;

export const MobileMenu = styled.div`
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100vh;
  display: none;

  position: absolute;
  align-items: flex-start;
  flex-direction: column;
  background-color: #1565c0;
`;

export const Container01 = styled.div`
  flex: 0 0 auto;
  width: 100%;
  display: flex;
  align-items: center;
  margin: 25px 0;
  flex-direction: row;
  justify-content: space-between;
`;

export const Heading1 = styled.span`
  margin-left: 8px;
  @media (max-width: 991px) {
    text-align: center;
  } ;
`;

export const CloseMenu = styled.div`
  flex: 0 0 auto;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
`;

export const Icon02 = styled.svg`
  width: 24px;
  height: 24px;
  fill: white;
`;

export const LinksContainer1 = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
`;
