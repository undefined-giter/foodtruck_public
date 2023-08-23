import React, { useContext } from 'react'
import { PhoneNumberContext } from '../../contexts/PhoneNumberContext';
import s from './s.module.css'

export const Footer = ({ style }) => {

  const { phoneNumber, address } = useContext(PhoneNumberContext);

  return (
    <footer className={s.footer} style={style}>
      <div className={s.left}>
        <p style={{ whiteSpace: 'pre-line' }}>{address}</p>
      </div>
      <div className={s.right}>
        <p><em style={{fontWeight:'300', fontSize:'0.8em'}}>Tél : </em><span style={{fontWeight:'650'}}>{phoneNumber}</span>
        <br />Contactez Frédérique !</p>
      </div>
    </footer>
  )
}
