import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { DragSource, DropTarget, DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Entry from './Entry'
import './Card.scss';


import { deleteCard, editCardName, deleteEntries, addEntry, updateEntryPosition, updateCardPosition } from '../action/action'

const deleteCardImg = require('../assets/images/deleteIcon.png');
const editTitle = require('../assets/images/edit.png');


//CARD DND

const cardDropSpec = {
    hover(props, monitor) {
        const draggedId = monitor.getItem().id;
        props.updateCardPosition(draggedId, props.id);
    }
};

let collectDrop = (connect) => {
    return {
        connectDropTarget: connect.dropTarget()
    };
};


const cardDragSpec = {
    beginDrag(props) {
        return {
            id: props.id
        };
    }
};

let collectDrag = (connect) => {
    return {
        connectDragSource: connect.dragSource()
    };
};


class Card extends Component {
    constructor(props) {
        super(props);


        this.edit = this.edit.bind(this);
        this.blur = this.blur.bind(this);
        this.editName = this.editName.bind(this);
        this.delete = this.delete.bind(this);
        this.addEntry = this.addEntry.bind(this);
        this._handleKeyPress = this._handleKeyPress.bind(this);
    }


    editName(event) {
        this.props.editCardName(this.props.id, event.target.value)
    }

    delete() {
        this.props.deleteCard(this.props.id)
        this.props.deleteEntries(this.props.id)
    }

    addEntry() {
        this.props.addEntry(this.props.id)
    }

    _handleKeyPress(e) {
        if (e.key === 'Enter') {
            this.textInput.readOnly="readOnly"
        }
    }

    blur(e) {
        e.target.readOnly="readOnly"
    }

    edit() {
        this.textInput.readOnly=""
        this.textInput.focus()
    }




    render() {

        console.log("Card",this.props.cards, this.props.entries)


        const { connectDragSource, connectDropTarget } = this.props;
        const {id}=this.props;

        const entryData = this.props.entries.entries.map((item) => {

            if (item.idCard === this.props.id) {
  			return (
  				<div key={item.idEntry}>
  					<Entry
  						idEntry={item.idEntry}
  						idCard={item.idCard}
  						name={item.name}
                            updateEntryPosition={this.props.updateEntryPosition}

  				 />
  				</div>
  	    );
            }
        });


        return connectDropTarget(connectDragSource(

            <div className='wrapper'>
                <ReactCSSTransitionGroup transitionName="toggle"
																 transitionEnterTimeout={250}
																 transitionLeaveTimeout={250} >
                    <div className= 'hidden' onClick={this.delete}>
                        <img src={deleteCardImg} id={id} alt="delete" />
                    </div>
                    <div className='card'>
                        <div className='cardGridImageWrapper'>
                            <div className='deleteCardGrid' >
      							<img src={editTitle} id= {id} onClick={this.edit} alt="edit" className="editMe-card" />
                                <img src={deleteCardImg} id={id} onClick={this.delete} alt="delete" className="deleteMe-card" />
                            </div>
                        </div>
        				<div className='cardDetails' >
      						<input
      									 className="input-card"
                                ref={(input) => {
                                    this.textInput = input;
                                }}
      									 value={this.props.name}
      									 onKeyPress={this._handleKeyPress}
      							 		 onChange={this.editName}
      									 placeholder={"Enter name for card"}
      									 readOnly=""
      									 onBlur={this.blur}
      						>
      						</input>
      						<button className="button-card-add" onClick={this.addEntry}>Add entry</button>
      					  {entryData}
                        </div>
                    </div>
                </ ReactCSSTransitionGroup>
            </div>
        ));
    }
}

const mapStateToProps = state => ({
    cards: state.get('cards').toJS(),
    entries: state.get('entries').toJS()

});
const mapDispatchToProps = dispatch => bindActionCreators( {
    deleteCard, editCardName, addEntry, deleteEntries, updateCardPosition, updateEntryPosition
}, dispatch);


const dragHighOrderCard = DragSource('card', cardDragSpec, collectDrag)(connect(mapStateToProps, mapDispatchToProps)(Card));
const dragDropHighOrderCard = DropTarget('card', cardDropSpec, collectDrop)(dragHighOrderCard);
export default DragDropContext(HTML5Backend)(dragDropHighOrderCard);
