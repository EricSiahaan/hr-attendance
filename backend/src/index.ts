import express from 'express';
import UserRoute from './app/User/Route';
import expressWs from 'express-ws';
import EmployeeRoute from './app/Employee/Route';
import AttendanceRoute from './app/Attendance/Route';
import PegawaiRoute from './app/Pegawai/Route'
import notFound from './middleware/404';
import handleError from './middleware/error-handler';

const app = express()
expressWs(app)
app.use(express.json());

const port = process.env.PORT || 3000

app.use("/api/v1/user", UserRoute);
app.use("/api/v1/employee", EmployeeRoute);
app.use("/api/v1/attendance", AttendanceRoute);
app.use("/api/v1/pegawai", PegawaiRoute)

app.use(notFound)

app.use(handleError)

app.listen(port, (): void => {
    console.log(`Server running on port ${port}`)
});