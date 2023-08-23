import StarRatings from 'react-star-ratings'

export const Stars = ({ note, onNoteChange }) => {

  return (
      <StarRatings
        rating={note}
        starRatedColor="gold"
        starHoverColor="gold"
        starEmptyColor="grey"
        changeRating={onNoteChange}
        numberOfStars={10}
        starDimension="20px"
        starSpacing="1px"
      />
  )
}
