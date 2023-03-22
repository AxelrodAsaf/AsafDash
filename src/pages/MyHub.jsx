import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';

function MyHub(props) {
    const themeLight = props.themeLight;
    const setThemeLight = props.setThemeLight;
    const userToken = localStorage.getItem('Dashboard-user-token');
    const userLoggedIn = localStorage.getItem('userLoggedIn');
    const [activeTab, setActiveTab] = useState(0);
    const [input, setInput] = useState('');
    var userObject = null;

    const editableTopics = [
        "news",
        "weather",
        // "externallinks"
    ]

    useEffect(() => {
        async function getUserInfo() {
            try {
                const response = await axios.get('https://asafdashserver.onrender.com/getInfo/news', {
                    headers: { Authorization: userToken ? userToken : undefined }
                });
                // eslint-disable-next-line react-hooks/exhaustive-deps
                userObject = response.data.user;
                console.log(`The data received from the server: ${userObject}`);
                setLists([
                    userObject.news,
                    userObject.weather,
                    // userObject.externallinks
                ]);
            } catch (error) {
                console.error(error);
            }
        }
        getUserInfo();
    }, [userToken]);



    // Define the lists presented to the user
    const [lists, setLists] = useState([
        ['Item 1 for news', 'Item 2 for news', 'Item 3 for news'],
        ['Item 1 for weather', 'Item 2 for weather', 'Item 3 for weather'],
        // ['Item 1 for externallinks', 'Item 2 for externallinks', 'Item 3 for externallinks'],
    ]);

    // When a different tab is selected, update the active tab
    const handleTabClick = (index) => {
        setActiveTab(index);
    };

    // Add a new item to the list of the active tab
    const handleAddItem = () => {
        const newLists = [...lists];
        newLists[activeTab] = [...newLists[activeTab], input];
        setLists(newLists);
    };

    // Remove a specific item from the list of the active tab
    const handleRemoveItem = (index) => {
        const newLists = [...lists];
        newLists[activeTab].splice(index, 1);
        setLists(newLists);
    };

    // Update the lists of the tabs to the database through the server
    const handleUpdateDatabase = async () => {
        const newsList = lists[0];
        const weatherList = lists[1];
        // const externallinksList = lists[2];
        try {
            await axios.put('https://asafdashserver.onrender.com/updateInfo', {
                data: {
                    news: newsList,
                    weather: weatherList,
                    // externallinks: externallinksList
                }
            }, {
                headers: {
                    Authorization: userToken ? userToken : undefined,
                    user: userLoggedIn ? userLoggedIn : "",
                    topic: editableTopics[activeTab]
                }
            });
            console.log(`The data sent to the server: ${lists}`);
        } catch (error) {
            console.error(error);
        }
        setInput('');
    };


    return (
        <div>
            <Navbar themeLight={themeLight} setThemeLight={setThemeLight} />
            <div className="myhub-main">
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}>
                    <h1>myHub</h1>
                    <p style={{ textAlign: "center" }}>
                        <strong style={{ textDecoration: "underline" }}>CLICK ON THE LIST YOU WANT TO UPDATE<br /></ strong>
                        PRESS - TO REMOVE AN ITEM<br />
                        TYPE AND PRESS + TO ADD AN ITEM<br />
                        PRESS "UPDATE" TO SAVE A LIST</p>
                </div>
                <h4 className="tabs">
                    <div style={{
                        width: "100%",
                    }}>
                        {lists.map((list, index) => (
                            <h3 style={{
                                cursor: "pointer",
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "center",
                                alignItems: "center",
                                textDecoration: activeTab === index ? "underline" : "none",
                            }}
                                key={index} className={activeTab === index ? 'active' : ''} onClick={() => handleTabClick(index)}>
                                {editableTopics[index].toUpperCase()}
                                <br />
                            </h3>
                        ))}
                    </div>
                    <hr style={{ color: "black", width: "100%" }} />
                </h4>
                <div className="items">
                    {lists[activeTab].map((item, index) => (
                        <div key={index} className="item"
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                            }}
                        >
                            <span>{item}</span>
                            <button onClick={() => handleRemoveItem(index)}>X</button>
                        </div>
                    ))}
                    <input value={input} placeholder='Add...' onChange={(e) => setInput(e.target.value)} />
                    <button onClick={() => handleAddItem()}>+</button>
                </div>
                <br />
                <button onClick={() => handleUpdateDatabase()} style={{ textDecoration: "bold" }}>UPDATE</button>
            </div>
        </div>
    );
}

export default MyHub;