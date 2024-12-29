import classes from './Calendar.module.scss'
import cn from 'classnames'
import { useCalendar } from './useCalendar'
import { SquareChevronLeft, SquareChevronRight } from 'lucide-react'
import { checkDateIsEqual, checkIsToday } from '../../utils'
interface CalendarProps {
  locale: string
  selectedDate: Date
  selectDate: (date: Date) => void
  firstDayNumber?: number
}

export const Calendar = ({
  selectedDate,
  selectDate,
  locale,
  firstDayNumber,
}: CalendarProps) => {
  const { state, methods } = useCalendar({
    firstDayNumber,
    selectedDate,
    locale,
  })

  return (
    <div className={classes.calendar}>
      <div className={classes.header}>
        <button
          onClick={() => methods.onClickArrow('left')}
          className={cn(classes.arrowLeft, classes.navBtn)}
        >
          <SquareChevronLeft />
        </button>
        <div className={classes.headerContent}>
          {state.mode === 'days' && (
            <button
              className={classes.changeModeBtn}
              onClick={() => methods.setMode('month')}
            >
              <span>
                {state.monthsNames[state.selectedMonth.monthIdx].month}
              </span>
              <span>{state.selectedYear}</span>
            </button>
          )}

          {state.mode === 'month' && (
            <button
              className={classes.changeModeBtn}
              onClick={() => methods.setMode('year')}
            >
              <span>{state.selectedYear}</span>
            </button>
          )}

          {state.mode === 'year' && (
            <button
              className={classes.changeModeBtn}
              onClick={() => methods.setMode('days')}
            >
              <span>{state.selectedYearInterval[0]}</span>
              <span>
                -
                {
                  state.selectedYearInterval[
                    state.selectedYearInterval.length - 1
                  ]
                }
              </span>
            </button>
          )}
        </div>
        <button
          onClick={() => methods.onClickArrow('right')}
          className={cn(classes.arrowRight, classes.navBtn)}
        >
          <SquareChevronRight />
        </button>
      </div>

      <div className={classes.body}>
        {/* Render mode = days */}
        {state.mode === 'days' && (
          <>
            <ul className={classes.week}>
              {state.weekDaysNames.map((week) => (
                <li key={week.dayShort}>{week.dayShort}</li>
              ))}
            </ul>

            <ul className={classes.days}>
              {state.calendarDays.map((day) => {
                //constants flags
                const isToday = checkIsToday(day.date)

                const isSelectedDay = checkDateIsEqual(
                  day.date,
                  state.selectedDate.date
                )
                const isAdditionalDay =
                  day.monthIdx !== state.selectedMonth.monthIdx
                //===========================//
                return (
                  <li
                    className={cn(classes.day, {
                      [classes.additionalDay]: isAdditionalDay,
                      [classes.selectedDay]: isSelectedDay,
                      [classes.today]: isToday,
                    })}
                    key={`${day.dayNumber}-${day.monthIdx}`}
                    onClick={() => {
                      methods.setSelectedDate(day)
                      selectDate(day.date)
                    }}
                  >
                    {day.dayNumber}
                  </li>
                )
              })}
            </ul>
          </>
        )}

        {/* Render mode = month */}
        {state.mode === 'month' && (
          <ul className={classes.monthsPicker}>
            {state.monthsNames.map((monthName) => {
              //constants flags
              const isCurrentMonth =
                new Date().getMonth() === monthName.monthIdx &&
                new Date().getFullYear() === state.selectedYear

              const isSelectedMonth =
                monthName.monthIdx === state.selectedMonth.monthIdx
              //===========================//
              return (
                <li
                  className={cn(classes.monthsPickerItem, {
                    [classes.currentMonth]: isCurrentMonth,
                    [classes.selectedMonth]: isSelectedMonth,
                  })}
                  key={monthName.monthShort}
                  onClick={() => {
                    methods.setSelectedMonthByIdx(monthName.monthIdx)
                    methods.setMode('days')
                  }}
                >
                  {monthName.monthShort}
                </li>
              )
            })}
          </ul>
        )}

        {/* Render mode = year */}
        {state.mode === 'year' && (
          <ul className={classes.yearPicker}>
            <li className={classes.notActive}>
              {state.selectedYearInterval[0] - 1}
            </li>
            {state.selectedYearInterval.map((y) => {
              //constants flags
              const isCurrentYear = new Date().getFullYear() === y
              const isSelectedYear = y === state.selectedYear
              //===========================//
              return (
                <li
                  key={y}
                  className={cn(classes.yearPickerItem, {
                    [classes.currentYear]: isCurrentYear,
                    [classes.selectedYear]: isSelectedYear,
                  })}
                  onClick={() => {
                    methods.setSelectedYear(y)
                    methods.setMode('month')
                  }}
                >
                  {y}
                </li>
              )
            })}
            <li className={classes.notActive}>
              {state.selectedYearInterval[
                state.selectedYearInterval.length - 1
              ] + 1}
            </li>
          </ul>
        )}
      </div>
    </div>
  )
}
