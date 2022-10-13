import { differenceInCalendarYears } from "date-fns"
import { IExpenseData, ITotalExpenseProjection, IUserDetails } from "../Interface"
import CalculateExpense from "./Calculations/CalculateExpense"




const ExpenseProjections = (userDetails: IUserDetails, expensesData: IExpenseData[]) => {


    // General details: Current age, retirement age, life-expectancy age
    const birthDate = new Date(userDetails.date_of_birth)
    const currentDate = new Date // use current date
    const currentAge = differenceInCalendarYears(currentDate, birthDate) // 24
    const yearsToRetirement = userDetails.retirement_age - currentAge //42
    const yearsToLifeExpectancy = userDetails.life_expectancy - currentAge //66


    // Yearly projection for each expense
    const expenseProjections = expensesData.map(expense => CalculateExpense(expense, userDetails))



    // Sum all expenses for each age
    const expenseTimeline: ITotalExpenseProjection[] = []


    for (let age = currentAge; age <= userDetails.life_expectancy; age++) {
        expenseTimeline.push({ "age": age, "totalExpenses": 0 })
    }


    expenseProjections.forEach((expense) => {
        expense.forEach((projection) => {
            expenseTimeline.find((entry) => entry.age === projection.age ? entry.totalExpenses += projection.expense : null)
        })
    })
    console.log(expenseTimeline)






    return (
        expenseTimeline

    )
}

export default ExpenseProjections