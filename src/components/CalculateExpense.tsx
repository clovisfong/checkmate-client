import React, { useEffect } from 'react'
import { format, parse, differenceInCalendarYears, getMonth, differenceInCalendarMonths } from 'date-fns'
import { IExpenseData, IExpenseProjection } from '../Interface'



const CalculateExpense = (expenseData: IExpenseData) => {

    const expenseProjection: IExpenseProjection[] = []

    const userDetails = {
        created_at: "Sat, 08 Oct 2022 15:14:00 GMT",
        date_of_birth: "Mon, 20 Jul 1998 00:00:00 GMT",
        email: "eee@hotmail.com",
        gender: "Female",
        id: 2,
        legacy_allocation: 5000,
        life_expectancy: 90,
        name: "eee",
        new_birthdate: "20-07-1998",
        retirement_age: 66,
        retirement_lifestyle: "Enhanced",
        updated_at: "Sat, 08 Oct 2022 15:14:42 GMT"
    }


    // General details: Current age, retirement age, life-expectancy age
    const birthDate = new Date(userDetails.date_of_birth)
    const currentDate = new Date // use current date
    const currentAge = differenceInCalendarYears(currentDate, birthDate) // 24
    const yearsToRetirement = userDetails.retirement_age - currentAge //42
    const yearsToLifeExpectancy = userDetails.life_expectancy - currentAge //66



    // Remaining months till year end
    const expenseStartDate = new Date(expenseData.start_date)
    const monthOfEntry = getMonth(expenseStartDate) // 10, october
    const initialYearRemainingMonths = 12 - monthOfEntry // 3 months

    // Initial age
    const initialYearAge = differenceInCalendarYears(expenseStartDate, birthDate) //  24

    // Duration upon Update
    const updatedDate = new Date(expenseData.updated_at)
    const updatedDuration = differenceInCalendarMonths(updatedDate, expenseStartDate)

    // Select Duration based on Expense Status
    const duration = expenseData.expense_status === 'End' ? updatedDuration : expenseData.duration_months
    console.log('duration', duration)
    const futureExpenseMonths = duration - initialYearRemainingMonths //117



    const finalYear = Math.ceil(futureExpenseMonths / 12) // 10


    const pushInitialYearValue = (period: number = 0) => {
        if (expenseData.frequency === 'Monthly') {
            expenseProjection.push({ "age": initialYearAge, "expense": period * expenseData.amount })

        } else if (expenseData.frequency === 'Annually') {
            expenseProjection.push({ "age": initialYearAge, "expense": expenseData.amount })
        }
    }

    const pushFutureYearsValue = (numOfYear: number, numOfMonths: number) => {
        if (expenseData.frequency === 'Monthly') {
            expenseProjection.push({ "age": initialYearAge + numOfYear, "expense": Math.ceil(numOfMonths * expenseData.amount * Math.pow((1 + (expenseData.inflation_rate / 100)), numOfYear)) })

        } else if (expenseData.frequency === 'Annually') {
            expenseProjection.push({ "age": initialYearAge + numOfYear, "expense": Math.ceil(expenseData.amount * Math.pow((1 + (expenseData.inflation_rate / 100)), numOfYear)) })
        }
    }



    if (futureExpenseMonths > 0) {
        // Initial Year Expense
        pushInitialYearValue(initialYearRemainingMonths) // {age: 24, Income : 9000}

        // Find Number of Full Year Expense
        if (futureExpenseMonths >= 12) {
            const fullYearExpenseYears = Math.floor(futureExpenseMonths / 12) //108
            const fullYearExpenseMonths = fullYearExpenseYears * 12 // 9 years

            // Following Full-Years Expense Projections
            for (let year = 1; year <= fullYearExpenseYears; year++) {
                pushFutureYearsValue(year, 12)
            }

            // Final Year Expense Projections
            if (expenseData.frequency === 'Monthly') {
                const finalYearExpenseMonths = duration - initialYearRemainingMonths - fullYearExpenseMonths
                pushFutureYearsValue(finalYear, finalYearExpenseMonths)
            }
        }

        else if (futureExpenseMonths < 12) {
            // Final Year Expense Projections
            if (expenseData.frequency === 'Monthly') {
                const finalYearExpenseMonths = duration - initialYearRemainingMonths
                if (finalYearExpenseMonths > 0) {
                    pushFutureYearsValue(finalYear, finalYearExpenseMonths)
                }
            }
        }

    } else if (futureExpenseMonths <= 0) {
        pushInitialYearValue(duration)
    }




    return (
        expenseProjection
    )
}

export default CalculateExpense