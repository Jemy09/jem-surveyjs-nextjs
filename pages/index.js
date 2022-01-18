import styles from '../styles/Home.module.css'
import Survey from '../components/Survey'

export default function Home() {
  return (
    <div>
			<Survey />
      <div id="surveyResult" className="surveyResults"></div>
    </div>
  )
}
