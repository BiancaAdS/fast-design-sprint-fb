import React from "react";

import { Button } from "@mui/material";

import { Container } from './styles'


export const ButtonComponent = (props) => {


    return(
        <Container>

            <Button className="btn" onClick={props.onClick}  disabled={props.disabled}>{props.children}</Button>

        </Container>
    )
}