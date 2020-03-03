import React from "react";

import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from "recharts";

import {
  overallStats,
  categories,
} from "../../Constants/stats";

import "../../Styles/profile.css"; //TODO

class CategoryStats extends React.Component {
  render = () => {
    return (
        <Typography
        component="div"
        role="tabpanel"
        hidden={3 !== this.props.tab}
      >
        {3 === this.props.tab && (
          <Box p={3}>
            <RadarChart
              outerRadius={120}
              width={730}
              height={300}
              data={categories}
            >
              <PolarGrid />
              <PolarAngleAxis dataKey="name" />
              <PolarRadiusAxis angle={30} domain={[0, 40]} />
              <Radar
                dataKey="value"
                stroke="#446598"
                fill="#E49C2F"
                fillOpacity={0.5}
              />
            </RadarChart>
          </Box>
        )}
      </Typography>);
  };
}

export default CategoryStats;
