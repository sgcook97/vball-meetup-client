import getUser from '../services/get-user';
import useApi from '../config/axiosConfig';
import { useFormik } from 'formik';
import * as Yup from "yup";
import { ToastContainer, toast } from 'react-toastify';
import { skillLevels } from '../lib/data';

export default function PostForm() {

  const api = useApi();
  const user = getUser();

  const formik = useFormik({
    initialValues: {
      title: "",
      location: "",
      skillLevel: "Any",
      content: "",
      poster: {
        posterId: user?.userId,
        username: user?.username,
      }
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      location: Yup.string().required("Location is required"),
      content: Yup.string().required("Content is required"),
    }),
    onSubmit: async (values, { resetForm }) => {

      if (!values.skillLevel) {
        values.skillLevel = 'Any';
      }

      try {
        await api.post('/post/create-post', values);
        toast.success('Successfully created post!');
        resetForm();
      } catch (error) {
        toast.error('Error creating post.');
      }
    }
  });

  return (
    <div className='m-2 flex flex-col items-center justify-center max-w-[25rem] min-w-[15rem] w-[80%]'>
      <form onSubmit={formik.handleSubmit} className='flex flex-col items-center justify-center gap-2 w-full'>
        <div className='flex flex-col w-full'>
          <label
            htmlFor="title"
            className={`text-sm  ${
            formik.touched.title && formik.errors.title
              ? "text-red-500"
              : ""
            }`}
          >
            {formik.touched.title && formik.errors.title
            ? formik.errors.title
            : "Title"}
          </label>
          <input
            name="title"
            id="title"
            type='text'
            placeholder='Title'
            className={`border-2 p-2 focus:outline-none rounded-md w-full 
            bg-onBackground/[0.01] pl-1 py-1
            ${
            formik.touched.title &&
            formik.errors.title
              ? "border-red-500 focus:border-red-500"
              : "focus:border-secondary border-onSurface/10"
            }`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.title}
          />
        </div>
        <div className='flex flex-col w-full'>
          <label
            htmlFor="location"
            className={`text-sm  ${
            formik.touched.location && formik.errors.location
              ? "text-red-500"
              : ""
            }`}
          >
            {formik.touched.location && formik.errors.location
            ? formik.errors.location
            : "Location"}
          </label>
          <input
            name="location"
            id="location"
            type='text'
            placeholder='Location'
            className={`border-2 p-2 focus:outline-none rounded-md w-full 
            bg-onBackground/[0.01] pl-1 py-1
            ${
            formik.touched.location &&
            formik.errors.location
              ? "border-red-500 focus:border-red-500"
              : "focus:border-secondary border-onSurface/10"
            }`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.location}
          />
        </div>
        <div className='flex flex-col w-full'>
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
            <option value="Any">Any</option>
            {skillLevels.map((level, index) => (
              <option key={index} value={level}>{level}</option>
            ))}
          </select>
        </div>
        <div className='flex flex-col w-full'>
          <label
            htmlFor="location"
            className={`text-sm  ${
            formik.touched.content && formik.errors.content
              ? "text-red-500"
              : ""
            }`}
          >
            {formik.touched.content && formik.errors.content
            ? formik.errors.content
            : "Content"}
          </label>
          <textarea
            name="content"
            id="content"
            placeholder='Write something...'
            className={`border-2 p-2 focus:outline-none rounded-md w-full 
            bg-onBackground/[0.01] pl-1 py-1 h-[10rem]
            ${
            formik.touched.content &&
            formik.errors.content
              ? "border-red-500 focus:border-red-500"
              : "focus:border-secondary border-onSurface/10"
            }`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.content}
          ></textarea>
        </div>
        <input type="hidden" name="posterId" value={formik.values.poster.posterId} />
        <input type="hidden" name="posterUsername" value={formik.values.poster.username} />
        <button 
          className='bg-primary text-onPrimary w-[5rem] h-[2.2rem] rounded-md hover:bg-secondary hover:text-onSecondary transition duration-200'
          type='submit'
        >
          Post
        </button>
      </form>
      <ToastContainer />
    </div>
  )
}
