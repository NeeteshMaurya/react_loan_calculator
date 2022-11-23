
import Calculator from './Calculator';
import './App.css'
import ShowData from './ShowData';
import Paid from './Paid';

function App() {
  return (
    <div>
        <div className='container1'>
          <div className="card">
            <div className="card-body">
              <Calculator />
            </div>
          </div>
          <div className='container2'>
            <Paid />
          </div>
        </div>
        <div>
          <ShowData />
        </div>
    </div>
  );
}

export default App;
