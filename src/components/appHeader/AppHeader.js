import logo from "../../resources/img/Logo.svg";
import "./appHeader.scss";

const AppHeader = ({ handleClickRef, signUpRef, usersRef }) => {
    return (
        <header className='app__header'>
            <div className='app__header-content'>
                <img className='app__title' src={logo} alt='logo' />
                <nav className='app__menu'>
                    <button
                        type='button'
                        onClick={() => handleClickRef(usersRef)}
                        className='app__menu-btn'>
                        Users
                    </button>
                    <button
                        type='button'
                        onClick={() => handleClickRef(signUpRef)}
                        className='app__menu-btn'>
                        Sign up
                    </button>
                </nav>
            </div>
        </header>
    );
};

export default AppHeader;
