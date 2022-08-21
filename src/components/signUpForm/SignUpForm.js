import { useState, useEffect, useRef } from "react";
import { Formik, Form, Field } from "formik";

import useAbzService from "../../services/AbzService";
import validationSchema from "./validationSchema";
import Radio from "../radio/Radio";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";

import successImage from "../../resources/img/success-image.svg";
import "./signUpForm.scss";

const SignUpForm = ({
    setUserList,
    signUpRef,
    setSubmitForm,
    submitForm,
    setPage,
}) => {
    const {
        createUser,
        getAllPositions,
        generateToken,
        clearError,
        process,
        setProcess,
    } = useAbzService();

    const [positions, setPositions] = useState([]);
    const [positionsLoading, setPositionsLoading] = useState(false);
    const [selected, setSelected] = useState(1);

    const uploadBtn = useRef(null);

    useEffect(() => {
        onPositionsRequest(true);
        // eslint-disable-next-line
    }, []);

    const onPositionsRequest = (initial) => {
        initial ? setPositionsLoading(false) : setPositionsLoading(true);
        getAllPositions()
            .then(onPositionsLoaded)
            .then(() => setProcess("confirmed"));
    };

    const onPositionsLoaded = async (positions) => {
        setPositions([...positions]);
        setPositionsLoading(false);
    };

    const afterSubmit = (resetForm) => {
        resetForm();
        setUserList([]);
        setPage(1);
        setTimeout(() => {
            setSubmitForm(true);
            setProcess("confirmed");
        }, 3000);
    };

    const submitUser = (user, resetForm) => {
        const formData = new FormData();
        formData.append("name", user.name);
        formData.append("email", user.email);
        formData.append("phone", user.phone);
        formData.append("photo", user.photo);
        formData.append("position_id", user.position_id);

        setSubmitForm(false);
        clearError();

        createUser(formData)
            .then(() => afterSubmit(resetForm))
            .catch((e) => {
                if (e.message.includes("401")) {
                    generateToken().then((res) =>
                        createUser(formData, res)
                            .then(() => afterSubmit(resetForm))
                            .catch((e) => {
                                setProcess("error");
                                throw e;
                            })
                    );
                }
            });
    };

    return (
        <>
            <section ref={signUpRef} className='form__section'>
                <h2 className='form__section-title'>
                    Working with POST request
                </h2>
                <Formik
                    initialValues={{
                        userName: "",
                        userEmail: "",
                        userPhone: "",
                        userPosition: "1",
                        userPhoto: "",
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(
                        {
                            userName,
                            userEmail,
                            userPhone,
                            userPosition,
                            userPhoto,
                        },
                        { resetForm }
                    ) => {
                        submitUser(
                            {
                                name: userName,
                                email: userEmail,
                                phone: userPhone,
                                photo: userPhoto,
                                position_id: userPosition,
                            },
                            resetForm
                        );
                    }}>
                    {({ setFieldValue, errors, values, isValid, dirty }) => (
                        <Form className='form'>
                            <div className='form__wrapper'>
                                <label className='form__label'>
                                    <Field
                                        className='form__input'
                                        id='userName'
                                        name='userName'
                                        type='text'
                                        placeholder='Your name'
                                        style={
                                            errors.userName
                                                ? {
                                                      border: "1px solid #CB3D40",
                                                  }
                                                : null
                                        }
                                    />
                                    {errors.userName ? (
                                        <div className='error__input'>
                                            {errors.userName}
                                        </div>
                                    ) : null}
                                </label>

                                <label className='form__label'>
                                    <Field
                                        className='form__input'
                                        id='userEmail'
                                        name='userEmail'
                                        type='email'
                                        placeholder='Email'
                                        style={
                                            errors.userEmail
                                                ? {
                                                      border: "1px solid #CB3D40",
                                                  }
                                                : null
                                        }
                                    />
                                    {errors.userEmail ? (
                                        <div className='error__input'>
                                            {errors.userEmail}
                                        </div>
                                    ) : null}
                                </label>
                                <label className='form__label'>
                                    <Field
                                        className='form__input'
                                        id='userPhone'
                                        name='userPhone'
                                        type='phone'
                                        placeholder='Phone'
                                        style={
                                            errors.userPhone
                                                ? {
                                                      border: "1px solid #CB3D40",
                                                  }
                                                : null
                                        }
                                    />
                                    {errors.userPhone ? (
                                        <div className='error__input-phone'>
                                            {errors.userPhone}
                                        </div>
                                    ) : null}
                                </label>
                                <div className='form__phone-mask'>
                                    +38 (XXX) XXX - XX - XX
                                </div>
                                <div
                                    className='form__positions'
                                    role='group'
                                    aria-labelledby='my-radio-group'>
                                    <label
                                        className='form__positions-title'
                                        htmlFor='userName'>
                                        Select your position:
                                    </label>
                                    {positionsLoading ? (
                                        <Spinner />
                                    ) : (
                                        positions.map((position) => {
                                            return (
                                                <label
                                                    className='form__positions-label'
                                                    key={position.id}>
                                                    <Radio
                                                        value={position.id}
                                                        selected={selected}
                                                        text={position.name}
                                                        onChange={setSelected}
                                                    />
                                                    <Field
                                                        style={{
                                                            display: "none",
                                                        }}
                                                        name='userPosition'
                                                        className='form__positions-radio'
                                                        type='radio'
                                                        value={`${position.id}`}
                                                    />
                                                </label>
                                            );
                                        })
                                    )}
                                </div>
                                <input
                                    ref={uploadBtn}
                                    className='form__upload-hidden'
                                    id='userPhoto'
                                    name='userPhoto'
                                    type='file'
                                    style={{ display: "none" }}
                                    onChange={(e) =>
                                        setFieldValue(
                                            "userPhoto",
                                            e.currentTarget.files[0]
                                        )
                                    }
                                />
                                <div className='form__upload-wrapper'>
                                    <button
                                        onClick={() =>
                                            uploadBtn.current.click()
                                        }
                                        className='form__upload-btn'
                                        style={
                                            errors.userPhoto
                                                ? {
                                                      border: "1px solid #CB3D40",
                                                  }
                                                : null
                                        }>
                                        Upload
                                    </button>
                                    <div
                                        onClick={() =>
                                            uploadBtn.current.click()
                                        }
                                        className='form__upload-input'
                                        style={
                                            errors.userPhoto
                                                ? {
                                                      border: "1px solid #CB3D40",
                                                      borderLeft: "none",
                                                  }
                                                : null
                                        }>
                                        {values.userPhoto &&
                                        values.userPhoto.name
                                            ? values.userPhoto.name
                                            : "Upload your photo"}
                                    </div>
                                    {errors.userPhoto ? (
                                        <div className='error__input'>
                                            {errors.userPhoto}
                                        </div>
                                    ) : null}
                                </div>
                            </div>
                            <button
                                disabled={!(isValid && dirty)}
                                type='submit'
                                className='form__submit-btn'>
                                Sign up
                            </button>
                        </Form>
                    )}
                </Formik>
                {process === "error" ? <ErrorMessage /> : null}
                {process === "loading" ? <Spinner /> : null}
            </section>
            {submitForm ? (
                <div className='success__submit'>
                    <h2 className='success__submit-title'>
                        User successfully registered
                    </h2>
                    <img
                        className='success__submit-image'
                        src={successImage}
                        alt='success'
                    />
                </div>
            ) : null}
        </>
    );
};

export default SignUpForm;
