import { createDate } from './createDate'
import { createMonth } from './createMonth'

interface createYearParams {
  year?: number
  locale?: string
  monthNumber?: number
}
export const createYear = (params: createYearParams) => {
  const locale = params?.locale ?? 'default'

  const monthCount = 12
  const today = createDate()

  const year = params.year ?? today.year
  const monthNumber = params.monthNumber ?? today.monthNumber

  const month = createMonth({ date: new Date(year, monthNumber - 1), locale })

  const getMonthDays = (monthIdx: number) =>
    createMonth({ date: new Date(year, monthIdx), locale }).createMonthDays()

  const createYearMonths = () => {
    const months = []

    for (let i = 0; i <= monthCount - 1; i++) {
      months[i] = getMonthDays(i)
    }

    return months
  }

  return {
    createYearMonths,
    month,
    year,
  }
}
