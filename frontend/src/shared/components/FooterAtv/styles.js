import styled from 'styled-components'

export const Container = styled.div`

    margin-top: 185px;


    @media screen and(max-width: 600px){
        margin-top: 275px;
        
    }

    @media screen and(max-width:375px){
        margin-top: 375px;
        
    }

    .box-nextPrev-atv {
        width: inherit;
        position: absolute;
        bottom: 0;
        background-color: #dde0e3;
    }

    .center {
        justify-content: center;
        align-items: center;
        text-align: center;
    }

    .box-options{
        width: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;
    }
    
    .btn-handleAtvs {
        display: flex;
        justify-content: center;
        align-items: center;

        background-color: #45596a;
        color: white;
        border-radius: 8px;
        border: none;
        height: 35px;
        width: 190px;
        margin: 0 100px;
    }

    @media screen and (max-width: 840px){
        .title-atv {
            h2 {
                font-size: 1em;
                text-align: center;
            }
        }

        .btn-handleAtvs {
            margin: 0 35px;
        }
    }

    @media screen and (max-width: 768px){
        .title-atv {
            font-size: 1em;
        }

        .btn-handleAtvs {
            margin: 0 10px;
            font-size: 12px;
        }
    }

    @media screen and (max-width: 425px){
        .box-nextPrev-atv {
            width: 100%;
        }

        .title-atv {
            font-size: 1em;
        }

        .btn-handleAtvs {
            width: 100%;
        }
    }
`