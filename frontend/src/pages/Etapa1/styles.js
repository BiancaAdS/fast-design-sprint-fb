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

    .formacao-equipe {
        padding: 50px;
    }

    .mapeamento-problema {
        padding: 50px;
    }

    .mentoria {
        padding: 50px;
    }

    .validacao-problema {
        padding: 50px;
    }

    .revisao-processo {
        padding: 50px;
    }

    .seConhecem {
       margin-top: 5px;
       
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

        margin: 25px 0;

        position: fixed;
        z-index: 10;
        margin-left: 63.5%;
    }

    .content-timer {
        background-color: #2BCCDE;
        border: 3px solid #0EA7B9;
        width: 250px;
        height: 100px;

        display: flex;
        align-items: center;
        justify-content: center;

        border-radius: 15px;
    }

    .info-naoSeConhecem {
        display: none;
    }

    .info-seConhecem {
        margin-bottom: -20px;
        font-size: 12px;
        font-weight: 600;
        color: orange;
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
        border: 1px solid #f39601;
        background-color: #f39601;
        color: #FFFFFF;
        font-weight: bold;
        font-size: 14px;
        cursor: pointer;
    }

    .btn-atv:hover {
        background-color: #FFFFFF;
        color: #f39601;
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

    @media screen and (max-width: 1440px){
        
        .content-page {
            margin: 62px;
        }
    }

    @media screen and (max-width: 975px){
        
        .tab-etapas {
            width: 20%;
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
            width: 20%;
        }
    }

    @media screen and (max-width: 425px){
        
        .content-page {
            margin: 32px;
        }

        .tab-box {
            width: 100%;
            display: flex;
            
        }

        .tab-etapas {
            width: 100%;
            border-radius: 0;
        }

        .formacao-equipe {
            padding: 40px;
        }

        .atv-container {
            padding: 20px;
        }

        .mapeamento-problema {
            padding: 40px;
        }

        .mapeamento-problema {
            padding: 40px;
        }

        .validacao-problema {
            padding: 40px;
        }

        .revisao-processo {
            padding: 40px;
        }
    }

    @media screen and (max-width: 375px){
       
        .formacao-equipe {
            padding: 30px;
        }

        .mapeamento-problema {
            padding: 30px;
        }

        .mapeamento-problema {
            padding: 30px;
        }

        .validacao-problema {
            padding: 30px;
        }

        .revisao-processo {
            padding: 30px;
        }
    }

    @media screen and (max-width: 320px){
       
       .formacao-equipe {
           padding: 25px;
       }

       .atv-container {
            padding: 15px;
        }

        .btn-atv {
            width: 100%;
        }

        .btn-formulario {
            font-size: 12px;
        }

       .mapeamento-problema {
           padding: 25px;
       }

       .mapeamento-problema {
           padding: 25px;
       }

       .validacao-problema {
           padding: 25px;
       }

       .revisao-processo {
           padding: 25px;
       }
   }

`