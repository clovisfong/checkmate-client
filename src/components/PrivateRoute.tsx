import React from 'react'
import { Navigate } from 'react-router-dom';



const parseJwt = (token: string) => {
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var jsonPayload = decodeURIComponent(
        window
            .atob(base64)
            .split("")
            .map(function (c) {
                return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join("")
    );
    return JSON.parse(jsonPayload);
};


interface IPrivateRouteProps {
    outlet: JSX.Element;
}


const PrivateRoute = ({ outlet }: IPrivateRouteProps) => {
    const token: any = sessionStorage.getItem("token");

    if (token !== undefined) {
        const payload = parseJwt(token);
        return <Navigate to="/login" />;
    } else {
        return outlet
    }

};

export default PrivateRoute