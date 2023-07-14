import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import {FormControl, FormControlLabel, Radio, RadioGroup, Stack, Tooltip} from "@mui/material";
import ConfigurationButton from "./ConfigurationButton";
import {pink} from "@mui/material/colors";

const protocol = ['http://', 'https://'];
const methods = ['GET'];

localStorage.setItem("adad", "asdasd")
export default function ConfigurationBlock({
                                selectedProtocol,
                                setSelectedProtocol,
                                serverName,
                                setServerName,
                                port,
                                setPort,
                                endpoint,
                                setEndpoint,
                                method,
                                setMethod,
                                testKind,
                                setTestKind,
                                requestNumber,
                                setRequestNumber,
                                parallelRequests,
                                setParallel,
                                configButton,
                                setConfigButton,
                            }) {
    return (
        <div className="Configuration-block">
            <div className="Generic-frame">
                <h2 className="Generic-headline">Server Selection</h2>

                <TextField
                    id="protocol"
                    sx={{ m: 1, width: '12ch' }}
                    select
                    value={selectedProtocol}
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
                    value={serverName}
                    onChange={(e) => setServerName(e.target.value)}
                />

                <p className="punctuation">:</p>

                <TextField
                    type="number"
                    id="port"
                    label="Port"
                    sx={{ m: 1, width: '10ch' }}
                    variant="outlined"
                    value={port}
                    onChange={(e) => setPort(e.target.value)}
                />
            </div>

            <div className="Generic-frame">
                <h2 className="Generic-headline">Endpoint</h2>

                <p className="punctuation">/</p>
                <TextField
                    id="endpoint"
                    label="Endpoint"
                    sx={{ m: 1, width: '40ch' }}
                    variant="outlined"
                    value={endpoint}
                    onChange={(e) => setEndpoint(e.target.value)}
                />

                <TextField
                    id="method"
                    sx={{ m: 1 }}
                    select
                    value={method}
                    onChange={(e) => setMethod(e.target.value)}
                >
                    {methods.map((option) => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </TextField>
            </div>

            <div className="Generic-frame">
                <h2 className="Generic-headline">Test Configuration</h2>

                <FormControl>
                    <RadioGroup
                        aria-labelledby="test-selection"
                        name="test-selection"
                        value={testKind}
                        onChange={(e) => setTestKind(e.target.value)}>

                        <FormControlLabel
                            value="seriell"
                            control={<Radio />}
                            label="Seriell"/>

                        <FormControlLabel
                            value="parallel"
                            control={<Radio />}
                            label="Parallel"/>

                        <FormControlLabel
                            value="Benchmark"
                            control={<Radio sx={{
                                color: pink[800],
                                '&.Mui-checked': {
                                    color: pink[600],
                                },
                            }}/>}
                            label="Benchmark"

                        />
                    </RadioGroup>
                </FormControl>
                {testKind === "parallel" ?
                    (<Stack>
                        <Tooltip title="Number of Requests you want to proceed" placement="top">
                            <TextField
                                type="number"
                                size="small"
                                id="requestCount"
                                label="Requests"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                sx={{ m: 1, width: 130}}
                                onChange={(e) => setRequestNumber(e.target.value)}/>
                        </Tooltip>
                        <Tooltip title="Number of Requests to run in parallel" placement="top">
                            <TextField
                                type="number"
                                size="small"
                                id="parallel"
                                label="Concurreny"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                sx={{ m: 1, width: 130}}
                                onChange={(e) => setParallel(e.target.value)}/>
                        </Tooltip>
                    </Stack>):
                    testKind === "seriell" ?
                    (
                        <Tooltip title="Number of Requests you want to proceed" placement="top">
                            <TextField
                                type="number"
                                size="small"
                                id="requestCount"
                                label="Requests"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                sx={{ m: 1, width: 130 }}
                                onChange={(e) => setRequestNumber(e.target.value)}/>
                        </Tooltip>
                    ):(<div style={{width:146}}></div>)
                }

                <ConfigurationButton callback={setConfigButton} />

            </div>
        </div>
    );
}