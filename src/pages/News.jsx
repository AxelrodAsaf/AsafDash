import React from 'react';
import Navbar from '../components/Navbar';
import NewsSection from '../components/NewsSection';

function News(props) {



    return (
        <div className='news-main'>
            <Navbar />

            <div className="news-page-div">
                <h1>News</h1>
                <div className="news-widgets">
                    <div className="news-left">
                        <NewsSection searchInput={"Seattle"}/>
                        <NewsSection searchInput={"Israel"}/>
                        <NewsSection searchInput={"World News"}/>
                    </div>
                    <div className="news-right">
                        <NewsSection searchInput={"Seahawks"}/>
                        <NewsSection searchInput={"Finance"}/>
                        <NewsSection searchInput={"Stock Market"}/>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default News;