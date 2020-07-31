import React, { Component } from "react";
export default class Loading extends Component {
    render() {
        return (
            <video
                style={this.props.style}
                autoPlay
                playsInline
                muted
                loop
                src="out2.webm"
            />
        );
    }
}
