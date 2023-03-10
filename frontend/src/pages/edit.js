import React from "react";

import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Container from "react-bootstrap/Container";

import { Button, Form, Input } from "rsuite";
import Modal from "react-bootstrap/Modal";

const Textarea = React.forwardRef((props, ref) => <Input {...props} as="textarea" ref={ref} />);

const AktuelleSeite = window.location.href;
const LetzteSeite = AktuelleSeite.substring(AktuelleSeite.lastIndexOf("/") + 1);
export default class Bearbeiten extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            inserate: [],
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
        window.location.replace(`http://localhost:3000/details/${LetzteSeite}`);
    }
    async handleError() {
        this.setState({ showError: true });
    }

    async BackendDownload() {
        try {
            const result = await fetch(`http://localhost:3001/inserate/${LetzteSeite}`);
            if (result.status === 200) {
                const inserate = await result.json();
                console.log(inserate);
                this.setState({ inserate });
            } else {
                throw Error("Keine Inserate gefunden!");
            }
        } catch (error) {
            console.log(error);
            this.setState({ error });
        }
        this.setState({ isLoading: false });
    }

    async BackendUpload() {
        try {
            const result = await fetch(`http://localhost:3001/inserate/${LetzteSeite}`, {
                method: "PUT",
                mode: "cors",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({
                    createdOn: document.getElementById("createdOn").value,
                    createdBy: document.getElementById("createdBy").value,
                    softwareVersion: "test",
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
            if (result.status === 200) {
                console.log("hat geklappt");
                await this.handleShow();
            }
            if (result.status === 422) {
                console.log("Du musst alle Felder ausfüllen!");
                await this.handleError();
            } else {
                console.log(result);
                await this.handleShow();
                console.log("hat geklappt");
            }
        } catch (error) {
            console.log(error);
            this.setState({ error });
        }
        this.setState({ isLoading: false });
    }
    render() {
        const { err, isLoading, inserate, show, showError } = this.state;
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
                            <Modal.Title>Änderung erfolgreich</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            Deine Lernkarte wurde erfolgreich geändert. Beginne direkt mit dem Lernen!
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
                            <Modal.Title>Änderung fehlgeschlagen</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            Uuuups, da ist etwas schiefgelaufen! Bitte kontrolliere, ob der Server hochgefahren ist! Anders ist es leider nicht möglich 🥹
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="primary" onClick={() => this.handleClose()}>
                                Schließen
                            </Button>
                        </Modal.Footer>
                    </Modal>

                    <Navbar></Navbar>

                        <Container>
                                <div className={"pt-5"}></div>
                                    <div className={"pt-5"}></div>
                                    <h2 className="display-5"> Inserat bearbeiten</h2>
                                    <h3>Städel & Wüst Immobilien</h3>
                                    <hr className="solid"></hr>
                                    <div className={"pt-5"}></div>
                                    <Form layout="inline">
                                        <Form.Group controlId="textarea-6">
                                            <Form.ControlLabel>Erstellt am</Form.ControlLabel>
                                            <Form.Control
                                                name="textarea"
                                                rows={1}
                                                id="createdOn"
                                                accepter={Textarea}
                                                defaultValue={inserate.createdOn}
                                                placeholder={inserate.createdOn}
                                            />
                                        </Form.Group>
                                        <Form.Group controlId="textarea-6">
                                            <Form.ControlLabel>Ersteller</Form.ControlLabel>
                                            <Form.Control
                                                name="textarea"
                                                rows={1}
                                                id="createdBy"
                                                accepter={Textarea}
                                                defaultValue={inserate.createdBy}
                                                placeholder={inserate.createdBy}
                                            />
                                        </Form.Group>
                                    </Form>

                                    <Container>
                                                <Button className="btn" onClick={() => this.BackendUpload()}>
                                                    {" "}
                                                    Absenden und Ändern
                                                </Button>
                                                <div className={"pt-2"}></div>
                                                <Button
                                                    className="btn"
                                                    onClick={() =>
                                                        window.location.replace(
                                                            `http://localhost:3000/details/${LetzteSeite}`
                                                        )
                                                    }
                                                >
                                                    Abbrechen{" "}
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
