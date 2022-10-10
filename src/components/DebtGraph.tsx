import { differenceInCalendarYears } from "date-fns"
import { ITotalDebtProjection, ITotalExpenseProjection } from "../Interface"
import CalculateDebt from "./CalculateDebt"
import CalculateExpense from "./CalculateExpense"




const DebtGraph = () => {

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

    const debtTimeline: ITotalDebtProjection[] = []

    for (let age = currentAge; age <= userDetails.life_expectancy; age++) {
        debtTimeline.push({ "age": age, "totalDebt": 0 })
    }

    // console.log(debtTimeline)



    const debtData = [
        {
            commitment_period_months: 36,
            created_at: "Mon, 10 Oct 2022 11:41:23 GMT",
            debt_name: "Personal",
            debt_status: "Current",
            debt_type: "Personal",
            id: 1,
            interest_rate: 6.0,
            loan_amount: 100000,
            monthly_commitment: 0,
            start_date: "Mon, 10 Oct 2022 00:00:00 GMT",
            updated_at: "Mon, 10 Oct 2022 11:41:23 GMT"
        }

    ]



    const debtProjections = debtData.map(debt => CalculateDebt(debt))
    // console.log(debtProjections)


    // // Add all income for each age
    // debtProjections.forEach((debt) => {
    //     debt.forEach((projection) => {
    //         expenseTimeline.find((entry) => entry.age === projection.age ? entry.totalDebt += projection.debt : null)
    //     })
    // })
    // console.log(expenseTimeline)






    return (
        <>
            <div>Debt Graph</div>

        </>

    )
}

export default DebtGraph