import React, {Component} from 'react';
import PropTypes from 'prop-types';
import  withStyles  from '@material-ui/core/styles/withStyles';
import Input from '@material-ui/core/Input';
import './Input.scss';

import axios from 'axios';
import {API_URL} from '../config/config'


const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    input: {
        margin: theme.spacing.unit,
        width: '300px'
    }
});

class Inputs extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: this.props.value,
        }
    }

    edit = (event) => {

        this.setState({ name: event.target.value }, () => {
            if (this.state.name.length > 0)
                axios.put(`${API_URL}/card/${this.props.idCard}/${this.state.name}`)
            else
                axios.put(`${API_URL}/card/${this.props.idCard}/empty`)
        })
    }



    render() {
        const { classes } = this.props;
        return (
                <Input
                    placeholder="Enter the name"
                    value = {this.state.name}
                    onChange = { (e) => { this.edit(e)} }
                    className={classes.input}
                    inputProps={{
                        'aria-label': 'Description',
                    }}
                />


        );
    }

}
Inputs.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Inputs);
