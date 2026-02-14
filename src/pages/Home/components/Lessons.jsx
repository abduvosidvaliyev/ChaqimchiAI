import { Icon } from "@iconify/react"

const Lessons = ({ theme, upcomingLessons, setScheduleModal }) => {
    return (
        <div className="card glass-card p-4 border-0 mb-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h5 className={`fw-bold mb-1 ${!theme ? 'text-white' : 'text-dark'}`}>Yaqindagi darslar</h5>
                    <p className="text-muted small mb-0">Kelgusi 3 soat ichidagi darslar jadvali</p>
                </div>
                <button
                    className="btn btn-sm btn-link text-primary text-decoration-none fw-bold"
                    onClick={() => setScheduleModal(true)}
                >
                    Barcha darslar
                </button>
            </div>

            <div className="row g-3">
                {upcomingLessons.map((lesson) => (
                    <div className="col-12 col-md-4" key={lesson.id}>
                        <div className="p-3 rounded-4" style={{
                            background: !theme ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.02)',
                            borderTop: `1px solid ${!theme ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'}`,
                            borderRight: `1px solid ${!theme ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'}`,
                            borderBottom: `1px solid ${!theme ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'}`,
                            borderLeft: `4px solid ${lesson.color}`
                        }}>
                            <div className="d-flex justify-content-between align-items-start mb-2">
                                <div className={`fw-bold ${!theme ? 'text-white' : 'text-dark'}`}>{lesson.groupName}</div>
                                <div className="small text-primary fw-bold">{lesson.time.split(' ')[0]}</div>
                            </div>
                            <div className="text-muted small mb-1 d-flex align-items-center gap-1">
                                <Icon icon="ph:user-circle" /> {lesson.teacher}
                            </div>
                            <div className="text-muted small d-flex align-items-center gap-1">
                                <Icon icon="ph:door-open" /> {lesson.room}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Lessons