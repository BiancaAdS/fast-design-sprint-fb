import styled from "styled-components";

export const Container = styled.div`

    .chipAtv {
        border: 1px solid gray;
        font-weight: 600;
    }

    .chipAtv:hover {
        transition: all .5s;
        background-color: #FFFFFF;
    }

    .bloco-atv {
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 8px;
        margin: 0 25px;
        padding: 0px 25px;
    }

    .bloco-atv-video {
        width: 100%;
    }

    .atvAtualBox {
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        margin: 50px;
    }

    .text-title-inside {
        margin: 5px 0;
        font-size: 16px;
        font-weight: 700;
    }

    .box-atv {
        margin-top: 15px;
    }

    .iniciar-atv {
        p {
            margin-bottom: 15px;
            margin-top: -15px;
        }
    }

    .atvAnt {
        display: none;
    }

    .atvAtual {
        display: block;
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


    @media screen and (max-width: 840px){
        .atvAtualBox {
            margin: 50px 0;
        }
    }

    @media screen and (max-width: 320px){
        .btn-atv {
            width: 100%;
        }

}
`