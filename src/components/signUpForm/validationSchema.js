import * as Yup from "yup";

const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg"];

const validationSchema = Yup.object({
    userName: Yup.string()
        .min(2, "Username should contain 2-60 characters")
        .max(60, "Username should contain 2-60 characters")
        .required("Name is required"),
    userEmail: Yup.string()
        .email("Invalid email")
        .required("Email is required"),
    userPhone: Yup.string()
        .test(
            "Format validation",
            "Number should be valid and start with code of Ukraine +380",
            (value) => {
                if (!value) return;
                return value.startsWith("+380") && value.length === 13;
            }
        )
        .required("Phone is required"),
    userPhoto: Yup.mixed()
        .nullable()
        .required("Upload photo  is required")
        .test(
            "FILE_SIZE",
            "Uploaded file is too big (should be less than 5 MB)",
            (value) => !value || (value && value.size <= 5000 * 1024)
        )
        .test(
            "FILE_FORMAT",
            "Uploaded file has unsupported format (must be JPEG/JPG)",
            (value) =>
                !value || (value && SUPPORTED_FORMATS.includes(value?.type))
        ),
});

export default validationSchema;
