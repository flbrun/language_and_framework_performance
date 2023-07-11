import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import {FormControl, FormControlLabel, Radio, RadioGroup, Stack} from "@mui/material";
import ConfigurationButton from "./ConfigurationButton";
import {pink} from "@mui/material/colors";

const protocol = ['http://', 'https://'];
const methods = ['GET'];
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
                                configButton,
                                setConfigButton,
                            }) {
    return (
        <div className="Configuration-block">
            <div className="Configuration-framing">
                <h2 className="Configuration-headline">Server Selection</h2>

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
                    id="port"
                    label="Port"
                    sx={{ m: 1, width: '10ch' }}
                    variant="outlined"
                    value={port}
                    onChange={(e) => setPort(e.target.value)}
                />
            </div>

            <div className="Configuration-framing">
                <h2 className="Configuration-headline">Endpoint</h2>

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

            <div className="Configuration-framing">
                <h2 className="Configuration-headline">Test Configuration</h2>

                <FormControl>
                    <RadioGroup
                        aria-labelledby="test-selection"
                        name="test-selection"
                        value={testKind}
                        onChange={(e) => setTestKind(e.target.value)}
                    >
                        <FormControlLabel
                            value="seriell"
                            control={<Radio />}
                            label="Seriell"
                        />
                        <FormControlLabel
                            value="parallel"
                            control={<Radio />}
                            label="Parallel"
                        />
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
                        <TextField
                            size="small"
                            id="requestCount"
                            label="Requests"
                            sx={{ m: 1, width: 100 }}
                            variant="outlined"
                            onChange={(e) => setEndpoint(e.target.value)}/>
                        <TextField
                            size="small"
                            id="parallelCount"
                            label="Requests"
                            sx={{ m: 1, width: 100 }}
                            variant="outlined"
                            onChange={(e) => setEndpoint(e.target.value)}/>
                    </Stack>):
                    (
                        <TextField
                            size="small"
                            id="requestCount"
                            label="Requests"
                            sx={{ m: 1, width: 100 }}
                            variant="outlined"
                            onChange={(e) => setEndpoint(e.target.value)}/>
                    )

                }

                <ConfigurationButton callback={setConfigButton} />

            </div>
        </div>
    );
}