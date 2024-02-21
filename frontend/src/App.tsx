import { SubmitHandler, useForm } from 'react-hook-form'
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import './App.css'
import { useMutation } from 'react-query'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import * as yup from "yup"
import { yupResolver } from '@hookform/resolvers/yup';
import { Link } from 'react-router-dom';

type Inputs = {
  name: string,
  id: string,
  department: string,
  dob: Date,
  gender: string,
  designation: string,
  salary:string
}

const schema = yup.object({
   name: yup.string().required('Name is required'),
  id: yup.string().required("Id field is required"),
  department: yup.string().required("Department is required"),
  dob: yup.date().required('dob is required'),
  gender: yup.string().required('select any one of the gender'),
  designation:yup.string().required('designation is required'),
    salary:yup.string().required().max(8,"Not more 8 digits").min(2,"Not less than 2 digits")
  })
  .required()
  
function App() {
  const {
    register,
    handleSubmit,
    formState : {errors},
    reset,
  

  } = useForm<Inputs>({
    defaultValues: {
      name: "",
      id: "",
      department: "",
      dob: new Date("YYYY-MM-DD"),
      gender: "",
      designation: "",
      salary:""
    },
    resolver:yupResolver(schema),
  })

  const { mutate } = useMutation({
    mutationFn: async (value: Inputs) => {
      const salary = value.salary;
      const result = await axios.post("https://task-mqhy.onrender.com/post", {
        ...value,
        salary:parseInt(salary),
      }
      )

      return result.data;
    },
    onSuccess: (data) => {
      toast.success(JSON.stringify(data))
    }
  })

  const onSubmit:SubmitHandler<Inputs> = (value) => {
    mutate(value);
    console.log(value);
    reset()
  }
  // const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
  //   // e.preventDefault();
  //   console.log(nextPage);
  //   // setNextPage(true);
  // }

  const [nextPage, setNextPage] = useState(0);


  return (
    <main className='flex h-screen w-full justify-center items-center bg-violet-400'>
      <form className='flex flex-col w-3/4 gap-4 max-w-[700px] bg-violet-200 p-4 rounded-md' onSubmit={handleSubmit(onSubmit)}>
    


        { nextPage === 0 && 
            <section className='flex flex-col gap-2'>
          
      <h1 className='font-semibold text-lg'>Employee Form</h1>
        
            <p className='text-red-500 text-sm'>{errors.name?.message}</p>
            <input {...register("name")} placeholder='Name' type='text' className='p-2 rounded-sm' />
            <p className='text-red-500 text-sm'>{errors.id?.message}</p>
            <input {...register("id")} placeholder='id' type='text' className='p-2 rounded-sm' />
            <p className='text-red-500 text-sm'>{errors.department?.message}</p>
        <select {...register("department")}  className='p-2 rounded-sm'>
          <option value="">Department</option>
          <option value="hr">HR</option>
           <option value="manager">Manager</option>
          <option value="vp">Vp</option>
        </select>
         
            <p className='text-red-500 text-sm'>{errors.dob?.message}</p>
          <input {...register("dob")} type='date' placeholder='DOB' className='p-2 rounded-sm' />
          
          <div className='flex w-full gap-2'>  
             <button className='p-2 rounded-sm bg-violet-400 w-1/2 disabled:opacity-40 cursor-not-allowed' disabled={true} >Prev</button>
              <button className={'p-2 rounded-sm bg-violet-400 w-1/2'} onClick={() => setNextPage(1)} type='button'>Next</button>
          </div> 
         
          
          
      </section>
     }
       

        {
          nextPage === 1 &&
          <section className='flex flex-col gap-2'>
              <h1 className='font-semibold text-lg'>Employee Form</h1>
              
              <p className='text-red-500 text-sm'>{errors.gender?.message}</p>
        <label className='bg-white flex justify-between p-2 rounded-sm'>
          Gender
          <label className='bg-white flex justify-center gap-1'>
          <span>Male</span>
          <input {...register('gender')} type='radio' value='Male' placeholder='Male' />
        </label>
          <label className='bg-white flex gap-1'>
          <span>Female</span>
        <input {...register('gender')} type='radio' value='Female'/>
        </label>
        </label>
        
              <p className='text-red-500 text-sm'>{errors.designation?.message}</p>
        <input {...register('designation')} type='text' placeholder='Designation'  className='p-2 rounded-sm'/>
        
              <p className='text-red-500 text-sm'>{ errors.salary?.message}</p>
        <input {...register('salary')} placeholder='Salary'  className='p-2 rounded-sm'/>
        
       
        
      <div className='flex w-full gap-2'>
            <button className='p-2 rounded-sm bg-violet-400 w-1/2' onClick={() => setNextPage(0)} type='button'>Prev</button>
            
                <button className='p-2 rounded-sm bg-violet-400 w-1/2'>Submit</button>
          </div> 
       </section> 
      } 
        
          <Link to={'/employees'} className='bg-violet-400 p-2 rounded-md flex items-center justify-center'>Employees Page</Link>
       
      </form>
      
    

      <ToastContainer/>
    </main>
  )
}

export default App
