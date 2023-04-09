import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import '../styles/App.css';
import '../styles/ToDoList.css';
import LoadingSpinner from '../components/LoadingSpinner.jsx';

function ToDoList(props) {
  const serverURL = props.serverURL;
  const themeLight = props.themeLight;
  const setThemeLight = props.setThemeLight;
  const userToken = localStorage.getItem('Dashboard-user-token');
  const [isLoading, setIsLoading] = useState(true);

  const [listItems, setListItems] = useState([]);


  useEffect(() => {
    if (isLoading) {
      async function getData() {
        const response = await axios.get(`${serverURL}/getInfo/toDoList`, {
          headers: { Authorization: userToken ? userToken : undefined }
        });
        setListItems(response.data.topicData);
        console.log("🚀 List Items: ", listItems);
      }
      getData();
      setIsLoading(false);
    }
  }, [userToken, listItems, isLoading, serverURL]);

  async function updateList(newList) {
    console.log("🚀🚀🚀🚀🚀🚀🚀🚀🚀 Updating List Items: ", listItems);

    newList = newList.filter(i => i !== '');

    // Make an axios call to the server to update the list
    const response = await axios.put(`${serverURL}/updateInfo`, {
      data: { todolist: newList }
    }, {
      headers: {
        Authorization: userToken ?? undefined,
        topic: 'toDoList'
      }
    });
    console.log(response)
  }

  function handleAddItem() {
    if (listItems[listItems.length - 1] === '') {
    }
    else {
      setListItems([...listItems, '']);
    }
  }

  async function handleListItemChange(index, value) {
    console.log("Changing List Item: ", index, value);
    const newListItems = [...listItems];
    newListItems[index] = value;
    await setListItems(newListItems);
    await updateList(newListItems);
  }

  async function handleDeleteItem(index) {
    console.log("Deleting Item: " + index);
    // Delete the item from the list at the given index
    const newListItems = [...listItems];
    newListItems.splice(index, 1);
    setListItems(newListItems);
    console.log("🚀🚀🚀 List Items: ", listItems);

    await updateList(newListItems);
  }

  return (
    <>
      {isLoading ? <LoadingSpinner /> : <div className='toDoListContainter' style={{ minHeight: "100vh" }}>
        <Navbar serverURL={serverURL} themeLight={themeLight} setThemeLight={setThemeLight} />
        <div className='toDoList-main'>
            <h1 className='toDoList-h1 widget'>To Do List</h1>
            <div className='toDoList-list-div'>
              <ul className='toDoList-list widget'>
                {(listItems.length === 0) ? <>No items in list...</> : listItems.map((listItem, index) => (
                  <li className='toDoList-listItem' key={listItem}>
                    <input
                      className='toDoList-listItemInput'
                      type='text'
                      placeholder={listItem}
                      defaultValue={listItem}
                      onBlur={(e) => handleListItemChange(index, e.target.value)}
                      readOnly={false}
                    />
                    <button
                      className='toDoList-listItemButton'
                      type='button'
                      onClick={() => handleDeleteItem(index)}
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
              <button className='toDoList-addItem widget' onClick={() => handleAddItem()}>Add Task</button>
            </div>
          </div>
        </div>
      }
    </>
  );
}

export default ToDoList;
