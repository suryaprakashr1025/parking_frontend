import { React, useState } from 'react'
import parking from './parking.jpg';
import parking1 from './parking1.jpg';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import axios from 'axios';
import { Config } from './Config';
import { useNavigate } from 'react-router-dom';
import { Bars } from "react-loader-spinner"
import "./Login.css"

function Login() {
    const navigate = useNavigate()
    const [name, setName] = useState("")
    const [adminpassword, setAdminpassword] = useState("")
    const [loading, setLoading] = useState(false)

    const admin = async () => {
        try {
            setLoading(true)
            const adminlogin = await axios.post(`${Config.api}/login`, {
                username: name,
                password: adminpassword
            })
            console.log(name, adminpassword)
            console.log(adminlogin)
            if (adminlogin.data.message === "success") {
                navigate("/parking")
                setLoading(false)
            } else {
                alert("username and password is incorrect")
                setLoading(false)
            }
        } catch (error) {
            alert("something went wrong")
        }

    }


    return (
        <div className='login'>
            <div className='container-fluid logsize'>
                <div className='row'>
                    <div className='col-lg-8'>
                        <img src={parking1} className="img-fluid" style={{ width: "100%", height: "80vh" }} />
                    </div>
                    <div className='col-lg-4 ' style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                        <h3 className='text-center' style={{ color: "dodgerblue", fontWeight: "bold" }}>Parking</h3>
                        <form >

                            <div className='mb-2'>
                                <label className='form-label' style={{fontWeight:"bold"}}>Username</label>
                                <input type="text" className='form-control' value={name} onChange={(e) => setName(e.target.value)} />
                            </div>

                            <div className='mb-2'>
                                <label className='form-label'  style={{fontWeight:"bold"}}>Password</label>
                                <input type="password" className='form-control' value={adminpassword} onChange={(e) => setAdminpassword(e.target.value)} />
                            </div>

                            <div className='text-center'>
                                <buton type="submit" className='btn btn-primary mx-auto' onClick={admin}>
                                    {loading ? <Bars
                                        height="20"
                                        width="80"
                                        color="white"
                                        ariaLabel="bars-loading"
                                        wrapperStyle={{}}
                                        wrapperClass=""
                                        visible={true}
                                    /> : "Login"}
                                </buton>
                            </div>
                            <div className='mt-5' style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                                <h6>username: surya</h6>
                                <h6>password: surya123</h6>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login