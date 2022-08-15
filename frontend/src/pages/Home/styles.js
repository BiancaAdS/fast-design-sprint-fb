import styled from "styled-components";

export const Container = styled.div`

    width: 100%;
    height: 100%;

    .box-modelo {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .container-etapas {
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        
        margin: 50px 0;
    }

    .btn-etapa {
        background-color: red;

        width: 150px;
        height: 55px;

    }

    .etapa {
        background-color: red;
        width: 150px;
        
        display: none;
    }

    .--active{
        display: block;
    }
 

    .img-modelo {
        
        width: 700px;
        height: 550px;
    }

    .video-apres {

    }
    

`