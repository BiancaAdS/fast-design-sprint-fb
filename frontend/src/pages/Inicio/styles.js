import styled from 'styled-components'

export const Container = styled.div`

    display: flex;
    flex-direction: column;
    align-items: center;
    
    .principles-container {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        margin: 12px 0;
    }
    
    .principle-box {
        padding: 12px 12px;
        margin-bottom: 12px;
        border-radius: 8px;
        border: 1px solid orange;
        width: 70%;
    }

    @media only screen and (max-width: 840px) {
        .principle-box {
            width: 90%;
        }
    }

    .principle-header {
        user-select: none;
        display: flex;
        align-items: center;
        cursor: pointer;
        border-bottom: 1px solid gray;
        padding-bottom: 12px;
    }

    .principle-box.--isClose .principle-header {
        margin: 0;
        padding: 0;
        border: none;
    }

    .principle-headerLabel {
        flex: 1;
        font-size: 24px;
        color: red;
    }

    .principle-headerIcon {
        width: 16px;
        height: 16px;
        transition: all .6s;
    }
   
    .principle-content {
        pointer-events: none;
        margin-top: 12px;
        transition: max-height .6s, opacity .3s;
        max-height: 888px;
    }
    .principle-box.--isClose .principle-content {
        max-height: 0px;
        margin-top: -20px;
        opacity: 0;
    }

    .principle-content ul {
        margin-left: 20px;
    }
    
    .principle-content ul li {
        display: flex;
        align-items: flex-start;
        margin-top: 12px;
    }
    
    .principle-content ul li::before {
        content: "";
        min-width: 4px;
        min-height: 4px;
        margin-right: 12px;
        margin-top: 25px;
        border: 2px solid orange;
        border-radius: 8px;
    }

`