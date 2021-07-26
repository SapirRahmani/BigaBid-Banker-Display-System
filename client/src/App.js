import logo from './logo.svg';
import './App.css';
import SelectCampaign from './components/SelectCampaign';
import PandingBidsTable from './components/PandingBidsTable';

function App() {
  return (
    <div className="App">
      <SelectCampaign />
      <PandingBidsTable />
    </div>
  );
}

export default App;
