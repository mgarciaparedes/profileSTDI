import React from 'react'

export const Login = () => {
    return (
        <>
            <div className="justify-content-center">
                <div className="form-group row">
                    <label style={{color: "white"}}>Sign in</label>
                    <input type="email" placeholder="Username or email" className="form-control" />
                </div>
                <div className="form-group row">
                    <input type="password" placeholder="Password" className="form-control" />
                </div>
                <div className="form-group row">
                    <button className="btn btn-light">Sign in</button>
                </div>
                <div className="form-group row">
                    <a style={{color: "#81BEF7"}} >Forgot password?</a>
                </div>
                <div className="form-group row">
                    <a style={{color: "#81BEF7"}} >privacy policy terms of service</a>
                </div>
            </div>
        </>
    )
}
