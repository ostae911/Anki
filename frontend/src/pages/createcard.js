import React from 'react';
import Navbar from "../components/navbar";
import Footer from "../components/footer";

import Container from "react-bootstrap/Container";
import { Form, Input, Button } from "rsuite";
import Modal from "react-bootstrap/Modal";

const Textarea = React.forwardRef((props, ref) => (
    <Input {...props} as="textarea" ref={ref} required />
));

/* Auf dieser Seite wird das Inserieren im Frontend ermöglicht. Es wird auf die Form-Inputs von Rsuite zurückgegriffen, diese mit default Werten belegt,
um Tipps zu geben. Außerdem werden wieder die Components Navbar sowie Footer augerufen.
Es befinden sich mehrere Modals in der Seite, um eine passende Antwort je nach Server-Response zu liefern
 */


export default class KarteHochladen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            inserate: [],
            error: null,
            anmeldung: [],
            show: false,
            setShow: true,
            showError: false,
            displayError: [],
        };

        this.BackendUpload = this.BackendUpload.bind(this);
        {
            /*keine Ahnung was das macht aber ist wichtig */
        }
    }

    async componentDidMount() {
        await this.BackendUpload();
    }
    async handleShow() {
        this.setState({ show: true });
    }

    async handleClose() {
        this.setState({ show: false, showError: false });
        window.location.replace('http://localhost:3000/suchen')
    }
    async handleError() {
        this.setState({ showError: true });
    }

    async BackendUpload() {
        try {
            const result = await fetch(`http://localhost:3001/inserate`, {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({
                    createdOn: 1667400075,
                    createdBy: document.getElementById("createdBy").value,
                    softwareVersion: null,
                    customer: document.getElementById("customer").value,
                    entry: {
                        type: document.getElementById("type").value,
                        address: document.getElementById("address").value,
                        postal: document.getElementById("postal").value,
                        city: document.getElementById("city").value,
                        size: document.getElementById("size").value,
                        comment: document.getElementById("comment").value,
                        shortHand: document.getElementById("shortHand").value,
                    },
                }),
            });
            if (result.status === 201) {
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
        this.setState({ isLoading: false });
    }

    render() {
        const { err, isLoading, show, showError, displayError } = this.state;

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
                        <Container>
                            <Container>
                                <div className={"pt-5"}></div>


                                    <Form layout="vertical">
                                        <Form.Group controlId="textarea-6">
                                            <Form.ControlLabel> <h2>Vorderseite</h2></Form.ControlLabel>
                                            <Form.Control
                                                name="textarea"
                                                rows={2}
                                                id="front"
                                                accepter={Textarea}
                                                placeholder="Wie heißt die Hauptstadt Deutschlands?"
                                            />
                                        </Form.Group>
                                        <Form.Group controlId="textarea-6">
                                            <Form.ControlLabel><h2>Rückseite</h2></Form.ControlLabel>
                                            <Form.Control
                                                name="textarea"
                                                rows={7}
                                                id="back"
                                                accepter={Textarea}
                                                placeholder="Berlin ist mit einer Einwohnerzahl von 3,645 Millionen Hauptstadt Deutschlands."
                                            />
                                        </Form.Group>
                                    </Form>
                            </Container>

                            <Container>
                                <div className="pt-3"></div>

                                                <Button className="btn" onClick={() => this.BackendUpload()}>
                                                    {" "}
                                                    Hinzufügen{" "}
                                                </Button>

                                                <div className={"pt-2"}></div>

                                                <Button
                                                    className="btn"
                                                    onClick={() => window.location.replace("http://localhost:3000")}
                                                >
                                                    Zurück zur Startseite{" "}
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
