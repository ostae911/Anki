import React, {useEffect} from "react";
import {useState} from "react";
import {Button, Container} from "rsuite";
import Navbar from "../components/navbar";

function Lernen() {

    const [karten, setKarten] = useState([]);
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await fetch("http://localhost:4000/decks");
                if (result.status === 200) {
                    const kartenDownload = await result.json();
                    console.log(kartenDownload.decks);
                    setKarten(kartenDownload.decks);
                } else {
                    throw Error("Keine Fehler gefunden!");
                }
            } catch (error) {
                console.log(error);
                setError(error);
            }
            setIsLoading(false);
        };
        fetchData();
    }, []);

    return (

        <>
            <Navbar/>
            <Container className="lerncontainer">
            <h2> Welches Deck möchtest Du lernen?</h2>
            <div className="pt-3"></div>
                 {karten.map((deck) => (
                     <>
                        <Button className="button"  onClick={() => window.location.replace(`http://localhost:3000/${deck._id}`)}> {deck.name} </Button>
                        <div className="pt-3"></div>
                      </>
                    )
                  )}

                </Container>

        </>
    );
}

export default Lernen;