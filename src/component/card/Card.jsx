import React from 'react'
import PropTypes from 'prop-types'
import './../../styles/card.css'
import { Link } from 'react-router-dom'
import { useTheme } from '../../context/context'


function Card({title, date, text, deleted, onclick, name, id}) {
    const { theme } = useTheme();
    const themeClass = theme ? 'dark-theme' : 'light-theme';
  return (
    <>
    <div id='card' className={themeClass}>

        <article id='article' className={themeClass}>
            <div>
                <Link to={`/detail/${id}`} className='judul'>{title}</Link>
                <p className='tanggal'>{date}</p>
            </div>
            <p className='deskripsi'>{text}</p>
        </article>

        <div id='button' className={themeClass}>
                <button 
                    className='hapus'
                    onClick={deleted}>
                    Hapus
                </button>
                <button 
                    className='arsipkan'
                    onClick={onclick}>
                    {name}
                </button>
        </div>
    </div>
    </>
  )
}

export default Card

Card.propTypes = {
    title: PropTypes.string,
    date: PropTypes.string,
    text: PropTypes.string,
    deleted: PropTypes.func.isRequired,
    onclick: PropTypes.func.isRequired,
    name: PropTypes.string,
    id: PropTypes.string
}