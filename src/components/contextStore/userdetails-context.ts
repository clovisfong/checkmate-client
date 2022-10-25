import React from "react";
import { IUserContext } from "../../Interface";


const UserDetailsContext = React.createContext<IUserContext>({
    date_of_birth: '',
    email: '',
    gender: '',
    id: 0,
    legacy_allocation: 0,
    life_expectancy: 0,
    name: '',
    retirement_age: 0,
    retirement_lifestyle: ''
    ,
    setUserState: () => { },
    fetchUpdate: () => { }
});

export default UserDetailsContext;


