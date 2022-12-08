
import React,{ useState,useEffect } from "react";
import "./user.scss";
import axios from 'axios';
import { Link } from "react-router-dom";
import { Input, Table, TableHead, TableCell, Paper, TableRow, TableBody, Button, styled , TableContainer  } from '@mui/material';



const User = (props) => {
    
    const [selectedImage, setSelectedImage] = useState(null);
    let [data, setData] = useState({
        Name:"",
        LastName:""
    });

    useEffect(() => {
        getUserDB();
    }, []);

    function handleClick(e){
     let {name, value} = e.target;
               
        setData((preData)=>{
          return(
              {
            ...preData,
            [name]:value
          })      
        })
    }

   const [allUser,SetAllUser] = useState([]);

    async function getUserDB(){
       
        let tempData = []
        try{
            const userDB = await axios.get(`http://localhost:4000/user/`);
            tempData = [...userDB.data.user];      
            
        }catch(error){
            console.log(error)
        }        
        SetAllUser([...tempData]);
        
    }

    async function submitClick(event){          

       try{
        data.image = selectedImage;
         //const userResult = 
         await axios.post(`http://localhost:4000/user/add/`,data);      
         
         getUserDB();       
         }catch(error){
            debugger;
            console.log(error);            
        }
        setData({
            Name:"",
            LastName:""
         })
         setSelectedImage(null);

        event.preventDefault();

    }

    async function deleteUser(event){
        let value = event.target.value;    

        try{
         await axios.delete(`http://localhost:4000/user/${value}`);
        }catch(error){
            console.log(error);
        }                  
        getUserDB();   

    }


 
  return (
    <div className="user">
       <h1>User Record Entry</h1> 
    <div className="input">
    

    <div className="right">  
        <div> First Name: 

        <Input type="text" 
        onChange={handleClick} 
        placeholder=" First Name" 
        value={data.Name}
        name="Name"
        className="text"
        />
        </div>
        <div>LastName:  
        <Input type="text"  
        onChange={handleClick}  
        value={data.LastName}  
        placeholder=" Last Name"
        name="LastName"
        className="text"
         />
        </div>        
    
    </div> 

    <div className="left">
    <span>

    {selectedImage? 
    <img  
    src={selectedImage} 
    alt={selectedImage.name} 
    height='130px'   
     />
    :
   <img  
    src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png" 
    alt="noimage"
    height='130px'
    />        
    }
     </span>   
      <span>
    <Input 
    className="input"
    accept="image/*" 
    type="file" 
    onChange={e => setSelectedImage(URL.createObjectURL(e.target.files[0]))}
     /></span>
    
    
      
    
    </div>
    </div>

    <div className="but">
    <span >
      <Button onClick={submitClick} >Submit</Button>
    </span>

    </div>
       

    <div className="table">

    <ol>

                <TableContainer component={Paper}>
                 <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                   <TableRow>
                   <TableCell>ID</TableCell>
                   <TableCell>First Name</TableCell>
                   <TableCell>Last Name</TableCell>
                   <TableCell>Image</TableCell>
                   <TableCell>Edit</TableCell>
                   <TableCell>Delete</TableCell>
                   </TableRow>
                  </TableHead>

        {allUser.map((user,index)=>(          
                <TableRow key={user._id} >
                <TableCell component="th" scope="row">{index+1} </TableCell>
                <TableCell align="left">{user.Name} </TableCell>
                <TableCell align="left">{user.LastName} </TableCell>
                <TableCell align="left">
                <img 
                src={user.image}  
                alt={"altimage"} height="60px"                
                /> 


                
                  
                </TableCell>
                <TableCell align="left">
                <Button >
                <Link to={`/edit/${user._id}`} >
                Edit
                </Link>
                </Button>
                
                 </TableCell>
                <TableCell align="left">                
                <Button 
                onClick={deleteUser} 
                name="Index" 
                value={user._id}>
                Delete
                </Button> 
                
                </TableCell>
                 </TableRow>
        )
        )}
                 </Table>
                </TableContainer>

    </ol>
    </div>
    
    
    </div>

  )
}

export default User;