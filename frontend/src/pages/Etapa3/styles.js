import styled from "styled-components";

export const Container = styled.div`

    margin-bottom: 80px;

    .acc {
        margin: 25px 0 50px;
    }

    .conteiner-etapa {
        width: 100%;
        height: 55px;

        border: 1px solid black;
        border-radius: 8px;
        margin-bottom: 5px;
        margin-top: 15px;

        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .label-etapa {
        margin: 15px;
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

    .text-title {
        font-weight: bold;
        color: #f39601;
        outline: none;
    }

    .box-accordion {
        margin: 25px 0;
        border: 2px solid #f39601;

        svg {
            fill: #f39601;
            stroke: #f39601;
        }
    }

    .border {
        border: 2px solid #f39601;
        border-radius: 0 0 8px 8px;
        border-top: 0;    
    }

    .line {
        border: 1px solid whitesmoke;
        width: calc(55%);
        margin-left: 20%;
        margin-top: 15px;
        margin-bottom: 15px;
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

    .aprimoramento-esboco {
        padding: 50px;
    }

    .testagem {
        padding: 50px;
    }

    .desenvolvimento-testagem {
        padding: 50px;
    }

    .mentoria {
        padding: 50px;
    }

    .validacao-solucao {
        padding: 50px;
    }

    .aprimoramento-prototipo {
        padding: 50px;
    }

    .revisao-processo {
        padding: 50px;
    }

    .metodos-avaliacao {
        padding: 50px;
    }

    .radio-n {
        margin-left: 15px;
    }

    .content-info {
        display: flex;
        align-items: center;
        justify-content: space-between;

        margin: 50px 0;
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

    .btn-pause {
        border: 1px solid red;
        background-color: red;
    }

    .btn-pause:hover {
        background-color: #FFFFFF;
        color: red;
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
        margin: 10px;
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

    @media screen and (max-width: 2560px){
        .tab-etapas {
            width: 12.5%;

        }
    }

    @media screen and (max-width: 1440px){
        
        .content-page {
            margin: 62px;
        }

        .tab-etapas {
            width: 12.5%;

        }
    }

    @media screen and (max-width: 1024px){
        .tab-etapas {
            padding: 5px;
            width: 12.5%;
            font-size: 0.68em;
        }
    }

    @media screen and (max-width: 975px){
        
        .tab-etapas {
            width: 12.5%;
            font-size: 0.65em
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

        .tab-etapas {
            width: 50%;
            border-radius: 0;
            font-size: 12px;
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

        .aprimoramento-esboco {
            padding: 40px;
        }

        .testagem {
            padding: 40px;
        }

        .desenvolvimento-testagem {
            padding: 40px;
        }

        .mentoria {
            padding: 40px;
        }

        .validacao-solucao {
            padding: 40px;
        }

        .aprimoramento-prototipo {
            padding: 40px;
        }

        .revisao-processo {
            padding: 40px;
        }

        .metodos-avaliacao {
            padding: 40px;
        }
    }

    @media screen and (max-width: 375px){
       
        .aprimoramento-esboco {
            padding: 30px;
        }

        .testagem {
            padding: 30px;
        }

        .desenvolvimento-testagem {
            padding: 30px;
        }

        .mentoria {
            padding: 30px;
        }

        .validacao-solucao {
            padding: 30px;
        }

        .aprimoramento-prototipo {
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

        .aprimoramento-esboco {
            padding: 25px;
        }

        .testagem {
            padding: 25px;
        }

        .desenvolvimento-testagem {
            padding: 25px;
        }

        .mentoria {
            padding: 25px;
        }

        .validacao-solucao {
            padding: 25px;
        }

        .aprimoramento-prototipo {
            padding: 25px;
        }

        .revisao-processo {
            padding: 25px;
        }

        .metodos-avaliacao {
            padding: 25px;
        }
   }

`