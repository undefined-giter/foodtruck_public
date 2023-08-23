import s from './style.module.css'
import globalStyles from '../../styles/global.module.css';
import { useNavigate } from 'react-router-dom'

export const NotFound = () =>{
    const navigate = useNavigate()
    
    return (<div>
                <h1 className={globalStyles.title}>Ce n'est pas la page que vous cherchez</h1>
                <br /><br />
                <p onClick={() => navigate("/Menu")} className={s.returnMenu}>Retourner saliver devant le menu ➡️</p>
            </div>)
}
