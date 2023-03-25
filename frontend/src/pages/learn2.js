import React, {useEffect} from "react";
import {useState} from "react";
import Karte from "../components/card";
import {Button} from "rsuite";
import Navbar from "../components/navbar";

const AktuelleSeite = window.location.href;
const LetzteSeite = AktuelleSeite.substring(AktuelleSeite.lastIndexOf("/") + 1);
console.log(LetzteSeite);

function KarteLernen() {

    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [select, setSelect] = useState([]);
    const [download, setDownload] = useState([]);

    useEffect(() => {
        const Session = async () => {
            try {
                const result = await fetch(`http://localhost:4000/sessions/${LetzteSeite}/next-card`);
                if (result.status === 200) {
                    const selectDownload = await result.json();
                    console.log(selectDownload.card);
                    setDownload(selectDownload.card);
                } else {
                    throw Error("Keine Inserate gefunden!");
                }
            } catch (error) {
                console.log(error);
                setError(error);
            }
            setIsLoading(false);
        };
        Session();
    }, []);

    async function rate(rating) {
        try {
            const result = await fetch(`http://localhost:4000/sessions/${download._id}/review`,
                {
                    method: "POST",
                    mode: "cors",
                    headers: {
                        "Content-type": "application/json",
                    },
                    body: JSON.stringify({

                        "rating": rating,

                    }),
                });
            if (result.status === 200) {
                await console.log("hat geklappt");
                window.location.replace(AktuelleSeite);

            } else {
                console.log(result);
                throw Error("Der Server ist nicht hochgefahren!");
            }
        } catch (error) {
            console.log(error);
        }
        setIsLoading(false)
    }


    return (
        <>
            <Navbar/>


                <>
                    <div className="pt-3 col-lg-3"></div>

                    <Karte //Komponent Karte aufrufen und mit den den Inhalten aus dem Fetching beschrieben
                        title={download.front}
                        comment={download.back}
                        learned={download.reviewCount}
                    />

                    <Button onClick={() => rate(1)}>Leicht</Button>
                    <Button onClick={() => rate(2)}>Mittel</Button>
                    <Button onClick={() => rate(3)}>Schwer</Button>
                </>

        </>

    );

}

export default KarteLernen;