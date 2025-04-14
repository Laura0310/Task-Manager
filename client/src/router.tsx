import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout';
import Tasks from './components/tasks/Tasks';

const AppRouter = () => {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path='/' element={<Tasks />} />
                </Routes>
            </Layout>
        </Router>
    );
};

export default AppRouter;
