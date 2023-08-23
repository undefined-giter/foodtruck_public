import s from './style.module.css'
import globalStyles from '../../styles/global.module.css'
import { useCallback, useEffect, useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { Footer } from "../../components/Footer/Footer"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faFileArrowDown } from '@fortawesome/free-solid-svg-icons';

export const Food = ({ renderFooter, hideFooter }) => {
  const [backgroundsVisibiles, setBackgroundsVisibiles] = useState(true)
  const [eyeComponent, setEyeComponent] = useState(false)
  const [bounceFile, setBounceFile] = useState(true)

    useEffect(() => {
      hideFooter();
      return () => {
        renderFooter();
      };
    }, [renderFooter, hideFooter])
  
    const navigate = useNavigate()
    const location = useLocation()
  
    const styleContainer = {
      height: 'calc(100vh - 48px)',
      overflowY: 'auto',
      position: 'relative',
    }

    const styleFooter = {
      backgroundColor: 'var(--theme)',
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      margin: 'auto',
      marginBottom: 0,
      borderRadius: '0 0 1em 1em',
      height: '42px',
    }

    const eye = {
      color: 'var(--blue)',
      position: 'absolute',
      top: 11,
      right: 10,
    }
  
    useEffect(() => {
      if (location.hash) {
        navigate(`${location.hash}`)
        const scrollToSection = () => {
          const element = document.getElementById(location.hash.slice(1))
          if (element) {
            const offset = 48
            const elementPosition = element.getBoundingClientRect().top
            const offsetPosition = elementPosition - offset
  
            window.scrollBy({
              top: offsetPosition,
              behavior: "smooth",
            });
          }
        };
  
        setTimeout(scrollToSection, 50);
      }
    }, [navigate, location.hash]);

    
    const hideBackgrounds = useCallback(() =>{
      setBackgroundsVisibiles(!backgroundsVisibiles)
    }, [backgroundsVisibiles])

    useEffect(() =>{
      setTimeout(()=>{
        setEyeComponent(true)
        setBounceFile(false)
      }, 5000)
    }, [])

    const downloadMenu = useCallback(() =>{
      const menuPdf = 'https://foodtruck.leorip.com/img/menu/menu.pdf'
      const link = document.createElement('a')
      link.href = menuPdf
      link.download = 'menu.pdf'

      //simulation of the click event
      document.body.appendChild(link)
      link.click();

      document.body.removeChild(link);
      }, []);

      const originalConsoleError = console.error;


      // Hide HTML table structure errors (TODO rework tables)
      console.error = (message, ...args) => {
        if(message.includes('Warning: validateDOMNesting')){return;}
        else{originalConsoleError(message, ...args)}
      };

      return (
      <div className={s.food}>
        <table className={s.menuTable} style={styleContainer}>
          <thead>
            <td colSpan='2' className={`${globalStyles.title} ${s.title}`}>
              <h1>Menu</h1>
              {eyeComponent && <FontAwesomeIcon icon={faEye} fade style={eye} className={s.eye} onClick={hideBackgrounds} />}
            </td>
          </thead>
          <tbody>
            <tr>
              <td className={`${s.bothSame} ${s.colWrapsBurri} ${s.menuTable}`}>
                <table>
                  <tbody>
                    <td className={backgroundsVisibiles ? `${s.foodBackground} ${s.wrapBg}` : ''} data-background="wrapBg">
                      <tr id="wraps">
                        <th className={s.category}>WRAPS 🌮</th>
                      </tr>
                      <tr>
                        <tr>
                          <td className={s.name}>Le Légendaire : Poulet</td>
                        </tr>
                        <tr>
                          <td className={s.details}>Wrap de poulet avec légumes frais</td>
                        </tr>
                      </tr>
                      <tr>
                        <tr>
                          <td className={s.name}>L'Irremplacable : Jambon</td>
                        </tr>
                        <tr>
                          <td className={s.details}>Wrap au délicieux jambon</td>
                        </tr>
                      </tr>
                      <tr>
                        <tr>
                          <td className={s.name}>Le Léger : Avocat</td>
                        </tr>
                        <tr>
                          <td className={s.details}>Wrap à l'avocat</td>
                        </tr>
                      </tr>
                      <tr>
                        <tr>
                          <td className={s.name}>Le Curry : Poulet curry</td>
                        </tr>
                        <tr>
                          <td className={s.details}>Wrap de poulet et légumes, goût curry</td>
                        </tr>
                      </tr>
                      <tr>
                        <tr>
                          <td className={s.name}>Le Sains : Végé</td>
                        </tr>
                        <tr>
                          <td className={s.details}>Wrap aux 3 poivrons et légumes frais</td>
                        </tr>
                      </tr>
                    </td>

                    <tr><br /></tr>
                    <td className={backgroundsVisibiles ? s.foodBackground : ''} data-background="burritosBg">
                      <tr id="burritos">
                        <th className={s.category}>BURRITOS 🌯</th>
                      </tr>
                      <tr>
                        <table>
                          <tbody>
                            <tr>
                              <td id='burritos_chiken' className={s.name}>Le Légendaire : Poulet</td>
                            </tr>
                            <tr>
                              <td className={s.details}>Burritos au poulet avec riz et haricots</td>
                            </tr>
                          </tbody>
                        </table>
                      </tr>
                        <tr>
                            <td className={s.name}>L'épicé : Poulet épicé</td>
                        </tr>
                        <tr>
                            <td className={s.details}>Burritos au poulet épicé avec riz et haricots</td>
                        </tr>
                        <tr>
                            <td className={s.name}>L'Irremplacable : Jambon</td>
                        </tr>
                        <tr>
                            <td className={s.details}>Burritos jambon aux légumes frais</td>
                        </tr>
                        <tr>
                            <td className={s.name}>Le Consistant : Avocat</td>
                        </tr>
                        <tr>
                            <td className={s.details}>Harricots rouges, avocat, maïs et guacamole</td>
                        </tr>
                    </td>
                  </tbody>
                </table>
              </td>
              

              <td className={`${s.bothSame} ${s.colBurgersAme}`}>
                <table>
                  <tbody>
                    <tr id="burgers">
                      <th className={s.category}>BURGERS 🍔</th>
                    </tr>
                    <tr>
                      <td className={backgroundsVisibiles ? s.foodBackground : ''}  data-background="burgerBg">
                        <table>
                          <tbody>
                            <tr>
                              <td className={s.name}>Le Fondant : Le Double Cheese</td>
                            </tr>
                            <tr>
                              <td className={s.details}>
                                2 steaks avec leur double dose de cheese
                              </td>
                            </tr>
                            <tr>
                              <td className={s.name}>Le Fermier : Poulet</td>
                            </tr>
                            <tr>
                              <td className={s.details}>Un bon burger au poulet croustillant</td>
                            </tr>
                            <tr>
                              <td className={s.name}>Le Montagnard : Fourme d'Ambert</td>
                            </tr>
                            <tr>
                              <td className={s.details}>Le bon burger généreux en Fourme d'Ambert</td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
  
                    <tr><br /></tr>
                    <tr id="americains">
                      <th className={s.category}>AMÉRICAINS 🌭</th>
                    </tr>
                    <tr>
                      <td className={backgroundsVisibiles ? s.foodBackground : ''}  data-background="americainBg">
                        <table>
                          <tbody>
                            <tr>
                              <td className={s.name}>Le Classique : Steak</td>
                            </tr>
                            <tr>
                              <td className={s.details}>200g de bœuf, salade, tomate et cheddar, avec ses frites</td>
                            </tr>
                            <tr>
                              <td className={s.name}>Le Porto : Saucisse</td>
                            </tr>
                            <tr>
                              <td className={s.details}>Une saucisse de Porto généreuse et son parfait assaisonnement</td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                    
                    <tr><br /></tr>
                    <table>
                        <tr className={s.alignTop}>
                            <td className={s.encas}>
                                <table>
                                    <tr>
                                        <th className={s.category}>ENCAS</th>
                                    </tr>
                                    <tr>
                                        <td>
                                            <tr>
                                                <img src="/img/menu/food/fries.png" width='40px' className={s.nonSelectable} style={{paddingTop:'20px'}} alt="Barquette de frites" />
                                            </tr>
                                            <tr className={s.chocolate}>
                                                <img src="/img/menu/food/snickers.png" width='60px' className={s.nonSelectable} alt="Bar chocolatée Snikers" />
                                                  
                                                <img src="/img/menu/food/twix.png" width='60px' className={s.nonSelectable} alt="Bar chocolatée Twix" />
                                            </tr>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                            <td>
                                <table>
                                    <tr>
                                        <th className={s.category}>Boissons</th>
                                    </tr>
                                    <tr>
                                        <td className={s.drinks}>
                                            <img src="/img/menu/drinks/coca.png" className={`${s.nonSelectable} ${s.size}`} alt="Coca 33cl" />
                                            <img src="/img/menu/drinks/coca_cherry.png" className={`${s.nonSelectable} ${s.size}`} alt="Coca Cherry 33cl" />
                                            <img src="/img/menu/drinks/orangina.png" className={`${s.nonSelectable} ${s.size}`} alt="Orangina 33cl" />
                                            <img src="/img/menu/drinks/liptonic.png" className={`${s.nonSelectable} ${s.sizeLiptonic}`} alt="Liptonic 33cl" />
                                            <img src="/img/menu/drinks/lemonade.png" className={`${s.nonSelectable} ${s.sizeGlass}`} alt="Limonade 33cl" />
                                            <img src="/img/menu/drinks/heineken.png" className={`${s.nonSelectable} ${s.sizeGlass}`} alt="Heinekein" />
                                            <img src="/img/menu/drinks/coca_bottle.png" className={`${s.nonSelectable} ${s.sizeBottle}`} alt="Coca 1.25L" />
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="2">
                <table className={s.sauces}>
                  <tbody>
                    <tr>
                      <th className={s.category}>sauces</th>
                    </tr>
                    <tr>
                      <td className={s.saucesList}>
                      Fromagère, Champignon, Burger, Blanche, Ketchup,
                      Mayonnaise, Barbeque, Algérienne, Harissa
                    </td>
                  </tr>
                </tbody>
              </table>
              <br />
            </td>
          </tr>
        </tfoot>
        <FontAwesomeIcon icon={faFileArrowDown} bounce size="xl" className={bounceFile ? s.dlFile : `${s.dlFile} ${s.stopBounceFile}`} onClick={downloadMenu} />
        <Footer style={styleFooter} />
      </table>
    </div>
  );
};
                       
  