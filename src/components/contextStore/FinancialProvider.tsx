import React, { FC, useContext, useEffect, useState } from "react";
import { IFinancialContext, ITotalExpenseProjection, ITotalIncomeProjection, IUserContext, IUserDetails } from "../../Interface";
import UserDetailsContext from "./userdetails-context";
import jwt_decode from 'jwt-decode';
import FinancialContext from "./financial-context";

const FinancialProvider = ({ children }: any) => {
    const [incomeProj, setIncomeProj] = useState<ITotalIncomeProjection[]>([{
        age: 0,
        totalIncome: 0
    }]);

    const [expenseProj, setExpenseProj] = useState<ITotalExpenseProjection[]>([{
        age: 0,
        totalExpenses: 0
    }]);


    // useEffect(() => {

    //     const token: any = sessionStorage.getItem('token')
    //     if (token === null) return
    //     const userDetails: IUserDetails = jwt_decode(token)
    //     setUserInfo(userDetails)
    // }, [])


    const financialContext: IFinancialContext = {
        setIncomeState: setIncomeProj,
        setExpenseState: setExpenseProj

    };

    // console.log("token received in context: ", tokenContext.token);

    return (
        <FinancialContext.Provider value={financialContext}>
            {children}
        </FinancialContext.Provider>
    );
};

export default FinancialProvider;
