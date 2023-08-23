import { useNavigate } from "react-router-dom";
import s from './style.module.css';

export const Heartbeat = () => {
  const navigate = useNavigate();

  return (
    <div className={s.appearDiv}>
      <img src='img/melted/heart.png' className={`${s.heartbeat}`} onClick={() => navigate("/Menu")} alt='heartbeat' />
    </div>
  );
}
