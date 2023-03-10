import axios from 'axios';
import React, { useEffect, useState } from 'react';
import NewsItem from './NewsItem';
import '../styles/App.css';

function NewsSection(props) {
    const [articles, setArticles] = useState([]);
    const keyOne = process.env.REACT_APP_NEWS_KEY_ONE;
    const keyTwo = process.env.REACT_APP_NEWS_KEY_TWO;
    const keyThree = process.env.REACT_APP_NEWS_KEY_THREE;
    const keyFour = process.env.REACT_APP_NEWS_KEY_FOUR;
    const [keyId, setKeyId] = useState(keyTwo); // Set the default key here
    const [newsAPITries, setNewsAPITries] = useState(0);
    const saveTitle = props.saveTitle;
    const saveUrl = props.saveUrl;
    const userSearch = props.searchInput;
    const objDate = new Date();
    function formatDate(objDate) {
        var d = objDate;
        var month = "" + (d.getMonth() + 1);
        var day = "" + d.getDate();
        var year = d.getFullYear();

        if (month.length < 2) month = "0" + month;
        if (day.length < 2) day = "0" + day;
        day = day - 1;
        return [year, month, day].join("-");
    }
    const displayDate = formatDate(objDate);

    useEffect(() => {
        const keySwap = () => {
            if (newsAPITries < 4) {
                if (keyId === keyOne) {
                    setKeyId(keyTwo);
                } else if (keyId === keyTwo) {
                    setKeyId(keyThree);
                } else if (keyId === keyThree) {
                    setKeyId(keyFour);
                } else if (keyId === keyFour) {
                    setKeyId(keyOne);
                } else {
                    console.log("ERROR CALCULATING KEY");
                }
            }
            else {
                return console.error(`Error with newsAPITries -  key failure or limit reached.`);
            }
        };

        const getArticles = async () => {
            try {
                console.log(`newsAPITries: ${newsAPITries}`);
                // document.getElementById("errorMessage").style.display = "none";
                const searchUrl =
                    "https://newsapi.org/v2/everything?q=" +
                    `${userSearch}` +
                    "&language=en&from=" +
                    `${displayDate}` +
                    "&sortBy=popularity&apiKey=" +
                    `${keyId}`;
                console.log(`Sent request for ${userSearch} \n
                with userSearch: ${userSearch} \n
                with displayDate: ${displayDate} \n
                with key ${keyId} \n
                to url ${searchUrl}`);
                const res = await axios.get(searchUrl)
                const { data } = res;
                // console.log(data);
                setArticles(data.articles);

            } catch (error) {
                console.log(`NewsAPI error: ${error}`);
                if (!userSearch) {
                    console.error(`Error with userSearch: ${userSearch}. Seems empty.`);
                    return;
                } else if (newsAPITries < 3) {
                    setNewsAPITries(newsAPITries + 1);
                    keySwap();
                } else if ( error.response?.status === 426) {
                    console.error(`Error with search attempts. Response says too many requests.`);
                } else {
                    console.error(error);
                    // document.getElementById("errorMessage").style.display = "block";
                }
            }


        };
        getArticles();
    }, [displayDate, keyId, userSearch, keyOne, keyTwo, keyThree, keyFour, newsAPITries]);





    return (
        <div className='news-margins'>
            <h3 className='news-subject'>{userSearch}</h3>
            <div className='news-widget'>
                {articles?.map((article, index) =>
                    <NewsItem
                        key={index}
                        title={article?.title}
                        description={article?.description}
                        url={article?.url}
                        urlToImage={article?.urlToImage}
                        saveUrl={saveUrl}
                        saveTitle={saveTitle}
                    />
                )}
            </div>
        </div>

    );
}

export default NewsSection;