import React, { Component } from 'react';
import '../Styles/App.css';
import { ViewList } from '../components/viewList';
import AddNote from '../components/addNote';
import { getNotes, deleteNote } from "../actions/api";
import { connect } from "react-redux";
import { toast } from 'react-toastify';
import * as util from '../util';

class Main extends Component {

  state = {
    toggle: false,
    notesArray: [],
    isLoggedIn: false,
    note: {}
  };

  componentDidMount() {
    const user = util.getUser();
    if (user && user.token) {
      this.setState({
        isLoggedIn: true
      });
    }
    this.props.getNotes()
      .then(() => {
        const res = this.props.get_note_data.data
        this.setState({
          notesArray: res
        })
      })
      .catch(() => {
        toast.error("Data not found !", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      })
  }

  updateNoteList = (note) => {
    this.setState({
      notesArray: [...this.state.notesArray, note]
    });
  }

  onEditNote = (note) => {
    this.setState({
      note: note
    })
  }

  onDeleteNote = (toBeDeletedNote) => {
    const userDetails = util.getUser();
    this.props.deleteNote({ id: toBeDeletedNote._id }, userDetails.token)
      .then(() => {
        toast.info('Note deleted successfully', {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        let newArray = [...this.state.notesArray];
        this.state.notesArray.map((note, index) => {
          if (note._id === toBeDeletedNote._id) {
            newArray.splice(index, 1);
            this.setState({
              notesArray: newArray
            })
          }
          return note;
        });
      })
      .catch(() => {
        toast.error('Cannot delete note', {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      })
  }

  updateEditNoteList = (updatedNote) => {
    let newArray = [...this.state.notesArray];
    this.state.notesArray.map((note, index) => {
      if (note._id === updatedNote._id) {
        newArray[index] = updatedNote;
        this.setState({
          notesArray: newArray
        })
      }
      return note;
    });
  }

  render = () => {
    return (
      <div>
        <div className="row mx-0">
          <div className="col-12 px-0">
            <div className="App">
              <AddNote
                editNote={this.state.note}
                key={this.state.note._id}
                isLoggedIn={this.props.signin_data ? true : false}
                onUpdateNote={(note) => this.updateEditNoteList(note)}
                onAddNote={(note) => this.updateNoteList(note)} />
              <ViewList
                isLoggedIn={this.props.signin_data ? true : false}
                notes={this.state.notesArray}
                onEditNote={(note) => { this.onEditNote(note) }}
                onDeleteNote={(note) => { this.onDeleteNote(note) }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    get_note_data: state.data.get_note_data,
    signin_data: state.data.login_data,
    delete_note_data: state.data.delete_note_data
  };
}

export default connect(mapStateToProps, { getNotes, deleteNote })(Main);