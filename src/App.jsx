import { ConfigProvider } from "antd";
import { StyleProvider } from "@ant-design/cssinjs";
import "./App.css";
import Layout from "./components/layout";
import { theme } from "./theme/antThemeConfig";
import StreetView from "./pages/street-view";

function App() {
  return (
    <StyleProvider layer>
      <ConfigProvider theme={theme}>
        <Layout>
          <StreetView />
        </Layout>
      </ConfigProvider>
    </StyleProvider>
  );
}

export default App;
