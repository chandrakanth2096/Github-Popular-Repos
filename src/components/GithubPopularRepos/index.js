import {Component} from 'react'
import Loader from 'react-loader-spinner'

import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

import './index.css'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const apiStatusList = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class GithubPopularRepos extends Component {
  state = {
    activeLanguageId: languageFiltersData[0].id,
    apiStatus: apiStatusList.initial,
    repositoryList: [],
  }

  componentDidMount() {
    this.getRepositories()
  }

  getRepositories = async () => {
    const {activeLanguageId} = this.state
    this.setState({apiStatus: apiStatusList.inProgress})
    const apiUrl = `https://apis.ccbp.in/popular-repos?language=${activeLanguageId}`
    const response = await fetch(apiUrl)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.popular_repos.map(each => ({
        id: each.id,
        name: each.name,
        issuesCount: each.issues_count,
        forksCount: each.forks_count,
        starsCount: each.stars_count,
        avatarUrl: each.avatar_url,
      }))
      this.setState({
        repositoryList: updatedData,
        apiStatus: apiStatusList.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusList.failure,
      })
    }
  }

  renderApiSuccessView = () => {
    const {repositoryList} = this.state
    return (
      <div className="repository-container">
        <ul className="repository-section">
          {repositoryList.map(each => (
            <RepositoryItem key={each.id} eachRepository={each} />
          ))}
        </ul>
      </div>
    )
  }

  renderApiFailureView = () => (
    <div className="failure-view">
      <img
        className="fail-img"
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
      />
    </div>
  )

  renderApiLoadingView = () => (
    <div className="loading" testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderRepositoryItem = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusList.success:
        return this.renderApiSuccessView()
      case apiStatusList.failure:
        return this.renderApiFailureView()
      case apiStatusList.inProgress:
        return this.renderApiLoadingView()
      default:
        return null
    }
  }

  onClickLanguage = activeLanguageId => {
    this.setState({activeLanguageId}, this.getRepositories)
  }

  renderLanguageFilterItem = () => {
    const {activeLanguageId} = this.state
    return (
      <div className="language-section">
        {languageFiltersData.map(each => (
          <LanguageFilterItem
            key={each.id}
            eachLanguage={each}
            onClickLanguage={this.onClickLanguage}
            isActive={activeLanguageId === each.id}
          />
        ))}
      </div>
    )
  }

  render() {
    return (
      <div className="languages-bg">
        <h1 className="popular">Popular</h1>
        {this.renderLanguageFilterItem()}
        {this.renderRepositoryItem()}
      </div>
    )
  }
}

export default GithubPopularRepos
