import axios from 'axios';
import React, { useEffect, useState } from 'react';
import NewsItem from './NewsItem';
import '../styles/App.css';

function NewsSection(props) {


    const [articles, setArticles] = useState([]);
    const keyOne = "6b4371ea45744fdf87de113942f6b4f3"; // AxelrodAsaf@gmail.com
    const keyTwo = "034d8076f89846f0825e0597f0b86436"; // AsafAxelrod@hotmail.com
    const keyThree = "0632572e209741d1ab2c411be921a1fc"; // Aajunk3113@hotmail.com
    const keyFour = "2023604cc05c4d5089f789c3e203cf04"; // AsafAxelrod@gmail.com
    const [keyId, setKeyId] = useState(keyOne); // Set the default key here
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

        return [year, month, day].join("-");
    }
    const displayDate = formatDate(objDate);

    useEffect(() => {
        const keySwap = () => {
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
        };

        const getArticles = async () => {
            try {
                // document.getElementById("errorMessage").style.display = "none";
                const searchUrl =
                    "https://newsapi.org/v2/everything?q=" +
                    `${userSearch}` +
                    "&language=en&from=" +
                    `${displayDate}` +
                    "&sortBy=popularity&apiKey=" +
                    `${keyId}`;
                console.log(`Sent request for ${userSearch} with key ${keyId}`);
                console.log(`Sent request for ${userSearch} with url: ${searchUrl}`);
                const res = await axios.get(searchUrl)
                const { data } = res;
                console.log(data);
                setArticles(data.articles);

            } catch (error) {
                if (userSearch === "") {
                } else {
                    keySwap();
                    console.error(error);
                    // document.getElementById("errorMessage").style.display = "block";
                }
            }

        };
        getArticles();
    }, [displayDate, keyId, userSearch]);





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