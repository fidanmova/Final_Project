import { Theme } from "react-daisyui";

const Layout = ({ children }) => {
  return <Theme dataTheme="dark">{children}</Theme>;
};

export default Layout;
