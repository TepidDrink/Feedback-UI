import React, { useContext, useEffect, useState } from 'react';
import FeedbackContext from "../context/FeedbackContext";
import RatingSelect from "./RatingSelect";
import Button from "./shared/Button";
import Card from "./shared/Card";

function FeedbackForm() {
  const [text, setText] = useState('')
  const [rating, setRating] = useState(10);
  const [submitDisabled, setSubmitDisabled] = useState(true)
  const [clearDisabled, setClearDisabled] = useState(true)
  const [message, setMessage] = useState('')

  const { addFeedback, feedbackEdit, updateFeedback } = useContext(FeedbackContext)

  useEffect(() => {
    if (feedbackEdit && feedbackEdit.edit === true) {
      setSubmitDisabled(false)
      setText(feedbackEdit.item.text)
      setRating(feedbackEdit.item.rating)
    }
  }, [feedbackEdit]);

  const handleTextChange = (e) => {
    if (text === '') {
      setMessage(null)
      setSubmitDisabled(true)
    } else if (text !== '' && text.trim().length < 10) {
      setMessage('Text must be at least 10 characters')
      setSubmitDisabled(true)
    } else {
      setMessage(null)
      setSubmitDisabled(false)
    }

    if (e.target.value === '') {
      setClearDisabled(true)
    } else {
      setClearDisabled(false)
    }

    setText(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (text.trim().length > 10) {
      const newFeedback = { text, rating }
      if (feedbackEdit.edit === true) {
        updateFeedback(feedbackEdit.item.id, newFeedback)
      } else {
        addFeedback(newFeedback)
      }
      setText('')
      setSubmitDisabled(true)
      setClearDisabled(true)
    }
  }

  const clear = () => {
    if (text !== '') {
      setText('')
      setRating(10)
      feedbackEdit.edit = false
      feedbackEdit.item = {}
      setClearDisabled(true)
      setSubmitDisabled(true)
    }
  }

  return <Card>
    <form onSubmit={ handleSubmit }>
      <h2>How would you rate your service with us?</h2>
      <RatingSelect select={ setRating } selected={ rating }/>
      <div className='input-group'>
        <input
          onChange={ handleTextChange }
          className='text'
          placeholder='Write a review'
          value={ text }
        />
        <Button isDisabled={ submitDisabled }>
          Send
        </Button>
        <Button isDisabled={ clearDisabled } onClick={ () => clear() }>
          Clear
        </Button>
      </div>

      { message && <div className='message'>{ message }</div> }
    </form>
  </Card>
}

export default FeedbackForm;