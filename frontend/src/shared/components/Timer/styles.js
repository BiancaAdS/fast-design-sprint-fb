import styled from "styled-components";

export const Container = styled.div`

.countdownContainer {
  display: flex;
  align-items: center;
  font-family: Rajdhani;
  font-weight: 600;
}

.countdownContainer > div {
  flex: 1;

  display: flex;
  align-items: center;
  justify-content: space-evenly;

  background-color: lightslategray;
  box-shadow: 0 0 60px rgba(0, 0, 0, 0.05);
  border-radius: 5px;
  font-size: 2rem;
  text-align: center;
  color: #FFFFFF;

  padding: 5px;
  height: 50px;

}

.countdownContainer > div span {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.countdownContainer > div span:first-child {
  border-right: 1px solid #f0f1f3;
  height: 50px;
}

.countdownContainer > div span:last-child {
  border-left: 1px solid #f0f1f3;
  height: 50px;

}

.countdownContainer > span {
  font-size: 3rem;
  margin: 0 0.5rem;
  color: #FFFFFF;
}

`

