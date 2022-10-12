import React, { useEffect } from 'react'
import { format, parse, differenceInCalendarYears, getMonth, differenceInCalendarMonths } from 'date-fns'
import { IIncomeData, IIncomeData2, IIncomeProjection, IUserDetails } from '../../Interface'



const CalculateIncome = (incomeData: IIncomeData, userDetails: IUserDetails) => {

    const incomeProjection: IIncomeProjection[] = []

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



    // Remaining months till year end
    const incomeStartDate = new Date(incomeData.start_date)
    const monthOfEntry = getMonth(incomeStartDate) // 10, october
    const initialYearRemainingMonths = 12 - monthOfEntry // 3 months

    // Initial age
    const initialYearAge = differenceInCalendarYears(incomeStartDate, birthDate) //  24

    // Duration upon Update
    const updatedDate = new Date(incomeData.updated_at)
    const updatedDuration = differenceInCalendarMonths(updatedDate, incomeStartDate)

    // Select Duration based on Income Status
    const duration = incomeData.income_status === 'End' ? updatedDuration : incomeData.duration_months
    console.log('duration', duration)
    const futureIncomeMonths = duration - initialYearRemainingMonths //117



    const finalYear = Math.ceil(futureIncomeMonths / 12) // 10


    const storeInitialYearValue = (period: number) => {
        if (incomeData.frequency === 'Monthly') {
            incomeProjection.push({ "age": initialYearAge, "income": period * incomeData.amount })

        } else if (incomeData.frequency === 'Annually') {
            incomeProjection.push({ "age": initialYearAge, "income": incomeData.amount })
        }
    }

    const storeFutureYearsValue = (numOfYear: number, numOfMonths: number) => {
        if (incomeData.frequency === 'Monthly') {
            incomeProjection.push({ "age": initialYearAge + numOfYear, "income": Math.ceil(numOfMonths * incomeData.amount * Math.pow((1 + (incomeData.growth_rate / 100)), numOfYear)) })

        } else if (incomeData.frequency === 'Annually') {
            incomeProjection.push({ "age": initialYearAge + numOfYear, "income": Math.ceil(incomeData.amount * Math.pow((1 + (incomeData.growth_rate / 100)), numOfYear)) })
        }
    }


    if (futureIncomeMonths > 0) {
        // Initial Year Income
        storeInitialYearValue(initialYearRemainingMonths) // {age: 24, Income : 9000}

        // Find Number of Full Year Income
        if (futureIncomeMonths >= 12) {
            // const fullYearIncomeMonths = futureIncomeMonths - (12 - initialYearRemainingMonths) //108
            const fullYearIncomeYears = Math.floor(futureIncomeMonths / 12) //108
            const fullYearIncomeMonths = fullYearIncomeYears * 12 // 9 years

            // Following Full-Years Income Projections
            for (let year = 1; year <= fullYearIncomeYears; year++) {
                storeFutureYearsValue(year, 12)
            }

            // Final Year Income Projections
            if (incomeData.frequency === 'Monthly') {
                const finalYearIncomeMonths = duration - initialYearRemainingMonths - fullYearIncomeMonths
                if (finalYearIncomeMonths > 0) {
                    storeFutureYearsValue(finalYear, finalYearIncomeMonths)
                }

            }
        }

        else if (futureIncomeMonths < 12) {
            // Final Year Income Projections
            if (incomeData.frequency === 'Monthly') {
                const FinalYearIncomeMonths = duration - initialYearRemainingMonths
                storeFutureYearsValue(finalYear, FinalYearIncomeMonths)
            }
        }

    } else if (futureIncomeMonths <= 0) {
        storeInitialYearValue(duration)
    }



    return (
        incomeProjection
    )
}

export default CalculateIncome