import styled from 'styled-components'

export const Container = styled.div`

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .bloco-atvFinalizada {
        margin: 25px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 3px solid #127899;
        padding: 25px;
        border-radius: 8px;
    }

    .seConhecem {
       margin-top: 25px;
       margin-bottom: -25px;
    }

    .atvAnt {
        display: none;
    }

    .atvAtual {
        display: block;
    }
    
    .radio-n {
        margin-left: 15px;
    }
    
    .info-naoSeConhecem {
        display: none;
    }

    .info-seConhecem {
        margin: 65px;
        margin-bottom: 0;
        font-size: 12px;
        font-weight: 600;
        color: orange;
        text-align: center;
    }

    .text-subtitle {
        margin-bottom: 15px;
        font-weight: 500;
        text-align: justify;
        line-height: 22px;
    }   

    .timer-box {
        display: flex;
        align-items: center;
        justify-content: flex-end;
    
        margin-right: 5px;
    }

    .mobile-timer {
        display: block;
    }

    .destkop-timer {
        display: none;
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

    .papeis{
        width: 100%;

        margin: 25px 0;
        margin-bottom: 0;
    }

    .text-papel {
        margin-bottom: -5px;
        margin-top: 15px;

        font-size: 14px;
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

    .video-box {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0px 30px;
    }

    .video {
        width: calc(100%);
        height: 600px;
    }

    .icon-pop {
        width: 18px;
        position: absolute;
        margin-left: 78px;
        margin-top: 12px;
        cursor: pointer;
    }

    .icon-pop2{
        width: 18px;
        position: absolute;
        margin-left: 70px;
        margin-top: 106px;
        cursor: pointer;
    }

    .icon-pop3{
        width: 18px;
        position: absolute;
        margin-left: 86px;
        margin-top: 202px;
        cursor: pointer;
    }

    .icon-pop4{
        width: 18px;
        position: absolute;
        margin-left: 102px;
        margin-top: 297px;
        cursor: pointer;
    }

    .icon-pop5{
        width: 18px;
        position: absolute;
        margin-left: 102px;
        margin-top: 392px;
        cursor: pointer;
    }

    .equipeNaoExiste {
        display: none;
    }

    .equipeExiste {
        color: red;
        font-size: 14px;
    }

    .equipeExisteInput {
        border: 1px solid red;
        border-radius: 8px;
    }

    @media screen and (max-width: 768px){
        .video {
            width: calc(100%);
            height: 409px;
        }

        .info-seConhecem {
            margin: 65px 25px;
        }
    }

    @media screen and (max-width: 425px){
        .timer-box {
            justify-content: center;
        }

        .video {
            width: calc(100%);
            height: 409px;
        }
    }

    @media screen and (max-width: 320px){
        .btn-formulario {
            font-size: 12px;
        }
    }

`
