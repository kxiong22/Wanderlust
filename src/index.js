import React from 'react';
import ReactDOM from 'react-dom';
import {Form, FormControl, InputGroup, Button, Row, Col, Container, Image} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import GoogleMap from './Map';
import Gallery from './Gallery';
import Weather from './Weather';
import './index.css';
import axios from 'axios';

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchTerm: "hawaii",
            gallery: Array(12).fill(0),
            weather: {
                lat: null,
                lon: null,
                desc: "",
                icon: "",
                temp: null,
                wind: null, 
            },
            time: null,
        }
        //set default
        this.getImages();
        this.getWeather();
    }

    handleSubmit = (event) => {
        event.preventDefault();
        //call flickr api and update gallery array values to new images, then render gallery 
        this.getImages();
        //call weather api dba1ed118f47eae6912c034e89a1c4ab
        this.getWeather();
        //call date time api
        this.getDateTime();

    }

    getImages() {
        const BASE_URL = 'https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=9269796f4f9174c7984d2bd27be7c2cf&text=' + this.state.searchTerm + 
        '&sort=interestingness-desc&safe_search=2&format=json&nojsoncallback=1';
        const images = async () => {
            try {
                const res = await axios.get(BASE_URL);
                const pics = res.data;
                var listOfPics = pics.photos.photo;
                const galleryCopy = this.state.gallery.slice();
                for (let i=0; i<12; i++){
                    var imgurl = "https://farm" + listOfPics[i].farm + ".staticflickr.com/" + listOfPics[i].server + "/" + listOfPics[i].id + "_" + listOfPics[i].secret + ".jpg";
                    galleryCopy[i] = <Image src={imgurl} className="image"/>
                }
                this.setState({gallery: galleryCopy});
                return pics;
            } catch (e) {
                console.error(e);
            }
        };
        images();
    }

    getWeather(){
        const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather?q=' + this.state.searchTerm + 
                            '&units=imperial&appid=dba1ed118f47eae6912c034e89a1c4ab';
        const weather = async () => {
            try {
                const res = await axios.get(BASE_URL);
                const vals = res.data;
                this.setState({weather: {lat: vals.coord.lat,
                                        lon: vals.coord.lon,
                                        desc: vals.weather[0].main,
                                        icon: vals.weather[0].icon,
                                        temp: vals.main.temp,
                                        wind: vals.wind.speed,
                                        }
                              });
            } catch (e) {
                console.error(e);
            }
        }
        weather();
    }

    getDateTime() {
        const BASE_URL = 'https://maps.googleapis.com/maps/api/timezone/json?location=' +
                    this.state.weather.lat + ',' + this.state.weather.lon + '&timestamp=' + Math.round(Date.now()/1000) + '&key=AIzaSyA9tnLpLxCEl7Xnkv65yvWkeOnCB-UhGLs';
        const time = async() => {
            try {
                const res = await axios.get(BASE_URL);
                const vals = res.data;
                if (!vals) {
                    this.setState({time: Date.now()});
                }
                var utcSeconds = Math.round(Date.now()/1000) + vals.dstOffset + vals.rawOffset;
                var d = new Date(utcSeconds*1000);
                var month = d.getUTCMonth() + 1;
                var day = d.getUTCDate();
                var year = d.getUTCFullYear()-2000;
                var hr = d.getUTCHours();
                var min = d.getUTCMinutes();
                if (hr < 10) {hr = "0" + hr;}
                if (min < 10) {min = "0" + min;}
                var newTime = month + "." + day + "." + year + " " + hr + ":" + min;
                this.setState({time: newTime});
            } catch (e) {
                console.error(e);
            }
        }
        time();
    }

    render() {
        return (
            <div>
                <div>
                    <Container>
                        <Row className="title-row">
                            <Col md="auto">
                                <div className="title">Wanderlust</div>
                                <div className="search-bar-container">
                                    <Form onSubmit={this.handleSubmit}>
                                        <InputGroup className="mb-3" className="search-bar">
                                            <FormControl ref="destination" onChange={() => this.setState({searchTerm: this.refs.destination.value})} 
                                                placeholder="Destination..."
                                                aria-label="Destination..."
                                                aria-describedby="basic-addon2"
                                            />
                                            <InputGroup.Append>
                                                <Button onClick={this.handleSubmit} className="submit-button" variant="outline-info">Submit</Button>
                                            </InputGroup.Append>
                                        </InputGroup>
                                    </Form>
                                </div>
                            </Col>

                            <Col md="auto">
                                <div key={Math.floor(Date.now()/60000)} className="date-container">Local Time: {this.state.time}</div>
                                <div className="weather-container"><Weather weather={this.state.weather}/></div>
                            </Col>

                            <Col md="auto">
                                <div className="map-container">
                                    <GoogleMap key={this.state.weather.lat} lat={this.state.weather.lat} lon={this.state.weather.lon}/> 
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>

                <div className="gallery-container">
                    <Gallery pics = {this.state.gallery}/>
                </div>
            </div>
        )
    }

}

ReactDOM.render(
    <SearchBar />,
    document.getElementById('root')
);