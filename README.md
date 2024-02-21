# DentriCare

<div  align="center">
<svg width="100" height="100" viewBox="0 0 2000 2000" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_3_2)">
<path d="M212.966 925.634C5.35399 495.446 48.2666 275.91 431.478 74.0269C89.5347 352.187 89.5346 780.943 641.131 852.403C1021.64 901.698 1203.95 932.721 1385.85 1122.29C1651.6 1399.27 1387.02 1918.51 1344.5 1927.25C1169.1 1963.27 1188.11 1603.02 1110.64 1261.67C1072.84 1095.13 861.875 1099.85 815.942 1242.18C774.011 1372.11 758.066 1620.74 721.45 1784.92C690.74 1887.09 668.889 1933.15 583.256 1933.15C497.622 1933.15 395.748 1798.47 345.845 1349.67C318.547 1161.12 285.989 1071 212.966 925.634Z" fill="#2D53DA" stroke="#2D53DA" stroke-width="7"/>
<path d="M1260.67 140.171C1167.24 197.081 1064.01 207.496 977.782 143.124C977.782 143.124 894.511 65.7583 666.55 84.6565C438.588 103.555 320.776 239.468 360.633 456.128C391.704 625.032 653.557 713.618 1074.05 783.306C1314.41 823.141 1597.03 1036.57 1616.19 1274.66C1636.5 1527 1566.32 1686.91 1413.63 1923.11C1570.12 1883.97 1654.58 1781.38 1791 1226.83C1838.08 1035.48 1884.9 1045.52 1938.65 594.323C1988.36 176.956 1602.61 -68.1283 1260.67 140.171Z" fill="#1DCEF5" stroke="#1DCEF5" stroke-width="7"/>
</g>
<defs>
<clipPath id="clip0_3_2">
<rect width="40" height="40" fill="white"/>
</clipPath>
</defs>
</svg>
</div>
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
   3.2. `.env` file, and configure your environment variables using this template
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
