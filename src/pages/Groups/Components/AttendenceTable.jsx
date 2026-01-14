import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { Dropdown, Table } from "react-bootstrap";
import { useTheme } from "../../../Context/Context";
import { Link } from "react-router-dom";

const AttendenceTable = ({ currentStudents, studentsData, setCurrentStudents }) => {
     const { theme } = useTheme()

     const [weekStart, setWeekStart] = useState(() => {
          const d = new Date();
          const day = d.getDay();
          const diff = day === 0 ? -6 : 1 - day;
          d.setDate(d.getDate() + diff);
          d.setHours(0, 0, 0, 0);
          return d;
     })

     const [currentPage, setCurrentPage] = useState(1)
     const pageSize = 5

     const monthNames = ["Yanvar", "Fevral", "Mart", "Aprel", "May", "Iyun", "Iyul", "Avgust", "Sentyabr", "Oktabr", "Noyabr", "Dekabr"]
     const weekdaysUz = ["Dushanba", "Seshanba", "Chorshanba", "Payshanba", "Juma", "Shanba", "Yakshanba"]

     const weekDates = Array.from({ length: 7 }, (_, i) => {
          const d = new Date(weekStart)
          d.setDate(weekStart.getDate() + i)
          return d
     })

     const formatUz = d => `${d.getDate()} ${monthNames[d.getMonth()]}`

     const changeWeek = dir => setWeekStart(d => {
          const n = new Date(d)
          n.setDate(n.getDate() + dir * 7)
          setCurrentPage(1)
          return n
     })

     const getStatusForStudent = (s, date) => s.attendance?.find(a => a.date === date.toISOString().slice(0, 10))?.status ?? null

     const renderBadge = (status) => {
          if (status === 'bor') return <span className="px-2 py-1 rounded-3" style={{ background: "#00a85425", color: "#00a854" }}>✓ Bor</span>
          if (status === 'yoq') return <span className="px-2 py-1 rounded-3" style={{ background: "#ff4d4d25", color: "#ff4d4d" }}>✕ Yo'q</span>
          if (status === 'kech') return <span className="px-2 py-1 rounded-3" style={{ background: "#ffd66a25", color: "#c48a07" }}>⌛ Kech</span>
          return <span className="text-muted">—</span>
     }

     const handleSetAttendance = (studentId, date, status) => {
          const dateStr = date.toISOString().slice(0, 10)

          setCurrentStudents(prev => prev.map(s => s.id !== studentId ? s : ({
               ...s,
               attendance: (() => {
                    const att = Array.isArray(s.attendance) ? [...s.attendance] : []
                    const idx = att.findIndex(a => a.date === dateStr)
                    if (idx >= 0) att[idx].status = status
                    else att.push({ date: dateStr, status })
                    return att
               })()
          })))

          const g = studentsData.find(st => st.id === studentId)
          if (g) {
               const att = Array.isArray(g.attendance) ? [...g.attendance] : []
               const idx = att.findIndex(a => a.date === dateStr)
               if (idx >= 0) att[idx].status = status
               else att.push({ date: dateStr, status })
               g.attendance = att
          }
     }

     useEffect(() => {
          setCurrentPage(1)
     }, [currentStudents])

     return (
          <>
               <div className="d-flex align-items-center gap-1 my-3">
                    <button
                         className="btn btn-sm border d-flex justify-content-center align-items-center"
                         onClick={() => changeWeek(-1)}
                         style={{
                              background: theme ? "#f1f1f1" : "#15263a",
                              width: "30px", height: "30px"
                         }}
                    >
                         <Icon icon="akar-icons:chevron-left" width="17" height="17" />
                    </button>

                    <div className="px-1 rounded" style={{ color: theme ? '#000' : '#fff' }}>
                         {formatUz(weekDates[0])} - {formatUz(weekDates[6])} {weekDates[6].getFullYear()}
                    </div>

                    <button
                         className="btn btn-sm border d-flex justify-content-center align-items-center"
                         onClick={() => changeWeek(1)}
                         style={{
                              background: theme ? "#f1f1f1" : "#15263a",
                              width: "30px", height: "30px"
                         }}
                    >
                         <Icon icon="akar-icons:chevron-right" width="17" height="17" />
                    </button>
               </div>

               <Table striped hover className="mt-2">
                    <thead>
                         <tr>
                              <th>O'quvchi</th>
                              {weekDates.map((d, idx) => (
                                   <th key={idx} className="text-center">
                                        {weekdaysUz[d.getDay() === 0 ? 6 : d.getDay() - 1]}
                                        <div className="fs-3">{d.getDate()}</div>
                                   </th>
                              ))}
                         </tr>
                    </thead>

                    <tbody>
                         {currentStudents.slice((currentPage - 1) * pageSize, currentPage * pageSize).map((student) => (
                              <tr key={student.id}>
                                   <td>
                                        <Link to={`/students/${student.id}`}>{student.name}</Link>
                                   </td>

                                   {weekDates.map((d, i) => {
                                        const status = getStatusForStudent(student, d)
                                        return (
                                             <td key={i} className="text-center fs-2">
                                                  <div className="cursor-pointer position-relative">
                                                       <Dropdown className="position-absolute" autoClose="outside inside" onClick={(e) => e.stopPropagation()}>
                                                            <Dropdown.Toggle id="" style={{ background: 'transparent', border: 'none' }}>
                                                                 {renderBadge(status)}
                                                            </Dropdown.Toggle>

                                                            <Dropdown.Menu onClick={(e) => e.stopPropagation()}>
                                                                 {[
                                                                      { k: 'bor', label: 'Bor', icon: '✓', style: { background: '#00a854', color: '#fff' } },
                                                                      { k: 'yoq', label: "Yo'q", icon: '✕', style: { background: '#ff4d4d', color: '#fff' } },
                                                                      { k: 'kech', label: 'Kech', icon: '⌛', style: { background: '#c48a07', color: '#fff' } }
                                                                 ].map(o => (
                                                                      <Dropdown.Item as="button" key={o.k} onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleSetAttendance(student.id, d, o.k) }}>
                                                                           <div className="d-flex align-items-center gap-2">
                                                                                <span className="px-2 py-1 rounded" style={o.style}>{o.icon}</span>
                                                                                <span>{o.label}</span>
                                                                           </div>
                                                                      </Dropdown.Item>
                                                                 ))}
                                                            </Dropdown.Menu>
                                                       </Dropdown>
                                                  </div>
                                             </td>
                                        )
                                   })}
                              </tr>
                         ))}
                    </tbody>
               </Table>
          </>
     )
}

export default AttendenceTable