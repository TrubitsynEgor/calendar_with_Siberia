import { createDate } from './createDate'
import { getMonthNumberOfDays } from './getMonthNumberOfDays'

interface createMonthParams {
  date?: Date
  locale?: string
}
export const createMonth = (params?: createMonthParams) => {
  const date = params?.date ?? new Date()
  const locale = params?.locale ?? 'default'

  const d = createDate({ date, locale })
  const { month: monthName, year, monthNumber, monthIdx } = d

  const getDay = (dayNumber: number) => {
    return createDate({ date: new Date(year, monthIdx, dayNumber), locale })
  }

  const createMonthDays = () => {
    const days = []

    for (let i = 0; i <= getMonthNumberOfDays(monthIdx, year) - 1; i++) {
      days[i] = getDay(i + 1)
    }

    return days
  }
  return {
    getDay,
    monthName,
    monthIdx,
    monthNumber,
    year,
    createMonthDays,
  }
}
