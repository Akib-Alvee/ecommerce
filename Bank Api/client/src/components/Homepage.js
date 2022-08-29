import React, { useState } from "react";


const Home = ()=>{
    const [userdetail, setuserdetail] = useState({name : "Fahim", username: "Fahim shah", balance: 0});
    return(
        <div>
            <h2>Welcome user{userdetail.name}</h2>
            <div>
                Balance : <h1>{userdetail.balance}</h1>
            </div>
            <button>Deposit</button>
            <button>Withdraw</button>
            <button>Update</button>
            <button>Logout</button>
        </div>
        
    );
}

export default Home;