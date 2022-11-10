import React, { Fragment } from 'react';
import slider1 from '../assets/images/slider1.jpeg';
import slider2 from '../assets/images/slider2.jpeg';
import slider3 from '../assets/images/slider3.jpeg';

const Home = () => {
    return (
        <Fragment>
            <div id="carouselExampleSlidesOnly" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src={slider1} className="d-block w-100 hslaid"/>
                    </div>
                    <div className="carousel-item">
                        <img src={slider2} className="d-block w-100 hslaid"/>
                    </div>
                    <div className="carousel-item">
                        <img src={slider3} className="d-block w-100 hslaid"/>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Home