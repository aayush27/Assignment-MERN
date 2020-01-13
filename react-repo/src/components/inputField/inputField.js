import React, { Component } from 'react'

export class InputField extends Component {
    render() {
        return (
            <div className="input-group input-group-sm mb-3">
                <input
                    placeholder={this.props.placeHolder}
                    value={this.props.value}
                    type={this.props.type}
                    className="form-control "
                    onChange={(event) => this.props.onChange(event.target.value)}
                    aria-label="Small"
                    aria-describedby="inputGroup-sizing-sm"
                />
            </div>
        )
    }
}
