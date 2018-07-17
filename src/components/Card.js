import React, { Component } from 'react';
import axios from 'axios';
import {API_URL} from '../config/config'
import Entry from './Entry'
import './Card.scss';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import Input from '@material-ui/core/Input';

class Card extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: this.props.name ,
            entries: []
        };
    }


    componentDidMount() {
        axios.get(`${API_URL}`)
            .then((res) => {
                this.setState({
                    entries: res.data[1]
                })
            })
    }


    addEntry = () => {
        let idEntry =  Math.random().toString(36).substring(7)
        this.setState({
            entries: this.state.entries.concat({
                idEntry:idEntry ,
                idCard: this.props.idCard,
                name: '',
            })})
        axios.post(`${API_URL}/entry/${this.props.idCard}/${idEntry}`)
    }

    deleteEntry = (idEntry) => {

        this.setState({
            entries: this.state.entries.filter (entry => {
                return entry.idEntry !== idEntry
            })})

        axios.delete(`${API_URL}/entry/${idEntry}`)
    }



    editName = (event) => {
        this.setState({ name: event.target.value }, () => {
            if (this.state.name.length > 0)
                axios.put(`${API_URL}/card/${this.props.idCard}/${this.state.name}`)
            else
                axios.put(`${API_URL}/card/${this.props.idCard}/empty`)
        })

        this.props.editCard(event.target.value, this.props.idCard)
    }





    render() {
        const entryData = this.state.entries.map((item) => {
            if (item.idCard === this.props.idCard) {
  			         return (
  				             <div key={item.idEntry}>
  					              <Entry
  						              idEntry={item.idEntry}
  						              idCard={item.idCard}
  						              name={item.name}
                            deleteEntry={this.deleteEntry}
  				                 />
  				             </div>
  	                  );
            }
        });

        return (

            <div className='wrapper'>

                <div className='card'>
                    <div className='cardWrapper'>
                        <div className='deleteCardGrid' >
                            <DeleteIcon className="DeleteIconCard" onClick={() => {this.props.deleteCard(this.props.idCard)}} />
                        </div>
                    </div>
        				    <div className='cardDetails' >
                          <Input
                              placeholder="Enter the name"
                              value = {this.state.name}
                              onChange = { this.editName }
                              inputProps={{
                                  'aria-label': 'Description',
                              }}
                          />

      					         {entryData}
                         <Button  onClick={this.addEntry} size="small" >
                                   Add Entry
                                 </Button>
                    </div>
                </div>
            </div>
        );
    }
}





export default Card;
