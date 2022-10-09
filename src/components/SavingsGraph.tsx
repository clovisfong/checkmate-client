import React, { useEffect } from 'react'
import { format, parse, differenceInCalendarYears, getMonth } from 'date-fns'


const SavingsGraph = () => {

    const incomeGraphInputs: any = []

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

    const incomeData = {
        amount: 3000,
        created_at: "Sun, 09 Oct 2022 02:41:29 GMT",
        duration_months: 10,
        frequency: "Semi-Annually",
        growth_rate: 1.5,
        id: 22,
        income_name: "Stockie",
        income_status: "Current",
        income_type: "Investment",
        start_date: "Sun, 09 Oct 2022 00:00:00 GMT",
        updated_at: "Sun, 09 Oct 2022 02:41:29 GMT"
    }


    const birthDate = new Date(userDetails.date_of_birth)
    const currentDate = new Date // use current date

    const currentAge = differenceInCalendarYears(currentDate, birthDate) // 24
    const yearsToRetirement = userDetails.retirement_age - currentAge //42
    const yearsToLifeExpectancy = userDetails.life_expectancy - currentAge //66


    if (incomeData.income_status === 'Current') {
        // Initial Age: Output: 24
        const dateofIncomeEntry = new Date(incomeData.created_at)


        // Remaining months till year end
        const monthOfEntry = getMonth(dateofIncomeEntry)
        const initialYearRemainingMonths = 12 - monthOfEntry // 3 months
        const initialYearAge = differenceInCalendarYears(dateofIncomeEntry, birthDate)
        const futureIncomeMonths = incomeData.duration_months - initialYearRemainingMonths //117
        const finalYear = Math.ceil(futureIncomeMonths / 12) // 10


        const storeInitialYearValue = (period: number) => {
            if (incomeData.frequency === 'Monthly') {
                incomeGraphInputs.push({ "Age": initialYearAge, "Income": period * incomeData.amount })
            } else if (incomeData.frequency === 'Quarterly') {
                incomeGraphInputs.push({ "Age": initialYearAge, "Income": Math.ceil(period / 3) * incomeData.amount })
            } else if (incomeData.frequency === 'Semi-Annually') {
                incomeGraphInputs.push({ "Age": initialYearAge, "Income": Math.ceil(period / 6) * incomeData.amount })
            } else if (incomeData.frequency === 'Annually') {
                incomeGraphInputs.push({ "Age": initialYearAge, "Income": incomeData.amount })
            }
        }

        if (futureIncomeMonths > 0) {
            // Initial Year Income
            storeInitialYearValue(initialYearRemainingMonths) // {age: 24, Income : 9000}


            const storeFutureYearsValue = (numOfYear: number, numOfMonths: number) => {
                if (incomeData.frequency === 'Monthly') {
                    incomeGraphInputs.push({ "Age": initialYearAge + numOfYear, "Income": Math.ceil(numOfMonths * incomeData.amount * Math.pow((1 + (incomeData.growth_rate / 100)), numOfYear)) })
                } else if (incomeData.frequency === 'Quarterly') {
                    incomeGraphInputs.push({ "Age": initialYearAge + numOfYear, "Income": Math.ceil(Math.ceil(numOfMonths / 3) * incomeData.amount * Math.pow((1 + (incomeData.growth_rate / 100)), numOfYear)) })
                } else if (incomeData.frequency === 'Semi-Annually') {
                    incomeGraphInputs.push({ "Age": initialYearAge + numOfYear, "Income": Math.ceil(Math.ceil(numOfMonths / 6) * incomeData.amount * Math.pow((1 + (incomeData.growth_rate / 100)), numOfYear)) })
                } else if (incomeData.frequency === 'Annually') {
                    incomeGraphInputs.push({ "Age": initialYearAge + numOfYear, "Income": Math.ceil(incomeData.amount * Math.pow((1 + (incomeData.growth_rate / 100)), numOfYear)) })
                }
            }

            if (futureIncomeMonths >= 12) {
                const fullYearIncomeMonths = futureIncomeMonths - (12 - initialYearRemainingMonths) //108
                const fullYearIncomeYears = Math.floor(fullYearIncomeMonths / 12) // 9 years

                // Following Full-Years Income Projections
                for (let year = 1; year <= fullYearIncomeYears; year++) {
                    storeFutureYearsValue(year, 12)
                }

                // Final Year Income Projections
                const finalYearIncomeMonths = incomeData.duration_months - initialYearRemainingMonths - fullYearIncomeMonths
                storeFutureYearsValue(finalYear, finalYearIncomeMonths)
            }

            else if (futureIncomeMonths < 12) {
                // Final Year Income Projections
                const FinalYearIncomeMonths = incomeData.duration_months - initialYearRemainingMonths
                storeFutureYearsValue(finalYear, FinalYearIncomeMonths)

            }

        } else if (futureIncomeMonths <= 0) {
            storeInitialYearValue(incomeData.duration_months)
        }

    }


    console.log(incomeGraphInputs)


    return (
        <div>SavingsGraph</div>
    )
}

export default SavingsGraph