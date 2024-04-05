import React from 'react'
import PropTypes from 'prop-types'
import {useTheme} from '../../context/context'
import './../../styles/pencarian.css'

function Pencarian({text, onchange, value, type, placeholder}) {
  const { theme } = useTheme()
  const themeClass = theme ? 'dark-theme' : 'light-theme'

  return (
    <div id='pencarian' className={themeClass} >
      <h3>{text}</h3>
      <input 
        id='inputanPencarian'
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onchange}/>
    </div>
  )
}

export default Pencarian

Pencarian.propTypes = {
  text: PropTypes.string.isRequired,
  onchange: PropTypes.func.isRequired,
  value: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string
}