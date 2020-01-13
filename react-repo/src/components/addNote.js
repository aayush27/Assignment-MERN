import React, { Component } from "react";
import { connect } from "react-redux";
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import { addNote, updateNote } from "../actions";
import FormControl from '@material-ui/core/FormControl';
import { toast } from 'react-toastify';
import * as util from '../util/';

class ViewList extends Component {

    state = {
        notesArray: [],
        category: "",
        title: "",
        note: "",
        isEdit: false,
        id: "",
        formError: ""
    }

    componentDidMount() {
        if (this.props.editNote && this.props.editNote._id) {
            this.setState({
                category: this.props.editNote.category,
                title: this.props.editNote.title,
                note: this.props.editNote.note,
                id: this.props.editNote._id,
                isEdit: true
            })
        }
    }

    handleChange = type => event => {
        this.setState({
            [type]: event.target.value
        })
    };

    submitHandler = () => {
        if (this.validateForm()) {
            const userDetails = util.getUser();
            const noteObj = {
                title: this.state.title,
                category: this.state.category,
                note: this.state.note
            }
            this.props.addNote(noteObj, userDetails.token)
                .then(() => {
                    const response = this.props.add_note_data.data
                    toast.info('Note added successfully', {
                        position: toast.POSITION.BOTTOM_RIGHT
                    });
                    this.props.onAddNote(response);
                    this.setState({
                        title: "",
                        category: "",
                        note: "",
                        isEdit: false,
                        formError: ""
                    });
                })
                .catch((error) => {
                    toast.danger('Unable to add note', {
                        position: toast.POSITION.BOTTOM_RIGHT,
                    });
                })
        }
    }

    validateForm = () => {
        if (this.state.category && this.state.title && this.state.note) {
            return true;
        }
        this.setState({
            formError: 'Please fill all the details'
        })
        return false;
    }

    updateHandler = () => {
        if (this.validateForm()) {
            const userDetails = util.getUser();
            const noteObj = {
                title: this.state.title,
                category: this.state.category,
                note: this.state.note,
                id: this.state.id
            }
            this.props.updateNote(noteObj, userDetails.token)
                .then(() => {
                    const response = this.props.update_note_data.data
                    toast.info('Note updated successfully', {
                        position: toast.POSITION.BOTTOM_RIGHT,
                    });
                    this.props.onUpdateNote(response);
                    this.setState({
                        title: "",
                        category: "",
                        note: "",
                        isEdit: false,
                        formError: ""
                    });
                })
                .catch((error) => {
                    toast.error('Unable to update note', {
                        position: toast.POSITION.BOTTOM_RIGHT,
                    });
                })
        }
    }

    render() {
        return (
            <div className="container my-5">
                <FormControl required className="formWrapper">
                    <div className="row">
                        <div className="col-sm-6">
                            <TextField disabled={!this.props.isLoggedIn} id="standard-basic" label="Title" className="formFields" value={this.state.title} onChange={this.handleChange('title')} />
                        </div>
                        <div className="col-sm-6">
                            <InputLabel id="demo-simple-select-label" className="ml-3">Category</InputLabel>
                            <Select
                                disabled={!this.props.isLoggedIn}
                                native
                                value={this.state.category}
                                onChange={this.handleChange('category')}
                                className="formFields"
                                id="demo-simple-select"
                            >
                                <option value="" />
                                <option value="Category 1">Category 1</option>
                                <option value="Category 2">Category 2</option>
                                <option value="Category 3">Category 3</option>
                            </Select>
                        </div>
                        <div className="pt-2 col-sm-12">
                            <TextField
                                disabled={!this.props.isLoggedIn}
                                id="standard-helperText"
                                label="Type in your notes"
                                helperText="180 characters"
                                className="formFields"
                                value={this.state.note}
                                onChange={this.handleChange('note')}
                                inputProps={{ maxLength: 180 }}
                            />
                        </div>
                    </div>
                    <small className="error-message text-left form-text">
                        {this.state.formError}
                    </small>
                    <div className="col-3 align-self-end pr-0 text-right">
                        <Button
                            disabled={!this.props.isLoggedIn}
                            variant="contained"
                            className="ButtonContainer"
                            onClick={this.state.isEdit ? this.updateHandler : this.submitHandler}>
                            {this.state.isEdit ? 'Update' : 'Submit'}
                        </Button>
                    </div>

                </FormControl>
            </div>
        );
    }

}

function mapStateToProps(state) {
    return {
        add_note_data: state.data.add_note_data,
        update_note_data: state.data.update_note_data,
    };
}
export default connect(mapStateToProps, { addNote, updateNote })(ViewList);
