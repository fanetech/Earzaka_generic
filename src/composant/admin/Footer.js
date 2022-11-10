import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="py-3" style={{ background: "#98c73a" }}>
            <div className="container-fluid px-4">
                <div className="text-white text-center small">Copyright &copy; <Link className="text-white ml-2" to="/">Arzeka</Link> 2022</div>
            </div>
        </footer>
    )
}

export default Footer
