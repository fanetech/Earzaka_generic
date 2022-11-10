import React, { useState, useEffect } from 'react';
import OtpInput from 'react-otp-input';
import methods from '../../constant';
import { Link, Navigate } from 'react-router-dom';
import burkina from '../../assets/images/burkina.jpg';
import logo from '../../assets/images/logo1.png'


const Otp = () => {

    const [showClavier, setShowClavier] = useState(false);
    const [error, setError] = useState(false);
    const [otp, setOtp] = useState('');
    const [chiffre, setChiffre] = useState([1,2,3,4,5,6,7,8,9,0]);

    useEffect(() => {

        setChiffre(chiffre.sort(funcChiffre));

        function funcChiffre(a, b){  
            return 0.5 - Math.random();
        }
    },[])

    const handleChange = (otpValue) => {
        setOtp(otpValue);
    }

    const blockOnkeydown = (bool) => {
        document.onkeydown = function (e) {
            var code;
            if (!e) var e = window.event;
            if (e.keyCode) code = e.keyCode;
            else if (e.which) code = e.which;

            if (code != 8)
                return bool;
        }
    }

    if ((otp.length == 6) && methods.isNumeric(otp)) {
        return (
            <Navigate to="/" replace={true} />
        )
    }else{
        // setError(true)
    }

    return (
        <div id="layoutAuthentication" style={{ backgroundImage: `url(${burkina})`, backgroundSize: 'cover' }}>
            <div id="layoutAuthentication_content">
                <main>
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-5">
                                <div className="card shadow-lg border-0 rounded-lg mt-5 mb-3">
                                    <div className="card-header">
                                        <Link className="d-flex justify-content-center" to="/">
                                            <img src={logo} style={{ width: "70px"}} />
                                        </Link>
                                        <h3 className="text-center font-weight-light my-4">OTP</h3>
                                    </div>
                                    <div className="card-body">
                                        <div className="small  text-muted mb-3">Entrez votre OTP, envoyer sur le numéro <span className="text-primary">66802195</span>. Vous pouvez réevoyer le OTP</div>
                                        <div className="d-flex justify-content-center mb-3" onClick={() => (setShowClavier(true),blockOnkeydown(false))}>
                                            <OtpInput id="optID" className="col-sm-2 col-md-2 col-lg-2" inputStyle="form-control mx-2 text-primary w-100 fs-6" value={otp}  onChange={handleChange} numInputs={6} isInputNum={true} hasErrored={error} errorStyle={{ border: "1px solid red" }}/>
                                        </div>
                                        {
                                            showClavier ?
                                            (
                                                <div className="card  mb-3">
                                                    <div className="card-body">
                                                        <div className="row d-flex justify-content-end mb-3">
                                                            <a className="btn btn-close" type="button" onClick={() => setShowClavier(false)}></a>
                                                        </div>
                                                        <div className="row flex-container-connexion px-3-pin-password">
                                                            {
                                                                chiffre.map((data,index) => {
                                                                    return(
                                                                        <a type="button" className="btn btn-password-pin" key={index} onClick={() => setOtp(otp+data)}>{data}</a>
                                                                    )
                                                                })
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                            :""
                                        }
                                        <div className="d-flex align-items-center justify-content-end mt-4 mb-0">
                                            <button className="btn text-white" style={{ background: "#033d7c" }}>Réenvoyer OTP</button>
                                        </div>
                                    </div>
                                    <div className="card-footer text-center py-3">
                                        <div className="small"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
            <div id="layoutAuthentication_footer">
                <footer className="py-4 bg-light opa-footer mt-auto">
                    <div className="container-fluid px-4">
                        <div className="container-fluid px-4">
                            <div className="text-muted text-center small">Copyright &copy; PN2 2022</div>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    )
}

export default Otp
