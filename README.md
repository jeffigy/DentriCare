# DentriCare
<div align="center">
<img src="https://raw.githubusercontent.com/jeffigy/DentriCare/9dbae9bb44106d2e7358d8c878bf617c91a8271d/client/src/assets/logo.svg" style="width:100px;" >
</div>

### 

DentriCare is a simple dental management web application designed to simplify the task of dental practices. With DentriCare, dental clinics can efficiently manage patient record, appointments, payments, and dental notes and many more.

## Features

- Role-base access
- Patient Management
- Payment Tracking
- Appointment Scheduling
- Dental Notes Documentation
- Revenue filtering
- User Management

- Acitivity logging

- Procedure Listing

- Medical History Recording

## Technologies Used

###

<div  align="center">
<img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"  width="40"  alt="react logo" />
<img  width="12" />
<img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg"  width="40"  alt="typescript logo" />
<img  width="12" />
<img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg"  width="40"  alt="redux logo" />
<img  width="12" />
<img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg"  width="40"  alt="nodejs logo" />
<img  width="12" />
<img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg"  width="40"  alt="mongodb logo" />
</div>

## Installation

###

1. Clone the repository by copying the command below and paste it in your terminal.
   ```
   git clone https://github.com/jeffigy/DentriCare.git
   ```

###

2. Configure Client
3. 2.1. From the root folder change directory to client and install the dependencies.
   ```
   cd client
   yarn install
   ```
   2.2. Proceed to `src/app/api/apiSlice.ts` and change the **baseUrl** to `http://localhost:3000`.
   ```
   const baseQuery = fetchBaseQuery({
   baseUrl: "http://localhost:3000",
   ```
4. Configure Server
   3.1. From the root folder change directory to server and install the dependencies.
   ```
   cd server
   yarn install
   ```
   3.2. Create `.env` file at the root of the server folder, and configure your environment variables using this template
   ```
   NODE_ENV=development
   DATABASE_URI=
   ACCESS_TOKEN_SECRET=
   REFRESH_TOKEN_SECRET=
   ```
   3.3. Proceed `config/allowedOrigins.js` to change the current allowedOrigins to the client url, by default the client will run at `http://localhost:5173`
   ```
   const allowedOrigins = ["http://localhost:5173"];
   ```
5. You're all set now run the client and the server each on separate terminals
   ```
   cd client
   yarn dev
   ```
   ```
   cd server
   yarn dev
   ```
