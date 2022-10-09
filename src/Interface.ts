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

export interface IIncomeGraphInputs {
    age: number;
    income: number
}

export interface IIncomeTimeline {
    age: number;
    totalIncome: number
}