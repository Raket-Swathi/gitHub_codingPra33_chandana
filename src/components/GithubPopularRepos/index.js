import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'
const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]
// Write your code here

const views = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  initial: 'INITIAL',
  loading: 'LOADING',
}

class GithubPopularRepos extends Component {
  state = {
    view: views.initial,
    activeId: 'languageFiltersData[0].id',
    repoData: [],
  }
  componentDidMount() {
    this.getRepoDetails()
  }

  getRepoDetails = async () => {
    const {activeId} = this.state
    this.setState({view: views.loading})
    const url = `https://apis.ccbp.in/popular-repos/?language=${activeId}`
    const response = await fetch(url)
    console.log(response)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.popular_repos.map(eachRepo => ({
        name: eachRepo.name,
        id: eachRepo.id,
        issuesCount: eachRepo.issues_count,
        forksCount: eachRepo.forks_count,
        starsCount: eachRepo.stars_count,
        avatarUrl: eachRepo.avatar_url,
      }))
      this.setState({repoData: updatedData, view: views.success})
    } else {
      this.setState({view: views.failure})
    }
  }
  activeIdChange = new_id => {
    this.setState({activeId: new_id}, this.getRepoDetails)
  }

  renderFilters = () => {
    const {activeId} = this.state
    return (
      <ul>
        {languageFiltersData.map(eachLanguage => (
          <LanguageFilterItem
            key={eachLanguage.id}
            languageDetails={eachLanguage}
            activeIdChange={this.activeIdChange}
          />
        ))}
      </ul>
    )
  }

  successView = () => {
    const {repoData} = this.state
    return (
      <div>
        <ul>
          {repoData.map(eachRepo => (
            <RepositoryItem key={eachRepo.id} repositoryDetails={eachRepo} />
          ))}
        </ul>
      </div>
    )
  }

  failureView = () => {
    return (
      <div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
          alt="failure view"
        />
        <h1>Something Went Wrong</h1>
      </div>
    )
  }

  loadingView = () => {
    return (
      <div testid="loader">
        <Loader type="ThreeDots" color="#0b69ff" width={50} height={50} />
      </div>
    )
  }

  renderView = () => {
    const {view} = this.state
    switch (view) {
      case views.success:
        return this.successView()
      case views.failure:
        return this.failureView()
      case views.loading:
        return this.loadingView()
      default:
        return null
    }
  }
  render() {
    return (
      <div>
        <h1>Popular</h1>
        {this.renderFilters()}
        {this.renderView()}
      </div>
    )
  }
}

export default GithubPopularRepos
// Write your code here
