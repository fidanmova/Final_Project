import { ContextProvider } from "../utils/context/context";
import "../styles/globals.css";
import Layout from "../components/ui/Layout";
import "react-toastify/dist/ReactToastify.css";
import "mapbox-gl/dist/mapbox-gl.css";
import { ToastContainer, Flip } from "react-toastify";

function MyApp({ Component, pageProps }) {
  return (
    <ContextProvider>
      <Layout>
        <Component {...pageProps} />
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          transition={Flip}
        />
      </Layout>
    </ContextProvider>
  );
}

export default MyApp;
