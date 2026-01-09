import { useParams } from "react-router-dom"
import leadsData from "../../data/Leads.json"
import { useEffect, useState } from "react"
import { Icon } from "@iconify/react"

const LeadDetail = () => {
     const { id } = useParams()

     const [currentDate, setCurrentDate] = useState({})

     useEffect(() => {
          const currentLead = leadsData.find(l => l.id === Number(id))

          setCurrentDate(currentLead)
     }, [id])


     return (
          <>
               <div className="card py-3 px-3">
                    <table>
                         <tr>
                              <td className="fs-3">
                                   <span>
                                        O'quvchini ismi:
                                   </span>
                                   <span className="ms-1 fw-bold">
                                        {currentDate?.name}
                                   </span>
                              </td>
                              <td className="fs-3">
                                   <span>
                                        Ro'yhatga olingan sanasi:
                                   </span>
                                   <span className="ms-1 fw-bold">
                                        {currentDate.date}
                                   </span>
                              </td>
                              <td className="fs-3">
                                   <span>
                                        Telefon raqam:
                                   </span>
                                   <span className="ms-1 fw-bold">
                                        {currentDate.phone}
                                   </span>
                              </td>
                              <td className="fs-3">
                                   <button className="btn btn-sm py-2 px-2 text-white" style={{ background: "#0085db" }}>
                                        <Icon icon="formkit:email" width="20" height="18" className="me-2" />
                                        <span className="fs-2">
                                             SMS Yuborish
                                        </span>
                                   </button>
                              </td>
                         </tr>
                    </table>
               </div>

               <div className="card py-3 px-3">
                    <table className="table">
                         <tr className="border-bottom">
                              <td className="py-2">Kurs</td>
                              <td className="py-2">Kun</td>
                              <td className="py-2">Ota-Onasi</td>
                              <td className="py-2">Ota-Onasining telifon raqami</td>
                              <td className="py-2">
                                   Izoh
                              </td>
                              <td></td>
                         </tr>
                         <tr >
                              <td>{currentDate.course}</td>
                              <td>{currentDate.time}</td>
                              <td>{currentDate.parent}</td>
                              <td>{currentDate.parent_phone}</td>
                              <td>{currentDate.description}</td>
                              <td className="d-flex justify-content-center align-items-center gap-2">
                                   <button className="mt-3 btn btn-sm btn-outline-success d-flex justify-content-center align-items-center gap-1">
                                        <Icon icon="qlementine-icons:plus-16" width="16" height="16" />
                                        <span>Guruhga qo'shish</span>
                                   </button>
                                   <button className="mt-3 btn btn-sm btn-outline-warning d-flex justify-content-center align-items-center gap-1">
                                        <Icon icon="flowbite:close-circle-outline" width="24" height="24" />
                                        <span>O'chirish</span>
                                   </button>
                              </td>
                         </tr>
                    </table>
               </div>
          </>
     )
}

export default LeadDetail