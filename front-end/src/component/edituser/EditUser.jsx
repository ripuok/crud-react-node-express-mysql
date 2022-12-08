
import { Button, Input } from '@mui/material';
import axios from 'axios';
import React, { useState,useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';



const EditUser = () => {
    const params = useParams();
    const [selectedImage, setSelectedImage] = useState(null);
    const [updateData, setUpdateData] = useState({});
    // const [userData, setuserData] = useState({});
    
    useEffect(() => {
        getUser();
    }, []);


    async function getUser(){
        let tempData;
                     

        try{
            const singleData = await axios.get(`http://localhost:4000/user/${params.id}`);
            tempData = singleData.data.User;
             setUpdateData(tempData)
            
        }catch(error){
            console.log(error);
        }

                
            
        
    }

    async function patchData(){
               
        try{
           await axios.put(`http://localhost:4000/user/${params.id}`,updateData);
        }catch(error){
            console.log(error);
        }
        
    }

    
    function handleClick(e){
        let {name, value} = e.target;
                  
        setUpdateData((preData)=>{
             return(
                 {
               ...preData,
               [name]:value
             })      
           })
       }


  return (
    <div >
    <div className="user">
    <div className="left">

    {console.log("Update :",updateData)}

    {selectedImage ?
    <img         
        src={selectedImage} 
        alt={ "Name"} 
        height='100px'       
         /> :
         <img         
        src={updateData.image} 
        alt={ "Name"} 
        height='100px'       
         /> 
    

    }

    <Input 
        accept="image/*" 
        type="file" 
        onChange={e => setSelectedImage(URL.createObjectURL(e.target.files[0]))}
         />

    <div>Name:  
        <Input type="text" 
        onChange={handleClick} 
       // placeholder={updateData.Name}
        value={updateData.Name}
        name="Name"

        />
        </div>

        <div>LastName:  
        <Input type="text"  
        onChange={handleClick}  
        value={updateData.LastName}
        placeholder={updateData.LastName}
        name="LastName"
         />
        </div>  

         <Button onClick={patchData}  > 
         Submit
         </Button> 

         <Button > 
         <Link to="/">

         Back to Main
         </Link></Button>


    </div>     

    <div></div></div>
    
    
    
    
    </div>
  )
}

export default EditUser