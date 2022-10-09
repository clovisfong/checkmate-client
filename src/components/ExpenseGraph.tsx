import { differenceInCalendarYears } from "date-fns"
import { ITotalExpenseProjection } from "../Interface"
import CalculateExpense from "./CalculateExpense"




const ExpenseGraph = () => {

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

    const expenseTimeline: ITotalExpenseProjection[] = []

    for (let age = currentAge; age <= userDetails.life_expectancy; age++) {
        expenseTimeline.push({ "age": age, "totalExpense": 0 })
    }

    console.log(expenseTimeline)



    const expenseData = [
        {
            amount: 3000,
            created_at: "Sun, 09 Oct 2022 10:49:15 GMT",
            duration_months: 240,
            expense_name: "Life Insurance",
            expense_status: "Future",
            expense_type: "Insurance",
            frequency: "Annually",
            id: 12,
            inflation_rate: 0.0,
            start_date: "Sat, 10 Oct 2026 00:00:00 GMT",
            updated_at: "Sun, 09 Oct 2022 10:49:15 GMT"
        },
        {
            amount: 1200,
            created_at: "Sun, 09 Oct 2022 10:50:11 GMT",
            duration_months: 792,
            expense_name: "Daily Spending",
            expense_status: "Current",
            expense_type: "Personal",
            frequency: "Monthly",
            id: 13,
            inflation_rate: 2.0,
            start_date: "Sun, 09 Oct 2022 00:00:00 GMT",
            updated_at: "Sun, 09 Oct 2022 10:50:11 GMT"
        },
        {
            amount: 4000,
            created_at: "Sun, 09 Oct 2022 10:50:53 GMT",
            duration_months: 504,
            expense_name: "Nearby Trips",
            expense_status: "Current",
            expense_type: "Travel",
            frequency: "Annually",
            id: 14,
            inflation_rate: 4.0,
            start_date: "Sun, 09 Oct 2022 00:00:00 GMT",
            updated_at: "Sun, 09 Oct 2022 10:50:53 GMT"
        }

    ]



    const expenseProjections = expenseData.map(expense => CalculateExpense(expense))
    console.log(expenseProjections)


    // Add all income for each age
    expenseProjections.forEach((expense) => {
        expense.forEach((projection) => {
            expenseTimeline.find((entry) => entry.age === projection.age ? entry.totalExpense += projection.expense : null)
        })
    })
    console.log(expenseTimeline)






    return (
        <>
            <div>Expense Graph</div>

        </>

    )
}

export default ExpenseGraph