import s from './style.module.css'
import { StarFill, Star as StarEmpty, StarHalf } from 'react-bootstrap-icons'

export function FiveStarsRating({rating}){

    const ratingOn5Stars = rating / 2

    const starList = []

    const fullBase = Math.floor(ratingOn5Stars)

    const decimales = parseInt(ratingOn5Stars.toFixed(2).split('.')[1])

    const gainFull = decimales >= 75 ? 1 : 0

    const full = fullBase + gainFull
    
    const half = decimales >= 25 && decimales < 75 ? 1 : 0
    
    const empty = 5 - full - half
    
    for (let i = 0; i < full; i++) {
        starList.push(<StarFill key={`starFill_${i}`} />);
    }
    
    if(half > 0){starList.push(<StarHalf key={'starHalf'} />)}
    
    for (let i = 0; i < empty; i++) {
        starList.push(<StarEmpty key={`starEmpty_${i}`} />);
    }

    return <div className={s.stars}>{starList}</div>
}