import React, { Component } from "react";
export default class Loading extends Component {
    render() {
        return (
            <video
                style={{
                    height: 200,
                    marginTop: "calc(50vh - 167px)",
                    marginLeft: "calc(50% - 93px)",
                }}
                autoPlay
                playsInline
                muted
                loop
                src="out2.webm"
            />
        );
    }
}
