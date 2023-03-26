import React, {useEffect} from "react";
import {useState} from "react";
import Karte from "../components/card";
import {Button} from "rsuite";
import Navbar from "../components/navbar";
import Modal from "react-bootstrap/Modal";

const AktuelleSeite = window.location.href;
const LetzteSeite = AktuelleSeite.substring(AktuelleSeite.lastIndexOf("/") + 1);
console.log(LetzteSeite);

function KarteLernen() {

    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [download, setDownload] = useState([]);
    const [show, setShow] = useState(false);


    useEffect(() => {
        const Session = async () => {
            try {
                const result = await fetch(`http://localhost:4000/sessions/${LetzteSeite}/next-card`);
                if (result.status === 200) {
                    const selectDownload = await result.json();
                    console.log(selectDownload.card);
                    setDownload(selectDownload.card);
                }
                if (result.status === 204) {
                    await console.log("schon alles gelernt");
                    await handleShow();

                }
                else {
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

    async function handleShow() {
        setShow(true);
    }

    async function handleClose() {
        setShow(false);
        window.location.replace("http://localhost:3000/learn")
    }
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

            }

            else {
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
            <Modal
                show={show}
                onHide={() => handleClose()}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Done for Today!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Du hast bereits alle Karten dieses Decks gelernt. Starte mit einem anderen Deck!
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => handleClose()}>
                        Schließen
                    </Button>
                </Modal.Footer>
            </Modal>

            <Navbar/>


                <>
                    <div className="pt-3 col-lg-3"></div>

                    <Karte //Komponent Karte aufrufen und mit den den Inhalten aus dem Fetching beschrieben
                        title={download.front}
                        comment={download.back}
                        learned={download.reviewCount}
                        url={`http://localhost:3000/edit/${download._id}`}
                    />

                    <Button onClick={() => rate(3)}>Leicht</Button>
                    <Button onClick={() => rate(2)}>Mittel</Button>
                    <Button onClick={() => rate(1)}>Schwer</Button>
                </>

        </>

    );

}

export default KarteLernen;