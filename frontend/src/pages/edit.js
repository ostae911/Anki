import React from "react";

import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Container from "react-bootstrap/Container";

import { Button, Form, Input } from "rsuite";
import Modal from "react-bootstrap/Modal";
import card from "../components/card";

const Textarea = React.forwardRef((props, ref) => <Input {...props} as="textarea" ref={ref} />);

const AktuelleSeite = window.location.href;
const LetzteSeite = AktuelleSeite.substring(AktuelleSeite.lastIndexOf("/") + 1);
console.log(LetzteSeite);
export default class Bearbeiten extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            card: [],
            error: null,
            show: false,
            setShow: true,
            showError: false,
        };

        this.BackendDownload = this.BackendDownload.bind(this);
        {
            /*keine Ahnung was das macht aber ist wichtig */
        }
    }

    async componentDidMount() {
        await this.BackendDownload();
    }

    async handleShow() {
        this.setState({ show: true });
    }

    async handleClose() {
        this.setState({ show: false, showError: false });
        window.location.replace(`http://localhost:3000/`);
    }
    async handleError() {
        this.setState({ showError: true });
    }

    async BackendDownload() {
        try {
            const result = await fetch(`http://localhost:4000/cards/${LetzteSeite}`);
            if (result.status === 200) {
                const card2 = await result.json();
                console.log(card2.card);
                this.setState({ card: card2.card });
            } else {
                throw Error("Keine Card gefunden!");
            }
        } catch (error) {
            console.log(error);
            this.setState({ error });
        }
        this.setState({ isLoading: false });
    }

    async BackendUpload() {
        try {
            const result = await fetch(`http://localhost:4000/cards/${LetzteSeite}`, {
                method: "PUT",
                mode: "cors",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({

                    "deck": card.deck,
                    "front": document.getElementById("front").value,
                    "back": document.getElementById("back").value,

                }),
            });
            if (result.status === 200) {
                console.log("hat geklappt");
                await this.handleShow();
            } else {
                console.log(result);
                await this.handleError();
                throw Error("Der Server ist nicht hochgefahren!");
            }
        } catch (error) {
            console.log(error);
            this.setState({ error });
        }
    }
    render() {
        const { err, isLoading, card, show, showError } = this.state;
        if (err) {
            return <div>Sorry, etwas ist schiefgelaufen!</div>;
        } else if (isLoading) {
            return <div>Loading....</div>;
        } else {
            return (

                <>
                <Modal
                    show={show}
                    onHide={() => this.handleClose()}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Erfolgreich hinzugefügt</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Deine neue Karte wurde erfolgreich auf der Lernplattform hinzugefügt. Beginne direkt mit dem Lernen!
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={() => this.handleClose()}>
                            Schließen
                        </Button>
                    </Modal.Footer>
                </Modal>

            <Modal
                show={showError}
                onHide={() => this.handleClose()}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Upload fehlgeschlagen</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Uuuups, da ist etwas schiefgelaufen! Bitte kontrolliere, ob Du den Server gestartet hast!
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => this.handleClose()}>
                        Schließen
                    </Button>
                </Modal.Footer>
            </Modal>

            <Navbar></Navbar>
            <Container classname="lerncontainer">
                <Container>

                    <div className={"pt-5"}></div>

                    <Form layout="vertical">
                        <Form.Group controlId="textarea-6">
                            <Form.ControlLabel> <h2>Vorderseite</h2></Form.ControlLabel>
                            <Form.Control className="textfeld"
                                name="textarea"
                                rows={2}
                                id="front"
                                accepter={Textarea}
                                defaultValue={card.front}
                            />
                        </Form.Group>
                        <Form.Group controlId="textarea-6">
                            <Form.ControlLabel><h2>Rückseite</h2></Form.ControlLabel>
                            <Form.Control className="textfeld"
                                name="textarea"
                                rows={7}
                                id="back"
                                accepter={Textarea}
                                defaultValue={card.back}
                            />
                        </Form.Group>
                    </Form>
                </Container>

                <Container>
                    <div className="pt-3"></div>

                    <Button className="btn" onClick={() => this.BackendUpload()}>
                        Ändern
                    </Button>

                    <div className={"pt-2"}></div>

                    <Button
                        className="btn"
                        onClick={() => window.location.replace("http://localhost:3000")}
                    >
                        Zurück zur Startseite
                    </Button>

                    <div className={"pt-5"}></div>
                </Container>



            </Container>

            <div className={"pt-5"}></div>

            <Footer></Footer>
                </>
            );
        }
    }
}
