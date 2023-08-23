import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon } from '@fortawesome/free-solid-svg-icons';
import s from './style.module.css'


export const ContrastIcon = () => {

    const contrastIcon = {
        color: 'var(--blue)',
        position: 'absolute',
        top: '6%',
        right: '4%',
        fontSize: '30px',
        
    }

    return(<FontAwesomeIcon icon={faMoon} style={contrastIcon} className={s.contrastIcon} />)
}
