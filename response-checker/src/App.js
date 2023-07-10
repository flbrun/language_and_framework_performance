import logo from './logo.svg';
import './App.css';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

const protocoll = [
    {
        value: 'http://',
    },
    {
        value: 'https://',
    },
    {
        value: 'ws://',
    },
    {
        value: 'wss://',
    },
];

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>Response Checker</p>
      </header>
      <body>
          <div className="Server-selection">
              <div className="Server-selection-border">
                  <h2 className="Server-selection-heading">Server Selection</h2>

                  <TextField
                      id="outlined-select-currency"
                      sx={{ m: 1, width: '12ch' }}
                      select
                      label="Select"
                      defaultValue="http"
                  >
                      {protocoll.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                              {option.value}
                          </MenuItem>
                      ))}
                  </TextField>

                  <TextField
                      id="outlined-basic"
                      sx={{ m: 1 }}
                      label="Server"
                      variant="outlined"
                  />

                  <p className="Colon">:</p>

                  <TextField
                      id="outlined-basic"
                      label="Port"
                      sx={{ m: 1, width: '10ch' }}
                      variant="outlined"
                  />
              </div>
          </div>
      </body>
    </div>
  );
}

export default App;
