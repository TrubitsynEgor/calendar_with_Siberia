import classes from './App.module.scss'
import cn from 'classnames'
import { createDate } from './utils/helpers/date/createDate'
import { createMonth } from './utils/helpers/date/createMonth'

console.log('createDate', createMonth({ locale: 'ru-RU' }).createMonthDays())

export const App = () => {
  return (
    <div className={cn(classes.app)}>
      <h1>Calendar</h1>
    </div>
  )
}
