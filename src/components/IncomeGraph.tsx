import { differenceInCalendarYears } from "date-fns"
import { IIncomeProjection, ITotalIncomeProjection } from "../Interface"
import CalculateIncome from "./CalculateIncome"



const IncomeGraph = () => {

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

    const incomeTimeline: ITotalIncomeProjection[] = []

    for (let age = currentAge; age <= userDetails.life_expectancy; age++) {
        incomeTimeline.push({ "age": age, "totalIncome": 0 })
    }

    console.log(incomeTimeline)



    const incomeData = [
        {
            amount: 7000,
            created_at: "Mon, 10 Oct 2022 01:57:50 GMT",
            duration_months: 504,
            frequency: "Monthly",
            growth_rate: 2.0,
            id: 2,
            income_name: "Working Income",
            income_status: "Current",
            income_type: "Salary",
            start_date: "Mon, 10 Oct 2022 00:00:00 GMT",
            updated_at: "Mon, 10 Oct 2022 01:57:50 GMT"
        },
        {
            amount: 3000,
            created_at: "Mon, 10 Oct 2022 01:53:31 GMT",
            duration_months: 120,
            frequency: "Monthly",
            growth_rate: 1.5,
            id: 1,
            income_name: "Stocks",
            income_status: "Future",
            income_type: "Investment",
            start_date: "Thu, 10 Oct 2024 00:00:00 GMT",
            updated_at: "Mon, 10 Oct 2022 01:53:31 GMT"
        },
        {
            amount: 3000,
            created_at: "Mon, 10 Oct 2022 01:59:49 GMT",
            duration_months: 120,
            frequency: "Annually",
            growth_rate: 2.0,
            id: 4,
            income_name: "Year End Bonus",
            income_status: "Future",
            income_type: "Bonus",
            start_date: "Thu, 10 Oct 2024 00:00:00 GMT",
            updated_at: "Mon, 10 Oct 2022 01:59:49 GMT"
        }
    ]



    const totalIncomeProjections = incomeData.map(income => CalculateIncome(income))
    console.log(totalIncomeProjections)


    // Add all income for each age
    totalIncomeProjections.forEach((income) => {
        income.forEach((projection) => {
            incomeTimeline.find((entry) => entry.age === projection.age ? entry.totalIncome += projection.income : null)
        })
    })
    console.log(incomeTimeline)






    return (
        <>
            <div>Income Graph</div>

        </>

    )
}

export default IncomeGraph