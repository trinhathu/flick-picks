import React, { useState } from 'react'
import Autosuggest from 'react-autosuggest'
import fetch from 'node-fetch'
import styles from '../styles/SearchForm.module.css'

const getSuggestions = async (value) => {
  const inputValue = value.trim().toLowerCase()
  const inputLength = inputValue.length

  if (inputLength === 0) return []

  const response = await fetch('/api/search/' + inputValue)
  return response.json()
}

const getSuggestionValue = (suggestion) => suggestion.value

const renderSuggestion = (suggestion) => (
  <div className={styles.suggestionItem}>
    {suggestion.image && <img src={suggestion.image} className={styles.suggestionImage} />}
    {suggestion.label}
  </div>
)

export default function SearchForm({ flicks, updateFlicks }) {
  const [selectedId, setSelection] = useState('')
  const [inputValue, setValue] = useState('')
  const [suggestions, setSuggestions] = useState([])

  const onChange = (event, { newValue }) => {
    setValue(newValue)
  }

  const onSuggestionsFetchRequested = async ({ value, reason }) => {
    if (reason === 'input-changed') {
      setSuggestions(await getSuggestions(value))
    }
  }

  const onSuggestionsClearRequested = () => {
    setSuggestions([])
  }

  const onSuggestionSelected = (event, { suggestion }) => {
    setSelection(suggestion.id)
  }

  const onSubmit = async (event) => {
    event.preventDefault()

    const response = await fetch('/api/add', {
    	method: 'post',
    	body: JSON.stringify({ id: selectedId }),
    	headers: {'Content-Type': 'application/json'}
    })
    const body = await response.json()
    setValue('')
    setSelection('')
    updateFlicks([...flicks, body])
  }

  const inputProps = {
    placeholder: 'Enter a movie or series title',
    value: inputValue,
    onChange,
  }

  return (
    <form action="/api/add" method="post" className={styles.form} onSubmit={onSubmit}>
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        onSuggestionSelected={onSuggestionSelected}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
        theme={styles}
      />
      <input type="hidden" name="id" value={selectedId} />
      <button type="submit" className={styles.submit} disabled={!selectedId}>Add</button>
    </form>
  )
}

