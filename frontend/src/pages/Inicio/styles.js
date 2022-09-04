import styled from 'styled-components'

export const Container = styled.div`

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    width: 100%;
     height:100%;
    flex-direction: column;


    .content {
        margin: 110px 0;
        
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;

        flex-direction: column;
    }
    

    .box-info {
        text-align: center;

        height: 100%;
        display: flex;
        flex-direction: column;
        align-content: flex-start;
        justify-content: flex-start;

        border-radius: 8px;
        border: 3px solid #f39601;

        padding: 10px 50px;

        box-shadow: 5px 5px 10px 0px #d4d4d4;

    }

    .box-title {
      margin: 35px 0;
    }

    .box-title2 {
        margin: 15px 0;
    }

    .divider {
        font-size: 26px;
        margin: 25px 0;
    }

    .borderleft {
        border: 1px solid gray;
        border-bottom: 0;
        border-left: 0;
        border-right: 0;
        margin-top: -12px;
        width: 40%;
    }

    .borderright {
        border: 1px solid gray;
        border-bottom: 0;
        border-left: 0;
        border-right: 0;
        width: 40%;
        transform: translate(150%, 15px);
    }

    .text-papel {
        margin-bottom: -5px;
        margin-top: 15px;
        font-weight: 700;
    }

    .btn-formulario {
        width: 100%;
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
        margin-bottom: 15px;
    }

    .btn-formulario:hover {
        background-color: #FFFFFF;
        color: #f39601;
    }

    .equipeExiste {
        display: none;
    }

    .equipeNaoExiste {
        color: red;
        font-size: 14px;
    }

    .equipeNaoExisteInput {
        border: 1px solid red;
        border-radius: 8px;
    }

    .prox {
        color: #FFFFFF;
    }

    @media screen and (min-width: 2560px){
       .content {
            margin: 100% 0;
       }
   }

   @media screen and (max-width: 1440px){
       .content {
            margin: 135px 0;
       }
   }

   @media screen and (max-width: 425px){
       .content {
            margin: 120px 0;
       }
   }

   @media screen and (max-width: 375px){
        .box-info {
            padding: 25px;
        }
        .box-title {
            padding: 0 2px;
        }
   }
`