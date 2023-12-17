import React, {Component} from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types'

export default class News extends Component{
    articles = [];

    static defaultProps={
        country:'in',
        pageSize: 10,
        category: 'science',
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }

    constructor(props){
        super(props);
        this.state = { 
            articles: this.articles,
            loading:false,
            page:1,
            pageSize: 10
        }
        document.title = this.props.category;
    }

    async updateNews(){
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=7fb6f1d6e26540d59222363ebaaf0c70&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({
            loading:true
           })
        let data = await fetch(url);
        let parseData = await data.json(); 
        this.setState({
            articles : parseData.articles,
            totalResults : parseData.totalResults,
            loading:false
        })
    }

    async componentDidMount(){
         this.setState({
            page:this.state.page
         })
         this.updateNews();
    }

    handlePrevClick = async () =>{ 
        this.setState({
            page:this.state.page - 1
         })
         this.updateNews();
    }

    handleNextClick = async () =>{   
        this.setState({
            page:this.state.page + 1
         })
         this.updateNews();
    }

    render(){
        return(
        <div className="container my-3">
            <h1>NewsMonkey - Headlines</h1>
            {this.state.loading && <Spinner/>}
            <div className="row"> 
                    {!this.state.loading && this.state.articles.map((element)=>{ 
                        return <div className="col-md-4" key={element.url}>
                    <NewsItem title={element.title} description={element.description} newsUrl={element.url} imageUrl={element.urlToImage}
                    author={element.author} date={element.publishedAt}/> 
                    </div>
                    })}  
            </div> 
        <div className="container d-flex justify-content-between">
        <button type="button" className="btn btn-dark" onClick={this.handlePrevClick} disabled={this.state.page <= 1}>Prev</button>
        <button type="button" className="btn btn-dark" onClick={this.handleNextClick} disabled={this.state.page + 1 >= Math.ceil(this.state.totalResults/this.state.pageSize)}>Next</button>
        </div>
        </div>
        )
    }
}