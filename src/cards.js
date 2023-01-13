import React from 'react'
import { useEffect, useState } from 'react'
import { getShuffledDeck, startofGame, getPlayerCards } from './actions'
import axios from 'axios'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';


const Cards = () => {

    const [firstDeck, setFirstDeck] = useState({});
    const [houseCards, setHouseCards] = useState([]);
    const [playerCards, setPlayerCards] = useState([]);
    const [gameStarted, setGameStarted] = useState([true])
    const [houseResult, setHouseResult] = useState({})
    const [playerResult, setPlayerResult] = useState({})
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const count = true;


    const startGame = async () => {
        const gameStart = await startofGame(firstDeck)
        setHouseCards(gameStart)
        setGameStarted(false)
        const playerCard = await getPlayerCards(firstDeck, playerCards)
        setPlayerCards(playerCard)
    }


    const filterCards = (cards, aceCheckYes, aceCheckNo) => {
        cards.map((x) => {
            if (x.value == 'QUEEN' || x.value == 'KING' || x.value == 'JACK') x.value = '10'
            if (x.value == 'ACE') cards.map((y) => {
                if (y.value == 'QUEEN' || y.value == 'KING' || y.value == 'JACK') {
                    x.value = aceCheckYes
                } else {
                    x.value = aceCheckNo
                }
            })
        })
        return cards
    }

    const result = async () => {

        houseCards && setHouseResult(filterCards(houseCards, '11', '1').map(item => parseInt(item.value)).reduce((prev, curr) => prev + curr))
        playerCards && setPlayerResult(filterCards(playerCards, '1', '11').map(item => parseInt(item.value)).reduce((prev, curr) => prev + curr))
        setShow(true);
        setPlayerCards('')
        setHouseCards('')
        setGameStarted(true)
        setFirstDeck('')
        const deck_id = await getShuffledDeck()
        setFirstDeck(deck_id)
    }



    useEffect(() => {
        (async () => {
            const deck_id = await getShuffledDeck()
            setFirstDeck(deck_id)
        })
            ();
    }, []);

    return (
        <div className='home__screen'>
            {gameStarted ? <Button className='btn__start' onClick={() => startGame()}>Start</Button> : ""}
            <Container>
                <Row>
                    <Col className='text-center'>
                        <div className='House__Cards'>
                            {houseCards && houseCards.map((x, index) => (
                                <img width="150px" src={x.images.png}></img>
                            ))}
                        </div>
                    </Col>
                </Row>
                {!gameStarted ? (
                    <Row>
                        <Col>
                            <Button className='btn__hit' onClick={() => getPlayerCards(firstDeck, playerCards)} disabled={!count}>Hit</Button>
                        </Col>
                        <Col className='text-right'>
                            <Button className='btn__hand' onClick={() => result()} >
                                Stand
                            </Button>
                        </Col>
                    </Row>
                ) : ("")}
                <Row>
                    <Col className='text-center'>
                        <div className='player__cards'>
                            {playerCards && playerCards.map((x, index) => (
                                <>
                                    <img width="150px" src={x.images.png} />
                                </>
                            ))}
                        </div>
                    </Col>
                </Row>
            </Container>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    {playerResult > houseResult ? <p>You Won...!!!</p> : <p>House Won</p>}
                </Modal.Header>
            </Modal>
        </div>
    )
}

export default Cards