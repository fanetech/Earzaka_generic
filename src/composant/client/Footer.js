import React from 'react';
import { Link } from 'react-router-dom';
import countrie from '../../assets/images/worldtourism-8097.jpg';

const Footer = () => {
    return (
        <footer style={{ background: "#033d7c" }}>
            <div className="container-fluid px-4 py-1">
                <div className="text-center">
                    <img src={countrie} className="widths" style={{ objectFit: "cover" }} />
                </div>
                <div className="text-white text-center small">&copy; <Link className="text-white ml-2" to="/">République du Burkina Faso</Link></div>
                <div className="text-white text-center small">Pour toutes vos préoccupations, écrire à : contact@faso-arzeka.org</div>
            </div>
        </footer>
    )
}

export default Footer
