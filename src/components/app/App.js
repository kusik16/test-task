import { useState, useRef } from "react";
import AppBanner from "../appBanner/AppBanner";

import AppHeader from "../appHeader/AppHeader";

import UserList from "../userList/UserList";
import SignUpForm from "../signUpForm/SignUpForm";

const App = () => {
    const [userList, setUserList] = useState([]);
    const [submitForm, setSubmitForm] = useState(false);
    const [page, setPage] = useState(1);

    const signUpRef = useRef(null);
    const usersRef = useRef(null);

    const handleClickRef = (ref) => {
        ref.current?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <>
            <div className='app'>
                <AppHeader
                    handleClickRef={handleClickRef}
                    signUpRef={signUpRef}
                    usersRef={usersRef}
                />
                <main>
                    <AppBanner
                        handleClickRef={handleClickRef}
                        signUpRef={signUpRef}
                    />
                    <UserList
                        userList={userList}
                        setUserList={setUserList}
                        usersRef={usersRef}
                        submitForm={submitForm}
                        page={page}
                        setPage={setPage}
                    />
                    <SignUpForm
                        userList={userList}
                        setUserList={setUserList}
                        signUpRef={signUpRef}
                        submitForm={submitForm}
                        setSubmitForm={setSubmitForm}
                        setPage={setPage}
                    />
                </main>
            </div>
        </>
    );
};

export default App;
