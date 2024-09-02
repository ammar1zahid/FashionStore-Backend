import {BrowserRouter,Routes,Route} from 'react-router-dom';
import PaymentPage from './pages/payment/payment';
import SuccessPage from './pages/payment/success';


function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PaymentPage/>}></Route>   
          <Route path="/success" element={<SuccessPage/>}></Route>   
        </Routes>
      </BrowserRouter> 
      
    </>
  )
}

export default App
