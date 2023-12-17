import React, {Component} from 'react';

export default class NewsItem extends Component{

   

    render(){
        let {title, description, imageUrl, newsUrl, author, date} = this.props;
        return(
            
            <div className="card" style={{width: "18rem"}}>
            <img src={imageUrl} className="card-img-top" alt="..." />
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{description}</p>
                <p className="card-text"><small className="text-muted">By {author} Last updated on {new Date(date).toGMTString()} mins ago</small></p>
                <a href={newsUrl} className="btn btn-primary" target="_blank" rel="noreferrer" >Go somewhere</a>
            </div>
            </div>
           
        )
    }
}