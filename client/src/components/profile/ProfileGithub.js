import React, { Component } from 'react';
//import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

 class ProfileGithub extends Component {
    constructor(props){
      super(props);
      this.state ={
        clientId : "6cfc6b95e1c7b542e538",
        clientSecret : "d5b4fae96ae88994094917d4707f22f7469607c0",
        count: 5,
        repos: [],
        sort: "created : asc"
      }
    }
    
    componentDidMount(){
        const {username} = this.props;
        const {count,sort, clientId,clientSecret} = this.state;
        fetch(`https:api.github.com/users/${username}/repos?per_page=${count}&sort=${sort}&client_id=${clientId}&client_secret=${clientSecret}`)
           .then(res=>res.json())
           .then(data=>{
              this.setState({repos:data});
           }).catch(err=>console.log(err));
    }
    render() {
        const {repos} = this.state;
        const repoItems = repos.map(repo=>(
        
            <div className="card card-body mb-2" key={repo.id}>
                <div className="row">
                    <div className="col-md-6">
                        <h4>
                            <a href={repo.html_url} className="text-info">
                                {repo.name}
                            </a>
                        </h4>
                        <p>{repo.description}</p>
                    </div>
                    <div className="col-md-6">
                        <span className="badge badge-info mr-1">
                            Stars: {repo.stargazers_count}
                        </span>
                        <span className="badge badge-secondary mr-1">
                            Watchers: {repo.watcher_count}
                        </span>
                        <span className="badge badge-success ">
                            Forks: {repo.forks_count}
                        </span>
                    </div>
                </div>
            </div>
        ))
        return (
            <div>
                <hr />
                <h3 className="mb-4">Latest GitHub Repos</h3>
                {repoItems}
            </div>
        );
    }
}

ProfileGithub.propTypes = {
    username : PropTypes.string.isRequired
};

export default ProfileGithub;
