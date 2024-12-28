import classes from './Calendar.module.scss'
import { useCalendar } from './useCalendar'

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
  const { state } = useCalendar({ firstDayNumber, selectedDate, locale })
  console.log(state)

  return <div className={classes.calendar}>Calendar Component</div>
}
