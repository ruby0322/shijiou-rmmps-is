import WaitingListHistory from './WaitingListHistory';
import WaitingListPending from './WaitingListPending';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';

const WaitingListDashboard = () => {
    return (
        <Routes>
            <Route path='/pending' element={<WaitingListPending />} />
            <Route path='/history/' element={<WaitingListHistory />} />
        </Routes>
    );
}

export default WaitingListDashboard;
