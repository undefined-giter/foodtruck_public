import globalStyles from '../../styles/global.module.css'
import s from './style.module.css'
import { useContext } from "react"
import { ContrastContext } from '../../contexts/ContrastContext'
import { ContrastIcon } from "../ContrastIcon/ContrastIcon"

export const Presentation = () => {
  const { contrast, toggleContrast } = useContext(ContrastContext)

  let selectedClass;
    switch(contrast){
        case 'darker':
            selectedClass = globalStyles.darker
            break
        case 'darkest':
            selectedClass = globalStyles.darkest
            break
        default:
            selectedClass = globalStyles.base
    }

  return (
    <div className={`${s.presentation}`}>
        <h1 className={globalStyles.title}>Présentation</h1>
        <span onClick={toggleContrast}><ContrastIcon /></span>

        <div className={s.container}>
          <div style={{position:'relative'}}>
            <div className={`${globalStyles.paragrapheBox} ${selectedClass} ${s.paragraphePresentation}`}>
              <p>
                Bonjour et bienvenue !
                  <br /><br />
                  Moi c'est <span className={s.fred}>Frèd</span> <span className={s.fredName}>(Frédérique)</span>,<br />Pleinement passionné par la création de bons petits sandwiches variés !
                  <br /><br />
                  Grâce à Frédo Foodtruck, vous pouvez maintenant profiter de mes talents 🙂
                  <br /><br />
                  Pleins d'idées en tête, le Frédo Foodtruck saura vous surprendre les papilles !
              </p>
            </div>
            <p className={`${globalStyles.paragrapheBox} ${selectedClass} ${s.xoxo}`}>XoXo 💞</p>
          </div>
          <img src="img/melted/fred_montagne.jpg" alt="Frèd montagne" className={`${s.imageUp} ${s.nonSelectable}`} />
          <img src="img/melted/fred_peche.jpg" alt="Frèd peche" className={`${s.imageDown} ${s.nonSelectable}`} />
        </div>
    </div>
  );
}
