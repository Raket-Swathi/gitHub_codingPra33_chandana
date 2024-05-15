// Write your code here
// Write your code here
const LanguageFilterItem = props => {
  const {languageDetails, activeIdChange} = props
  const {id, language} = languageDetails
  const idChange = () => {
    activeIdChange(id)
  }

  return (
    <li onClick={idChange}>
      <button onClick={idChange} type="button">
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
