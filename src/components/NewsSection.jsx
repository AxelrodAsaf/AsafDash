import axios from 'axios';
import React, { useEffect, useState } from 'react';
import NewsItem from './NewsItem';
import '../styles/App.css';

function NewsSection(props) {
    const [articles, setArticles] = useState([]);
    // userSearch is a global variable that holds the user's search term.
    // This whole component is a search for one of the user's search terms.
    const userSearch = props.searchInput;

    useEffect(() => {
        const fetchArticles = async () => {
            const headers = {
                'Authorization': localStorage.getItem('Dashboard-user-token')
            };
            const body = {
                'searchInput': userSearch
            }
            const response = await axios.post('https://asafdashserver.onrender.com/getNews',
                body,
                {
                    headers
                }
            );
            setArticles(response.data.articles);
        };
        fetchArticles();
    }, [userSearch]);




    return (
        <div className='news-margins' style={{ overflowX: "hidden" }} >
            <h3 className='news-subject'>{userSearch}</h3>
            <div  style={{ overflowX: "hidden" }} {...(userSearch === 'News') ? { className: "home-news-widget" } : { className: 'news-widget' }} >
                {articles?.map((article, index) =>
                    <NewsItem
                        key={index}
                        title={article?.title}
                        description={article?.description}
                        url={article?.url}
                        urlToImage={article?.urlToImage}
                    />
                )}
            </div>
        </div>
    );
}

export default NewsSection;