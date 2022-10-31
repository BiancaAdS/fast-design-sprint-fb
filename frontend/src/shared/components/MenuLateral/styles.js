import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  padding: 0;

  main {
    padding: 0;
  }

  .btn-sair {
    background: transparent;
    border: 0;
    color: white;
    margin: 0 5px;
    cursor: pointer;
  }

  .btnAtvAtual {
    background-color: #c1c1c1;
    button {
        color: black;
        font-weight: 600;
        text-align: center;
    }
  }

  .etapa-atual {
    background-color: #c1c1c1;
    a {
        color: black;
        font-weight: 600;
    }
  }

  .link-home {
    color: white;
    text-decoration: none;
  }

  .link-home {
    svg:hover {
      fill: gray;
    }
  }

  .link-pages {
    color: white;
    text-decoration: none;
    font-weight: bold;
    font-size: 14px;
  }

  .MuiDrawer-paper {
    background-color: #394958;
  }

  .fundoMenu {
    background-color: #394958;
    color: white;

    hr {
      border-color: #c1c1c1;
    }
  }

  .profile-menu {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
  }

  .time-rest {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    h6 {
      font-size: 16px;
      margin-bottom: 10px;
    }
  }

  .box-home {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 15px;

    h6 {
      width: 100%;
      font-size: 16px;
      margin: 0 10px;
    }
  }

  .box-progress {
    margin: 15px;
    margin-left: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .title-macro {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 18px;
    font-weight: 700;
  }

  @media screen and (max-width: 425px) {
    main {
      width: calc(100% - 280px);
    }
  }
`;
