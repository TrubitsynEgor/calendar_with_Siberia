import classes from './Calendar.module.scss'
import cn from 'classnames'
import { useCalendar } from './useCalendar'
import { SquareChevronLeft, SquareChevronRight } from 'lucide-react'
interface CalendarProps {
  locale?: string
  selectedDate: Date
  selectDate: (date: Date) => void
  firstDayNumber?: number
}

export const Calendar = ({
  selectedDate,
  selectDate,
  locale = 'ru-RU',
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
        <button className={cn(classes.arrowLeft, classes.navBtn)}>
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
        <button className={cn(classes.arrowRight, classes.navBtn)}>
          <SquareChevronRight />
        </button>
      </div>
    </div>
  )
}
