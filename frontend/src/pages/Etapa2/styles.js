import styled from "styled-components";

export const Container = styled.div`

    margin-bottom: 80px;

    
    .content-info {
        display: flex;
        align-items: center;
        justify-content: space-between;

        margin: 50px 0;
    }

    .tab-box {
        border: 2px solid #f39601;
        border-top: 0;
        border-left: 0;
        border-right: 0;
        color: #f39601;
        
        width: 100%;

        display: flex;
        align-items: center;
        justify-content: center;
    }

    .tab-box .Mui-selected {
        background-color: #feca74;
        color: #FFFFFF;
    }

    .tab-etapas {
        color: #f39601;

        border: 2px solid #f39601;
        border-bottom: 0;
        border-radius: 8px 8px 0 0;
    }

    .tab-etapas:hover {
        background-color: #f39601;
        color: #FFFFFF;
        transition: all .5s;
    }

    .text-title {
        font-weight: bold;
        color: #f39601;
        outline: none;
    }

    .border {
        border: 2px solid #f39601;
        border-radius: 0 0 8px 8px;
        border-top: 0;    
    }

    .discussao-solução {
        padding: 50px;
    }

    .esboco-problema {
        padding: 50px;
    }

    .mentoria {
        padding: 50px;
    }

    .aprimoramento-esboco {
        padding: 50px;
    }

    .validacao-esboco {
        padding: 50px;
    }

    .revisao-processo {
        padding: 50px;
    }

    .metodos-avaliacao {
        padding: 50px;
    }

    .text-title-etapa {
        margin-bottom: 15px;
    }

    .text-subtitle {
        margin-bottom: 15px;
        font-weight: 500;
        text-align: justify;
        line-height: 22px;
    }   

    .box-accordion {
        margin: 25px 0;
        border: 2px solid #f39601;

        svg {
            fill: #f39601;
            stroke: #f39601;
        }
    }

    .timer-box {
        display: flex;
        align-items: center;
        justify-content: flex-end;
       
        margin-right: 5px;
        
    }

    .content-timer {
        background-color: #2BCCDE;
        border: 3px solid #0EA7B9;
        width: 170px;
        height: 65px;

        display: flex;
        align-items: center;
        justify-content: center;

        border-radius: 15px;
        margin-bottom: 10px;
    }
  
    .atv-container {
        padding: 35px;
    }

    .box-atv {
        margin-top: 15px;
    }

    .text-title-inside {
        margin: 5px 0;
        font-size: 16px;
        font-weight: 700;
    }
    
    .iniciar-atv {
        p {
            margin-bottom: 15px;
        }
    }

    .btn-atv {
        width: 150px;
        height: 25px;
        border-radius: 15px;
        border: 1px solid green;
        background-color: green;
        color: #FFFFFF;
        font-weight: bold;
        font-size: 14px;
        cursor: pointer;

        margin-right: 5px;
    }

    .btn-atv:hover {
        background-color: #FFFFFF;
        color: green;
    }

    .selected {
        background-color: gray;
        color: #FFFFFF;
        border: 1px solid gray;
        cursor: auto;
    }

    .selected:hover {
        background-color: gray;
        color: #FFFFFF;
        border: 1px solid gray;
    }

    .papeis-etapa {
        width: 100%;
    }
    
    .papeis{
        width: 100%;

        margin: 25px 0;
    }

    .text-papel {
        margin-bottom: -5px;
        margin-top: 15px;

        font-size: 14px;
        font-weight: 700;
    }

    .btn-Box {
        display: flex;
        align-items: center;
        justify-content: flex-end;
    }

    .btn-proxAtv {
        width: 230px;
        height: 25px;
        border-radius: 15px;
        border: 1px solid #f39601;
        background-color: #f39601;
        color: #FFFFFF;
        font-weight: 500;
        font-size: 14px;
        cursor: pointer;

        margin-top: 15px;
    }

    .btn-proxAtv:hover {
        background-color: #FFFFFF;
        color: #f39601;
    } 

    .btn-formulario {
        margin-top: 15px;
        height: 25px;
        border-radius: 15px;
        border: 1px solid #f39601;
        background-color: #f39601;
        color: #FFFFFF;
        font-weight: bold;
        font-size: 14px;
        cursor: pointer;

        text-transform: capitalize;
    }

    .btn-formulario:hover {
        background-color: #FFFFFF;
        color: #f39601;
    }

    .aberto {
        background-color: #FFFFFF;
    }

    .disabled {
        background-color: gray;
        color: #FFFFFF;
        border: 1px solid gray;
        cursor: auto;
    }

    .disabled:hover {
        background-color: gray;
        color: #FFFFFF;
        border: 1px solid gray;
    }

    .finalizada {
        background-color: #88c425;
        color:  #FFFFFF;
        font-weight: bold;
    }

    .finalizarAtv {
        margin-top: 10px;
        label {
            font-weight: 700;
        }
        input {
            margin-left: 10px;
        }
    }

    .finalizar-etapa {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        margin: 70px 0;
    }

    .btn-finalEtapa {
        width: 250px;
        height: 50px;
        border-radius: 10px;
        background-color: #0a8005;
        border: 1px solid #0a8005;

        color: #FFFFFF;
        font-weight: 700;
        cursor: pointer;
        display: none;
    }

    .finalizada-etapa {
        display: block;
    }

    .btn-finalEtapa:hover {
        background-color: #FFFFFF;
        border: 1px solid #0a8005;
        transition: all .5s;

        color: #0a8005;
    }

    .video-box {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 30px 0;
    }

    .video {
        width: 727px;
        height: 409px;
    }

    @media screen and (max-width: 1440px){
        
        .content-page {
            margin: 62px;
        }

        .tab-etapas {
            padding: 2px;
        }
    }

    @media screen and (max-width: 1024px){
        .tab-etapas {
            padding: 5px;
            width: 14%;
        }
    }

    @media screen and (max-width: 975px){
        
        .tab-etapas {
            width: 14.28%;
        }
    }

    @media screen and (max-width: 768px){
        
        .content-page {
            margin: 42px;
        }

        .tab-box {
            width: 100%;
            display: flex;
            justify-content: start;
            align-items: center;

            flex-wrap: wrap;

        }

    }

    @media screen and (max-width: 425px){
        
        .content-page {
            margin: 32px;
        }

        .timer-box {
            justify-content: center;
        }

        .tab-box {
            width: 100%;
            display: flex;
        }

        .tab-etapas {
            width: 100%;
            border-radius: 0;
        }

        .atv-container {
            padding: 20px;
        }

        .discussao-solução {
            padding: 40px;
        }

        .esboco-problema {
            padding: 40px;
        }
        
        .mentoria {
            padding: 40px;
        }

        .aprimoramento-esboco {
            padding: 40px;
        }

        .validacao-esboco {
            padding: 40px;
        }

        .revisao-processo {
            padding: 40px;
        }

        .metodos-avaliacao {
            padding: 40px;
        }

        .btn-Box {
            justify-content: center;
        }
    }

    @media screen and (max-width: 375px){
       
        .discussao-solução {
            padding: 30px;
        }

        .esboco-problema {
            padding: 30px;
        }

        .mentoria {
            padding: 30px;
        }

        .aprimoramento-esboco {
            padding: 30px;
        }

        .validacao-esboco {
            padding: 30px;
        }

        .revisao-processo {
            padding: 30px;
        }

        .metodos-avaliacao {
            padding: 30px;
        }
    }

    @media screen and (max-width: 320px){
       
       .atv-container {
            padding: 15px;
        }

        .btn-atv {
            width: 100%;
        }

        .btn-formulario {
            font-size: 12px;
        }

        .discussao-solução {
            padding: 25px;
        }

        .esboco-problema {
            padding: 25px;
        }

        .mentoria {
            padding: 25px;
        }

        .aprimoramento-esboco {
            padding: 25px;
        }

        .validacao-esboco {
            padding: 25px;
        }

        .revisao-processo {
            padding: 25px;
        }

        .metodos-avaliacao {
            padding: 25px;
        }

        .btn-proxAtv {
            height: 40px;
       }
   }

`

export const BoxModal = styled.div`

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 400px;
    background-color: white;
    border: 2px solid #000;
    border-radius: 8px;
    box-shadow:  5px 5px 10px 0px #d4d4d4;
    padding: 10px;

    @media screen and (max-width: 375px){
        width: 95%;
    }
`