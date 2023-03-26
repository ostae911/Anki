import {Card, Button} from 'react-bootstrap';
import React from "react";
import './styling.css';


/* In der card.js wird die Cpomponent Karte innerhalb einer Funktion genauer beschrieben
    Dabei wird auf eine React-Bootstrap Component zurückgegriffen, die für unsere Ansprüche angepasst wird
    Erwähnenswert sind zudem die (props), welche das Deklarieren der Funktion Karte mit Variablen erlauben
*/
function Karte(props) {


    return (

        /* Die Karte besitzt keine fixed hight und keine fixed width, und verwendet jediglich den von uns definierten Hintergrund steinbeis1bg (siehe CSS)
            Falls gewünscht, kann man eine Höhe und Breite per style={{height: '45rem', width: '45rem'}} oder andere rem-Werte einbinden
        */

        <Card className="">
            {/* Hier wird das Image mit Variablen beschrieben und die src wird später in der Dienstleistung.js näher beschrieben, gleiches gilt für height und width */}
            {/*<Card.Img variant="top" src={props.img} height={props.height} width={props.width} />*/}
            <Card.Img variant="top" src={props.img} className="cardstyle"/>
            {/*Hier wird der Body (also der Textkörper der Karte) näher beschrieben, er erhält ebenfalls den Hintergrund steinbeisbg1 */}
            <Card.Body className="bg1">

                <Card.Title className="bgCardTitle">

                    Titel:             {props.title}    <br></br>

                    <br></br>
                </Card.Title>


                <Card.Text className="bgCard">
                  Text:   {props.comment}       <br></br>

                    <div className="pt-3"></div>

                    Bisher gelernt: {props.learned} <br></br>
                    In Deck: {props.deck} <br></br>

                </Card.Text>

                <div className={"pt-2"}></div>
                <Button   onClick={() => window.location.replace(props.url)}>  Bearbeiten </Button>

            </Card.Body>
        </Card>
    );
}

export default Karte;
/* Durch diesen Export wird die Karte in anderen Dateien aufrufbar gemacht */