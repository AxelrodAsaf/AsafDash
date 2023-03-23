import React from "react";
import '../styles/App.css';
import '../styles/News.css';

const NewsItem = (props) => {
    // Define given props...
    const title = props.title;
    const description = props.description;
    const url = props.url;
    const urlToImage = props.urlToImage;

    // Section defines what the news card looks like structurally
    return (
        <div className={`news-app`} >
            <div className={`news-item `}>
                <a href={url} target="_blank" rel="noreferrer">
                    <img
                        className={`news-image `}
                        alt=""
                        src={urlToImage}/>
                </a>
                <div className={`news-texts`}>
                    <a href={url} target="_blank" rel="noreferrer" style={{ color: "var(--maintext)"}}>
                        <h3
                            className={`news-title `}>
                            {title}
                        </h3>
                    </a>
                    <p className={`news-description `}>
                        {description}
                    </p>
                </div>
            </div>
            <hr className="news-hr"/>
        </div>
    );
};

export default NewsItem;
