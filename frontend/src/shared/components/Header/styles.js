import styled from "styled-components";

export const Container = styled.div`

    width: 100%;
    height: 80px;

    .header-box {
        width: 100%;
        height: 80px;
        background-color: #0EA7B9;

        display: flex;
        justify-content: center;
        align-items: center;
    }
   

    .blue-line {
        width: 100%;
        height: 15px;

        background-color: #2BCCDE;
    }

    .content-box{
        width: 100%;
        height: 100%;

        display: flex;
        justify-content: space-around;
        align-items: center;

        margin: 60px;
    }

    .box-logo {
        width: 100%;
        height: auto;
    }

    .page-info {
        width: 100%;
        height: 100%;

        display: flex;
        justify-content: center;
        align-items: center;
    }

    .logo-icon {
        width: 120px;
        height: 100%;
    }

    .text-title {
        color: #FFFFFF;
        width: 100%;
        height: 100%;
        font-weight: bold;

    }

    .box-pages {
        width: 100%;
        height: 100%;

        display: flex;
        justify-content: space-evenly;
        align-items: center;

        color: #FFFFFF;
        font-weight: bolder;
    }

    .page-container {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-end;
    }

    .page {
        width: 100px;
        height: 100%;

        display: flex;
        align-items: center;
        justify-content: center;


    }

    .page:hover {
        transition: .5s all;
        background-color: #1DBACC;
    }

    .box-pgs {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;

        text-decoration: none;
        color: #FFFFFF;

        margin: 5px;
        display: block;
        text-decoration: none;
    }

`