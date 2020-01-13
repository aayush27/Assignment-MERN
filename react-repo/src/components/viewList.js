import React, { Component } from "react";
import moment from 'moment';

export class ViewList extends Component {

    state = {
        notesArray: []
    }

    renderNotesList = () => {
        return (
            this.props.notes.map((note, index) => {
                return (
                    <tr key={index} className="text-left">
                        <td>{note.title}</td>
                        <td>{note.note}</td>
                        <td>{note.category}</td>
                        <td>{moment(note.createdDate).format('DD-MM-YYYY')}</td>
                        <td>
                            <button type="button" onClick={() => this.props.onEditNote(note)} disabled={!this.props.isLoggedIn} className="btn btn-sm btn-outline-primary">Update</button>
                            <button type="button" onClick={() => this.props.onDeleteNote(note)} disabled={!this.props.isLoggedIn} className="ml-2 btn btn-sm btn-outline-danger">Delete</button>
                        </td>
                    </tr>
                )
            })
        )
    }

    render() {
        return (
            <div>
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr className="text-left table-header">
                            <td style={{ width: "15%" }}>Title</td>
                            <td style={{ width: "40%" }}>Note</td>
                            <td style={{ width: "15%" }}>Category</td>
                            <td style={{ width: "15%" }}>Created At</td>
                            <td style={{ width: "15%" }}>Operations</td>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderNotesList()}
                    </tbody>
                </table>
            </div>
        );
    }
}