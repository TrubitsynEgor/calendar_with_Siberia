import classes from './App.module.scss'
import cn from 'classnames'
import { createYear } from './utils/helpers/date/createYear'
import { createMonth } from './utils/helpers/date/createMonth'

console.log('createDate', createYear({ locale: 'ru-RU' }).createYearMonths())

export const App = () => {
  return (
    <div className={cn(classes.app)}>
      <h1>Calendar</h1>
    </div>
  )
}
