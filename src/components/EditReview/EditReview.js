import s from './style.module.css'
import React, { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import { ContrastContext } from '../../contexts/ContrastContext'
import globalStyles from '../../styles/global.module.css'
import { ContrastIcon } from '../ContrastIcon/ContrastIcon'
import { Stars } from '../Stars/Stars'

export const EditReview = () => {
    let { encodedEmail } = useParams()
    const [ email, setEmail ] = useState(decodeURIComponent(encodedEmail))

    const [userDataLoaded, setUserDataLoaded] = useState(false);

    const navigate = useNavigate()

    const [userData, setUserData] = useState(null)
    const { contrast, toggleContrast } = useContext(ContrastContext)

    const fetchUserData = async () => {
        try {
            const response = await axios.get(`http://37.187.241.31:3000/foodtruck_server/one/${email}`)
            setUserData(response.data)
        }catch(error){console.error('Erreur lors de la récupération des données utilisateur :', error)}
        setUserDataLoaded(true)
    }

    useEffect(() => {
        fetchUserData()
    }, /* eslint-disable react-hooks/exhaustive-deps */ [email])


    const [note, setNote] = useState(10)

    const [nameLongEnough, setNameLongEnough] = useState(null)

    const [inputsFormOk, setInputFormOk] = useState(true)


    const handleForm = (e) =>{
        if(note === 1){
            const userConfirmed = 
            window.confirm("Vous êtes sur le point de donner 1/10 étoiles à Frédo Foodtruck,\n" +
                "Êtes-vous certain(e) qui nous ne méritons pas un peu plus 🙂 ?\n" +
                "Appuyez sur 'Cancel' pour revenir à la notation.\nMerci")
            if (!userConfirmed){e.preventDefault(); return}
        }
        console.log(e.target[0].value);
        const updateReview = {
            pseudo: e.target[0].value,
            email: email,
            note: note,
            comment: e.target[2].value,
        }

        axios.put(`http://37.187.241.31:3000/foodtruck_server/update/${email}`, updateReview)
        .then(response => {console.log('Server answer :', response.data)})
        .catch(error => {console.error('Error while requesting :', error)})

        navigate("/Avis")
    }

    const changeNote = newNote => { setNote(newNote) }
    const [editedPseudo, setEditedPseudo] = useState('')
    const [editedComment, setEditedComment] = useState('')
    useEffect(() => {
        if(userData){
            setEditedPseudo(userData.pseudo)
            setEditedComment(userData.comment)
        }
    }, [userDataLoaded, userData]);

    const checkUsername = (username) => {
        if(username.length >= 2){ setNameLongEnough(true); setEditedPseudo(username) }
        else{ setNameLongEnough(false) }
    }
      

    const pressEnter = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            fetchUserData()
        }
      }
      

    const setEditedCommentFnct = (e) =>{
        let comment = e.target.value
        const firstLetter = comment.charAt(0).toUpperCase();
        const restOfComment = comment.slice(1);
        comment = firstLetter + restOfComment
        setEditedComment(comment)
    }

    useEffect(() =>{
        if(nameLongEnough){
            setInputFormOk(true)
        }else{setInputFormOk(false)}
    }, [nameLongEnough])


    const handleDelete = (e) =>{
        const userConfirmed = 
            window.confirm("Vous êtes sur le point de supprimer votre commentaire\n" +
                "Appuyez sur 'Cancel' pour revenir à l'édition du commentaire, ou 'OK' pour confirmer la suppression définitive.\nMerci")
        if (!userConfirmed){e.preventDefault(); return}
        else{
            axios.delete(`http://37.187.241.31:3000/foodtruck_server/delete/${email}`)
            .then(res => {console.log('Server answer : ' + res)})
            .catch(error => {console.error('Error while requesting :', error)})

            navigate("/Avis")
        }
    }


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
            <h1 className={globalStyles.title}>Modifier ou supprimer votre commentaire</h1>
            
            {userDataLoaded ? (
                <div>
                    <span onClick={toggleContrast}><ContrastIcon /></span>
                    <br />
                    <div className={`${globalStyles.paragrapheBox} ${selectedClass} ${s.formDiv}`}>
                        {!userData ? (
                            <div>
                                <p>il n'y a pas d'utilisateur enregistré avec cet email <small>({email})</small>.<br /></p>
                                <input type='text' className={s.email} onBlur={(e) => setEmail(e.target.value)} onKeyPress={(e) => [setEmail(e.target.value), pressEnter(e)]} />
                                <button type='submit' className={s.retry} onClick={fetchUserData}>Réessayer</button>
                            </div>
                        ) : (
                            <form onSubmit={handleForm} className={`${globalStyles.form} ${!userData && s.hide}`}>
                                <label htmlFor="pseudo">Pseudo</label><br />
                                <input
                                    type="text"
                                    name='pseudo'
                                    minLength="2"
                                    maxLength="50"
                                    className={`${globalStyles.username} ${nameLongEnough ? globalStyles.inputOkay : nameLongEnough === null ? '' : globalStyles.inputNotOkay}`}
                                    style={{ width: '225px' }}
                                    value={editedPseudo}
                                    onChange={(e) => [checkUsername(e.target.value), setEditedPseudo(e.target.value) ]}
                                    title='Entre 2 et 50 caractères'
                                    required
                                />
                                {!nameLongEnough && nameLongEnough !== null && <p className={globalStyles.errorP}>Entre 2 et 50 caractères requis</p>}
                                <br />
                                <input type='hidden' value={email} />
                
                                <label>Note</label><br />
                                <Stars note={note} onNoteChange={changeNote} required />
                                <br />
                
                                <label htmlFor="comment">Commentaire</label> <br />
                                <textarea
                                    row='2'
                                    maxLength={510}
                                    name='comment'
                                    style={{ width: '225px' }}
                                    placeholder='Optionnel'
                                    title='Entre 0 et 510 caractères'
                                    value={editedComment}
                                    onChange={setEditedCommentFnct}
                                />
                                <br />
                
                                <button type='submit' className={`${globalStyles.btn} ${inputsFormOk && globalStyles.btnOk} ${s.editBtn}`}>MODIFIER</button>
                                <button type='submit' className={s.deleteBtn} onClick={handleDelete}>Supprimer</button>
                            </form>
                        )}
                    </div>
                </div>
            ) : <p>Chargement en cours...</p>}
        </div>
    )       
}
