import User from "./component/user/User";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import EditUser from "./component/edituser/EditUser";


function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<User />} />
      <Route path="/edit/:id" element={<EditUser />} />
      </Routes>
    </BrowserRouter>

   
  );
}

export default App;
