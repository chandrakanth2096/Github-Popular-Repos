import './index.css'

const LanguageFilterItem = props => {
  const {eachLanguage, onClickLanguage, isActive} = props
  const {id, language} = eachLanguage
  const isClicked = isActive ? 'clicked' : null

  const onClickLanguageBtn = () => {
    onClickLanguage(id)
  }

  return (
    <button
      type="button"
      className={`lang-btn ${isClicked}`}
      onClick={onClickLanguageBtn}
    >
      {language}
    </button>
  )
}

export default LanguageFilterItem
