import React, { FC, useContext, useEffect, useState } from "react";
import { IUserContext, IUserDetails } from "../../Interface";
import UserDetailsContext from "./userdetails-context";
import jwt_decode from 'jwt-decode';

const UserDetailsProvider = ({ children }: any) => {
    const [refresh, setRefresh] = useState(false)
    const [userInfo, setUserInfo] = useState<IUserDetails>({
        date_of_birth: '',
        email: '',
        gender: '',
        id: 0,
        legacy_allocation: 0,
        life_expectancy: 0,
        name: '',
        retirement_age: 0,
        retirement_lifestyle: ''
    });

    const storeInfo = (data: IUserDetails) => {
        setUserInfo(data);
    };

    const update = () => {
        setRefresh(!refresh)
    }

    useEffect(() => {

        const token: any = sessionStorage.getItem('token')
        if (token === null) return
        const userDetails: IUserDetails = jwt_decode(token)
        setUserInfo(userDetails)
    }, [refresh])


    const userDetailsContext: IUserContext = {
        date_of_birth: userInfo.date_of_birth,
        email: userInfo.email,
        gender: userInfo.gender,
        id: userInfo.id,
        legacy_allocation: userInfo.legacy_allocation,
        life_expectancy: userInfo.life_expectancy,
        name: userInfo.name,
        retirement_age: userInfo.retirement_age,
        retirement_lifestyle: userInfo.retirement_lifestyle,
        setUserState: storeInfo,
        fetchUpdate: update
    };

    // console.log("token received in context: ", tokenContext.token);

    return (
        <UserDetailsContext.Provider value={userDetailsContext}>
            {children}
        </UserDetailsContext.Provider>
    );
};

export default UserDetailsProvider;
