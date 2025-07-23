// EditionsDotPlot.jsx
import { ScatterChart, Scatter, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const EditionsDotPlot = ({ data }) => {
  // Clean data
  const cleanedData = data
    .filter(item => typeof item.edition_count === "number" && item.edition_count <= 200)
    .map(item => ({
      title: item.title,
      editions: item.edition_count
    }));

  return (
    <div style={{ width: '50%', height: 400 }}>
        <h3>Editions per Book (Max 200)</h3>
      <ResponsiveContainer>
        <ScatterChart
          margin={{ top: 20, right: 20, bottom: 40, left: 20 }}
        >
          <XAxis
            type="category"
            dataKey="title"
            name="Book Title"
            interval={0}
            angle={-45}
            textAnchor="end"
          />
          <YAxis type="number" dataKey="editions" name="Edition Count" />
          <Tooltip cursor={{ strokeDasharray: '3 3' }} />
          <Scatter name="Editions" data={cleanedData} fill="#82ca9d" />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EditionsDotPlot;
