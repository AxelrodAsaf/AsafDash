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
        "externallinks"
    ]

    useEffect(() => {
        async function getUserInfo() {
            try {
                const response = await axios.get('http://localhost:8000/getInfo/news', {
                    headers: { Authorization: userToken ? userToken : undefined }
                });
                userObject = response.data.user;
                console.log(`The data received from the server: ${userObject}`);
                setLists([
                    userObject.news,
                    userObject.weather,
                    userObject.externallinks
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
        ['Item 1 for externallinks', 'Item 2 for externallinks', 'Item 3 for externallinks'],
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
        const externallinksList = lists[2];
        try {
            await axios.put('http://localhost:8000/updateInfo', {
                data: {
                    news: newsList,
                    weather: weatherList,
                    externallinks: externallinksList
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
    };


    return (
        <div>
            <Navbar themeLight={themeLight} setThemeLight={setThemeLight} />
            <div className="news-page-div">
                <h4 className="tabs">
                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                    }}>
                        {lists.map((list, index) => (
                            <h3 style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "center",
                                alignItems: "center"
                            }}
                                key={index} className={activeTab === index ? 'active' : ''} onClick={() => handleTabClick(index)}>
                                {editableTopics[index].toUpperCase()}
                            </h3>
                        ))}
                    </div>
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
                <input placeholder='Add...' onChange={(e) => setInput(e.target.value)} />
                <button onClick={() => handleAddItem()}>+</button>
                <button onClick={() => handleUpdateDatabase()}>SAVE CHANGES</button>
                </div>
            </div>
        </div>
    );
}

export default MyHub;