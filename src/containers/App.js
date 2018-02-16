import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { addCard, updateCardPosition, updateEntryPosition, searchValue } from '../action/action'
import Header from './Header'
import Layout from './Layout'
import './App.scss'

const plus = require('../assets/images/Plus.svg');
const deleteCard = require('../assets/images/deleteIcon.png');


class App extends Component {
  
  
  
  constructor(props) {
  super(props);
    this.doSearch = this.doSearch.bind(this);
  }


  doSearch(event) {
    this.props.searchValue(event.target.value)
  }

  render() {


  return (
    <div className="App">
      <Header />
      <div className="App-body">
        <div className="filterWrapper">
            <div className="searchbar">
              <form>
                <input value={this.props.search}
                       type="text"
                       ref="searchInput"
                       name="search"
                       onChange={this.doSearch}
                       placeholder="Search.."/>
              </form>
              <form >
                <img className="addCard" src={plus}  alt="add" onClick={this.props.addCard} />

              </form>
            </div>
            <Layout cards = {this.props.cards}
                    updateEntryPosition = {this.props.updateEntryPosition}
                    updateCardPosition = {this.props.updateCardPosition}
                    />
        </div>
      </div>
    </div>
  );
 }
}

const mapStateToProps = state => ({
  cards: state.cards.cards.filter(card => card.name.toUpperCase().includes(state.search.search.toUpperCase() )),
  entries: state.entries.entries,
  search: state.search.search

});

const mapDispatchToProps = dispatch =>
bindActionCreators({
   addCard, updateCardPosition, updateEntryPosition, searchValue
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);
