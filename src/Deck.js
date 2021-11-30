import React, {Component} from 'react';
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

    //async temporarily pauses execution
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
        return (
            <div>
                <h1>Card Dealer</h1>
                <button onClick={this.getCard}>Get Card</button>
            </div>
        )
    }
}

export default Deck;