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
    const allUsersDataRef = collection(dataBase, "Users");

    useEffect(() => {
        onSnapshot(allUsersDataRef, (snapshot) => {
            const tempAllUserData = [];
            snapshot.docs.forEach((doc) => {
                tempAllUserData.push({ ...doc.data(), id: doc.id });
            });
            setAllUsersData(tempAllUserData);
        });
    }, []);

    const getUser = (Username) => {
        return allUsersData.find(element => element.Username.toLowerCase() == Username.toLowerCase());
    };

    const updateUser = async (id, fields) => {
        const userDocRef = doc(dataBase, "Users", id);
        await updateDoc(userDocRef, fields);
    };

    const addUser = async (user) => {
        await addDoc(allUsersDataRef, user);
    };

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
