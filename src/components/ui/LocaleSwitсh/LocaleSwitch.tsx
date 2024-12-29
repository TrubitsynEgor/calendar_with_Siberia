import classes from './LocaleSwitch.module.scss'

interface LocaleSwitchProps {
  locale: string
  handleLocale: () => void
}

export const LocaleSwitch = ({ locale, handleLocale }: LocaleSwitchProps) => {
  return (
    <div className={classes.localeSwitch}>
      <h4>{locale === 'ru-RU' ? 'Сменить регион' : 'Region switch'}</h4>
      {locale === 'ru-RU' ? (
        <button onClick={handleLocale}>RU</button>
      ) : (
        <button onClick={handleLocale}>EN</button>
      )}
    </div>
  )
}
