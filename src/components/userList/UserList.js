import { useState, useEffect, useRef, useMemo } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import useAbzService from "../../services/AbzService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Tooltip from "../tooltip/Tooltip";

import photoCover from "../../resources/img/photo-cover.svg";
import "./userList.scss";

const setContent = (process, Component, newItemLoading) => {
    switch (process) {
        case "waiting":
            return <Spinner />;
        case "loading":
            return newItemLoading ? <Component /> : <Spinner />;
        case "confirmed":
            return <Component />;
        case "error":
            return <ErrorMessage />;
        default:
            throw new Error("Unexpected process state");
    }
};

const UserList = ({
    userList,
    setUserList,
    usersRef,
    submitForm,
    page,
    setPage,
}) => {
    const [newItemLoading, setnewItemLoading] = useState(false);
    const [userEnded, setUserEnded] = useState(false);

    const { getAllUsers, process, setProcess } = useAbzService();

    useEffect(() => {
        onRequest(page, true);
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        onRequest(page, true);
        // eslint-disable-next-line
    }, [submitForm]);

    const onRequest = (page, initial) => {
        initial ? setnewItemLoading(false) : setnewItemLoading(true);
        getAllUsers(page)
            .then(onUserListLoaded)
            .then(() => setProcess("confirmed"));
    };

    const onUserListLoaded = async ({ users, totalPages }) => {
        let ended = false;
        if (totalPages === page) {
            ended = true;
        }
        setUserList([...userList, ...users]);
        setnewItemLoading(false);
        setPage(page + 1);
        setUserEnded(ended);
    };

    const itemRefs = useRef([]);

    const renderItems = (arr) => {
        const items = arr.map((item, i) => {
            return (
                <CSSTransition
                    key={item.id}
                    timeout={500}
                    classNames='list__item'>
                    <li
                        className='list__item'
                        tabIndex={0}
                        ref={(el) => (itemRefs.current[i] = el)}>
                        <img
                            onError={(e) => (e.target.src = photoCover)}
                            src={item.photo}
                            alt={item.name}
                        />
                        <Tooltip content={item.name} direction='bottom'>
                            <div className='list__name'>{item.name}</div>
                        </Tooltip>
                        <div className='list__description'>
                            <div
                                className='list__description-item'
                                data-placement='bottom'>
                                {item.position}
                            </div>
                            <Tooltip
                                className='list__description-item'
                                content={item.email}
                                direction='bottom'>
                                <div className='list__description-item'>
                                    {item.email}
                                </div>
                            </Tooltip>
                            <div className='list__description-item'>
                                {item.phone}
                            </div>
                        </div>
                    </li>
                </CSSTransition>
            );
        });

        return (
            <>
                <ul className='list__grid'>
                    <TransitionGroup component={null}>{items}</TransitionGroup>
                </ul>
                <button
                    disabled={newItemLoading}
                    style={{ display: userEnded ? "none" : "block" }}
                    className='list__btn'
                    onClick={() => onRequest(page)}>
                    <div>Show more</div>
                </button>
            </>
        );
    };

    const elements = useMemo(() => {
        return setContent(process, () => renderItems(userList), newItemLoading);
        // eslint-disable-next-line
    }, [process]);

    return (
        <section ref={usersRef} className='list__section'>
            <h2 className='list__section-title'>Working with GET request</h2>
            {elements}
        </section>
    );
};

export default UserList;
