import Image from "next/image"
import { ButtonHTMLAttributes } from "react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title?: string
  type: 'submit' | 'button' | 'reset'
  leftIcon?: string | null,
  rightIcon?: string | null,
  isSubmitting?: boolean
  bgColor?: string
  textColor?: string
  handleClick?: () => void
}


const Button: React.FC<ButtonProps> = ({ isSubmitting, leftIcon, rightIcon, title, type, bgColor, textColor, handleClick, ...rest }) => {
  return (
    <button
      type={type || 'button'}
      disabled={isSubmitting}
      className={`flexCenter gap-3 px-4 py-3 
      ${textColor ? textColor : 'text-white'} 
      ${isSubmitting ? 'bg-black/50' : bgColor ? bgColor : 'bg-primary-purple'} rounded-xl text-sm font-medium max-md:w-full`} onClick={handleClick}
      {...rest}
    >
      {leftIcon && (
        <Image
          alt="left"
          src={leftIcon}
          width={14}
          height={14}
        />
      )}
      {title}
      {rightIcon && (
        <Image
          alt="right"
          src={rightIcon}
          width={14}
          height={14}
        />
      )}
    </button>
  )
}

export default Button