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
        font-weight: 700;
        padding: 25px;
        border-radius: 8px;
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
        margin: 30px 0;
    }

    .video {
        width: 727px;
        height: 409px;
    }

    @media screen and (max-width: 425px){
        .timer-box {
            justify-content: center;
        }
    }

    @media screen and (max-width: 320px){
        .btn-formulario {
            font-size: 12px;
        }
}

`