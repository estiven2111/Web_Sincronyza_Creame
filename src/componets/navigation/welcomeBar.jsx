import React, { useEffect, useState } from 'react';
import logoCompleto from "../../assets/img/icon.png";

const WelcomeBar = () => {
    const [info, setInfo] = useState({
        name: "Usuario",
        email: "Email"
    });

    useEffect(() => {
        const fetchToken = async () => {
            const name = localStorage.getItem("name");
            const email = localStorage.getItem("email");
            setInfo({
                name,
                email
            });
        };

        fetchToken();
    }, []);

    return (
        <div className="container">
            <div className="rowContainer">
                {/* <img src={logoCompleto} alt="Logo" /> */}
                <div className="userinfo">
                    <p className="text" title={info.name} width="50px">{info.name}</p>
                </div>
            </div>
        </div>
    );
};

export default WelcomeBar;