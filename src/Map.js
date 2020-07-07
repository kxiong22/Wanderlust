import React, {Component, createRef } from 'react'

class GoogleMap extends Component {
    constructor(props) {
        super(props);
        this.state={
            center: {
                lat: this.props.lat,
                lng: this.props.lon,
            }
        };
        this.googleMapRef = React.createRef();
    }

    componentDidMount() {
        const googleMapScript = document.createElement('script');
        googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyA9tnLpLxCEl7Xnkv65yvWkeOnCB-UhGLs&libraries=places`;
        window.document.body.appendChild(googleMapScript);

        googleMapScript.addEventListener('load', () => {
            this.googleMap = this.createGoogleMap();
            this.marker = this.createMarker();
        });
    }

    createGoogleMap = () =>
    new window.google.maps.Map(this.googleMapRef.current, {
      zoom: 8,
      center: this.state.center,
      disableDefaultUI: true,
    });

  createMarker = () =>
    new window.google.maps.Marker({
      position: this.state.center,
      map: this.googleMap,
    });

    render() {
        return (
            <div
                id="google-map"
                ref={this.googleMapRef}
                style={{width: '260px', height: '200px'}}
            />
        )
    }
}

export default GoogleMap