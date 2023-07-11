
import './App.css';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import {useState} from "react";
import {Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Stack} from "@mui/material";

const protocol = [
    'http://',
    'https://',
  //  'ws://',
  //  'wss://',
];
const methods = [
    'GET',
  //  'POST',
 //   'DELETE',
 //   'PUT'
];

function App() {
    const [selectedProtocol, setSelectedProtocol] = useState('http://');
    const [serverName, setServerName] = useState('');
    const [port, setPort] = useState('');
    const [endpoint, setEndpoint] = useState('')
    const [method, setMethod] = useState('GET')
    const [isSerial, setIsSerial] = useState(true)

    const handleFormSubmit = (e) => {
        e.preventDefault();

        const url = selectedProtocol + serverName + ':' + port;


        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
            })
            .catch((error) => {
                console.error(error);
            });
    };
  return (
    <div className="App">
      <header className="App-header">
        <p>Response Checker</p>
      </header>
      <body>
          <div className="Element-block">
              <div className="Server-selection-border">
                  <h2 className="Server-selection-heading">Server Selection</h2>

                  <TextField
                      id="protocol"
                      sx={{ m: 1, width: '12ch' }}
                      select
                      defaultValue="http://"
                      onChange={(e) => setSelectedProtocol(e.target.value)}>
                      {protocol.map((option) => (
                          <MenuItem key={option} value={option}>{option}</MenuItem>
                      ))}
                  </TextField>

                  <TextField
                      id="serverName"
                      sx={{ m: 1 }}
                      label="Server"
                      variant="outlined"
                      onChange={(e) => setServerName(e.target.value)}/>

                  <p className="Colon">:</p>

                  <TextField
                      id="port"
                      label="Port"
                      sx={{ m: 1, width: '10ch' }}
                      variant="outlined"
                      onChange={(e) => setPort(e.target.value)}/>

              </div>
              <div className="Server-selection-border">
                  <h2 className="Server-selection-heading">Endpoint</h2>

                  <p className="Colon">/</p>
                  <TextField
                      id="endpoint"
                      label="Endpoint"
                      sx={{ m: 1, width: '50ch' }}
                      variant="outlined"
                      onChange={(e) => setEndpoint(e.target.value)}/>
                  <TextField
                      id="method"
                      sx={{ m: 1 }}
                      select
                      defaultValue="GET"
                      onChange={(e) => setMethod(e.target.value)}>
                      {methods.map((option) => (
                          <MenuItem key={option} value={option}>
                              {option}
                          </MenuItem>
                      ))}
                  </TextField>
              </div>
              <div className="Server-selection-border">
                  <h2 className="Server-selection-heading">Test Configuration</h2>

                  <FormControl>
                      <RadioGroup
                          aria-labelledby="test-selection"
                          name="test-selection"
                          value={isSerial}
                          onChange={(e) => setIsSerial(e.target.value)}>

                          <FormControlLabel value={true} control={<Radio />} label="Seriell" />
                          <FormControlLabel value={false} control={<Radio />} label="Parallel" />
                      </RadioGroup>
                  </FormControl>
                  <TextField
                      id="requestCount"
                      label="Requests"
                      sx={{ m: 1, width:150}}
                      variant="outlined"
                      onChange={(e) => setEndpoint(e.target.value)}/>
                  <Stack spacing={2} direction="row">
                      <Button variant="contained">Create Curl</Button>
                      <Button variant="contained">Run Checker</Button>
                  </Stack>

              </div>
          </div>

      </body>
    </div>
  );
}

export default App;
