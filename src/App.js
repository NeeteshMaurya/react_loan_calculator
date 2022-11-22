
import Calculator from './Calculator';
import './App.css'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';



function App() {
  return (
    <div className='container'>
      <div className="card mx-auto">
        <div className="card-body">
          <Calculator />
        </div>
      </div>

    </div>
  );
}

export default App;
