import { Icon } from "@iconify/react"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useTheme } from "../../Context/Context"
import Back from "../../components/Ui/Back";
import { Card, Dropdown, Form, Nav, Tab, Table } from "react-bootstrap";
import studentsData from "../../data/Students.json"
import leadsData from "../../data/Leads.json"
import teacherData from "../../data/Teachers.json"
import roomData from "../../data/Rooms.json"
import Modal from "../../components/Ui/Modal";
import { Input } from "../../components/Ui/Input";
import StudentsTable from "./Components/StudentsTable";
import AttendenceTable from "./Components/AttendenceTable";
import Schedule from "./Components/Schedule";

const GroupDetalie = () => {
     const { id } = useParams()
     const { theme } = useTheme()

     const [addNewUser, setAddNewUser] = useState(false)
     const [changeGroup, setChangeGroup] = useState(false)
     const [changeAttande, setChangeAttande] = useState([])

     const [searchLead, setSearchLead] = useState(leadsData)
     const [changeGroupDate, setChangeGroupDate] = useState({})

     const [currentGroup, setCurrentGroup] = useState([])
     const [currentStudents, setCurrentStudents] = useState([])
     const [schedule_items, setSchedule_items] = useState([])

     const [activeTab, setActiveTab] = useState("students")
     const [changeActiveItem, setChangeActiveItem] = useState(null)

     useEffect(() => {
          const getGroups = async () => {
               try {
                    const res = await fetch(`https://erpbackend.pythonanywhere.com//api/v1/groups/${id}/`, {
                         headers: {
                              'Authorization': `Bearer ${localStorage.getItem("access_token")}`
                         }
                    })
                    const data = await res.json()

                    setCurrentGroup(data?.data)
                    setChangeGroupDate(data?.data)
                    setSchedule_items(data?.data?.schedule_items)
               }
               catch (err) {
                    console.log(err);
               }
          }
          getGroups()
     }, [])

     useEffect(() => {
          const studentsInGroup = studentsData.filter(st => st.group === currentGroup?.name)
          setCurrentStudents(studentsInGroup)
     }, [currentGroup])

     const handleSearch = (value) => {
          const filteredLeads = leadsData.filter(lead =>
               lead.name.toLowerCase().includes(value.toLowerCase()) ||
               lead.phone.includes(value)
          )
          setSearchLead(filteredLeads)
     }

     const handleSaveChanges = async () => {
          try {

          } catch (err) {
               console.error(err);
          }
     }

     useEffect(() => {
          const currentItem = schedule_items?.active?.find(s => s.id == changeActiveItem)

     }, [changeActiveItem])


     const t = currentGroup?.schedule_items?.active?.at(-1);

     return (
          <div onClick={() => changeAttande ? setChangeAttande([]) : setChangeAttande(changeAttande)}>

               {/* Guruh malumotlarini tahrirlash */}
               {changeGroup && (
                    <Modal
                         title="Guruh ma'lumotlarini tahrirlash"
                         close={setChangeGroup}
                         anima={changeGroup}
                         width="30%"
                    >
                         <Form className="mt-3">
                              <Form.Group className="mb-3">
                                   <Input
                                        label="Guruh nomi"
                                        required
                                        placeholder="Guruh nomi..."
                                        value={changeGroupDate.name}
                                        onChange={(e) => setChangeGroupDate({ ...changeGroupDate, name: e.target.value })}

                                   />
                              </Form.Group>
                              <Form.Group className="mb-3">
                                   <label htmlFor="teacher" className="form-label">O'qituvchi</label>
                                   <select
                                        required
                                        id="teacher"
                                        className="form-select"
                                        value={changeGroupDate.teacher}
                                        onChange={(e) => setChangeGroupDate({ ...changeGroupDate, teacher: e.target.value })}
                                   >
                                        <option hidden>O'qituvchi tanlang</option>

                                        {teacherData?.map((teacher) => (
                                             <option key={teacher.id} value={teacher.name}>
                                                  {teacher.name}
                                             </option>
                                        ))}
                                   </select>
                              </Form.Group>
                              <Form.Group className="mb-3">
                                   <label htmlFor="day" className="form-label">Dars kunlari</label>
                                   <select
                                        id="day"
                                        required
                                        className="form-select"
                                   // onChange={(e) => setChangeGroupDate({...changeGroupDate,})}
                                   >
                                        <option value="Juft kunlar">Juft kunlar</option>
                                        <option value="Toq kunlar">Toq kunlar</option>
                                        <option value="Ya, Pa, Sh">Ya, Pa, Sh</option>
                                        <option value="other">Boshqa kunlar</option>
                                   </select>
                              </Form.Group>
                              <div className="d-flex justify-content-between gap-3">
                                   <Input
                                        required
                                        type="date"
                                        label="Boshlanish sanasi"
                                        containerClassName="w-50"
                                        value={changeGroupDate.started_date}
                                        onChange={(e) => setChangeGroupDate({ ...changeGroupDate, started_date: e.target.value })}
                                   />
                                   <Input
                                        type="date"
                                        label="Tugash sanasi"
                                        containerClassName="w-50"
                                        value={changeGroupDate.ended_date}
                                        onChange={(e) => setChangeGroupDate({ ...changeGroupDate, ended_date: e.target.value })}

                                   />
                              </div>
                              <Form.Group className="mb-3">
                                   <label htmlFor="time" className="form-label">Dars boshlanish vaqti</label>
                                   <select
                                        id="time"
                                        required
                                        className="form-select"
                                        value={changeGroupDate.start_time}
                                        onChange={(e) => setChangeGroupDate({ ...changeGroupDate, start_time: e.target.value })}
                                   >
                                        <option value="09:00">08:00</option>
                                        <option value="09:00">09:00</option>
                                        <option value="10:30">10:30</option>
                                        <option value="12:00">12:00</option>
                                        <option value="13:30">14:00</option>
                                        <option value="15:00">15:30</option>
                                        <option value="15:00">17:00</option>
                                        <option value="15:00">18:30</option>
                                        <option value="other-time">Boshqa vaqt</option>
                                   </select>
                              </Form.Group>
                              <Form.Group className="mb-3">
                                   <label htmlFor="room" className="form-label">Xona</label>
                                   <select
                                        id="room"
                                        required
                                        className="form-select"
                                        value={changeGroupDate.room}
                                        onChange={(e) => setChangeGroupDate({ ...changeGroupDate, room: e.target.value })}
                                   >
                                        {roomData?.map((room) => (
                                             <option key={room.id} value={room.name}>
                                                  {room.name}
                                             </option>
                                        ))}
                                   </select>
                              </Form.Group>
                              <Form.Group className="mb-3">
                                   <label htmlFor="status" className="form-label">Holati</label>
                                   <select
                                        required
                                        id="status"
                                        className="form-select"
                                        value={changeGroupDate.status}
                                        onChange={(e) => setChangeGroupDate({ ...changeGroupDate, status: e.target.value })}
                                   >
                                        <option value="Faol">Faol</option>
                                        <option value="Faol emas">Faol emas</option>
                                        <option value="Tugagan">Tugagan</option>
                                        <option value="Arxivlangan">Arxivlangan</option>
                                        <option value="Kutilmoqda">Kutilmoqda</option>
                                        <option value="Muzlatilgan">Muzlatilgan</option>
                                   </select>
                              </Form.Group>
                              <Form.Group className="mb-3">
                                   <label htmlFor="desc" className="form-label">Izoh</label>
                                   <textarea
                                        rows="3"
                                        id="desc"
                                        placeholder="Izoh..."
                                        className="form-control"
                                        style={{ resize: "none" }}
                                        value={changeGroupDate.description}
                                        onChange={(e) => setChangeGroupDate({ ...changeGroupDate, description: e.target.value })}
                                   ></textarea>
                              </Form.Group>
                              <div className="d-flex justify-content-end gap-2 mt-4">
                                   <button
                                        type="button"
                                        className="btn btn-sm py-2 px-4"
                                        style={{ background: "#e5e5e5", color: "#000" }}
                                        onClick={() => setChangeGroup(false)}
                                   >
                                        Orqaga
                                   </button>
                                   <button
                                        type="submit"
                                        className="btn btn-sm py-2 px-4"
                                        style={{ background: "#0085db", color: "#fff" }}
                                        onClick={handleSaveChanges}
                                   >
                                        Saqlash
                                   </button>
                              </div>
                         </Form>
                    </Modal>
               )}

               {/* Yangi o'quvchi qoshish */}
               {addNewUser && (
                    <Modal
                         title="Guruhga yangi o'quvchi qo'shish"
                         close={setAddNewUser}
                         anima={addNewUser}
                         width="35%"
                    >
                         <Input
                              label="O'quvchini Lidlar ro'yxatidan tanlang"
                              placeholder="Lidlarni qidirish..."
                              type="search"
                              onChange={(e) => handleSearch(e.target.value)}
                         />
                         <div className="d-flex flex-column gap-15 mt-3" style={{ maxHeight: "300px", overflowY: "auto" }}>
                              {searchLead.map(lead => (
                                   <div
                                        className="d-flex justify-content-between align-items-center p-2 border rounded-3"
                                        key={lead.id}
                                   >
                                        <div className="d-flex align-items-center gap-3">
                                             <span
                                                  style={{ width: "40px", height: "40px", borderRadius: "50%", background: "#0881c2", color: "#fff" }}
                                                  className="d-flex align-items-center justify-content-center fs-4"
                                             >
                                                  {lead.name.charAt(0)}
                                             </span>
                                             <div className="d-flex flex-column">
                                                  <span className="fw-medium">{lead.name}</span>
                                                  <span className="fs-3">{lead.phone}</span>
                                             </div>
                                        </div>
                                        <button
                                             className="btn btn-sm"
                                             style={{ background: "#0881c2", color: "#fff" }}
                                        >
                                             <Icon icon="prime:user-plus" width="20" height="20" className="me-2" />
                                             Qo'shish
                                        </button>
                                   </div>
                              ))}
                         </div>
                    </Modal>
               )}

               {/* Dars JAdvallarini tahrirlash */}
               {changeActiveItem && (
                    <Modal
                         title="Jadvalni tahrirlash"
                         close={setChangeActiveItem}
                         anima={changeActiveItem}
                         width="40%"
                    >
                         
                    </Modal>
               )}






               <Back />

               <div className="d-flex w-100 justify-content-between align-items-start">
                    <div className="d-flex align-items-start gap-2">
                         <span
                              style={{ width: "45px", height: "45px", color: "#05c9ff", borderRadius: "8px", background: "#00a0ea25" }}
                              className="d-flex align-items-center justify-content-center "
                         >
                              <Icon icon="famicons:book-outline" width="25" height="25" />
                         </span>
                         <div className="d-flex flex-column">
                              <h3 className="lh-1 d-flex align-items-center gap-3">
                                   {currentGroup?.name}

                                   <span
                                        className="fs-2 px-2 py-1 text-capitalize py-1 rounded-3 border"
                                        style={{ color: !theme ? "#fff" : "#000" }}
                                   >
                                        {currentGroup?.status}
                                   </span>
                              </h3>
                              <span>
                                   {currentGroup?.description}
                              </span>
                         </div>
                    </div>

                    <div className="d-flex gap-3">
                         <button
                              className="btn btn-sm border py-2 px-3 fs-3"
                              style={{ color: !theme ? "#fff" : "#05112b" }}
                              onClick={() => setChangeGroup(true)}
                              id="bg-primary"
                         >
                              <Icon icon="line-md:pencil" className="me-1" width="20" height="20" />
                              Tahrirlash
                         </button>

                         <button
                              className="btn btn-sm py-2 px-3 fs-3"
                              style={{ border: "2px solid #cd3232", color: "#cd3232" }}
                         // onClick={() => setAddGroup(true)}
                         >
                              <Icon icon="iconamoon:trash" width="24" className="me-1" height="24" />
                              O'chirish
                         </button>
                    </div>
               </div>

               <div className="d-flex pt-4 justify-content-between align-items-center gap-3">
                    <div
                         className="card card-hover px-4 border py-4"
                         style={{ width: "33%" }}
                    >
                         <span className="fs-2">
                              <Icon icon="mage:user" width="18" height="18" className="me-2" />
                              O'qituvchi
                         </span>
                         <h6 className="fs-5 mt-2 text-capitalize">
                              {t ? `${t.teacher.first_name} ${t.teacher.last_name}` : "O'qituvchi"}
                         </h6>
                    </div>

                    <div
                         className="card card-hover px-4 border py-4"
                         style={{ width: "33%" }}
                    >
                         <spam className="fs-2">
                              <Icon icon="radix-icons:people" width="18" height="18" className="me-2" />
                              O'quvchilar
                         </spam>
                         <h6 className="fs-5 mt-2">{currentGroup?.students_count + " ta"}</h6>
                    </div>

                    <div
                         className="card card-hover px-4 border py-4"
                         style={{ width: "33%" }}
                    >
                         <spam className="fs-2">
                              <Icon icon="tabler:clock" width="18" height="18" className="me-2" />
                              Jadval
                         </spam>
                         <Dropdown autoClose="outside inside" className="mt-2">
                              <Dropdown.Toggle className="fs-5" style={{ background: 'transparent', border: 'none', padding: '0' }}>
                                   {t?.days_of_week.map(d => " " + d.code) + " | " + t?.begin_time.slice(0, 5)}
                              </Dropdown.Toggle>

                              <Dropdown.Menu>
                                   {currentGroup?.schedule_items?.active?.map(item => (
                                        <Dropdown.Item className="fs-4 rounded-2">
                                             {" " + item.days_of_week.map(d => d.code) + " | " + item.begin_time.slice(0, 5)}
                                        </Dropdown.Item>
                                   ))}
                              </Dropdown.Menu>
                         </Dropdown>
                    </div>

                    <div
                         className="card card-hover px-4 border py-4"
                         style={{ width: "33%" }}
                    >
                         <spam className="fs-2">
                              <Icon icon="lucide:calendar" width="18" height="18" className="me-2" />
                              Boshlanish
                         </spam>
                         <h6 className="fs-5 mt-2">
                              {currentGroup?.started_date || "Belgilanmagan"}
                         </h6>
                    </div>

                    <div
                         className="card card-hover px-4 border py-4"
                         style={{ width: "33%" }}
                    >
                         <spam className="fs-2">
                              <Icon icon="lucide:calendar" width="18" height="18" className="me-2" />
                              Tugashi
                         </spam>
                         <h6 className="fs-5 mt-2">
                              {currentGroup?.ended_date || "Belgilanmagan"}
                         </h6>
                    </div>
               </div>

               <Tab.Container activeKey={activeTab} onSelect={(k) => setActiveTab(k)} className="d-flex flex-column gap-2">
                    {/* Tabs Navigaye */}
                    <div
                         style={{ padding: "8px", background: theme ? "#f1f1f1" : "#111c2d", borderRadius: "8px", width: "365px" }}
                    >
                         <Nav variant="pills">
                              <Nav.Item>
                                   <Nav.Link
                                        eventKey="students"
                                        style={{
                                             cursor: "pointer",
                                             background: activeTab === "students" && !theme ? "#15263a" : activeTab === "students" && theme ? "#fff" : "transparent",
                                             color: activeTab === "students" && !theme ? "#fff" : theme ? "#000" : "#fff",
                                             borderRadius: "8px",
                                             fontSize: "14px"
                                        }}
                                   >
                                        <Icon icon="radix-icons:people" width="15" height="15" className="me-2" />
                                        O'quvchilar
                                   </Nav.Link>
                              </Nav.Item>
                              <Nav.Item>
                                   <Nav.Link
                                        eventKey="attendence"
                                        style={{
                                             cursor: "pointer",
                                             background: activeTab === "attendence" && !theme ? "#15263a" : activeTab === "schedule" && theme ? "#fff" : "transparent",
                                             color: activeTab === "attendence" && !theme ? "#fff" : theme ? "#000" : "#fff",
                                             borderRadius: "8px",
                                             fontSize: "14px"
                                        }}
                                   >
                                        <Icon icon="lucide:clipboard-list" width="15" height="15" className="me-2" />
                                        Davomat
                                   </Nav.Link>
                              </Nav.Item>
                              <Nav.Item>
                                   <Nav.Link
                                        eventKey="schedule"
                                        style={{
                                             cursor: "pointer",
                                             background: activeTab === "schedule" && !theme ? "#15263a" : activeTab === "schedule" && theme ? "#fff" : "transparent",
                                             color: activeTab === "schedule" && !theme ? "#fff" : theme ? "#000" : "#fff",
                                             borderRadius: "8px",
                                             fontSize: "14px"
                                        }}
                                   >
                                        <Icon icon="ion:calendar-outline" width="18" height="18" className="me-2" />
                                        Jadval
                                   </Nav.Link>
                              </Nav.Item>
                         </Nav>
                    </div>

                    <Tab.Content className="mt-3">
                         <Tab.Pane eventKey="students">
                              {/* O'quvchilar ro'yxati shu yerda bo'ladi */}
                              <Card>
                                   <Card.Body>
                                        <div className="d-flex align-items-center justify-content-between">
                                             <h5 className="fs-4 fw-medium">
                                                  <Icon icon="radix-icons:people" width="20" height="20" color="#00c8ff" className="me-2" />
                                                  O'quvchilar ro'yxati
                                             </h5>

                                             <button
                                                  className="btn btn-sm fs-3 py-2"
                                                  style={{ background: "#0881c2", color: "#fff" }}
                                                  onClick={() => setAddNewUser(true)}
                                             >
                                                  <Icon icon="prime:user-plus" width="20" height="20" className="me-2" />
                                                  O'quvchi qo'shish
                                             </button>
                                        </div>

                                        <StudentsTable currentStudents={currentStudents} />
                                   </Card.Body>
                              </Card>
                         </Tab.Pane>
                         <Tab.Pane eventKey="attendence">
                              {/* Davomat jadvali shu yerda bo'ladi */}
                              <Card>
                                   <Card.Body>
                                        <h5 className="fs-4 fw-medium">
                                             <Icon icon="lucide:clipboard-list" width="20" height="20" color="#00c8ff" className="me-2" />
                                             Davomat jadvali
                                        </h5>

                                        <AttendenceTable
                                             studentsData={studentsData}
                                             currentStudents={currentStudents}
                                             setCurrentStudents={setCurrentStudents}
                                        />

                                   </Card.Body>
                              </Card>
                         </Tab.Pane>
                         <Tab.Pane eventKey="schedule">
                              <Card>
                                   <Card.Body>
                                        <div className="d-flex align-items-center justify-content-between">
                                             <h5 className="fs-4 fw-medium">
                                                  <Icon icon="ion:calendar-outline" width="20" height="20" color="#00c8ff" className="me-2" />
                                                  Dars jadvali
                                             </h5>

                                             <button
                                                  className="btn btn-sm fs-3 py-1"
                                                  style={{ background: "#0881c2", color: "#fff" }}
                                                  onClick={() => setAddNewUser(true)}
                                             >
                                                  <Icon icon="prime:user-plus" width="20" height="20" className="me-2" />
                                                  Jadval qo'shish
                                             </button>
                                        </div>

                                        <Schedule schedule_items={schedule_items} setChange_items={setChangeActiveItem} />
                                   </Card.Body>
                              </Card>
                         </Tab.Pane>
                    </Tab.Content>
               </Tab.Container>
          </div>
     )
}

export default GroupDetalie