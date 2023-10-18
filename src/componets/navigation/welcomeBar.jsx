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
        <div className="px-1 md:px-4">
            <div className="">
                <div className="">
                    <p className="text-gray-50 text-xs md:text-base max-w-[180px] md:w-[200px]" title={info.name} width="50px">{info.name}</p>
                </div>
            </div>
        </div>
    );
};

export default WelcomeBar;