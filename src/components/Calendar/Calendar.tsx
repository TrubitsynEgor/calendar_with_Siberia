import classes from './Calendar.module.scss'

interface CalendarProps {}

export const Calendar = ({}: CalendarProps) => {
  return <div className={classes.calendar}>Calendar Component</div>
}
