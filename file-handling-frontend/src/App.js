import './App.css';
import ImageUpload from './components/imageUpload';
import ExcelDownload from './components/excelDownload';

function App() {
  return (
    <div className="App">
      <h1>Welcome to Reactjs</h1>
      <ImageUpload/>
      <ExcelDownload></ExcelDownload>
    </div>
  );
}

export default App;
