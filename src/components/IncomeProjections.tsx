import { differenceInCalendarYears } from "date-fns"
import { IIncomeData, IIncomeProjection, ITotalIncomeProjection, IUserDetails } from "../Interface"
import CalculateIncome from "./Calculations/CalculateIncome"



const IncomeProjections = (userDetails: IUserDetails, incomeData: IIncomeData[]) => {



    // General details: Current age, retirement age, life-expectancy age
    const birthDate = new Date(userDetails.date_of_birth)
    const currentDate = new Date // use current date
    const currentAge = differenceInCalendarYears(currentDate, birthDate) // 24
    const yearsToRetirement = userDetails.retirement_age - currentAge //42
    const yearsToLifeExpectancy = userDetails.life_expectancy - currentAge //66


    // Yearly projection for each income
    const totalIncomeProjections = incomeData.map(income => CalculateIncome(income, userDetails))


    // Sum all income for each age
    const incomeTimeline: ITotalIncomeProjection[] = []

    for (let age = currentAge; age <= userDetails.life_expectancy; age++) {
        incomeTimeline.push({ "age": age, "totalIncome": 0 })
    }

    totalIncomeProjections.forEach((income) => {
        income.forEach((projection) => {
            incomeTimeline.find((entry) => entry.age === projection.age ? entry.totalIncome += projection.income : null)
        })
    })
    console.log(incomeTimeline)


    return (
        incomeTimeline

    )
}

export default IncomeProjections