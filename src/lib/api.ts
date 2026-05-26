// import axios from "axios";

// const API = axios.create({
//   // baseURL: "http://localhost:5000/api",
//   baseURL: "http://192.168.1.13:5000/api", // ✅ Your Node.js backend URL
// });

// export default API;
import axios from "axios";

let apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || "";
if (apiBaseUrl && !apiBaseUrl.endsWith("/api") && !apiBaseUrl.endsWith("/api/")) {
  apiBaseUrl = apiBaseUrl.endsWith("/") ? `${apiBaseUrl}api` : `${apiBaseUrl}/api`;
}

const API = axios.create({
  baseURL: apiBaseUrl,
});

export default API;
