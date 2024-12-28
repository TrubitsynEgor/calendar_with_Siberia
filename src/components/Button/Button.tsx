import classes from './Button.module.scss'

interface ButtonProps {}

export const Button = ({}: ButtonProps) => {
  return <div className={classes.button}>Button Component</div>
}
