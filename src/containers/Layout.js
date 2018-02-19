import React, { Component } from 'react';
import {connect} from 'react-redux';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import Card from '../components/Card'
import './Layout.scss';

class Layout extends Component {
    render() {



        const cardsData = this.props.cards.map((card) => {
            return (
                <div  className="gritItem" key={card.id}>
                    <Card id={card.id}
                        name={card.name}
                        updateCardPosition={this.props.updateCardPosition}
                        updateEntryPosition={this.props.updateEntryPosition}
				 />
                </div>
            );
        });

        return (
            <div className="gridWrapper">
                {cardsData}
            </div>
        );
    }
}




const mapStateToProps = state => ({
    cards: state.get('cards').toJS().cards.filter(card => card.name.toUpperCase().includes(state.get('search').toJS().search.toUpperCase() )),
    search: state.get('search').toJS()


});

export default DragDropContext(HTML5Backend)(connect(mapStateToProps)(Layout));
