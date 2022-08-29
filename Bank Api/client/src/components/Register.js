import React from "react";

const Register = ()=>{

    return(
        <div>
            <h1>Register page</h1>
            <form acceptCharset="utf-8">
                name : <input type="text" name="" id="" value=""/><br/>
                username : <input type="text" name="" id="" value=""/><br/>
                address : <input type="text" name="" id="" value=""/><br/>
                email : <input type="email" name="" id="" value=""/><br/>
                password : <input type="password" name="" id="" value=""/><br/>
                <input type="submit" name="" id="" value="submit"/><br/>
                <input type="reset" name="" id="" value="reset"/><br/>

            </form>
        </div>
    );
}

export default Register;