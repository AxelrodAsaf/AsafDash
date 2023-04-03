import axios from 'axios';
import React, { useEffect, useState } from 'react';
import NewsItem from './NewsItem';
import '../styles/App.css';
import '../styles/News.css';
import LoadingSpinner from './LoadingSpinner';


function NewsSection(props) {
    const [articles, setArticles] = useState([]);
    const userSearch = props.searchInput;
    const [isLoading, setIsLoading] = useState(true);

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
            setIsLoading(false);
        };
        fetchArticles();
    }, [userSearch, setIsLoading]);


    return (
        <div className='news-margins' style={{ overflowX: "hidden" }} >
            <h3 style={{ ...(userSearch === 'News') ? { display: "none" } : {} }} className='news-subject'>{userSearch}</h3>
            <div style={{ overflowX: "hidden" }} {...(userSearch === 'News') ? { className: "home-news-widget" } : { className: 'news-widget' }} >
                {isLoading ? <LoadingSpinner /> :
                    <>
                        {articles?.map((article, index) =>
                            <NewsItem
                                key={index}
                                title={article?.title}
                                description={article?.description}
                                url={article?.url}
                                urlToImage={article?.urlToImage}
                            />
                        )}
                    </>
                }
            </div>
        </div>
    );
}

export default NewsSection;