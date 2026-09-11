function Welcome() {
    return (
        <section className="welcome">

            <div className="welcome-content">

                <h1>
                    Welcome Back Student 👋
                </h1>

                <p>
                    Stay organized, complete your tasks
                    and achieve your goals.
                </p>

            </div>

            <div className="students">

                <img
                    src="/images/student-boy.png"
                    alt="Student boy"
                    className="student-boy"
                />

                <img
                    src="/images/student-girl.png"
                    alt="Student girl"
                    className="student-girl"
                />

            </div>

        </section>
    );
}

export default Welcome;