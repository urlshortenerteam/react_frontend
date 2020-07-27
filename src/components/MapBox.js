import React from "react";
import { Scene } from "@antv/l7";
import { CountryLayer } from "@antv/l7-district";
import { Mapbox } from "@antv/l7-maps";

/**
MapBox:
@author Zhuohao Shen <ao7777@sjtu.edu.cn>
@date July 7th 2020
@description A flex box of map showing distribution
@param {Array} data - data of distribution order by province
@returns {JSX} - a flex box of map showing distribution
*/
export default class MapBox extends React.Component {
    scene: Scene;
    countryLayer: CountryLayer;
    componentDidMount() {
        const scene = new Scene({
            id: "map",
            map: new Mapbox({
                center: [116.2825, 39.9],
                pitch: 0,
                style: "dark",
                zoom: 3,
                minZoom: 0,
                maxZoom: 10,
            }),
        });
        scene.on("loaded", () => {
            this.countryLayer = new CountryLayer(scene, {
                data: this.props.data,
                joinBy: ["NAME_CHN", "name"],
                depth: 1,
                provinceStroke: "#783D2D",
                cityStroke: "#EBCCB4",
                cityStrokeWidth: 1,
                fill: {
                    color: {
                        field: "value",
                        values: [
                            "#b1ceff",
                            "#a2c3fd",
                            "#6b7afd",
                            "#3c6cfd",
                            "#0d5de6",
                            "#0344a6",
                        ],
                    },
                },
                popup: {
                    enable: true,
                    Html: (props) => {
                        return `<span>${props.NAME_CHN}</span><br/><span>${props.value}次访问</span>`;
                    },
                },
            });
        });
        this.scene = scene;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.countryLayer.updateData(this.props.data);
    }

    componentWillUnmount() {
        this.scene.destroy();
    }

    render() {
        return (
            <div
                id="map"
                style={{
                    position: "relative",
                    height: "100%",
                }}
            />
        );
    }
}
