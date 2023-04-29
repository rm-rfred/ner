import { Box, Paper } from "@mui/material";
import React from "react";
import HorizontalLegend from "./HorizontalLegend";

type Entity = {
  text: string;
  label: string;
  start_char: number;
  end_char: number;
};

interface Props {
  text: string;
  entities: Entity[];
}

export const TextNer: React.FC<Props> = ({ text, entities }) => {
  const renderEntities = () => {
    let lastIndex = 0;
    const entitySpans = entities.map((entity, index) => {
      const { label, start_char, end_char } = entity;
      const beforeText = text.substring(lastIndex, start_char);
      const entityTextContent = text.substring(start_char, end_char);
      lastIndex = end_char;
      const labelClass = `entity-label-${label}`;
      return (
        <React.Fragment key={index}>
          <span>{beforeText}</span>
          <span className={labelClass}>{entityTextContent}</span>
        </React.Fragment>
      );
    });
    const lastText = text.substring(lastIndex);
    return (
      <Paper
        variant="outlined"
        className="entity-paper"
        sx={{ minWidth: "50vh", minHeight: "40vh" }}
      >
        {[...entitySpans, <span key="last">{lastText}</span>]}

        <HorizontalLegend entities={entities} />
      </Paper>
    );
  };

  return <Box>{renderEntities()}</Box>;
};

export default TextNer;
