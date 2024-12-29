import classes from './App.module.scss'
import cn from 'classnames'
import { Calendar } from './components/Calendar'
import { formateDate } from './utils'
import { useState } from 'react'
import { LocaleSwitch } from './components/ui/LocaleSwitсh'

export const App = () => {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [locale, setLocale] = useState('ru-RU')

  const handleLocale = () =>
    locale === 'ru-RU' ? setLocale('en-EN') : setLocale('ru-RU')

  console.log(locale)

  return (
    <div className={cn(classes.app)}>
      <h1>{locale === 'ru-RU' ? 'Календарь' : 'Calendar'}</h1>
      <LocaleSwitch locale={locale} handleLocale={handleLocale} />
      <div className={classes.currentDate}>
        {locale === 'ru-RU'
          ? formateDate(selectedDate, 'DD MM YYYY').replace(' ', '/')
          : formateDate(selectedDate, 'MM DD YYYY').replace(' ', '/')}
      </div>
      <Calendar
        locale={locale}
        selectDate={setSelectedDate}
        selectedDate={selectedDate}
      />
    </div>
  )
}
