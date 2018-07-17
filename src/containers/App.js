import React, { Component } from 'react';
import axios from 'axios';
import {API_URL} from '../config/config'
import Header from './Header'
import Layout from './Layout'
import './App.scss'

const plus = require('../assets/images/Plus.svg');


class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cards: [],
            search: '',
            searchCards:[]
        }
    }

    doSearch = (event) => {

        this.setState({
            search: event.target.value
        }, () => {
            console.log('sdfsdf',[this.state.cards,this.state.searchCards])
            if (this.state.search.length > 0) {
                this.setState({
                    cards: this.state.cards.filter(card => {
                        if (card.name)
                            return card.name.toUpperCase().includes(this.state.search.toUpperCase() )
                        else
                            return false
                    })
                })
            }
            else {
                this.setState({
                    cards: this.state.searchCards
                })
            }
        })
    }

    componentDidMount() {
        axios.get(`${API_URL}`)
            .then((res) => {
                this.setState({
                    cards: res.data[0],
                    searchCards: res.data[0]
                })
            })
    }



    addCard = () => {
        let id =  Math.random().toString(36).substring(7);
        this.setState({
            cards: this.state.cards.concat({
                id: id,
                name: '',
            })
        }, () => {
            this.setState({
                searchCards: this.state.cards.slice()
            })
        })
        axios.post(`${API_URL}/card/${id}`)

        this.setState({
            searchCards: this.state.cards.slice()
        })

    }

    editCard = (value, idCard) => {
        let searchCards = this.state.cards.slice()
        searchCards.map((card) => {
            card.id === idCard ? card.name = value : null
        })
        this.setState({
            cards: searchCards
        })
    }

    deleteCard = (id) => {
        this.setState({
            cards: this.state.cards.filter (card => {
                return card.id !== id
            })
        }, () => {
            this.setState({
                searchCards: this.state.cards.slice()
            })
        })
        axios.delete(`${API_URL}/card/${id}`)


    }

    render() {

        return (
            <div className="App">
                <Header />
                <div className="App-body">
                    <div className="filterWrapper">
                        <div className="searchbar">
                            <form>
                                <input value={this.state.search}
                                    type="text"
                                    ref="searchInput"
                                    name="search"
                                    onChange={this.doSearch}
                                    placeholder="Search.."/>
                            </form>
                            <form >
                                <img className="addCard" src={plus}  alt="add" onClick={this.addCard} />

                            </form>
                        </div>
                        <Layout
                            cards = {this.state.cards}
                            deleteCard={this.deleteCard}
                            editCard={this.editCard}
                        />
                    </div>
                </div>
            </div>
        );
    }
}



export default App;
