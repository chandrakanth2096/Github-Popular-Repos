import './index.css'

const RepositoryItem = props => {
  const {eachRepository} = props
  const {name, issuesCount, forksCount, starsCount, avatarUrl} = eachRepository

  return (
    <li className="repository-item">
      <img className="avatar" src={avatarUrl} alt={name} />
      <h1 className="name">{name}</h1>
      <ul className="counts-section">
        <li className="all-counts">
          <img
            className="icon-img"
            src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
            alt="stars"
          />
          <p>{starsCount} stars</p>
        </li>
        <li className="all-counts">
          <img
            className="icon-img"
            src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
            alt="forks"
          />
          <p>{forksCount} forks</p>
        </li>
        <li className="all-counts">
          <img
            className="icon-img"
            src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
            alt="open issues"
          />
          <p>{issuesCount} open issues</p>
        </li>
      </ul>
    </li>
  )
}

export default RepositoryItem
