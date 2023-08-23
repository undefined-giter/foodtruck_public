import s from './style.module.css'
import globalStyles from '../../styles/global.module.css'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { FiveStarsRating } from '../FiveStarsRating/FiveStarsRating'
import { useContext } from "react"
import { ContrastContext } from '../../contexts/ContrastContext'
import { ContrastIcon } from "../ContrastIcon/ContrastIcon"
import { format } from 'date-fns';


export const Reviews = () => {
  const navigate = useNavigate()

  const [reviews, setReviews] = useState([])

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get('http://37.187.241.31:3000/foodtruck_server/all')
        const reviewsData = response.data.map(review => ({ ...review }))
        setReviews(reviewsData)
      }catch(error){console.error('Erreur lors de la requête :', error)}
    }
    fetchReviews()
  }, [])


  useEffect(() =>{
    if(reviews.length > 0){
      
      const btnContainer = document.querySelector("#btnContainer")
      btnContainer.addEventListener("click", () => {
        if(myReviewBtn){myReviewBtn.remove()}
        bothBtn.style.display = "block"
      })
    }
    const myReviewBtn = document.querySelector('#myReviewBtn')
    const bothBtn = document.querySelector("#bothBtn")
  
  })


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

  const mailInputRef = useRef(null)
  
  const appearMail = () => {
    const mail = document.querySelector('#mail')
    const mailBtn = document.querySelector('#mailBtn')

    if (mail && mailBtn) {
        mail.style.display = 'inline'
        mailBtn.style.display = 'none'
        if (mailInputRef.current) {
          mailInputRef.current.focus();
        }
    }
  }

  const [ emailValid, setEmailValid ] = useState(false)
  const [ email, setEmail ] = useState('')
  const checkEmail = (e) =>{
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if(emailRegex.test(e.target.value)){
      setEmailValid(true)
      setEmail(e.target.value)
    }else{setEmailValid(false)}
  }

  const goFetchReview = () =>{
    //navigate('/Modifier/' + encodeURIComponent(email))
    const encodedEmail = email
    if(emailValid){navigate('/Modifier/' + encodeURIComponent(encodedEmail))}
  }

  const pressEnter = (e) =>{
    if(e.key === 'Enter' && emailValid){goFetchReview()}
  }

  return (
    <div className={s.reviews}>
      <h1 className={globalStyles.title}>Avis</h1>

      <span onClick={toggleContrast}><ContrastIcon /></span>

      {reviews.length > 0 ?
        <div>

          <div id="btnContainer" className={s.btnContainer}>
            <button id='myReviewBtn' className={s.reviewBtn}>VOTRE AVIS</button>
            <div id="bothBtn" className={s.hiddenButtons}>
                <button onClick={() => navigate("/Partager")} className={s.shareReview}>PARTAGER LE VÔTRE</button>  
                <button onClick={appearMail} id='mailBtn' className={s.retriveReview}>RETROUVER LE VÔTRE</button>
                <span id='mail' className={s.mail}>
                  <input type='text' ref={mailInputRef} className={s.emailInput} onChange={checkEmail} onKeyPress={pressEnter} placeholder='Entrez votre email puis validez' title="Format d'email attendu : exemple@ex.ex " />
                  <button onClick={goFetchReview} className={`${s.email} ${emailValid ? s.validEmail : s.invalidEmail}`} disabled={!emailValid}>➡️</button>
                </span>
            </div>
          </div>

          <ul className={s.reviewGrid}>
            {reviews.map((review, index) => (
              <li key={index} className={`${s.reviewCell} ${selectedClass}`}>
                <div className={s.reviewHead}>
                  <div><strong>{review.pseudo}</strong></div>
                  <div><FiveStarsRating rating={review.note} /></div>
                </div>
                <div className={s.reviewComment}>{review.comment}</div>
                <div className={s.updatedAt}>{format(new Date(review.updatedAt), 'MM/yyyy')}</div>
              </li>
            ))}
          </ul>
        </div>

        :

        <div>
          <p className={`${s.pVideo} ${selectedClass}`}>Je vous présente cette petite vidéo explicative pour vous montrer ce que vous ne pourrez pas voir en tant qu'utilisateur<br />
              Malgré mes tentatives mon VPS ne prend pas en charge le protocole SSL donc la présentation se fait à partir de localhost.<br />
              Merci de votre compréhension.
          </p><br />
          <video controls className={s.video} >
              <source src={'/crud.mp4'} type="video/mp4" />
              Your browser does not support the video tag.
          </video>
        </div>
      }

    </div>
  )
}