import axios from 'axios'
import { React, useState, useEffect } from 'react'
import { Config } from './Config'
import "./Parking.css"
import { ThreeDots, LineWave } from "react-loader-spinner"


function Parking() {

    const [name, setName] = useState("")
    const [vehiclename, setVehiclename] = useState("")
    const [vehicleno, setvehicleno] = useState("")
    const [getVehicledata, setGetVehicleData] = useState([])
    const [check, setCheck] = useState(false)
    const [vehicleendtime, setvehicleendtime] = useState([])
    const [changebtn, setChangebtn] = useState(false)
    const [passvalue, setPassvalue] = useState()
    const [loading, setLoading] = useState(false)
    const [endloading, setEndloading] = useState(false)

    const createVehicle = async () => {
        try {
            setLoading(true)
            setChangebtn(false)
            const vehicle = await axios.post(`${Config.api}/createvehicle`, {
                client_name: name,
                vehicleNo: vehicleno,
                vehicle_name: vehiclename,
            })
            if (vehicle.data.message === "vehicle created successfully") {
                alert(vehicle.data.message)
                getVehicle()
                setLoading(false)
            } else {
                alert(vehicle.data.message)
                setLoading(false)
            }
        } catch (error) {
            alert('something went wrong')
        }
    }


    const getVehicle = async () => {
        try {
            const getdata = await axios.get(`${Config.api}/allvehicle`)
            console.log(getdata.data)
            setGetVehicleData(getdata.data)

        } catch (error) {
            alert("something went wrong")
        }
    }

    useEffect(() => {
        getVehicle()
    }, [])

    const end = async (id) => {
        try {
            setEndloading(true)
            const endtime = await axios.put(`${Config.api}/endvehicle/${id}`)
            console.log(endtime)
            const getvehice = await axios.get(`${Config.api}/getvehicle/${id}`)
            setvehicleendtime([...vehicleendtime, getvehice.data.getVehicle])
            console.log(getvehice.data.getVehicle)
            setCheck(true)
            setEndloading(false)
        } catch (error) {
            alert("something went wrong")
        }
    }

    const update = async () => {
        try {
            setLoading(true)
            setChangebtn(false)
            const updatevehicle = await axios.put(`${Config.api}/updatevehicle/${passvalue}`, {
                client_name: name,
                vehicleNo: vehicleno,
                vehicle_name: vehiclename,
            })
            getVehicle()
            setLoading(false)
        } catch (error) {
            alert("something went wrong")
        }
    }

    const btnchange = async (id) => {
        try {
            setChangebtn(true)
            setPassvalue(id)
        } catch (error) {
            alert("something went wrong")
        }
    }

    return (
        <div>
            {
                check ? vehicleendtime.map(get => {
                    return (
                        <div style={{
                            display: "flex",
                            justifyContent: "center",
                            margin: "10px 0px",
                            zIndex: "100"
                        }}>
                            <div className='popup' style={{

                                backgroundColor: "dodgerblue",
                                color: "black",
                                width: "fit-content",
                                padding: "15px",
                                fontWeight: "bold",
                                textAlign: "center"
                            }}>
                                <h6 style={{ fontWeight: "bold" }}>VehicleName:   <span style={{ color: "white" }}>{get.vehicle_name}</span></h6>
                                <h6 style={{ fontWeight: "bold" }}>VehicleNo:      <span style={{ color: "white" }}>{get.vehicleNo}</span></h6>
                                <h6 style={{ fontWeight: "bold" }}>EndDate:        <span style={{ color: "white" }}>{get.endDate}</span></h6>
                                <h6 style={{ fontWeight: "bold" }}>EndTime:        <span style={{ color: "white" }}>{get.endTime}</span></h6>
                                <h6 style={{ fontWeight: "bold" }}>TotalAmount:    <span style={{ color: "white" }}>Rs.{get.totalAmount}</span></h6>

                            </div>
                        </div>
                    )
                }) : null
            }

            <div className='container' >

                <div className='row mt-3'>
                    <h3 className='text-center mb-4'>Parking</h3>

                    <div className='col-lg-4'>
                        <label className='form-label'>Name</label>
                        <input type="text" className='form-control' value={name} onChange={(e) => setName(e.target.value)} />
                    </div>

                    <div className='col-lg-4'>
                        <label className='form-label'>VehicleNo</label>
                        <input type="text" className='form-control' value={vehicleno} onChange={(e) => setvehicleno(e.target.value)} />
                    </div>

                    <div className='col-lg-4'>
                        <label className='form-label'>VehicleName</label>
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

                <div className='row mt-5'>
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
                                getVehicledata.map(get => {
                                    return (
                                        <tr >

                                            <th className='getdata'>{get._id}</th>
                                            <th className='getdata'>{get.client_name}</th>
                                            <th className='getdata'>{get.vehicle_name}</th>
                                            <th className='getdata'>{get.vehicleNo}</th>
                                            <th className='getdata'>{get.startdate}</th>
                                            <th className='getdata'>{get.starttime}</th>
                                            <th className='getdata'>{get.status}</th>
                                            <input type="button" className='btn btn-primary' value="Update" style={{ color: "black" }} onClick={() => btnchange(get._id)} />
                                            <button type="button" className='btn btn-primary' style={{ color: "black" }} onClick={() => end(get._id)} >{endloading ? <LineWave
                                                height="20"
                                                width="30"
                                                color="black"
                                                ariaLabel="line-wave"
                                                wrapperStyle={{}}
                                                wrapperClass=""
                                                visible={true}
                                                firstLineColor=""
                                                middleLineColor=""
                                                lastLineColor=""
                                            /> : "End"} </button>

                                        </tr>
                                    )
                                })
                            }


                        </tbody>
                    </table>
                </div>



            </div>
        </div>
    )
}

export default Parking