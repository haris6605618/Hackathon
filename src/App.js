
// PAGES
import './App.scss';
import Dashboard from "./pages/Dashboard/Dashboard"
// SCSS
import  "./scss/sideBar.scss"
// ANTD
import { Divider,Layout } from 'antd';
import Sidebar from './components/Frontend/Sidebar';
import { Fade } from 'react-awesome-reveal';

function App() {
  
  
  return ( 
    <>
    <Layout >
                <Sidebar />
                <Layout className='bg-light d-flex flex-column min-vh-100'>
                    <main className='flex-grow-1'>
                        <Fade>
                        <Dashboard />
                        </Fade>
                    </main>
                </Layout>
            </Layout>
    </>
  );
}

export default App;
