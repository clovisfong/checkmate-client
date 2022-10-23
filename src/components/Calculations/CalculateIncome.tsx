import React, { useContext, useEffect } from 'react'
import { format, parse, differenceInCalendarYears, getMonth, differenceInCalendarMonths } from 'date-fns'
import { IIncomeData, IIncomeProjection, IUserDetails } from '../../Interface'
import UserDetailsContext from '../contextStore/userdetails-context'



const CalculateIncome = (incomeData: IIncomeData) => {


    ///// USER TIMELINE
    const userContext = useContext(UserDetailsContext)
    const birthDate = new Date(userContext.date_of_birth)

    ///// LOAN DETAILS

    // Number of income months in 1st year
    const incomeStartDate = new Date(incomeData.start_date)
    const monthOfEntry = getMonth(incomeStartDate)
    const initialYearRemainingMonths = 12 - monthOfEntry

    // Age at 1st year
    const initialYearAge = differenceInCalendarYears(incomeStartDate, birthDate)

    // Total income duration in months
    const updatedDate = new Date(incomeData.updated_at)
    const updatedDuration = differenceInCalendarMonths(updatedDate, incomeStartDate)
    const duration = incomeData.income_status === 'End' ? updatedDuration : incomeData.duration_months



    // Number of income months after 1st year
    const futureIncomeMonths = duration - initialYearRemainingMonths


    ///// MONTHLY INCOME PROJECTIONS
    const incomeProjection: IIncomeProjection[] = []

    const finalYear = Math.ceil(futureIncomeMonths / 12)



    // Calculate initial year income
    const storeInitialYearValue = (period: number) => {
        if (incomeData.frequency === 'Monthly') {
            incomeProjection.push({ "age": initialYearAge, "income": period * incomeData.amount })

        } else if (incomeData.frequency === 'Annually') {
            incomeProjection.push({ "age": initialYearAge, "income": incomeData.amount })
        }
    }

    // Calculate future years income
    const storeFutureYearsValue = (numOfYear: number, numOfMonths: number) => {
        if (incomeData.frequency === 'Monthly') {
            incomeProjection.push({ "age": initialYearAge + numOfYear, "income": Math.ceil(numOfMonths * incomeData.amount * Math.pow((1 + (incomeData.growth_rate / 100)), numOfYear)) })

        } else if (incomeData.frequency === 'Annually') {
            incomeProjection.push({ "age": initialYearAge + numOfYear, "income": Math.ceil(incomeData.amount * Math.pow((1 + (incomeData.growth_rate / 100)), numOfYear)) })
        }
    }


    if (futureIncomeMonths > 0) {
        /// INITIAL YEAR INCOME
        storeInitialYearValue(initialYearRemainingMonths)


        if (futureIncomeMonths >= 12) {

            /// SUBSEQUENT FULL YEAR INCOME
            const fullYearIncomeYears = Math.floor(futureIncomeMonths / 12)
            for (let year = 1; year <= fullYearIncomeYears; year++) {
                storeFutureYearsValue(year, 12)
            }


            if (incomeData.frequency === 'Monthly') {
                /// FINAL YEAR INCOME
                const fullYearIncomeMonths = fullYearIncomeYears * 12
                const finalYearIncomeMonths = duration - initialYearRemainingMonths - fullYearIncomeMonths

                if (finalYearIncomeMonths > 0) {
                    storeFutureYearsValue(finalYear, finalYearIncomeMonths)
                }
            }
        }

        else if (futureIncomeMonths < 12) {
            /// FINAL YEAR INCOME
            if (incomeData.frequency === 'Monthly') {
                const FinalYearIncomeMonths = duration - initialYearRemainingMonths
                storeFutureYearsValue(finalYear, FinalYearIncomeMonths)
            }
        }

    } else if (futureIncomeMonths <= 0 && duration > 0) {
        /// INITIAL YEAR INCOME

        storeInitialYearValue(duration)
    }

    console.log('income projections', incomeProjection)

    return (
        incomeProjection
    )
}

export default CalculateIncome