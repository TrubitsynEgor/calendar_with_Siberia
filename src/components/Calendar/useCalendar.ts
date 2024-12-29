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
      selectedMonth.monthIdx,
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

  const onClickArrow = (direction: 'right' | 'left') => {
    // For mode = year!
    if (mode === 'year' && direction === 'left') {
      return setSelectedYearInterval(
        getYearsInterval(selectedYearInterval[0] - 10)
      )
    }
    if (mode === 'year' && direction === 'right') {
      return setSelectedYearInterval(
        getYearsInterval(selectedYearInterval[0] + 10)
      )
    }
    //===================================//
    // For mode = month!
    if (mode === 'month' && direction === 'left') {
      const year = selectedYear - 1
      if (!selectedYearInterval.includes(year))
        setSelectedYearInterval(getYearsInterval(year))
      return setSelectedYear(year)
    }

    if (mode === 'month' && direction === 'right') {
      const year = selectedYear + 1
      if (!selectedYearInterval.includes(year))
        setSelectedYearInterval(getYearsInterval(year))
      return setSelectedYear(year)
    }
    //===================================//

    // For mode = days!
    if (mode === 'days') {
      const monthIndex =
        direction === 'left'
          ? selectedMonth.monthIdx - 1
          : selectedMonth.monthIdx + 1

      if (monthIndex === -1) {
        const year = selectedYear - 1
        setSelectedYear(year)
        if (!selectedYearInterval.includes(year))
          setSelectedYearInterval(getYearsInterval(year))
        return setSelectedMonth(
          createMonth({ date: new Date(year, 11), locale })
        )
      }

      if (monthIndex === 12) {
        const year = selectedYear + 1
        setSelectedYear(year)
        if (!selectedYearInterval.includes(year))
          setSelectedYearInterval(getYearsInterval(year))
        return setSelectedMonth(
          createMonth({ date: new Date(year, 0), locale })
        )
      }

      return setSelectedMonth(
        createMonth({ date: new Date(selectedYear, monthIndex), locale })
      )
    }
    //===================================//
  }
  const setSelectedMonthByIdx = (monthIdx: number) => {
    setSelectedMonth(
      createMonth({ date: new Date(selectedYear, monthIdx), locale })
    )
  }

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
      setSelectedDate,
      onClickArrow,
      setSelectedMonthByIdx,
      setSelectedYear,
    },
  }
}
