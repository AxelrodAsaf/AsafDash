import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    onSnapshot,
    updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { dataBase } from "../firebase/firebase";

function HandleUserData(props) {
    const [allUsersData, setAllUsersData] = useState([]);
    // Firebase: database definition
    const allUsersDataRef = collection(dataBase, "Users");

    useEffect(() => {
        onSnapshot(allUsersDataRef, (snapshot) => {
            const tempAllUserData = [];
            snapshot.docs.forEach((doc) => {
                tempAllUserData.push({ ...doc.data(), id: doc.id });
            });
            setAllUsersData(tempAllUserData);
        });
    });

    // Firebase: lowercase the email input, attempt to find the email in the database
    const getUser = (email) => {
        return allUsersData.find(element => element.email.toLowerCase() === email.toLowerCase());
    };

    // Firebase: find the user in the database, update the user's fields
    const updateUser = async (id, fields) => {
        const userDocRef = doc(dataBase, "Users", id);
        await updateDoc(userDocRef, fields);
    };

    // Firebase: add a user (variable 'user') to the database 'allUsersDataRef' using function 'addDoc'
    const addUser = async (user) => {
        await addDoc(allUsersDataRef, user);
    };

    // Firebase: find a user in the database using it's 'id' and delete the user from the database
    const deleteUser = async (id) => {
        const userDocRef = doc(dataBase, "Users", id);
        await deleteDoc(userDocRef);
    };

    return {
        allUsersData,
        updateUser,
        addUser,
        deleteUser,
        getUser,
    };
}

export default HandleUserData;
