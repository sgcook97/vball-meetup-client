import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import useApi from '../config/axiosConfig';
import { skillLevels } from "../lib/data";

export default function Register() {
    const navigate = useNavigate();
    const api = useApi();

    const formik = useFormik({
        initialValues: {
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
            skillLevel: "Any",
        },
        validationSchema: Yup.object({
            username: Yup.string().required("Username is required"),
            email: Yup.string().email("Invalid email address").required("Email is required"),
            password: Yup.string().required("Password is required").min(6, "Password must be at least 6 characters"),
            confirmPassword: Yup.string().oneOf([Yup.ref("password"), undefined], "Passwords must match").required("Required"),
            skillLevel: Yup.string().required("Skill level is required"),
        }),
        onSubmit: async (values) => {
            try {
                await api.post('/auth/register', values);
                navigate('/login');
            } catch (error) {
                console.error('Error registering:', error);
            }
        },
    });

    return (
        <div className='text-onBackground relative pt-[5rem] 
            flex flex-col justify-center items-center h-screen
            w-screen'
        >
            <h2>Register</h2>
            <form onSubmit={formik.handleSubmit} className='m-2 flex flex-col items-center
                justify-center max-w-[20rem] min-w-[15rem] w-[80%] gap-2'>
                <div className="flex flex-col w-full">
                    <label
                        htmlFor="username"
                        className={`text-sm  ${
                        formik.touched.username && formik.errors.username
                            ? "text-red-500"
                            : ""
                        }`}
                    >
                        {formik.touched.username && formik.errors.username
                        ? formik.errors.username
                        : "Username"}
                    </label>
                    <input
                        name="username"
                        id="username"
                        type='text'
                        placeholder='Username'
                        className={`border-2 p-2 focus:outline-none rounded-md w-full 
                        bg-onBackground/[0.01] pl-1 py-1
                        ${
                        formik.touched.username &&
                        formik.errors.username
                            ? "border-red-500 focus:border-red-500"
                            : "focus:border-secondary border-onSurface/10"
                        }`}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.username}
                    />
                </div>
                <div className="flex flex-col w-full">
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
                        name="email"
                        id="email"
                        type='text'
                        placeholder='Email'
                        className={`border-2 p-2 focus:outline-none rounded-md w-full 
                        bg-onBackground/[0.01] pl-1 py-1
                        ${
                        formik.touched.email &&
                        formik.errors.email
                            ? "border-red-500 focus:border-red-500"
                            : "focus:border-secondary border-onSurface/10"
                        }`}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                    />
                </div>
                <div className="flex flex-col w-full">
                    <label
                        htmlFor="password"
                        className={`text-sm  ${
                        formik.touched.password && formik.errors.password
                            ? "text-red-500"
                            : ""
                        }`}
                    >
                        {formik.touched.password && formik.errors.password
                        ? formik.errors.password
                        : "Password"}
                    </label>
                    <input
                        name="password"
                        id="password"
                        type='password'
                        placeholder='Password'
                        className={`border-2 p-2 focus:outline-none rounded-md w-full 
                        bg-onBackground/[0.01] pl-1 py-1
                        ${
                        formik.touched.password &&
                        formik.errors.password
                            ? "border-red-500 focus:border-red-500"
                            : "focus:border-secondary border-onSurface/10"
                        }`}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                    />
                </div>
                <div className="flex flex-col w-full">
                    <label
                        htmlFor="confirmPassword"
                        className={`text-sm  ${
                        formik.touched.confirmPassword && formik.errors.confirmPassword
                            ? "text-red-500"
                            : ""
                        }`}
                    >
                        {formik.touched.confirmPassword && formik.errors.confirmPassword
                        ? formik.errors.confirmPassword
                        : "Confirm Password"}
                    </label>
                    <input
                        name="confirmPassword"
                        id="confirmPassword"
                        type='password'
                        placeholder='Confirm Password'
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
                    />
                </div>
                <div className="flex flex-col w-full">
                    <label 
                        htmlFor="skillLevel"
                        className={`text-sm  ${
                            formik.touched.skillLevel && formik.errors.skillLevel
                                ? "text-red-500"
                                : ""
                            }`}
                        >
                            {formik.touched.skillLevel && formik.errors.skillLevel
                            ? formik.errors.skillLevel
                            : "Skill Level"}
                    </label>
                    <select
                        className={`focus:outline-none focus:border-secondary rounded-md 
                        w-full bg-onBackground/[0.01] border-2 border-onBackground/10 pl-1 py-1
                        ${
                            formik.touched.skillLevel &&
                            formik.errors.skillLevel
                                ? "border-red-500 focus:border-red-500"
                                : "focus:border-secondary border-onSurface/10"
                        }`}
                        name="skillLevel" // Set name attribute to match Formik field name
                        value={formik.values.skillLevel} // Set value from Formik values
                        onChange={formik.handleChange} // Use Formik's handleChange
                        onBlur={formik.handleBlur}
                    >
                        <option value="" disabled>Select Skill Level</option>
                        {skillLevels.map((level, index) => (
                            <option key={index} value={level}>{level}</option>
                        ))}
                    </select>
                </div>
                
                <button className='bg-primary text-onPrimary w-[5rem] h-[2.2rem]
                    rounded-md hover:bg-secondary hover:text-onSecondary transition 
                    duration-200'
                    type='submit'
                >
                    Register
                </button>
            </form>
            <div>
                <Link className='text-onBackground hover:text-secondary transition underline' to='/login'>Already have an account?</Link>
            </div>
        </div>
    );
};