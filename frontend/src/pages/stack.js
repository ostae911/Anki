import React from 'react';
import {useEffect, useState} from "react";

import Navbar from "../components/navbar";
import Karte from "../components/card";
import {Container} from "react-bootstrap";
import Footer from "../components/footer";
function Kartenstapel() {

    const [karten, setKarten] = useState([]);
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await fetch("http://localhost:4000/cards");
                if (result.status === 200) {
                    const  kartenDownload = await result.json();
                    console.log(kartenDownload.cards);
                    setKarten(kartenDownload.cards);
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
            <Container>
            {karten.map((karte) => (
                <>
                    <div className="pt-3 col-lg-3"> </div>

                    <Karte //Komponent Karte aufrufen und mit den den Inhalten aus dem Fetching beschrieben
                        title={karte.front}
                        comment={karte.back}
                        url={`http://localhost:3000/edit/${karte._id}`}
                        learned={karte.reviewCount}
                        deck={karte.deck}
                    />
                </>
            ))}
            </Container>
<Footer/>
        </>
    );
}

export default Kartenstapel;