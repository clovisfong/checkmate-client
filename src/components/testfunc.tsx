import { differenceInCalendarYears } from 'date-fns'
import React, { useContext } from 'react'
import { IDebtData, IDebtMonthlyProjection } from '../Interface'
import UserDetailsContext from './contextStore/userdetails-context'

const testfunc = (debtData: IDebtData) => {

    console.log('test', debtData.loan_amount)
    const temp = debtData.loan_amount / 2

    // User details
    const userContext = useContext(UserDetailsContext)
    const birthDate = new Date(userContext.date_of_birth)
    const currentDate = new Date // use current date
    const currentAge = differenceInCalendarYears(currentDate, birthDate) // 24


    // Monthly interest rate
    const monthlyInterestRate = debtData.interest_rate / 12 / 100 // 0.005

    // Calculate monthly installment
    const calculateMonthlyRepayment = () => {
        const numerator = monthlyInterestRate * Math.pow((1 + monthlyInterestRate), debtData.commitment_period_months)
        const denominator = Math.pow((1 + monthlyInterestRate), debtData.commitment_period_months) - 1
        const calculatedMonthlyRepayment = debtData.loan_amount * numerator / denominator
        return calculatedMonthlyRepayment
    }

    const monthlyRepayment = debtData.monthly_commitment > 0 ? debtData.monthly_commitment : calculateMonthlyRepayment()

    const debtMonthlyProjection: IDebtMonthlyProjection[] = []

    let remainingDebt = debtData.loan_amount
    // Monthly debt projections
    for (let period = 1; period <= debtData.commitment_period_months; period++) {
        const monthlyInterest = monthlyInterestRate * remainingDebt
        const monthlyPrincipal = monthlyRepayment - monthlyInterest
        remainingDebt -= monthlyPrincipal
        debtMonthlyProjection.push({ "period": period, "monthlyRepayment": monthlyRepayment, "interestRepayment": monthlyInterest, "principalRepayment": monthlyPrincipal, "outstandingPrincipal": remainingDebt })
    }

    console.log(debtMonthlyProjection) // Array of 36 objects


    return (
        temp)
}

export default testfunc