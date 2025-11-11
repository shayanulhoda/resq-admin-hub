import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

const data = [
  { name: "Vegetarian", value: 35 },
  { name: "Non-Veg", value: 28 },
  { name: "Vegan", value: 18 },
  { name: "Halal", value: 12 },
  { name: "Other", value: 7 },
];

const COLORS = [
  "hsl(145 100% 41%)",
  "hsl(24 92% 55%)",
  "hsl(145 80% 60%)",
  "hsl(24 80% 70%)",
  "hsl(0 0% 60%)",
];

export function CategoryDistribution() {
  return (
    <Card className="hover-lift border card-shadow">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          Restaurant Category Distribution
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) =>
                `${name} ${(percent * 100).toFixed(0)}%`
              }
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "0.5rem",
              }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
