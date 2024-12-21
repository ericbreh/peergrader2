
export default function Dashboard() {
    return (
        <div className="flex flex-col min-h-screen w-full">
            <header className="w-full py-8">
                <h1 className="text-6xl font-bold text-left pl-4 write-blue">Student Dashboard</h1>
            </header>

            <main className="flex-1 w-full">
                <div className="px-4 py-0 flex gap-8 mb-10">
                    <div className="flex flex-col flex-grow rounded-lg overflow-hidden shadow-lg">
                        <div className="white-blue-gradient p-5">
                            <p className="text-xl text-left text-white font-semibold">To-Do Assignments</p>
                        </div>
                        <div className="light-white flex-grow p-6">
                            <StudentListAllAsgn setCourseAssignmentsCount={setCourseAssignmentsCount} />
                        </div>
                    </div>

                    <div className="flex flex-col flex-grow rounded-lg overflow-hidden shadow-lg">
                        <div className="flex justify-between items-center white-blue-gradient p-5">
                            <p className="text-xl text-left text-white font-semibold">Courses Enrolled</p>
                            {/* <Button onClick={() => setShowModal(true)}>+ Join Course</Button> */}
                        </div>

                        <div className="min-h-[500px] light-white flex-grow p-6">
                            <div className="grid grid-cols-3 gap-8 flex-grow">
                                {/* {userCourses.map((courseData) => (
                  <CourseCard key={courseData.course_id} courseData={courseData} />
                ))} */}
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <footer className="shadow w-full font-bold p-4 bg-white text-center">
                <p>&copy;2024 PeerGrader</p>
            </footer>

            {/* <Modal show={showModal} onClose={() => setShowModal(false)}>
        <JoinCourse onClose={() => setShowModal(false)} />
      </Modal> */}
        </div>
    );
}
