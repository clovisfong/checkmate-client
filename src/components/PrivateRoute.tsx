import React from 'react'
import { Navigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';



interface IPrivateRouteProps {
    outlet: JSX.Element;
}


const PrivateRoute = ({ outlet }: IPrivateRouteProps) => {
    // const token: any = sessionStorage.getItem("token");

    // if (token !== undefined) {
    //     const payload = jwt_decode("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsIm5hbWUiOiJnZ2ciLCJkYXRlX29mX2JpcnRoIjoiMTk5My0wMS0xMyIsImdlbmRlciI6IlByZWZlciBub3QgdG8gc2F5IiwiZW1haWwiOiJnZ2dAaG90bWFpbC5jb20iLCJyZXRpcmVtZW50X2FnZSI6NjMsInJldGlyZW1lbnRfbGlmZXN0eWxlIjoiTWFpbnRhaW4iLCJsZWdhY3lfYWxsb2NhdGlvbiI6MCwibGlmZV9leHBlY3RhbmN5Ijo4NH0.tVhbiKT3-NUsG5o_AnLxa4vhVu4HJMpeMReqft3DA4M");
    //     return <Navigate to="/login" />;
    // }
    //  else {
    return outlet
    // }

};

export default PrivateRoute