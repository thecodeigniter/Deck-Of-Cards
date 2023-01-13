import React from "react";
import axios from 'axios'

export const 
getShuffledDeck = async () => {
    const headers = {
        accept: "application/json",
    };
    const { data: { deck_id } } = await axios.get("http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1", { headers })
    return deck_id
};

export const startofGame = async (firstDeck) => {
    const headers = {
        accept: "application/json",
    };
    const { data: { cards } } = await axios.get(`http://deckofcardsapi.com/api/deck/${firstDeck}/draw/?count=2`, { headers });
    return cards
}
export const getPlayerCards = async (firstDeck, playerCards) => {
    const headers = {
        accept: "application/json",
    };
    if (playerCards.length == 0) {
        const { data: { cards } } = await axios.get(`http://deckofcardsapi.com/api/deck/${firstDeck}/draw/?count=2`, { headers });
        return cards
    } else {
        const { data: { cards } } = await axios.get(`http://deckofcardsapi.com/api/deck/${firstDeck}/draw/?count=1`, { headers });
        return cards = [...playerCards, cards[0]]
    }

}