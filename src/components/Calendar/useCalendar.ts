import { useMemo, useState } from 'react'
import {
  createDate,
  createMonth,
  getMonthNumberOfDays,
  getMonthsNames,
  getWeekDaysNames,
} from '../../utils'

const getYearsInterval = (year: number) => {
  const startYear = Math.floor(year / 10) * 10
  return [...Array(10)].map((_, i) => startYear + i)
}

interface useCalendarParams {
  locale?: string
  selectedDate: Date
  firstDayNumber?: number
}
export const useCalendar = ({
  locale,
  selectedDate: date,
  firstDayNumber = 2,
}: useCalendarParams) => {
  const [mode, setMode] = useState<'days' | 'month' | 'year'>('days')
  const [selectedDate, setSelectedDate] = useState(createDate({ date }))
  const [selectedMonth, setSelectedMonth] = useState(
    createMonth({
      date: new Date(selectedDate.year, selectedDate.monthIdx),
      locale,
    })
  )
  const [selectedYear, setSelectedYear] = useState(selectedDate.year)
  const [selectedYearInterval, setSelectedYearInterval] = useState(
    getYearsInterval(selectedDate.year)
  )

  const monthsNames = useMemo(() => getMonthsNames(locale), [])

  const weekDaysNames = useMemo(
    () => getWeekDaysNames(firstDayNumber, locale),
    []
  )

  const days = useMemo(
    () => selectedMonth.createMonthDays(),
    [selectedMonth, selectedYear]
  )

  const calendarDays = useMemo(() => {
    const monthNumberOfDays = getMonthNumberOfDays(
      selectedDate.monthIdx,
      selectedYear
    )

    const prevMonthDays = createMonth({
      date: new Date(selectedYear, selectedMonth.monthIdx - 1),
      locale,
    }).createMonthDays()

    const nextMonthDays = createMonth({
      date: new Date(selectedYear, selectedMonth.monthIdx + 1),
      locale,
    }).createMonthDays()

    const firstDay = days[0]
    const lastDay = days[monthNumberOfDays - 1]

    const shiftIdx = firstDayNumber - 1

    const numberOfPrevDays =
      firstDay.dayNumberWeek - 1 - shiftIdx < 0
        ? 7 - (firstDayNumber - firstDay.dayNumberWeek)
        : firstDay.dayNumberWeek - 1 - shiftIdx

    const numberOfNextDays =
      7 - lastDay.dayNumberWeek + shiftIdx > 6
        ? 7 - lastDay.dayNumberWeek - (7 - shiftIdx)
        : 7 - lastDay.dayNumberWeek + shiftIdx

    const totalCalendarDays = days.length + numberOfNextDays + numberOfPrevDays

    const result = []

    for (let i = 0; i < numberOfPrevDays; i++) {
      const inverted = numberOfPrevDays - i
      result[i] = prevMonthDays[prevMonthDays.length - inverted]
    }

    for (
      let i = numberOfPrevDays;
      i < totalCalendarDays - numberOfNextDays;
      i++
    ) {
      result[i] = days[i - numberOfPrevDays]
    }

    for (
      let i = totalCalendarDays - numberOfNextDays;
      i < totalCalendarDays;
      i++
    ) {
      result[i] = nextMonthDays[i - totalCalendarDays + numberOfNextDays]
    }

    return result
  }, [selectedMonth.year, selectedMonth.monthIdx, selectedYear])

  return {
    state: {
      mode,
      calendarDays,
      weekDaysNames,
      monthsNames,
      selectedDate,
      selectedMonth,
      selectedYear,
      selectedYearInterval,
    },
    methods: {
      setMode,
    },
  }
}
