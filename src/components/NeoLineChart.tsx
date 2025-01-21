'use client';

import { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { format, subMonths, eachDayOfInterval, formatISO } from 'date-fns';

interface NeoData {
  date: string;
  totalNeos: number;
  hazardousNeos: number;
}

interface NeoLineChartProps {
  apiKey: string;
}

interface NearEarthObject {
  is_potentially_hazardous_asteroid: boolean;
}

interface NasaApiResponse {
  near_earth_objects: {
    [date: string]: NearEarthObject[];
  };
}

export default function NeoLineChart({ apiKey }: NeoLineChartProps) {
  const [data, setData] = useState<NeoData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showHazardousOnly, setShowHazardousOnly] = useState(false);

  useEffect(() => {
    const fetchNeoData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Calculate date range for last 3 months
        const endDate = new Date();
        const startDate = subMonths(endDate, 3);
        
        // Get array of all dates in the interval
        const dateRange = eachDayOfInterval({ start: startDate, end: endDate });
        
        // Split dates into 7-day chunks (NASA API limit is 7 days per request)
        const weekChunks = [];
        for (let i = 0; i < dateRange.length; i += 7) {
          weekChunks.push(dateRange.slice(i, i + 7));
        }

        // Fetch data for each week chunk
        const allData: NeoData[] = [];
        
        for (const weekDates of weekChunks) {
          const weekStart = formatISO(weekDates[0], { representation: 'date' });
          const weekEnd = formatISO(weekDates[weekDates.length - 1], { representation: 'date' });
          
          const response = await fetch(
            `https://api.nasa.gov/neo/rest/v1/feed?start_date=${weekStart}&end_date=${weekEnd}&api_key=${apiKey}`
          );
          
          if (!response.ok) {
            throw new Error('Failed to fetch NEO data');
          }
          
          const weekData: NasaApiResponse = await response.json();
          
          // Process each day in the response
          Object.entries(weekData.near_earth_objects).forEach(([date, neos]) => {
            allData.push({
              date: format(new Date(date), 'MMM d'),
              totalNeos: neos.length,
              hazardousNeos: neos.filter((neo) => neo.is_potentially_hazardous_asteroid).length,
            });
          });
        }

        setData(allData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchNeoData();
  }, [apiKey]);

  if (loading) return <div>Loading NEO data...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="w-full h-full flex flex-col">
      <div className="mb-4 flex-none">
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            className="form-checkbox"
            checked={showHazardousOnly}
            onChange={(e) => setShowHazardousOnly(e.target.checked)}
          />
          <span className="ml-2">Show Potentially Hazardous Asteroids Only</span>
        </label>
      </div>
      <div className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 12 }}
              interval={6}  // Show every 7th date to avoid overcrowding
            />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip />
            <Legend />
            {!showHazardousOnly && (
              <Line
                type="monotone"
                dataKey="totalNeos"
                name="Total NEOs"
                stroke="#8884d8"
                dot={false}
              />
            )}
            <Line
              type="monotone"
              dataKey="hazardousNeos"
              name="Hazardous NEOs"
              stroke="#ff0000"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
