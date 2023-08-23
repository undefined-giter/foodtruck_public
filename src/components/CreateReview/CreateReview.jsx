import s from './style.module.css'
import { useState, useContext, useEffect } from 'react'
import { Stars } from "../Stars/Stars"
import axios from 'axios';
import globalStyles from '../../styles/global.module.css'
import { ContrastContext } from '../../contexts/ContrastContext';
import { ContrastIcon } from "../ContrastIcon/ContrastIcon"
import { useNavigate } from 'react-router-dom'


export const CreateReview = () => {
  const [note, setNote] = useState(10)
  const navigate = useNavigate()

  const { contrast, toggleContrast } = useContext(ContrastContext)

  const [nameIstLongEnough, setNameIstLongEnough] = useState(null)
  const [nameLongEnough, setNameLongEnough] = useState(null)

  const [emailIsValid, setEmailIsValid] = useState(null)
  const [emailValid, setEmailValid] = useState(null)

  const [inputsFormOk, setInputFormOk] = useState(false)

    

  const handleForm = (e) =>{
    if (note === 1) {
      const userConfirmed = 
      window.confirm("Vous êtes sur le point de donner 1/10 étoiles à Frédo Foodtruck,\n" +
        "Êtes-vous certain(e) qui nous ne méritons pas un peu plus 🙂 ?\n" +
        "Appuyez sur 'Cancel' pour revenir à la notation.\nMerci")
      if (!userConfirmed){e.preventDefault(); return}
    }
    
    const newReview = {
      pseudo: e.target[0].value,
      email: e.target[1].value,
      note: note,
      comment: comment,
    }

    axios.post('http://37.187.241.31:3000/foodtruck_server/add', newReview)
    .then(response => {console.log('Server answer :', response.data)})
    .catch(error => {console.error('Error while requesting :', error)})

  
    navigate("/Avis")
  }

  const changeNote = newNote => {
    setNote(newNote)
  }

  const [ comment, setComment ] = useState('')
  const setCommentFnct = (e) =>{
    let comment = e.target.value
    const firstLetter = comment.charAt(0).toUpperCase();
    const restOfComment = comment.slice(1);
    comment = firstLetter + restOfComment
    setComment(comment)
}

  const checkUsernameOut = (username) =>{
    if(username.length > 1){setNameLongEnough(true)}
    else{setNameLongEnough(false)}
  }
  const checkUsername = (username) =>{
    if(username.length > 1){setNameIstLongEnough(true); setNameLongEnough(true)}
    else{setNameIstLongEnough(false)}
  }

  const checkEmail = (email) =>{
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if(emailRegex.test(email)){setEmailIsValid(true); setEmailValid(true)}
    else{setEmailIsValid(false)}
  }
  const checkEmailOut = (email) =>{
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if(emailRegex.test(email)){setEmailValid(true)}
    else{setEmailValid(false)}
  }

  useEffect(() =>{
    if(nameIstLongEnough && nameLongEnough && emailIsValid && emailValid){
        setInputFormOk(true)
    }else{setInputFormOk(false)}
  }, [nameIstLongEnough, nameLongEnough, emailIsValid, emailValid])


  let selectedClass
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
    <div className={s.reviews}>
      <h1 className={globalStyles.title}>Partager votre expèrience</h1>
      <span onClick={toggleContrast}><ContrastIcon /></span>
      <br />
      <div className={`${globalStyles.paragrapheBox} ${selectedClass} ${s.formDiv}`}>
        <form onSubmit={handleForm} className={globalStyles.form}>
          
          <label htmlFor="pseudo">Pseudo</label> <br />
          <input type="text" name='pseudo' minLength="2" maxLength="50" className={`${globalStyles.username} ${nameIstLongEnough && globalStyles.inputOkay} ${nameLongEnough === false && globalStyles.inputNotOkay}`} style={{ width:'225px'}}
           onChange={(e) => checkUsername(e.target.value)} onBlur={(e) => checkUsernameOut(e.target.value)} title='Entre 2 et 50 caractères' required />
          {!nameLongEnough && nameLongEnough !== null && <p className={globalStyles.errorP}>Entre 2 et 50 caractères requis</p>}
          <br />
          
          <label htmlFor="email">Email</label> <br />
          <input type="text" name='email' className={`${emailIsValid && globalStyles.inputOkay} ${emailValid === false && globalStyles.inputNotOkay}`} onChange={(e) => checkEmail(e.target.value)} onBlur={(e) => checkEmailOut(e.target.value)} style={{ width:'225px'}} required />
          {!emailValid && emailValid !== null && <p className={globalStyles.errorP}>Format attendu : 'exemple@gmail.com'</p>}
          <br />
          
          <label>Note</label> <br />
          <Stars note={note} onNoteChange={changeNote} required />
          <br />
          
          <label htmlFor="comment">Commentaire</label> <br />
          <textarea row='2' maxLength={510} name='comment' style={{ width: '225px' }} placeholder='Optionnel' title='Entre 0 et 510 caractères' onBlur={setCommentFnct} />
          <br />
          
          <button type='submit' className={inputsFormOk ? `${globalStyles.btn} ${globalStyles.btnOk}` : `${globalStyles.btn} ${globalStyles.deactivatedBtn}`}>PARTAGER</button>
        </form>
      </div>
    </div>
  )
}