import React, { Component } from 'react';
import axios from 'axios';
import {API_URL} from '../config/config'
import './Entry.scss';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete'
import TextArea from "react-textarea-autosize";
const deleteCardImg = require('../assets/images/close1.png');

class Entry extends Component {
    constructor(props) {
        super(props);
        this.state = {
            idEntry: this.props.idEntry,
            name: this.props.name
        };
    }


    editEntry = (event) => {
        this.setState({ name: event.target.value }, () => {
            if (this.state.name.length > 0)
                axios.put(`${API_URL}/entry/${this.props.idEntry}/${this.state.name}`)
            else
                axios.put(`${API_URL}/entry/${this.props.idEntry}/empty`)
        })
    }


    render() {
        return (
            <div className='wrapper-entry'>
                <div className='content'>
                    <TextArea className = "EntryTextArea"
                        value={this.state.name}
                        onChange={this.editEntry}
                        placeholder="Enter text..." >

                      </TextArea>

                </div>
                <div className='deleteEntryGrid' >
                    <img className="deleteEntryImg" src={deleteCardImg}  onClick={() => {this.props.deleteEntry(this.state.idEntry)}} alt="Delete entry" />
                </div>
            </div>
        );
    }
}



export default Entry;
