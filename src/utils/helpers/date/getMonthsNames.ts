import { createDate } from './createDate'

export const getMonthsNames = (locale: string = 'default') => {
  const monthsNames: {
    month: ReturnType<typeof createDate>['month']
    monthShort: ReturnType<typeof createDate>['monthShort']
    monthIdx: ReturnType<typeof createDate>['monthIdx']
    date: ReturnType<typeof createDate>['date']
  }[] = Array.from({ length: 12 })

  const d = new Date()
  monthsNames.forEach((_, i) => {
    const { month, monthIdx, monthShort, date } = createDate({
      locale,
      date: new Date(d.getFullYear(), d.getMonth() + i, 1),
    })
    monthsNames[monthIdx] = { month, monthIdx, monthShort, date }
  })

  return monthsNames
}
