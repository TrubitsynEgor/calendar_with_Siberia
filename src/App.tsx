import classes from './App.module.scss'
import cn from 'classnames'
import { Calendar } from './components/Calendar'
import { formateDate } from './utils'
import { useState } from 'react'
import { LocaleSwitch } from './components/ui/LocaleSwitсh'

export const App = () => {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [locale, setLocale] = useState('ru-RU')

  return (
    <div className={cn(classes.app)}>
      <h1>Calendar</h1>
      <LocaleSwitch locale={locale} />
      <div className={classes.currentDate}>
        {formateDate(selectedDate, 'DD MM YYYY')}
      </div>
      <Calendar
        locale={locale}
        selectDate={setSelectedDate}
        selectedDate={selectedDate}
      />
    </div>
  )
}
