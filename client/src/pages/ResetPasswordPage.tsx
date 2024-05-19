import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const BLOCKPARTY_API_URL : string = import.meta.env.VITE_BLOCKPARTY_API_URL as string;

export default function ResetPasswordPage() {
    const formik = useFormik({
        initialValues: {
            newPassword: "",
            confirmPassword: "",
        },
        validationSchema: Yup.object({
            newPassword: Yup.string().required("Required").min(6, "Too Short!"),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref("newPassword"), undefined], "Passwords must match")
                .required("Required"),
        }),
        onSubmit: (values) => {
            const { newPassword } = values;
            const token = window.location.pathname.split("/").pop();

            axios
                .post(`${BLOCKPARTY_API_URL}/user/reset-password/${token}`, { newPassword })
                .then((response) => {
                    toast.success(response.data.message);
                    setTimeout(() => {
                        window.location.href = "/login";
                    }, 3000);
                }
            )
            .catch(() => {
                toast.error("Your link has expired");
            });
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
                    <h1 className="text-3xl text-onSurface font-semibold">Reset Password</h1>
                    <form onSubmit={formik.handleSubmit} className="mt-5">
                        <label
                            htmlFor="newPassword"
                            className={`text-sm  ${
                            formik.touched.newPassword && formik.errors.newPassword
                                ? "text-red-500"
                                : ""
                            }`}
                        >
                            {formik.touched.newPassword && formik.errors.newPassword
                            ? formik.errors.newPassword
                            : "New Password"}
                        </label>
                        <input
                            type="password"
                            placeholder="New Password"
                            className={`border-2 p-2 focus:outline-none rounded-md w-full 
                            bg-onBackground/[0.01] pl-1 py-1
                            ${
                            formik.touched.newPassword && formik.errors.newPassword
                                ? "border-red-500 focus:border-red-500"
                                : "focus:border-secondary border-onSurface/10"
                            }`}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.newPassword}
                            name="newPassword"
                            id="newPassword"
                        />

                        <label
                            htmlFor="confirmPassword"
                            className={`text-sm  ${
                            formik.touched.confirmPassword &&
                            formik.errors.confirmPassword
                                ? "text-red-500"
                                : ""
                            }`}
                        >
                            {formik.touched.confirmPassword && formik.errors.confirmPassword
                            ? formik.errors.confirmPassword
                            : "Confirm Password"}
                        </label>
                        <input
                                type="password"
                                placeholder="Confirm Password"
                                className={`border-2 p-2 focus:outline-none rounded-md w-full 
                                bg-onBackground/[0.01] pl-1 py-1
                                ${
                                formik.touched.confirmPassword &&
                                formik.errors.confirmPassword
                                    ? "border-red-500 focus:border-red-500"
                                    : "focus:border-secondary border-onSurface/10"
                                }`}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.confirmPassword}
                                name="confirmPassword"
                                id="confirmPassword"
                        />
                        <button
                            type="submit"
                            className="bg-onSurface/40 text-onSurface py-2 px-3 ml-4 
                                transition rounded-md hover:bg-primary"
                        >
                            Reset Password
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
