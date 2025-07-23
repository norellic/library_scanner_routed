// EditionsDotPlot.jsx
import { ScatterChart, Scatter, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const EditionsDotPlot = ({ data }) => {
  // Clean data
  const cleanedData = data.map(book => ({
    title: book.title,
    editions: book.edition_count || 0
  }));

  return (
    <div style={{ width: '100%', height: 400 }}>
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
