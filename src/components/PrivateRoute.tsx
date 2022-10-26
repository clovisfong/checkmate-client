import { Navigate } from 'react-router-dom';




interface IPrivateRouteProps {
    outlet: JSX.Element;
}


const PrivateRoute = ({ outlet }: IPrivateRouteProps) => {
    const token: any = sessionStorage.getItem("token");

    if (token === null) {
        return <Navigate to="/login" />;
    }
    else {
        return outlet
    }

};

export default PrivateRoute