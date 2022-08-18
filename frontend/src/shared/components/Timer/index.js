import React, { useState, useEffect } from 'react';
import { Container } from './styles'


export function Timer(props) {
    

    // let countdownTimeout

    const [time, setTime] = useState(0 * 60); //colocar como 25, para ter vinte cinco minutos
    
    const [hasFinised, setHasFinised] = useState(false);
    
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    useEffect(() => {

        if(props.minutes !== 0) {
            setTime(props.minutes * 60)
            // props.setTimeClockPause(props.minutes * 60)
        }


    }, [props.minutes, props])

   
    useEffect(() =>{
        if(props.isActive && time > 0) {
            let countdownTimeout = setTimeout(() => {
                setTime(time-1);
            }, 1000)
        } else if(props.isActive && time === 0){
            setHasFinised(true);
            props.setIsActive(false);

        }
    }, [props.isActive, time, props])

    const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
    const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');
    
    return (
        <Container>
                <div className={'countdownContainer'}>
                    <div>
                        <span>{minuteLeft}</span>
                        <span>{minuteRight}</span>
                    </div>
                    <span>:</span>
                    <div>
                        <span>{secondLeft}</span>
                        <span>{secondRight}</span>
                    </div>
                </div>

        </Container>
        
    );
}