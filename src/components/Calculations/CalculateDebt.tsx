import React, { useEffect } from 'react'
import { format, parse, differenceInCalendarYears, getMonth, differenceInCalendarMonths, add } from 'date-fns'
import { IDebtMonthlyProjection, IDebtData2, IDebtProjection, IDebtData, IUserDetails } from '../../Interface'
import { FormControlUnstyledContext } from '@mui/base'



const CalculateDebt = (debtData: IDebtData, userDetails: IUserDetails) => {



    // const userDetails = {
    //     created_at: "Sat, 08 Oct 2022 15:14:00 GMT",
    //     date_of_birth: "Mon, 20 Jul 1998 00:00:00 GMT",
    //     email: "eee@hotmail.com",
    //     gender: "Female",
    //     id: 2,
    //     legacy_allocation: 5000,
    //     life_expectancy: 90,
    //     name: "eee",
    //     new_birthdate: "20-07-1998",
    //     retirement_age: 66,
    //     retirement_lifestyle: "Enhanced",
    //     updated_at: "Sat, 08 Oct 2022 15:14:42 GMT"
    // }


    // General details: Current age, retirement age, life-expectancy age
    const birthDate = new Date(userDetails.date_of_birth)
    const currentDate = new Date // use current date
    const currentAge = differenceInCalendarYears(currentDate, birthDate) // 24
    const yearsToRetirement = userDetails.retirement_age - currentAge //42
    const yearsToLifeExpectancy = userDetails.life_expectancy - currentAge //66

    // Debt data
    const monthlyInterestRate = debtData.interest_rate / 12 / 100 // 0.005
    // const numberOfPayment = debtData.commitment_period_ * 12 // 36

    // Calculate monthly installment
    const calculateMonthlyRepayment = () => {
        const numerator = monthlyInterestRate * Math.pow((1 + monthlyInterestRate), debtData.commitment_period_months)
        const denominator = Math.pow((1 + monthlyInterestRate), debtData.commitment_period_months) - 1
        const calculatedMonthlyRepayment = debtData.loan_amount * numerator / denominator
        return calculatedMonthlyRepayment
    }

    const monthlyRepayment = debtData.monthly_commitment > 0 ? debtData.monthly_commitment : calculateMonthlyRepayment()


    const debtMonthlyProjection: IDebtMonthlyProjection[] = []

    // Monthly debt projections
    for (let period = 1; period <= debtData.commitment_period_months; period++) {
        const monthlyInterest = monthlyInterestRate * debtData.loan_amount
        const monthlyPrincipal = monthlyRepayment - monthlyInterest
        debtData.loan_amount -= monthlyPrincipal
        debtMonthlyProjection.push({ "period": period, "monthlyRepayment": monthlyRepayment, "interestRepayment": monthlyInterest, "principalRepayment": monthlyPrincipal, "outstandingPrincipal": debtData.loan_amount })
    }

    console.log(debtMonthlyProjection) // Array of 36 objects




    // Number of months till year end
    const debtStartDate = new Date(debtData.start_date)
    const monthOfEntry = getMonth(debtStartDate) // 10, october
    const initialYearRemainingMonths = 12 - monthOfEntry // 3 months

    // Initial age at debt start date
    const initialYearAge = differenceInCalendarYears(debtStartDate, birthDate) //  24

    // Duration upon update
    const updatedDate = new Date(debtData.updated_at)
    const updatedDuration = differenceInCalendarMonths(updatedDate, debtStartDate)

    // Select Duration based on Income Status
    const duration = debtData.debt_status === 'End' ? updatedDuration : debtData.commitment_period_months
    const futureDebtMonths = duration - initialYearRemainingMonths //117

    const finalYear = Math.ceil(futureDebtMonths / 12) // 10





    const debtProjection: IDebtProjection[] = []

    const initialYearDebtProjection = (initialYear: IDebtMonthlyProjection[]) => {
        const initialYearDebtDetails: IDebtProjection = { "age": initialYearAge, "yearlyRepayment": 0, "interestRepayment": 0, "principalRepayment": 0 }
        for (let i = 0; i < initialYear.length; i++) {
            initialYearDebtDetails.yearlyRepayment += Math.round(initialYear[i].monthlyRepayment)
            initialYearDebtDetails.interestRepayment += Math.round(initialYear[i].interestRepayment)
            initialYearDebtDetails.principalRepayment += Math.round(initialYear[i].principalRepayment)
        }
        debtProjection.push(initialYearDebtDetails) //Array of initial year obj
    }

    if (futureDebtMonths > 0) {
        // Initial Year Debt

        // Array of first 3 months (object)
        const initialYearDebt = debtMonthlyProjection.filter((debt) => debt.period <= initialYearRemainingMonths)

        // Push initial year debt
        initialYearDebtProjection(initialYearDebt)


        // Following Year Debt

        const futureYearsDebtProjection = (numOfMonths: number, numOfFullYearMonths: number = 0) => {
            const finalYearDebtDetails: IDebtProjection = { "age": initialYearAge + finalYear, "yearlyRepayment": 0, "interestRepayment": 0, "principalRepayment": 0 }
            for (let month = 0; month < numOfMonths; month++) {
                finalYearDebtDetails.yearlyRepayment += Math.round(debtMonthlyProjection[initialYearRemainingMonths + numOfFullYearMonths + month].monthlyRepayment)
                finalYearDebtDetails.interestRepayment += Math.round(debtMonthlyProjection[initialYearRemainingMonths + numOfFullYearMonths + month].interestRepayment)
                finalYearDebtDetails.principalRepayment += Math.round(debtMonthlyProjection[initialYearRemainingMonths + numOfFullYearMonths + month].principalRepayment)
            }
            return debtProjection.push(finalYearDebtDetails)
        }


        if (futureDebtMonths >= 12) {
            // Find Number of Full Year Debt
            const fullYearDebtYears = Math.floor(futureDebtMonths / 12) //2 years
            const fullYearDebtMonths = fullYearDebtYears * 12 // 24 months

            // Push every full year debt projections
            let addMonths = 0
            for (let year = 1; year <= fullYearDebtYears; year++) {
                const futureYearsDebtDetails: IDebtProjection = { "age": initialYearAge, "yearlyRepayment": 0, "interestRepayment": 0, "principalRepayment": 0 }
                futureYearsDebtDetails.age = initialYearAge + year

                for (let month = 0; month < 12; month++) {
                    futureYearsDebtDetails.yearlyRepayment += Math.round(debtMonthlyProjection[initialYearRemainingMonths + month + addMonths].monthlyRepayment)
                    futureYearsDebtDetails.interestRepayment += Math.round(debtMonthlyProjection[initialYearRemainingMonths + month + addMonths].interestRepayment)
                    futureYearsDebtDetails.principalRepayment += Math.round(debtMonthlyProjection[initialYearRemainingMonths + month + addMonths].principalRepayment)
                }
                addMonths += 12

                debtProjection.push(futureYearsDebtDetails)
            }


            // Push final year debt projections
            const finalYearDebtMonths = duration - initialYearRemainingMonths - fullYearDebtMonths //9
            if (finalYearDebtMonths > 0) {
                futureYearsDebtProjection(finalYearDebtMonths, fullYearDebtMonths)
            }
        }

        else if (futureDebtMonths < 12) {
            // Push final year debt projections
            const finalYearDebtMonths = duration - initialYearRemainingMonths
            futureYearsDebtProjection(finalYearDebtMonths)
        }

    } else if (futureDebtMonths <= 0) {
        initialYearDebtProjection(debtMonthlyProjection)

    }

    console.log(debtProjection)

    return (
        debtProjection
    )
}

export default CalculateDebt