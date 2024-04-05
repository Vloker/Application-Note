import React from 'react'
import PropTypes from 'prop-types'
import {useTheme} from '../../context/context'
import './../../styles/inputan.css'

function Inputan({onchange, value, label, type}) {
  const { theme } = useTheme()
  const themeClass = theme ? 'dark-theme' : 'light-theme'

  return (
    <div id='inputans' className={themeClass}>
      <label
        className='label'>
        {label}
      </label>
      <input 
        className='inputan'
        type={type} 
        onChange={onchange} 
        value={value} />
    </div>
  )
}

export default Inputan

Inputan.propTypes = {
  onchange: PropTypes.func.isRequired,
  label: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string
}

