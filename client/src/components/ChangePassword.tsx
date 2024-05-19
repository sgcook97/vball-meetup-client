import axios from 'axios';
import { useFormik } from 'formik'
import * as Yup from "yup";
import { toast } from 'react-toastify';
import authHeader from '../services/auth-header';
import getUser from '../services/get-user';

const BLOCKPARTY_API_URL : string = import.meta.env.VITE_BLOCKPARTY_API_URL as string;

export default function ChangePassword() {
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
            axios
                .post(`${BLOCKPARTY_API_URL}/user/change-password`, 
                    { 
                        newPassword,
                        userId: getUser(),
                    },
                    {
                        headers: authHeader(),
                    }
                )
                .then((response) => {
                    toast.success(response.data.message);
                    setTimeout(() => {
                        window.location.href = "/edit-profile";
                    }, 3000);
                }
            )
            .catch(() => {
                toast.error("Error changing your password.");
            });
        },
    });

    return (
        <div className="flex flex-col justify-center items-center w-[60%]">
            <h1 className="text-lg text-onSurface font-semibold">Change Password</h1>
            <form onSubmit={formik.handleSubmit} className="mt-5 flex flex-col justify-center items-center">
                <div className='flex flex-col'>
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
                </div>
                <div className='flex flex-col'>
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
                </div>
                <button
                    type="submit"
                    className="bg-onSurface/40 text-onSurface py-2 px-3 mt-4
                        transition rounded-md hover:bg-primary"
                >
                    Change Password
                </button>
            </form>
        </div>
    )
}
