import { Brush, CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { useState } from "react";

export const DurationOverTime = ({ responses }) => {
    const [brushData, setBrushData] = useState({});
    const [data, setData] = useState([{ x: 0, y: 0 }]);

    // function createDatafield() {
    //     return responses.map((response, index) => {
    //         return { x: index, y: response.duration };
    //     });
    // }

    const handleBrushChange = (data) => {
        setBrushData(data);
    };

    // setData(createDatafield());

    return (
        <ResponsiveContainer width={500} height={500}>
            <LineChart data={responses}>
                <XAxis dataKey="index" label={{ value: "Request Index", position: "insideBottom" }} />
                <YAxis label={{ value: "Duration in ms", angle: -90, position: "insideLeft", offset: 20 }} />
                <CartesianGrid stroke="#f5f5f5" />
                <Line type="monotone" dataKey="duration" stroke="#0074fe" dot={false} yAxisId={0} />
                <Brush dataKey="index" height={30} stroke="#0074fe" onChange={handleBrushChange} />
            </LineChart>
        </ResponsiveContainer>
    );
};
