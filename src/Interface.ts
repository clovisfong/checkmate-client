export interface IUserDetails {
    date_of_birth: string;
    email: string;
    gender: string;
    id: number;
    legacy_allocation: number;
    life_expectancy: number;
    name: string;
    retirement_age: number;
    retirement_lifestyle: string;
}

export interface IUserDetails2 {
    date_of_birth: string;
    email: string;
    gender: string;
    id: number;
    legacy_allocation: number;
    life_expectancy: number;
    name: string;
    retirement_age: number;
    retirement_lifestyle: string;
    updated_at: string;
    created_at: string;
}

export interface IUserContext extends IUserDetails {
    setUserState: (data: IUserDetails) => void;
}




export interface IIncomeData {
    amount: number;
    created_at: string;
    duration_months: number;
    frequency: string;
    growth_rate: number;
    id: number;
    income_name: string;
    income_status: string;
    income_type: string;
    start_date: string;
    updated_at: string;
    user_details_id: number;
}



export interface IIncomeData2 {
    amount: number;
    created_at: string;
    duration_months: number;
    frequency: string;
    growth_rate: number;
    id: number;
    income_name: string;
    income_status: string;
    income_type: string;
    start_date: string;
    updated_at: string;
}

export interface IIncomeFill {
    amount: number;
    duration_months: number;
    frequency: string;
    growth_rate: number;
    income_name: string;
    income_status: string;
    income_type: string;
    start_date?: string;
}

export interface IIncomeProjection {
    age: number;
    income: number
}

export interface ITotalIncomeProjection {
    age: number;
    totalIncome: number
}

export interface ITotalSavingsProjection {
    age: number;
    totalSavings: number
}


export interface IExpenseData {
    amount: number;
    created_at: string;
    duration_months: number;
    frequency: string;
    inflation_rate: number;
    id: number;
    expense_name: string;
    expense_status: string;
    expense_type: string;
    start_date: string;
    updated_at: string;
    user_details_id: number;
}

export interface IExpenseData2 {
    amount: number;
    created_at: string;
    duration_months: number;
    expense_name: string;
    expense_status: string;
    expense_type: string;
    frequency: string;
    id: number;
    inflation_rate: number;
    start_date: string;
    updated_at: string;
}

export interface IExpenseProjection {
    age: number;
    expense: number
}

export interface ITotalExpenseProjection {
    age: number;
    totalExpenses: number
}


export interface IFinancialContext {
    setIncomeState: (data: ITotalIncomeProjection[]) => void;
    setExpenseState: (data: ITotalExpenseProjection[]) => void;
}

export interface IDebtData {
    commitment_period_months: number;
    created_at: string;
    debt_name: string;
    debt_status: string;
    debt_type: string;
    id: number;
    interest_rate: number;
    loan_amount: number;
    monthly_commitment: number;
    start_date: string;
    updated_at: string;
    user_details_id: number;
}

export interface IDebtData2 {
    commitment_period_months: number;
    created_at: string;
    debt_name: string;
    debt_status: string;
    debt_type: string;
    id: number;
    interest_rate: number;
    loan_amount: number;
    monthly_commitment: number;
    start_date: string;
    updated_at: string;
}


export interface ITotalDebtProjection {
    age: number;
    yearlyRepayment: number
    interestRepayment: number;
    principalRepayment: number;
    outstandingPrincipal: number;
}

export interface IDebtProjection {
    age: number;
    yearlyRepayment: number
    interestRepayment: number;
    principalRepayment: number;
    outstandingPrincipal: number;
}

export interface IDebtMonthlyProjection {
    period: number;
    monthlyRepayment: number;
    interestRepayment: number;
    principalRepayment: number;
    outstandingPrincipal: number;

}


export interface IAssetData {
    asset_name: string;
    asset_type: string;
    current_value: number;
    id: number;
    user_details_id: number;
}

export interface IAssetData2 {
    asset_name: string;
    asset_type: string;
    current_value: number;
    id: number;
}


