import React, {Component} from 'react';
import './Deck.css';
import Card from './Card.js';
import axios from 'axios';
const API_BASE_URL = "https://deckofcardsapi.com/api/deck";

class Deck extends Component {
    constructor(props){
        super(props);
        this.state = { 
            deck: null,
            drawnCards: []
        }
        this.getCard = this.getCard.bind(this);
    }

    // async temporarily pauses execution, this function gets a random deck
    async componentDidMount() {
        // .get gets a promise which returns a response object.
        // the response object contains info you can use to assign values.
        // await pauses until promise is settled.
        let deck = await axios.get(`${API_BASE_URL}/new/shuffle/`);
        this.setState({deck: deck.data});
    }

    async getCard() {
    // make request using deck ID then set state using new card info from API
        let id = this.state.deck.deck_id;
        try {
            let cardUrl = `${API_BASE_URL}/${id}/draw/`;
            let cardRes = await axios.get(cardUrl);
            if (!cardRes.data.success) {
                throw new Error("no cards remaining");
            }
            let card = cardRes.data.cards[0];
            this.setState(st => ({
                drawnCards: [
                  ...st.drawnCards,
                    {
                        id: card.code,
                       image: card.image,
                       name: `${card.value} of ${card.suit}`
                    }
                ]
            }));
        } catch (err) {
            alert(err);
        }
    }

    render() {
        const cards = this.state.drawnCards.map(c => (
            <Card name={c.name} image={c.image} key={c.id}/>
        ));
        return (
            <div>
                <h1 className='title'>♦Card Dealer♦</h1>
                <h2 className='subtitle'>♦A demo made with React♦</h2>
                <button className="Deck-button" onClick={this.getCard}>Get Card</button>
                <div className='Deck-cardarea'>
                    {cards}
                </div>
            </div>
        )
    }
}

export default Deck;