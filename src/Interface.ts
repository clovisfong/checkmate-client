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