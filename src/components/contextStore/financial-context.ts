import React from "react";
import { IFinancialContext } from "../../Interface";


const FinancialContext = React.createContext<IFinancialContext>({

    setIncomeState: () => { },
    setExpenseState: () => { }
});

export default FinancialContext;

