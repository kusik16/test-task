import "./appBanner.scss";

const AppBanner = ({ handleClickRef, signUpRef }) => {
    return (
        <section className='app__banner'>
            <div className='app__banner-content'>
                <h1 className='app__banner-title'>
                    Test assignment for front-end developer
                </h1>
                <p className='app__banner-description'>
                    What defines a good front-end developer is one that has
                    skilled knowledge of HTML, CSS, JS with a vast understanding
                    of User design thinking as they'll be building web
                    interfaces with accessibility in mind. They should also be
                    excited to learn, as the world of Front-End Development
                    keeps evolving.
                </p>
                <button
                    onClick={() => handleClickRef(signUpRef)}
                    className='app__banner-btn'>
                    Sign up
                </button>
            </div>
        </section>
    );
};

export default AppBanner;
