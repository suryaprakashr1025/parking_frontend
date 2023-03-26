import axios from 'axios'
import { React, useState, useEffect } from 'react'
import { Config } from './Config'
import "./Parking.css"
import { ThreeDots, LineWave } from "react-loader-spinner"
import { Link, useNavigate } from 'react-router-dom'


function Parking() {
    const navigate = useNavigate()
    const [name, setName] = useState("")
    const [vehiclename, setVehiclename] = useState("")
    const [vehicleno, setvehicleno] = useState("")
    const [getVehicledata, setGetVehicleData] = useState([])
    const [changebtn, setChangebtn] = useState(false)
    const [passvalue, setPassvalue] = useState()
    const [loading, setLoading] = useState(false)
    const [tableloading, settableloading] = useState(false)
    const [findvehicle, setfindvehicle] = useState("")
    const [page, setPage] = useState([])
    const [currectPage, setCurrentpage] = useState()
    const [touched, setTouched] = useState(false)
    const perPage = 4


    const createVehicle = async () => {
        try {
            if (name.length > 0 && vehiclename.length > 0 && vehicleno.length > 0) {
                setLoading(true)
                setChangebtn(false)
                const vehicle = await axios.post(`${Config.api}/createvehicle`, {
                    client_name: name,
                    vehicleNo: vehicleno,
                    vehicle_name: vehiclename,
                },
                {
                    headers:{
                      "Authorization":localStorage.getItem("parking")
                    }
                })
                if (vehicle.data.message === "vehicle created successfully") {
                    setName("")
                    setVehiclename("")
                    setvehicleno("")
                    alert(vehicle.data.message)
                    getVehicle()
                    setLoading(false)
                } else {
                    alert(vehicle.data.message)
                    setLoading(false)
                }
            } else {
                alert("Please fill inputbox")
            }
        } catch (error) {
            alert('something went wrong')
        }
    }


    const getVehicle = async () => {
        try {
            settableloading(true)
            const getdata = await axios.get(`${Config.api}/allvehicle`,{
                headers:{
                  "Authorization":localStorage.getItem("parking")
                }
            })
            console.log(getdata.data.length)
            setGetVehicleData(getdata.data)
            setPage(getdata.data.slice(0, 4))
            settableloading(false)
        } catch (error) {
            alert("something went wrong")
        }
    }

    useEffect(() => {
        getVehicle()
    }, [])


    const fetchData = async (index) => {
        try {
            const start = perPage * index;
            const end = start + perPage;
            const getData = await axios.get(`${Config.api}/allvehicle`,{
                headers:{
                  "Authorization":localStorage.getItem("parking")
                }
            })
            setPage(getData.data.slice(start, end))
            setCurrentpage(index)
        } catch (error) {
            alert("something went wrong")
        }
    }



    const update = async () => {
        try {
            if (name.length >= 0 && vehiclename.length >= 0 && vehicleno.length >= 0) {


                setLoading(true)
                setChangebtn(false)
                const updatevehicle = await axios.put(`${Config.api}/updatevehicle/${passvalue}`, {
                    client_name: name,
                    vehicleNo: vehicleno,
                    vehicle_name: vehiclename,
                },{
                    headers:{
                      "Authorization":localStorage.getItem("parking")
                    }
                })
                setName("")
                setVehiclename("")
                setvehicleno("")
                getVehicle()
                setLoading(false)
            } else {
                alert("Please fill inputbox")
            }
        } catch (error) {
            alert("something went wrong")
        }
    }

    const btnchange = async (id) => {
        try {
            setChangebtn(true)
            const getvehice = await axios.get(`${Config.api}/getvehicle/${id}`,
            {
                headers:{
                  "Authorization":localStorage.getItem("parking")
                }
            })
            console.log(getvehice.data[0].client_name)
            setName(getvehice.data[0].client_name)
            setVehiclename(getvehice.data[0].vehicle_name)
            setvehicleno(getvehice.data[0].vehicleNo)
            setPassvalue(id)
        } catch (error) {
            alert("something went wrong")
        }
    }


    const prev = () => {
        if (currectPage !== 0) {
            fetchData(currectPage - 1)
        }
    }

    const next = () => {
        if (currectPage !== Math.ceil(getVehicledata.length / perPage) - 1) {
            fetchData(currectPage + 1)
        }
    }

    const pagenumbers = Math.ceil(getVehicledata.length / perPage)
    console.log(pagenumbers)

    const logout = () => {
        localStorage.removeItem("parking")
        navigate("/")
    }

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>

            <div className='container mx-auto' style={{ position: "fixed", top: "0px" }}>

                <div className='row mt-3'>

                    <div className='col-lg-12 mb-5' style={{ display: "flex", justifyContent: "space-aroud", alignItems: "center" }}>
                        <h3 className='mx-auto' style={{ color: "black", fontWeight: "bold" }}>Parking</h3>
                        <button className='btn btn-primary' onClick={logout}>Logout</button>
                    </div>

                    <div className='col-lg-4'>
                        <label className='form-label' style={{ color: "black", fontWeight: "bold" }}>Name</label>
                        <input type="text" className='form-control' value={name} onChange={(e) => setName(e.target.value)} />
                    </div>

                    <div className='col-lg-4'>
                        <label className='form-label' style={{ color: "black", fontWeight: "bold" }}>VehicleNo</label>
                        <input type="text" className='form-control' value={vehicleno} onChange={(e) => setvehicleno(e.target.value)} />
                    </div>

                    <div className='col-lg-4'>
                        <label className='form-label' style={{ color: "black", fontWeight: "bold" }}>VehicleName</label>
                        <input type="text" className='form-control' value={vehiclename} onChange={(e) => setVehiclename(e.target.value)} />
                    </div>

                    <div className='text-center mt-3'>
                        <button type="submit" className='btn btn-primary mx-auto' onClick={changebtn ? update : createVehicle}>{changebtn ? <div>{loading ? <ThreeDots
                            height="25"
                            width="40"
                            radius="10"
                            color="white"
                            ariaLabel="three-dots-loading"
                            wrapperStyle={{}}
                            wrapperClassName=""
                            visible={true}
                        /> : "Update"} </div> : <div>{loading ? <ThreeDots
                            height="25"
                            width="40"
                            radius="10"
                            color="white"
                            ariaLabel="three-dots-loading"
                            wrapperStyle={{}}
                            wrapperClassName=""
                            visible={true}
                        /> : "Create"}</div>} </button>
                    </div>

                </div>

                <div className='mx-auto' style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>

                    <Link to="/endtime" className='btn btn-primary mt-2'>Vehicle EndTime</Link>

                </div>

                <div className='row mt-4'>
                    <table class="table" style={{ textAlign: "center" }}>
                        <thead>
                            <tr>

                                <th scope="col">Id</th>
                                <th scope="col">ClientName</th>
                                <th scope="col">VehicleName</th>
                                <th scope="col">VehicleNo</th>
                                <th scope="col">StartDate</th>
                                <th scope="col">StartTime</th>
                                <th scope="col">Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                tableloading ?

                                    <tr >
                                        <td colspan="8">
                                            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                                <ThreeDots
                                                    height="25"
                                                    width="40"
                                                    radius="10"
                                                    color="black"
                                                    ariaLabel="three-dots-loading"
                                                    wrapperStyle={{}}
                                                    wrapperClassName=""
                                                    visible={true}
                                                />
                                            </div>
                                        </td>

                                    </tr>
                                    : page.filter(v => v.vehicleNo.toUpperCase().includes(findvehicle)).map(get => {
                                        return (
                                            <tr >

                                                <td className='getdata'>{get._id}</td>
                                                <td className='getdata'>{get.client_name}</td>
                                                <td className='getdata'>{get.vehicle_name}</td>
                                                <td className='getdata'>{get.vehicleNo}</td>
                                                <td className='getdata'>{get.startdate}</td>
                                                <td className='getdata'>{get.starttime}</td>
                                                <td className='getdata'>{get.status}</td>
                                                <td className='getdata'>
                                                    <input type="button" className='btn btn-primary ' value="Update" style={{ color: "white" }} onClick={() => btnchange(get._id)} />
                                                </td>



                                            </tr>
                                        )
                                    })

                            }


                        </tbody>
                    </table>
                </div>

                {
                    getVehicledata.length > 4 ?

                        <nav aria-label="Page navigation example" className="navpage mx-auto"  >
                            <div className='paginationdiv'>
                                <ul class="nav justify-content-center pageul my-2">
                                    <li class="nav-item">
                                        <a class="nav-link pagelink" style={{ cursor: "pointer" }} onClick={prev}>Prev</a>
                                    </li>
                                    {
                                        getVehicledata.length > 4 ?
                                            [...Array(pagenumbers)].map((page, index) => {
                                                return (
                                                    <li class="nav-item">
                                                        <a class={`nav-link pagelink ${currectPage === index ? "active" : null}`} style={{ cursor: "pointer" }} onClick={() => fetchData(index)}>{index + 1}</a>
                                                    </li>
                                                )
                                            }) : null
                                    }
                                    <li class="nav-item">
                                        <a class="nav-link pagelink" style={{ cursor: "pointer" }} onClick={next}>Next</a>
                                    </li>
                                </ul>
                            </div>
                        </nav> : null
                }
            </div>
        </div>
    )
}

export default Parking