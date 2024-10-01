import React, { useEffect, useRef, useState } from "react";

function Stopwatch() {
    const [isRunning, setIsRunning] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);


    const intervalRef = useRef(null); //setInterval() returns an ID (a number) that you can use later to clear the interval with clearInterval() and we are storing that id in intervalRef so that we can stop the watch by clearing the interval.
    const startTimeRef = useRef(0);

    useEffect(() => {

        if(isRunning){
            intervalRef.current = setInterval(() => {
                setElapsedTime(Date.now() - startTimeRef.current);
            }, 10);
        }

        return () => {
            clearInterval(intervalRef.current);
        }

    }, [isRunning]);

    function start(){
        setIsRunning(true)
        startTimeRef.current = Date.now() - elapsedTime;

        console.log(startTimeRef)
    }

    function stop(){
        setIsRunning(false)
    }

    function reset(){
        setElapsedTime(0);
        setIsRunning(false)
    }

    function formatTime(){
        let hour = Math.floor(elapsedTime/(1000 * 60 * 60));

        let minutes = Math.floor(elapsedTime/(1000 * 60) % 60);

        let seconds = Math.floor(elapsedTime/(1000) % 60);

        let millisecond = Math.floor((elapsedTime %1000 )/10);

        hour = String(hour).padStart(2, "0");
        minutes = String(minutes).padStart(2, "0");
        seconds = String(seconds).padStart(2, "0");
        millisecond = String(millisecond).padStart(2, "0");


        return `${minutes}:${seconds}:${millisecond}`;
    }
     
    return (
        <div className="stopwatch">
            <div className="display">{formatTime()}</div>
            <div className="controls">
                <button onClick={start} className="start-button">Start</button>
                <button onClick={stop} className="stop-button">Stop</button>
                <button onClick={reset} className="reset-button">Reset</button>
            </div>

        </div>
    )
}

export default Stopwatch;