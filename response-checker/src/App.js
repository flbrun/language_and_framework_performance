
import './App.css';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import {useState} from "react";

const protocol = [
    'http://',
    'https://',
  //  'ws://',
  //  'wss://',
];

function App() {
    const [selectedProtocol, setSelectedProtocol] = useState('http://');
    const [serverName, setServerName] = useState('');
    const [port, setPort] = useState('');

    const handleFormSubmit = (e) => {
        e.preventDefault();

        const url = selectedProtocol + serverName + ':' + port;

        // Perform your GET request with the constructed URL
        // Example using fetch:
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                // Handle the response data as needed
                console.log(data);
            })
            .catch((error) => {
                // Handle any error that occurred during the request
                console.error(error);
            });
    };
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
                      id="protocol"
                      sx={{ m: 1, width: '12ch' }}
                      select
                      label="Select"
                      defaultValue="http://"
                      onChange={(e) => setSelectedProtocol(e.target.value)}
                  >
                      {protocol.map((option) => (
                          <MenuItem key={option} value={option}>
                              {option}
                          </MenuItem>
                      ))}
                  </TextField>

                  <TextField
                      id="serverName"
                      sx={{ m: 1 }}
                      label="Server"
                      variant="outlined"
                      onChange={(e) => setServerName(e.target.value)}
                  />

                  <p className="Colon">:</p>

                  <TextField
                      id="port"
                      label="Port"
                      sx={{ m: 1, width: '10ch' }}
                      variant="outlined"
                      onChange={(e) => setPort(e.target.value)}
                  />
              </div>
          </div>
      </body>
    </div>
  );
}

export default App;
