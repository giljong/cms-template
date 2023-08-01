import { ThemeProvider } from 'styled-components';
import Root from './router';
import 'antd/dist/antd.less';
import theme from './styles/theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Root />
    </ThemeProvider>
  );
}

export default App;
