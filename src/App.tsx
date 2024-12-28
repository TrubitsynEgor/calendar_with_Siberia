import classes from './App.module.scss'
import cn from 'classnames'
import { Calendar } from './components/Calendar'
import { formateDate } from './utils'
import { useState } from 'react'

export const App = () => {
  const [selectedDate, setSelectedDate] = useState(new Date())

  return (
    <div className={cn(classes.app)}>
      <h1>Calendar</h1>
      <div className={classes.currentDate}>
        {formateDate(selectedDate, 'DD MM YYYY')}
      </div>
      <Calendar selectDate={setSelectedDate} selectedDate={selectedDate} />
    </div>
  )
}
