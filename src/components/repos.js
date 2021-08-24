import React , {useState , useEffect} from 'react'
import "./repos.css"

function Repos() {

    const [ page , setPage ] = useState(1)
    const [ repos , setRepos ] = useState([])

    useEffect(() => {
        fetch(`https://api.github.com/search/repositories?q=created:>2017-10-22
                &sort=stars&order=desc&page=${page}`).then(
                    res => res.json() ).then(
                        res => setRepos( res.items ? repos.concat(res.items) : repos )
                    )

                    window.onscroll = function (){
                    if(window.innerHeight + document.documentElement.scrollTop
                          === document.documentElement.offsetHeight){
                              setPage(page+1)
                          }
                    }
    },[page])

    return (
        <div>
                {
                  repos.map( ( repo , index) => {

                            const SetDays = () => {
                                const date1 = new Date();
                                const date2 = new Date(repo.updated_at);
                                const timeSpace  = date1.getTime() - date2.getTime()
                                const oneDay = 1000 * 60 * 60 * 24 ; 
                                const postTime = Math.round(timeSpace / oneDay)

                                    if(postTime > 31){
                                    return Math.round(postTime / 31) + " month ago"
                                    }
                                 return postTime
                            }

                        return (
                         <div key={index} className="repo">
                             <div className="imageDiv">
                                  <img width="150px" height="150px" src={repo.owner.avatar_url } alt="avatar" />
                             </div>
                             <div className="details">
                                <h3 className="repoName"> { repo.name } </h3>
                                <p className="repoDescription"> { repo.description } </p>
                                <span className="stars"> Stars: {repo.stargazers_count} </span>
                                <span className="issues"> Issues: {repo.open_issues} </span>
                                <p className="userInfo"> submited {
                                    SetDays()} by {repo.owner.login}</p>
                              </div>
                        </div>
                    )
                } )
                }
            </div>
             
        )
    }

export default Repos
