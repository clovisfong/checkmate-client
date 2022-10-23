import React, { useContext, useEffect } from 'react'
import { differenceInCalendarYears, getMonth, differenceInCalendarMonths } from 'date-fns'
import { IDebtMonthlyProjection, IDebtData2, IDebtProjection, IDebtData, IUserDetails } from '../../Interface'
import { FormControlUnstyledContext } from '@mui/base'
import UserDetailsContext from '../contextStore/userdetails-context'



const CalculateDebt = (debtData: IDebtData) => {



    ///// USER TIMELINE
    const userContext = useContext(UserDetailsContext)
    const birthDate = new Date(userContext.date_of_birth)



    ///// LOAN DETAILS

    // Monthly interest rate
    const monthlyInterestRate = debtData.interest_rate / 12 / 100 // 0.005

    // Monthly installment
    const calculateMonthlyRepayment = () => {
        const numerator = monthlyInterestRate * Math.pow((1 + monthlyInterestRate), debtData.commitment_period_months)
        const denominator = Math.pow((1 + monthlyInterestRate), debtData.commitment_period_months) - 1
        const calculatedMonthlyRepayment = debtData.loan_amount * numerator / denominator
        return calculatedMonthlyRepayment
    }
    const monthlyRepayment = debtData.monthly_commitment > 0 ? debtData.monthly_commitment : calculateMonthlyRepayment()

    // Number of repayment months in 1st year
    const debtStartDate = new Date(debtData.start_date) // 13 feb 2022
    const todayDate = new Date() // 21 Oct 2022
    const monthOfEntry = getMonth(debtStartDate) // feb aka 1
    const initialYearDebtMonths = 12 - monthOfEntry // 11

    // Age at 1st year
    const initialYearAge = differenceInCalendarYears(debtStartDate, birthDate) //  29

    // Total debt duration in months
    const updatedDate = new Date(debtData.updated_at)
    const updatedDuration = differenceInCalendarMonths(updatedDate, debtStartDate)
    const duration = debtData.debt_status === 'End' ? updatedDuration : debtData.commitment_period_months

    // Number of repayment months after 1st year
    const futureDebtMonths = duration - initialYearDebtMonths //109



    ///// MONTHLY DEBT PROJECTIONS
    const debtMonthlyProjection: IDebtMonthlyProjection[] = []
    let outstandingPrin = debtData.loan_amount

    for (let period = 1; period <= debtData.commitment_period_months; period++) {
        const monthlyInterest = monthlyInterestRate * outstandingPrin
        const monthlyPrincipal = monthlyRepayment - monthlyInterest
        outstandingPrin -= monthlyPrincipal
        debtMonthlyProjection.push({ "period": period, "monthlyRepayment": monthlyRepayment, "interestRepayment": monthlyInterest, "principalRepayment": monthlyPrincipal, "outstandingPrincipal": outstandingPrin })
    }



    ///// PAID DEBT PROJECTIONS 
    const numOfPaidMonths = differenceInCalendarMonths(todayDate, debtStartDate)
    const debtPaidMonthly: IDebtMonthlyProjection[] = debtMonthlyProjection.filter((debt) => debt.period <= numOfPaidMonths)

    // Number of paid months after 1st year
    const remainingPaidMonths = numOfPaidMonths - initialYearDebtMonths




    // Calculate 1st year debt
    const initialYearDebtProjection = (initialYear: IDebtMonthlyProjection[], debtArr: IDebtProjection[]) => {
        let remainingPrincipal = debtData.loan_amount
        const initialYearDebtDetails: IDebtProjection = { "age": initialYearAge, "yearlyRepayment": 0, "interestRepayment": 0, "principalRepayment": 0, "outstandingPrincipal": remainingPrincipal }
        for (let i = 0; i < initialYear.length; i++) {
            initialYearDebtDetails.yearlyRepayment += Math.round(initialYear[i].monthlyRepayment)
            initialYearDebtDetails.interestRepayment += Math.round(initialYear[i].interestRepayment)
            initialYearDebtDetails.principalRepayment += Math.round(initialYear[i].principalRepayment)
        }
        initialYearDebtDetails.outstandingPrincipal = Math.round(initialYearDebtDetails.outstandingPrincipal - initialYearDebtDetails.principalRepayment)
        debtArr.push(initialYearDebtDetails)
    }


    ///// FULL DEBT PROJECTIONS
    const debtProjection: IDebtProjection[] = []


    if (futureDebtMonths > 0) {

        /// INITIAL YEAR DEBT
        const initialYearDebt = debtMonthlyProjection.filter((debt) => debt.period <= initialYearDebtMonths)
        initialYearDebtProjection(initialYearDebt, debtProjection)



        // Calculate final year debt
        const finalYearDebtProjection = (numOfMonths: number, numOfFullYearMonths: number = 0) => {

            const finalYear = Math.ceil(futureDebtMonths / 12) // 10
            const remainingPrincipalInFinalYear = debtMonthlyProjection[duration - numOfMonths - 1].outstandingPrincipal
            const finalYearDebtDetails: IDebtProjection = { "age": initialYearAge + finalYear, "yearlyRepayment": 0, "interestRepayment": 0, "principalRepayment": 0, "outstandingPrincipal": remainingPrincipalInFinalYear }

            for (let month = 0; month < numOfMonths; month++) {
                finalYearDebtDetails.yearlyRepayment += Math.round(debtMonthlyProjection[initialYearDebtMonths + numOfFullYearMonths + month].monthlyRepayment)
                finalYearDebtDetails.interestRepayment += Math.round(debtMonthlyProjection[initialYearDebtMonths + numOfFullYearMonths + month].interestRepayment)
                finalYearDebtDetails.principalRepayment += Math.round(debtMonthlyProjection[initialYearDebtMonths + numOfFullYearMonths + month].principalRepayment)
            }
            finalYearDebtDetails.outstandingPrincipal = Math.round(finalYearDebtDetails?.outstandingPrincipal - finalYearDebtDetails?.principalRepayment)

            return debtProjection.push(finalYearDebtDetails)
        }


        if (futureDebtMonths >= 12) {


            /// SUBSEQUENT FULL YEAR DEBTS
            let addMonths = 0
            let cumulativePrincipalRepayment = 0
            const fullYearDebtYears = Math.floor(futureDebtMonths / 12) //2 years
            const remainingPrincipalAfterInitialYear = debtMonthlyProjection[initialYearDebtMonths - 1].outstandingPrincipal

            for (let year = 1; year <= fullYearDebtYears; year++) {
                const futureYearsDebtDetails: IDebtProjection = { "age": initialYearAge, "yearlyRepayment": 0, "interestRepayment": 0, "principalRepayment": 0, "outstandingPrincipal": 0 }
                futureYearsDebtDetails.age = initialYearAge + year


                for (let month = 0; month < 12; month++) {
                    futureYearsDebtDetails.yearlyRepayment += Math.round(debtMonthlyProjection[initialYearDebtMonths + month + addMonths].monthlyRepayment)
                    futureYearsDebtDetails.interestRepayment += Math.round(debtMonthlyProjection[initialYearDebtMonths + month + addMonths].interestRepayment)
                    futureYearsDebtDetails.principalRepayment += Math.round(debtMonthlyProjection[initialYearDebtMonths + month + addMonths].principalRepayment)
                }
                cumulativePrincipalRepayment += futureYearsDebtDetails.principalRepayment
                futureYearsDebtDetails.outstandingPrincipal = Math.round(remainingPrincipalAfterInitialYear - cumulativePrincipalRepayment)
                addMonths += 12

                debtProjection.push(futureYearsDebtDetails)
            }



            /// FINAL YEAR DEBT
            const fullYearDebtMonths = fullYearDebtYears * 12
            const finalYearDebtMonths = duration - initialYearDebtMonths - fullYearDebtMonths

            if (finalYearDebtMonths > 0) {
                finalYearDebtProjection(finalYearDebtMonths, fullYearDebtMonths)
            }


        } else if (futureDebtMonths < 12) {
            /// FINAL YEAR DEBT
            const finalYearDebtMonths = duration - initialYearDebtMonths
            finalYearDebtProjection(finalYearDebtMonths)
        }


    } else if (futureDebtMonths <= 0) {
        /// INITIAL YEAR DEBT
        initialYearDebtProjection(debtMonthlyProjection, debtProjection)

    }



    ///// PAID DEBTS
    const debtPaidTimeline: IDebtProjection[] = []

    if (todayDate > debtStartDate) {

        if (numOfPaidMonths >= initialYearDebtMonths) {

            /// INITIAL YEAR PAID DEBT
            const initialYearPaidDebt = debtPaidMonthly.filter((debt) => debt.period <= initialYearDebtMonths)
            initialYearDebtProjection(initialYearPaidDebt, debtPaidTimeline)



            // Calculate final year paid debt
            const finalPaidYearDebtProjection = (numOfMonths: number, numOfFullYearMonths: number = 0) => {

                const finalPaidYear = Math.ceil(remainingPaidMonths / 12)
                const remainingPrincipalInFinalYear = debtPaidMonthly[numOfPaidMonths - numOfMonths - 1].outstandingPrincipal
                const finalYearDebtDetails: IDebtProjection = { "age": initialYearAge + finalPaidYear, "yearlyRepayment": 0, "interestRepayment": 0, "principalRepayment": 0, "outstandingPrincipal": remainingPrincipalInFinalYear }

                for (let month = 0; month < numOfMonths; month++) {
                    finalYearDebtDetails.yearlyRepayment += Math.round(debtPaidMonthly[initialYearDebtMonths + numOfFullYearMonths + month]?.monthlyRepayment)
                    finalYearDebtDetails.interestRepayment += Math.round(debtPaidMonthly[initialYearDebtMonths + numOfFullYearMonths + month]?.interestRepayment)
                    finalYearDebtDetails.principalRepayment += Math.round(debtPaidMonthly[initialYearDebtMonths + numOfFullYearMonths + month]?.principalRepayment)
                }
                finalYearDebtDetails.outstandingPrincipal = Math.round(finalYearDebtDetails?.outstandingPrincipal - finalYearDebtDetails?.principalRepayment)

                return debtPaidTimeline.push(finalYearDebtDetails)
            }


            if (remainingPaidMonths >= 12) {


                /// SUBSEQUENT FULL YEAR PAID DEBTS
                let addMonths = 0
                let cumulativePrincipalRepayment = 0
                const fullYearPaidDebtYears = Math.floor(remainingPaidMonths / 12)
                const remainingPrincipalAfterInitialYear = debtPaidMonthly[initialYearDebtMonths - 1].outstandingPrincipal

                for (let year = 1; year <= fullYearPaidDebtYears; year++) {
                    const YearlyDebtDetails: IDebtProjection = { "age": initialYearAge, "yearlyRepayment": 0, "interestRepayment": 0, "principalRepayment": 0, "outstandingPrincipal": 0 }
                    YearlyDebtDetails.age = initialYearAge + year

                    for (let month = 0; month < 12; month++) {
                        YearlyDebtDetails.yearlyRepayment += Math.round(debtPaidMonthly[initialYearDebtMonths + month + addMonths].monthlyRepayment)
                        YearlyDebtDetails.interestRepayment += Math.round(debtPaidMonthly[initialYearDebtMonths + month + addMonths].interestRepayment)
                        YearlyDebtDetails.principalRepayment += Math.round(debtPaidMonthly[initialYearDebtMonths + month + addMonths].principalRepayment)
                    }
                    cumulativePrincipalRepayment += YearlyDebtDetails.principalRepayment
                    YearlyDebtDetails.outstandingPrincipal = Math.round(remainingPrincipalAfterInitialYear - cumulativePrincipalRepayment)
                    addMonths += 12

                    debtPaidTimeline.push(YearlyDebtDetails)
                }

                /// FINAL YEAR PAID DEBT
                const fullYearPaidDebtMonths = fullYearPaidDebtYears * 12
                const finalYearPaidDebtMonths = numOfPaidMonths - initialYearDebtMonths - fullYearPaidDebtMonths

                if (finalYearPaidDebtMonths > 0) {
                    finalPaidYearDebtProjection(finalYearPaidDebtMonths, fullYearPaidDebtMonths)
                }


            } else if (remainingPaidMonths < 12) {
                /// FINAL YEAR PAID DEBT
                const finalYearPaidDebtMonths = numOfPaidMonths - initialYearDebtMonths
                finalPaidYearDebtProjection(finalYearPaidDebtMonths)
            }


        } else if (numOfPaidMonths < initialYearDebtMonths) {
            /// INITIAL YEAR PAID DEBT
            initialYearDebtProjection(debtPaidMonthly, debtPaidTimeline)
        }

        /// REMOVE PAID DEBT FROM DEBT PROJECTIONS
        debtPaidTimeline.forEach(paidYear => {
            debtProjection.find(entry => entry.age === paidYear.age ? entry.yearlyRepayment -= paidYear.yearlyRepayment : null)
            debtProjection.find(entry => entry.age === paidYear.age ? entry.interestRepayment -= paidYear.interestRepayment : null)
            debtProjection.find(entry => entry.age === paidYear.age ? entry.principalRepayment -= paidYear.principalRepayment : null)
        })
    }

    console.log('debt paid', debtPaidTimeline)
    console.log('debt projection', debtProjection)

    debtProjection.forEach((entry) => entry.outstandingPrincipal < 0 ? entry.outstandingPrincipal = 0 : null)


    return (
        debtProjection
    )
}

export default CalculateDebt