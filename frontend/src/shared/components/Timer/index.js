import React, { useState, useEffect } from 'react';
import { Container } from './styles'


export const  Timer = ({ setIsActive, min, setHasFinised, isActive }) => {
    
    const [time, setTime] = useState(0 * 60);
    
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    useEffect(() => {

        if(min !== 0) {
            setTime(min * 60)
        }
    }, [min])

    useEffect(() =>{
        if(isActive && time > 0) {
            let countdownTimeout = setTimeout(() => {
                setTime(time-1);
                
            }, 1000)
        } else if(isActive && time === 0){
            setHasFinised(true);
            setIsActive(false);
        }

    }, [isActive, time])


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