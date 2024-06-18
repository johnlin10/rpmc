import style from './Button.module.scss'

/**
 *
 * @param {object} options
 * @returns
 * @example
 * {
 *   text: 'Hello',
 *   size: 'small',
 *   action: () => {}
 * }
 */
export default function Button({ options }) {
  return (
    <button
      className={`${style.button} ${style[options.size]}`}
      onClick={() => options.action}
    >
      {options.text}
    </button>
  )
}
