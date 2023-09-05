import React,{useEffect, useState} from "react";
import axios from "axios";
import "./detail.css";

const client = axios.create({
  baseURL: "https://randomuser.me/api" 
});

export default function UserDetail() {
// state to fetch the details from API call
  const [detail, setDetail] = useState(null);

// API call to Fetch user data and save it to local storage

  const getDetail=async ()=> {
    try {
    const response = await client.get();
     // Save the user details to local storage
    localStorage.setItem("details", JSON.stringify(response.data));
    setDetail(response.data);
    }catch (error) {
        alert('Error in fetching data',error)
    }
  };
// to call the API on first load of the page and check if the data is already present in localstorage
  useEffect(() => {
    const details = localStorage.getItem('details');
    if (details) {
    setDetail(JSON.parse(details));
    } else {
        getDetail();
    }
  }, []);

  if (!detail) return "No Details Found!"

  return (
    <div >
        {detail.results.map((x)=>
        <div className="detail">
        <h1>Name: {x.name.title  +" "+  x.name.first  +" "+  x.name.last}</h1>
        <h1>Email: {x.email}</h1>
        </div>
        )}
        {/* onClick of the Refresh button API is getting called  */}
      <button className="button" onClick={getDetail}>Refresh</button>
    </div>
  );
}