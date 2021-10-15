import ListItem from './ListItem'
import styles from '../styles/FlicksList.module.css'

export default function FlicksList({ flicks, updateFlicks }) {
  return (
    <ul className={styles.grid}>
      {flicks.map((flick) => <ListItem flick={flick} flicks={flicks} updateFlicks={updateFlicks} key={flick.imdbID} />)}
    </ul>
  )
}
