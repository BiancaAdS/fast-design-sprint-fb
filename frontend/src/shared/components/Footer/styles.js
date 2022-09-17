import styled from 'styled-components'

export const Container = styled.div`

  margin-top: 10%;

  .linkPages {
      text-decoration: none;
      color: #FFFFFF;
      font-weight: bold;
      display: flex;
      align-items: center;
      justify-content: center;

      margin-top: 15px;
      margin-bottom: 15px;
      padding-left: 15px;
      text-align: center;
    }

    @media screen and (max-width: 768px){
      margin-top: 20%;

      .linkPages {
        text-align: center;
      }

    }

    @media screen and (max-width: 425px){
      margin-top: 60%;
      
      .linkPages {
        padding-left: 15px;
        font-size: 15px;
      }
    }

    @media screen and (max-width: 375px){
      .linkPages {
        font-size: 12px;
      }
    }

`

export const FooterContainer = styled.div`
  width: 100%;
  bottom: 0;

  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  background-color: #1565c0;
`
 
  export const Footer = styled.footer`
    width: 100%;
  bottom: 0;

    display: flex;

    align-items: center;
    padding-top: 32px;
    padding-left: 48px;
    padding-right: 48px;
    flex-direction: column;
    padding-bottom: 32px;
    justify-content: space-between;
    background-color: #1565c0;

    @media(max-width: 768px){
      padding-left: 32px;
      padding-right: 32px;
    }
   
  `
 
  export const Container17 = styled.div `
  width: 100%;
  bottom: 0;

    display: flex;
    max-width: 1400px;
    align-items: center;
    flex-direction: column;
    justify-content: space-between;
  `

  export const Text44 = styled.h1`
    color: white;
    font-weight: bold;
    text-align: center;
  `
  
  export const Nav = styled.nav`
    flex: 0 0 auto;
    display: flex;
    margin-top: 0px;
    align-items: center;
    flex-direction: row;
  `

  export  const Separator = styled.div`
    flex: 0 0 auto;
    width: 100%;
    height: 0px;
    display: flex;
    margin-top: 32px;
    align-items: flex-start;
    margin-left: 0px;
    border-color: white;
    border-style: solid;
    border-width: 1px;
    margin-right: 0px;
    margin-bottom: 32px;
    flex-direction: row;
    border-top-width: 0px;
    border-left-width: 0px;
    border-right-width: 0px;
      
    @media(max-width: 767px) {
      margin-top: 24px;
      margin-left: 0px;
      margin-right: 0px;
      margin-bottom: 24px;
    }

    @media(max-width: 479px) {
      margin-top: 24px;
      margin-bottom: 24px;
    }
  `
  
  export const Container18 = styled.div`
    flex: 0 0 auto;
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
    text-align: center;


    @media(max-width: 767px) {
      align-items: center;
      flex-direction: column;
      justify-content: space-between;
    };

    @media(max-width: 479px) {
      align-items: center;
      flex-direction: column;
      justify-content: space-between;
    };
  `
   
  export const Text56 = styled.span`
    color: white;
    text-align: center;

    @media(max-width: 767px) {
      margin-bottom: 24px;
    };
    @media(max-width: 479px) {
      text-align: center;
    }
  `
  