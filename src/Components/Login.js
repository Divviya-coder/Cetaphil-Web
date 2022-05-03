import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios'
// import StoreContext from "../store/StoreContext";


function Login() {
  const [password, setPassword] = useState("");
  const [LoginValidation, setLoginValidation] = useState(false);
  const [UserName, setUserName] = useState("");
  const [visibility, setVisibility] = useState(false)
  const [loading, setLoading] = useState(false)
  const [height, setHeight] = useState('');
  const [width, setWidth] = useState('');

  // const { orientation, changeOrientation, isOffline, changeIsOffline, ChangeMclData, Set_CompletedStores, completedStores, ChangeStoreChain, ChangeStoreLocal, ChangeStoreIndi } = useContext(StoreContext)


  const submit = () => {
    console.log(UserName, 'username', password, 'password')
    setLoading(true)
    const data = new FormData();
    data.append("accesskey", 90336);
    data.append("username", UserName);
    data.append("password", password);
    data.append("login", 1);
    axios
      .post('http://sddigitalcommunication.com/demo/shopology/api-v1.php', data)
      .then((res) => { console.log(res.data) })




  };



  return (

    <div>
      <image source={require("../")} ></image>

      <image source={require("../images/Pasas-horizontal.png")} />
      <label> V.2.1.2 </label>
      {/* <StatusBar
          backgroundColor='#e393b5' /> */}
      {/* <StatusBar style="auto" /> */}

      <input type="textInput"

        placeholder="USER ID"

        onChange={(u) => setUserName(u.target.value)}
      />



      <input type="textInput"

        placeholder="PASSWORD"

        // secureTextEntry={true}
        // secureTextEntry={!visibility}
        onChange={(password) => setPassword(password.target.value)}
      // onSubmitEditing={() => submit()}
      />


      <button onClick={() => { submit() }}>LOGIN</button>
      {LoginValidation ?
        <>
          Invalid username or password!
        </>

        : ""}
    </div>


  );
}
export default Login;