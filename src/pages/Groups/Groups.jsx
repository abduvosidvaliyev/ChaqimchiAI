import { Icon } from "@iconify/react"
import { useEffect, useState } from "react"
import { Form, Table } from "react-bootstrap"
import Modal from "../../components/Ui/Modal"
import teacherData from "../../data/Teachers.json"
import roomData from "../../data/Rooms.json"
import { Input } from "../../components/Ui/Input"
import { useNavigate } from "react-router-dom"
import { useTheme } from "../../Context/Context"

const Groups = () => {
  const navigate = useNavigate()

  const { theme } = useTheme()

  const [addGroup, setAddGroup] = useState(false)
  const [groupsData, setGroupsData] = useState([])

  useEffect(() => {
    const getGroups = async () => {
      try {
        const res = await fetch("https://erpbackend.pythonanywhere.com/api/v1/groups/", {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem("access_token")}`
          }
        })
        const data = await res.json()
        setGroupsData(data?.data)
        console.log(data?.data);

      }
      catch (err) {
        console.log(err);
      }
    }
    getGroups()
  }, [])


  return (
    <>

      {/* Modal for add new group */}
      {addGroup && (
        <Modal
          title="Yangi guruh qo'shish"
          close={setAddGroup}
          anima={addGroup}
          width="30%"
        >
          <Form>
            <Form.Group className="mb-3">
              <Input
                label="Guruh nomi"
                required
                placeholder="Masalan: Frontend 1"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <label htmlFor="teacher" className="form-label">O'qituvchi</label>
              <select className="form-select" id="teacher" required>
                <option value="">O'qituvchi tanlang</option>

                {teacherData?.map((teacher) => (
                  <option key={teacher.id} value={teacher.name}>
                    {teacher.name}
                  </option>
                ))}
              </select>
            </Form.Group>
            <Form.Group className="mb-3">
              <label htmlFor="day" className="form-label">Dars kunlari</label>
              <select className="form-select" id="day" required>
                <option value="Juft kunlar">Juft kunlar</option>
                <option value="Toq kunlar">Toq kunlar</option>
                <option value="Ya, Pa, Sh">Ya, Pa, Sh</option>
                <option value="other">Boshqa kunlar</option>
              </select>
            </Form.Group>
            <div className="d-flex justify-content-between gap-3">
              <Form.Group className="w-50">
                <Input
                  label="Boshlanish sanasi"
                  type="date"
                  required
                />
              </Form.Group>
              {/* <Form.Group className="w-50"> */}
              <Input
                label="Tugash sanasi"
                type="date"
                containerClassName="w-50"
              />
              {/* </Form.Group> */}
            </div>
            <Form.Group className="mb-3">
              <label htmlFor="time" className="form-label">Dars boshlanish vaqti</label>
              <select className="form-select" id="time" required>
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
              <select className="form-select" id="room" required>
                {roomData?.map((room) => (
                  <option key={room.id} value={room.name}>
                    {room.name}
                  </option>
                ))}
              </select>
            </Form.Group>
            <Form.Group className="mb-3">
              <label htmlFor="status" className="form-label">Holati</label>
              <select className="form-select" id="status" required>
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
              <textarea className="form-control" id="desc" rows="3" style={{ resize: "none" }} placeholder="Izoh..."></textarea>
            </Form.Group>
            <div className="d-flex justify-content-end gap-2 mt-4">
              <button
                type="button"
                className="btn btn-sm py-2 px-4"
                style={{ background: "#e5e5e5", color: "#000" }}
                onClick={() => setAddGroup(false)}
              >
                Orqaga
              </button>
              <button
                type="submit"
                className="btn btn-sm py-2 px-4"
                style={{ background: "#0085db", color: "#fff" }}
              >
                Saqlash
              </button>
            </div>
          </Form>
        </Modal>
      )}


      <div className="d-flex w-100 justify-content-between align-items-start">
        <div className="d-flex align-items-start gap-2">
          <span
            style={{ width: "40px", height: "40px", color: "#05c9ff", borderRadius: "8px", background: "#00a0ea25" }}
            className="d-flex align-items-center justify-content-center "
          >
            <Icon icon="radix-icons:people" className="fs-6" />
          </span>
          <div className="d-flex flex-column">
            <h3 className="lh-1">Guruhlar</h3>
            <span>
              Jami {5} ta guruh
            </span>
          </div>
        </div>

        <button
          className="btn btn-sm text-white py-2 px-3 fs-3"
          style={{ background: "#0085db" }}
          onClick={() => setAddGroup(true)}
        >
          <Icon icon="qlementine-icons:plus-16" className="me-1" width="16" height="16" />
          Yangi guruh
        </button>
      </div>

      <div className="">
        <Table striped hover className="mt-4">
          <thead>
            <tr>
              <th>
                №
              </th>
              <th>
                Guruh nomi
              </th>
              <th>
                Kurs
              </th>
              <th>
                Kun
              </th>
              <th>
                Dars vaqti
              </th>
              <th>
                O'qituvchi
              </th>
              <th>
                O'quvchilar soni
              </th>
              <th>
                Xona
              </th>
              <th>
                Guruh holati
              </th>
            </tr>
          </thead>
          <tbody>
            {groupsData?.map((group) => (
              <tr
                key={group.id}
                className="cursor-pointer"
                onClick={() => navigate(`/groups/${group.id}`)}
              >
                <td className="text-capitalize">{group.id}</td>
                <td className="text-capitalize">{group.name}</td>
                <td className="text-capitalize">{group.course_name}</td>
                <td className="text-capitalize">{group.day}</td>
                <td className="text-capitalize">{group.time}</td>
                <td className="text-capitalize">{group.teacher}</td>
                <td className="text-capitalize">
                  <Icon icon="radix-icons:people" className="fs-5 me-2" />
                  {group.student_count || 0}
                </td>
                <td className="text-capitalize">{group.room}</td>
                <td className="text-capitalize">
                  <span className="px-3 fs-2 py-1 rounded-3 border" style={{ color: !theme ? "#fff" : "#000" }}>
                    {group.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  )
}

export default Groups 