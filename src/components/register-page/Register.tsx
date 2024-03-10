import React, {useContext, useState} from "react";
import {NavLink, useNavigate} from "react-router-dom";
import {AppContext} from "../../state/AppContext";
import {setLocalStorageAppState} from "../../utils/jwtUtil";
import {IdentityService} from "../../service/identity/IdentityService";

const RegisterPage = () => {
    const identityService = new IdentityService();
    const appState = useContext(AppContext);
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState<string | null>(null);

    const registerAccount = async (email: string, password: string) => {
        const response = await identityService.register(email, password);
        if (response.status === 200) {
            setLocalStorageAppState(response.data!, email);
            appState.token = response.data!;
            appState.email = email;
            appState.roles = response.data?.roles!;
            navigate("/home");
        } else {
            setErrors(response.errorMessage || null);
        }
    }

    const Errors = () => {
        if (errors) {
            return <p>{errors}</p>
        }
        return null;
    }

    return (
        <>
            <section className="vh-100 gradient-custom">
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                            <div className="card bg-dark text-white" style={{borderRadius: "1rem"}}>
                                <div className="card-body p-5 text-center">
                                    <div className="mb-md-5 mt-md-4 pb-5">
                                        <h2 className="fw-bold mb-2 text-uppercase">Register account</h2>
                                        <p className="text-white-50 mb-5">Please enter your email and password!</p>
                                        <div className="form-outline form-white mb-4">
                                            <input type="email" id="typeEmailX" className="form-control form-control-lg"
                                                   onChange={(e) => {
                                                       return setEmail(e.target.value);
                                                   }}/>
                                            <label className="form-label" htmlFor="typeEmailX">Email</label>
                                        </div>
                                        <div className="form-outline form-white mb-4">
                                            <input type="password" id="typePasswordX"
                                                   className="form-control form-control-lg"
                                                   onChange={(e) => {
                                                       return setPassword(e.target.value);
                                                   }}/>
                                            <label className="form-label" htmlFor="typePasswordX">Password</label>
                                        </div>
                                        <button className="btn btn-outline-light btn-lg px-5" type="submit"
                                                onClick={() => registerAccount(email, password)}>Register
                                        </button>
                                        <div style={{marginTop: "1rem", color: "red"}}>
                                        <span>
                                            <Errors/>
                                        </span>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="mb-0">Already have an account? <NavLink
                                            className="text-white-50 fw-bold"
                                            to={"/login"}>Login</NavLink></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default RegisterPage;
