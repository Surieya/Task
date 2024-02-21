// import React from "react";
import { useQuery } from "react-query";
import axios from "axios";
// import { useState, useCallback } from "react";

type Inputs = {
  name: string,
  id: string,
  department: string,
  dob: Date,
  gender: string,
  designation: string,
  salary:string
}

const URL = 'http://localhost:8000'
const Table = () => {
  const { data } = useQuery({
    queryFn: async () => {
      const result = await axios.get(URL + '/get')
      return result?.data;
    }
  })

  console.log(data);

 

  return (
    <main className="bg-violet-400 ">
      <h1 className="font-semibold text-xl">EMPLOYEE DETAILS</h1>
      <table className="table-auto h-auto border-collapse w-full bg-violet-400 text-center p-2">
  <thead className="bg-violet-500 w-full h-auto">
        <tr className="rounded-md">
      <th className="p-4">Id</th>
      <th>Name</th>
      <th>Dob</th>
      <th>Gender</th>
          <th>Designation</th>
      <th>Department</th>
          
      <th>Salary</th>
    </tr>
      </thead>
      <tbody>

      {data && (
          data.map((d: Inputs,i:number) => {
          return(
          <tr key={d.id} className={i%2==0 ? "border-2 bg-violet-300" : "border-2 bg-purple-300"}>
            <td className="p-4 border-2 border-slate-100">{d.id}</td>
            <td className="border-2 border-slate-100">{d.name}</td>
            <td className="border-2 border-slate-100">{d.dob.toString()}</td>
            <td className="border-2 border-slate-100">{d.gender}</td>
            <td className="border-2 border-slate-100">{d.designation}</td>
            <td className="border-2 border-slate-100">{d.department}</td>
            <td className="border-2 border-slate-100">{d.salary}</td>        
              </tr>
          )
         }) 
        )}
      </tbody>
        
      </table>

    </main>

  
  );
};

export default Table;


//  name: "",
//       id: "",
//       department: "",
//       dob: new Date("YYYY-MM-DD"),
//       gender: "",
//       designation: "",
//       salary:""