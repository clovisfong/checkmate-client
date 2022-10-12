export interface IUserDetails {
    date_of_birth: string;
    email: string;
    gender: string;
    id: number;
    legacy_allocation: number;
    life_expectancy: number;
    name: string;
    retirement_age: number;
    retirement_lifestyle: string
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


export interface IExpenseData {
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
    totalExpense: number
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
}

export interface ITotalDebtProjection {
    age: number;
    totalDebt: number
}

export interface IDebtProjection {
    age: number;
    yearlyRepayment: number
    interestRepayment: number;
    principalRepayment: number;
}

export interface IDebtMonthlyProjection {
    period: number;
    monthlyRepayment: number;
    interestRepayment: number;
    principalRepayment: number;
    outstandingPrincipal: number;

}