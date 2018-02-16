import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import { DragSource, DropTarget } from 'react-dnd';

import {  deleteEntry, addEntryName } from '../action/action'
import './Entry.scss';


const deleteEntryImg = require('../assets/images/deleteIcon.png');
const editEntry = require('../assets/images/edit.png');

const entryDropSpec = {
    hover(props, monitor) {
        const draggedId = monitor.getItem().idEntry;
        props.updateEntryPosition(draggedId, props.idEntry);
    }
};

let collectDrop = (connect, monitor) => {
    return {
        connectDropTarget: connect.dropTarget()
    };
};


const entryDragSpec = {
    beginDrag(props) {
        return {
            idEntry: props.idEntry
        };
    }
};

let collectDrag = (connect, monitor) => {
    return {
        connectDragSource: connect.dragSource()
    };
};



class Entry extends Component {
	constructor(props) {
	super(props);

	this.state = {
    idEntry: this.props.idEntry,
		name: this.props.name
	};

  this.delete = this.delete.bind(this)
  this.addEntry = this.addEntry.bind(this)
	this.edit = this.edit.bind(this);
	this._handleKeyPress = this._handleKeyPress.bind(this);
	this.blur = this.blur.bind(this);
}


delete(e) {
  this.props.deleteEntry(this.state.idEntry);
}

blur(e) {
	e.target.readOnly="readOnly"
}

edit(e) {
	this.textInput.readOnly=""
	this.textInput.focus()
}

addEntry(event) {
  this.setState({
    name: event.target.value
  })
    this.props.addEntryName(this.props.idEntry, event.target.value)
}

_handleKeyPress(e) {
	if (e.key === 'Enter') {
      this.textInput.readOnly="readOnly"
    }
}

	render() {
		const { connectDragSource, connectDropTarget } = this.props;

		return connectDropTarget(connectDragSource(
			<div className='wrapper-entry'>
				<div className='content'>

					<input className ='input-entry'
								 ref={(input) => { this.textInput = input; }}
								 value={this.state.name}
								 onKeyPress={this._handleKeyPress}
								 onChange={this.addEntry}
								 placeholder="Enter text..."
								 readOnly=""
								 onBlur={this.blur}
					>

					</input>
				</div>

        <div className='deleteEntryGrid' >
					<img src={editEntry} onClick={this.edit} title="Edit entry" id={this.state.idEntry} alt="delete" className="editMe-entry"/>
          <img src={deleteEntryImg} onClick={this.delete} title="Delete entry" id={this.state.idEntry} alt="delete" className="deleteMe-entry"/>
        </div>

			</div>
		));
	}
}

const mapStateToProps = state => ({
  cards: state.cards.cards,
  entries: state.entries.entries

});
const mapDispatchToProps = dispatch => bindActionCreators( { 
 deleteEntry, addEntryName
}, dispatch);




const dragHighOrderEntry = DragSource('entry',entryDragSpec, collectDrag)(connect(mapStateToProps, mapDispatchToProps)(Entry));
const dragDropHighOrderEntry = DropTarget('entry',entryDropSpec, collectDrop)(dragHighOrderEntry);
export default dragDropHighOrderEntry
