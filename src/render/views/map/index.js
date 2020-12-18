import React from "react";
import "./style.less";
import { Map, Marker, MapvglView, MapvglLayer,NavigationControl,InfoWindow,ZoomControl } from "react-bmapgl";

const MapView = () => {
  return <Map center={{lng: 116.402544, lat: 39.928216}} zoom="11">
            <Marker position={{lng: 116.402544, lat: 39.928216}} />
            <NavigationControl /> 
            <ZoomControl />
            {/* <InfoWindow position={{lng: 116.402544, lat: 39.928216}} text="内容" title="标题"/> */}
        </Map>
};

export default MapView;
