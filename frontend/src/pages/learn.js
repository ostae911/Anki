import React, {useEffect} from "react";
import {useState} from "react";
import {Button} from "rsuite";
import Navbar from "../components/navbar";

function Lernen() {

    const [karten, setKarten] = useState([]);
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [select, setSelect] = useState([]);
    const [download, setDownload] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await fetch("http://localhost:4000/decks");
                if (result.status === 200) {
                    const kartenDownload = await result.json();
                    console.log(kartenDownload.decks);
                    setKarten(kartenDownload.decks);
                } else {
                    throw Error("Keine Inserate gefunden!");
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
            <h1> Welches Deck möchtest du lernen?</h1>

                 {karten.map((deck) => (
                     <>
                        <Button onClick={() => window.location.replace(`http://localhost:3000/${deck._id}`)}> {deck.name} </Button>
                        <div className="pt-3"></div>
                      </>
                    )
                  )}



        </>
    );
}

export default Lernen;