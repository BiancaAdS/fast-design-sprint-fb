import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  min-height: 100vh;
  align-items: center;
  flex-direction: column;
`
  
export const ContainerInside = styled.div`
  width: 100%;
  display: flex;
  position: relative;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  padding: 60px;

  @media(max-width: 479px) {
    padding: 0px;
  };
`
   
export  const Hero = styled.div`
  width: 100%;
  height: 100%;
  margin: 30px;
  display: flex;
  padding: 25px;
  min-width: 100%;
  align-self: center;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`
  
export const Container03 = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  align-self: center;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  @media(max-width: 991px) {
    align-items: flex-start;
    justify-content: center;
  };

  @media(max-width: 425px){
    align-items: center;
    flex-direction: column;
    justify-content: center;
  };
`
   
export const Heading2 = styled.h1`
  color: rgb(4, 4, 4);
  font-size: 2em;
  margin-bottom: 15px;
  text-align: center;

  @media(max-width: 991px) {
    padding: 0 65px;
  };

  @media(max-width: 768px) {
    padding: 0;
    padding-left: 15px;
  };

  @media(max-width: 479px) {
    text-align: left;
    padding: 0;
    padding-left: 30px;
    padding-right: 20px;
  };

  @media(max-width: 375px) {
    padding: 0;
  };
  
`
   
export const Steps = styled.div`
  width: 100%;
  display: flex;
  padding: 48px;
  max-width: 1400px;
  align-items: center;
  flex-direction: column;

  @media(max-width: 768px) {
    padding: 0;
    padding-top: 25px;
    justify-content: flex-start;
    align-items: flex-start;
        
  };

  @media(max-width: 479px) {
    padding-top: 32px;
    padding-bottom: 32px;
    padding-left: 15px;
    padding-right: 15px;
        
  };
`

export  const Text10 = styled.h1`
  color: black;
  margin: 25px 0;
  font-size: 2rem;
    
  @media(max-width: 991px) {
    text-align: center;
    padding: 0 15px;
  };
`
  
export  const ContainerBox = styled.div`
  flex: 0 0 auto;
  width: auto;
  display: flex;
  margin: 30px;
  align-items: flex-start;
  flex-direction: row;

  @media(max-width: 768px) {
    flex-direction: column;
  };

  @media(max-width: 479px) {
    padding-left: 0px;
    margin: 0;
  };
`
    
export  const Step = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  flex-direction: column;
  
  @media(max-width: 768px) {
    height: auto;
    flex-direction: row;
    justify-content: center;
  };
`

export  const ContainerIcon = styled.div`
  flex: 0 0 auto;
  width: 100%;
  display: flex;
  align-items: center;

  padding-left: 2px;
  padding-right: 2px;
  flex-direction: row;
  justify-content: center;

  @media(max-width: 768px) {
    width: 48px;
    height: auto;
    align-self: stretch;
    padding-top: 0px;
    padding-left: 0px;
    padding-right: 0px;
    flex-direction: column;
    padding-bottom: 2px;
    justify-content: space-between;
  };
`
 
export  const Line = styled.div`
    flex: 1;
    height: 0px;
    display: flex;
    align-items: flex-start;
    border-color: transparent;
    border-style: dashed;
    border-width: 2px;
    flex-direction: row;
    border-left-width: 0px;
    border-right-width: 0px;
    border-bottom-width: 0px;
`
  
export const Icon = styled.svg`
  fill: gray;
  width: 24px;
  height: 24px;
`
  
export const LineDashed = styled.div`
  flex: 1;
  height: 0px;
  display: flex;
  align-items: flex-start;
  border-color: gray;
  border-style: dashed;
  border-width: 2px;
  flex-direction: row;
  border-left-width: 0px;
  border-right-width: 0px;
  border-bottom-width: 0px;
  
  @media(max-width: 768px) {
    border-style: dashed;
    border-top-width: 0px;
    border-left-width: 2px;
  };
`

export  const ContainerText = styled.div`
  display: flex;
  align-items: center;

  padding-left: 32px;
  padding-right: 32px;
  flex-direction: column;

  @media(max-width: 1200px) {
    width: 233px;
  };
  @media(max-width: 768px) {
    width: 100%;
    align-items: flex-start;
    padding-top: 20px;
    flex-direction: column;
    padding-bottom: 15px;
    justify-content: space-between;
  };
  @media(max-width: 479px) {
    padding-top: 32px;
    padding-right: 0px;
    padding-bottom: 15px;
  };
`
    
export  const TextTitle = styled.h1`

  font-size: 1.5rem;
  text-align: center;
  font-weight: 500;

  @media(max-width: 1200px){
    font-size: 1.5rem;
    font-weight: 500;
  };

  @media(max-width: 768px) {
    margin-top: 10px;
    margin-left: 0px;
    margin-right: 0px;

  };

  @media(max-width: 479px) {
    margin-left: 0px;
    margin-right: 32px;
  };
`
   
export const ContainerIconInside = styled.div`
  flex: 0 0 auto;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  border-radius: 8px;
  flex-direction: row;
  justify-content: center;
`

export const Features = styled.div`
  width: 100%;
  display: flex;
  padding: 60px;
  align-items: center;
  flex-direction: column;
  background-color: #e7edea;

  @media(max-width: 479px) {
      padding-top: 32px;
      padding-bottom: 32px;
      padding-left: 25px;
      padding-right: 25px;
  };

  @media(max-width: 320px) {
    padding: 0;
  }; 

  .box-btnIniciar {
    margin: 50px;
  }

  .btnIniciar {
    width: 250px;
    height: 50px;
    border-radius: 10px;
    background-color: #0a8005;
    border: 1px solid #0a8005;

    color: #FFFFFF;
    font-weight: 700;
    cursor: pointer;

  }

  .btnIniciar:hover {
    background-color: #FFFFFF;
    border: 1px solid #0a8005;
    transition: all .5s;

    color: #0a8005;
  }
`
    
export const HeadingContainer = styled.div`
  
  width: 100%;
  display: flex;
  margin: 25px;
  align-items: center;
  flex-direction: column;
  @media(max-width: 768px) {
    width: 100%;
  };
`

export const Text37 = styled.span`
   
  @media(max-width: 991px) {
    text-align: center;
  };
`

export  const TextP = styled.span`
  color: gray;
  font-size: 0.75rem;
  text-align: center;
  margin: 5px 0;

  @media(max-width: 768px) {
    text-align: left;
  };
`
  
export  const Video = styled.video`
  width: 100%;
  height: 339px;
`