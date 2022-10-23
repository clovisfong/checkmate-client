import { useContext } from 'react'
import { differenceInCalendarYears, getMonth, differenceInCalendarMonths } from 'date-fns'
import { IExpenseData, IExpenseProjection } from '../../Interface'
import UserDetailsContext from '../contextStore/userdetails-context'



const CalculateExpense = (expenseData: IExpenseData) => {



    ///// USER TIMELINE
    const userContext = useContext(UserDetailsContext)
    const birthDate = new Date(userContext.date_of_birth)


    ///// EXPENSE DETAILS

    // Number of expense months in 1st year
    const expenseStartDate = new Date(expenseData.start_date)
    const monthOfEntry = getMonth(expenseStartDate)
    const initialYearRemainingMonths = 12 - monthOfEntry

    // Age at 1st year
    const initialYearAge = differenceInCalendarYears(expenseStartDate, birthDate)

    // Total expense duration in months
    const updatedDate = new Date(expenseData.updated_at)
    const updatedDuration = differenceInCalendarMonths(updatedDate, expenseStartDate)
    const duration = expenseData.expense_status === 'End' ? updatedDuration : expenseData.duration_months


    // Number of expense months after 1st year
    const futureExpenseMonths = duration - initialYearRemainingMonths


    ///// MONTHLY EXPENSE PROJECTIONS
    const expenseProjection: IExpenseProjection[] = []

    const finalYear = Math.ceil(futureExpenseMonths / 12)

    // Calculate initial year expense
    const pushInitialYearValue = (period: number = 0) => {
        if (expenseData.frequency === 'Monthly') {
            expenseProjection.push({ "age": initialYearAge, "expense": period * expenseData.amount })

        } else if (expenseData.frequency === 'Annually') {
            expenseProjection.push({ "age": initialYearAge, "expense": expenseData.amount })
        }
    }

    // Calculate future years expense
    const pushFutureYearsValue = (numOfYear: number, numOfMonths: number) => {
        if (expenseData.frequency === 'Monthly') {
            expenseProjection.push({ "age": initialYearAge + numOfYear, "expense": Math.ceil(numOfMonths * expenseData.amount * Math.pow((1 + (expenseData.inflation_rate / 100)), numOfYear)) })

        } else if (expenseData.frequency === 'Annually') {
            expenseProjection.push({ "age": initialYearAge + numOfYear, "expense": Math.ceil(expenseData.amount * Math.pow((1 + (expenseData.inflation_rate / 100)), numOfYear)) })
        }
    }



    if (futureExpenseMonths > 0) {
        /// INITIAL YEAR EXPENSE
        pushInitialYearValue(initialYearRemainingMonths)


        if (futureExpenseMonths >= 12) {

            /// SUBSEQUENT FULL YEAR EXPENSE
            const fullYearExpenseYears = Math.floor(futureExpenseMonths / 12)
            for (let year = 1; year <= fullYearExpenseYears; year++) {
                pushFutureYearsValue(year, 12)
            }


            if (expenseData.frequency === 'Monthly') {
                /// FINAL YEAR EXPENSE
                const fullYearExpenseMonths = fullYearExpenseYears * 12
                const finalYearExpenseMonths = duration - initialYearRemainingMonths - fullYearExpenseMonths
                pushFutureYearsValue(finalYear, finalYearExpenseMonths)
            }
        }

        else if (futureExpenseMonths < 12) {
            /// FINAL YEAR EXPENSE
            if (expenseData.frequency === 'Monthly') {
                const finalYearExpenseMonths = duration - initialYearRemainingMonths
                if (finalYearExpenseMonths > 0) {
                    pushFutureYearsValue(finalYear, finalYearExpenseMonths)
                }
            }
        }

    } else if (futureExpenseMonths <= 0 && duration > 0) {
        /// INITIAL YEAR EXPENSE
        pushInitialYearValue(duration)
    }


    console.log('expense projections', expenseProjection)



    return (
        expenseProjection
    )
}

export default CalculateExpense