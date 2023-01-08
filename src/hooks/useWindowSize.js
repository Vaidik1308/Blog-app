import { useState,useEffect } from "react";

const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState({
        width: undefined,
        height: undefined 
    });

    useEffect(() => {
        // console.log("rendered");
        const handleResize = () => {
            // console.log("size changed");
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight
            })
        }

        // handleResize();

        window.addEventListener('resize', handleResize);

        const cleanUp = () => {
            // console.log('run if a useEffect dependencies changes');
            window.removeEventListener('resize',handleResize);
        }
        return cleanUp;
    },[])

    return windowSize;
}

export default useWindowSize;