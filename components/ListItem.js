import fetch from 'node-fetch'
import styles from '../styles/ListItem.module.css'

export default function ListItem({ flick, flicks, updateFlicks }) {
  const handleDelete = () => {
    fetch('/api/delete', {
    	method: 'post',
    	body: JSON.stringify({ id: flick.id }),
    	headers: {'Content-Type': 'application/json'}
    })
    updateFlicks(flicks.filter((currentFlick) => currentFlick.id !== flick.id))
  }

  if (!flicks) {
    return <li>Loading...</li>
  }

  return (
    <li className={styles.card}>
      {flick.poster && <img src={flick.poster} />}
      <div className={styles.details}>
        <h3>{flick.title}</h3>
        <ul className={styles.metadata}>
          <li>{flick.type}</li>
          <li>{flick.year}</li>
          <li>{flick.runtime}</li>
          <li>{flick.genre}</li>
          <li>{flick.imdbRating}</li>
        </ul>
        <p>{flick.plot}</p>
      </div>
      <button type="button" className={styles.delete} onClick={handleDelete}>×</button>
    </li>
  )
}
