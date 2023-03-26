import axios from 'axios'
import { React, useState, useEffect } from 'react'
import { Config } from './Config'
import "./Endtime.css"
import { ThreeDots, LineWave } from "react-loader-spinner"
import { Link, useNavigate } from 'react-router-dom'
function Endtime() {
    const navigate = useNavigate()
    const [getVehicledata, setGetVehicleData] = useState([])
    const [findvehicle, setfindvehicle] = useState("")
    const [endloading, setEndloading] = useState(false)
    const [vehicleendtime, setvehicleendtime] = useState([])
    const [check, setCheck] = useState(false)
    const [tableloading, settableloading] = useState(false)

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
            settableloading(false)

        } catch (error) {
            alert("something went wrong")
        }
    }

    useEffect(() => {
        getVehicle()
    }, [])


    const end = async (id) => {
        try {

            setCheck(true)
            setEndloading(true)

            const endtime = await axios.put(`${Config.api}/endvehicle/${id}`)
            console.log(endtime)
            setEndloading(false)
            const getvehice = await axios.get(`${Config.api}/getvehicle/${id}`,{
                headers:{
                  "Authorization":localStorage.getItem("parking"),
                }
            })
            setvehicleendtime(getvehice.data)
            console.log(getvehice.data)

            setEndloading(false)
            getVehicle()

        } catch (error) {
            alert("something went wrong")
        }
    }

    const done = () => {
        setCheck(false)
    }

    const back = () => {
        navigate("/parking")
    }

    return (
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            {
                check ? vehicleendtime.map(get => {
                    return (
                        <div className='popup'>
                            {
                                endloading ? <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
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
                                </div> : <div>
                                    <h6 style={{ fontWeight: "bold" }}>VehicleName:   <span style={{ color: "white" }}>{get.vehicle_name}</span></h6>
                                    <h6 style={{ fontWeight: "bold" }}>VehicleNo:      <span style={{ color: "white" }}>{get.vehicleNo}</span></h6>
                                    <h6 style={{ fontWeight: "bold" }}>EndDate:        <span style={{ color: "white" }}>{get.endDate}</span></h6>
                                    <h6 style={{ fontWeight: "bold" }}>EndTime:        <span style={{ color: "white" }}>{get.endTime}</span></h6>
                                    <h6 style={{ fontWeight: "bold" }}>TotalAmount:    <span style={{ color: "white" }}>Rs.{get.totalAmount}</span></h6>

                                    <div>
                                        <button type="button" className='btn btn-primary' onClick={done}>Done</button>
                                    </div>
                                </div>
                            }

                        </div>

                    )
                }) : null
            }

            <div className='container' style={{ position: "fixed", top: "0px" }}>
                <div className='mx-auto' style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                    <form class="row g-3" >
                        <div class="col-auto  mt-5">
                            <label for="inputPassword2" class="visually-hidden" >Search VehicleNo</label>
                            <input type="text" class="form-control" placeholder='search vehicle number'
                                value={findvehicle}
                                onChange={(e) => setfindvehicle(e.target.value.toUpperCase())} />
                        </div>
                        <div class="col-auto  mt-5">
                            <button className='btn btn-primary' onClick={back}>Back</button>
                        </div>
                    </form>

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
                                    : getVehicledata.filter(v => v.vehicleNo.toUpperCase().includes(findvehicle)).map(get => {
                                        return (
                                            <tr >

                                                <th className='getdata'>{get._id}</th>
                                                <th className='getdata'>{get.client_name}</th>
                                                <th className='getdata'>{get.vehicle_name}</th>
                                                <th className='getdata'>{get.vehicleNo}</th>
                                                <th className='getdata'>{get.startdate}</th>
                                                <th className='getdata'>{get.starttime}</th>
                                                <th className='getdata'>{get.status}</th>
                                                <th className='getdata'>
                                                    <button type="button" className='btn btn-primary endbtn' style={{ color: "black" }} onClick={() => end(get._id)}>End</button>
                                                </th>
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

export default Endtime