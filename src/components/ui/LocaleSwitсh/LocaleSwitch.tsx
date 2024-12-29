import classes from './LocaleSwitch.module.scss'

interface LocaleSwitchProps {
  locale: string
}

export const LocaleSwitch = ({ locale }: LocaleSwitchProps) => {
  return (
    <div className={classes.localeSwitch}>
      <h4>Region switch</h4>
      {locale === 'ru-RU' ? <button>RU</button> : <button>EN</button>}
    </div>
  )
}
