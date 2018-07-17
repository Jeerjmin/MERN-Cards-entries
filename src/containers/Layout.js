import React, { Component } from 'react';
import Card from '../components/Card'
import './Layout.scss';

class Layout extends Component {

    render() {
        const cardsData = this.props.cards.map((card) => {
            return (
                <div  className="gritItem" key={card.id}>
                    <Card idCard={card.id}
                        deleteCard = {this.props.deleteCard}
                        editCard = {this.props.editCard}
                        name={card.name}

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

export default Layout;
