import "../styles/globals.css";
import Layout from "../components/ui/Layout";
import "react-toastify/dist/ReactToastify.css";
import "mapbox-gl/dist/mapbox-gl.css";
import { ToastContainer, Flip } from "react-toastify";

function MyApp({ Component, pageProps }) {
    return (
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
    );
}

export default MyApp;
