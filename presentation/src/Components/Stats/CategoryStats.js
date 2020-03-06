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
  categories,
} from "../../Constants/stats";

import "../../Styles/profile.css"; //TODO

class CategoryStats extends React.Component {
  render = () => {
    return (
        <Typography
        component="div"
        role="tabpanel"
        hidden={2 !== this.props.tab}
      >
        {2 === this.props.tab && (
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

            <ul className="stats_list">
              <li className="stats_list_item">
                {`Most popular category this month: ${"Criminal"}`}
              </li>
              <li className="stats_list_item">
                {`Average categories per quiz: ${2}`}
              </li>
              <li className="stats_list_item">
                {`Percentage of categories covered: ${68}%`}
              </li>
              <li className="stats_list_item">
                {`All categories covered: ${"Corporate, Tax, Criminal, Civil Rights, Immigration, Health"}`}
              </li>
   
            </ul>
          </Box>
        )}
      </Typography>);
  };
}

export default CategoryStats;
