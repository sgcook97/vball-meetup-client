import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import useApi from "../config/axiosConfig";

const ForgetPassword = () => {
    const api = useApi();

    const formik = useFormik({
        initialValues: {
            email: "",
        },
        validationSchema: Yup.object({
            email: Yup.string().email("Invalid email address").required("Required"),
        }),
        onSubmit: (values) => {
            api.post('/user/forgot-password', values)
                .then(() => {
                    toast.success("Email sent successfully");
                })
                .catch((error) => {
                    if (axios.isAxiosError(error) && error.response) {
                        if (error.response.status === 404) {
                            toast.error("Email not found");
                        } else {
                            toast.error("Server error");
                        }
                    } else {
                        toast.error("An unknown error occurred");
                    }
                }
            );
        },
    });

    return (
        <div className="h-screen w-screen flex flex-col justify-center items-center">
            <div className="flex flex-col justify-center items-center min-w-[20rem] w-[60%]
                max-w-[30rem] bg-onSurface/5 text-onSurface rounded-md h-[20rem]
                border-2 border-onBackground/10"
            >
                <ToastContainer />
                <div className="flex flex-col justify-center w-[60%] h-full">
                    <h1 className="text-3xl text-onSurface font-semibold">Forgot Password</h1>
                    <form onSubmit={formik.handleSubmit} className="mt-5">
                        <label
                            htmlFor="email"
                            className={`text-sm  ${
                                formik.touched.email && formik.errors.email
                                ? "text-red-500"
                                : ""
                            }`}
                            >
                            {formik.touched.email && formik.errors.email
                                ? formik.errors.email
                                : "Email"}
                        </label>
                        <input
                            type="email"
                            placeholder="Email"
                            className={`border-2 focus:outline-none rounded-md w-full 
                            bg-onBackground/[0.01] pl-1 py-1
                                ${
                                    formik.touched.email && formik.errors.email
                                    ? "border-red-500 focus:border-red-500"
                                    : "focus:border-secondary border-onSurface/10"
                                }`}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                            name="email"
                            id="email"
                        />
                        <button
                            type="submit"
                            className="bg-onSurface/40 text-onSurface py-2 px-3 ml-4 
                                transition rounded-md hover:bg-primary"
                        >
                            Send Email
                        </button>
                    </form>
                </div>
            </div>
        </div>
        
    );
};

export default ForgetPassword;