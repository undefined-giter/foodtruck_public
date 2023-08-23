import s from './style.module.css'
import globalStyles from '../../styles/global.module.css';
import { useNavigate } from 'react-router-dom'
import { FoodCarousel } from "../FoodCarousel/FoodCarousel"
import { Heartbeat } from "../Heartbeat/Heartbeat"
import { useState, useEffect} from 'react'

export const Landing = () =>{
    const navigate = useNavigate()
    const [heartbeat, setHeartbeat] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => {
            setHeartbeat(true);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    return (<div className={s.landing}>
                <h1 onClick={() => navigate("/Menu")} className={`${globalStyles.title} ${s.menuLink}`}>Menu</h1>
                {heartbeat && <Heartbeat />}
                <div className={s.carousel}>
                    <FoodCarousel />
                </div>
            </div>)
}
