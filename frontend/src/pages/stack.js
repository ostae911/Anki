import React from 'react';
import Navbar from "../components/navbar";
import {useEffect, useState} from "react";

function Kartenstapel() {

    const [karten, setKarten] = useState([]);
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await fetch("http://localhost:5000/api/cards");
                if (result.status === 200) {
                    const  kartenDownload = await result.json();
                    console.log(kartenDownload);
                    setKarten(kartenDownload);
                } else {
                    throw Error("Keine Inserate gefunden!");
                }
            } catch (error) {
                console.log(error);
                setError(error);
            }
            setIsLoading(false);
        };

        //Achtung: Aufgabe 3

        fetchData(); //erneut den BackendDownload aufrufen
    }, []);

    return(
        <>
            <Navbar/>

            <h1> Hier siehst Du alle bisher hochgeladenen Karten. </h1>

        </>
    );
}

export default Kartenstapel;