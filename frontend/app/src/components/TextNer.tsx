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
          <Box component="span">{beforeText}</Box>
          <Box component="span" className={labelClass}>
            {entityTextContent}
          </Box>
        </React.Fragment>
      );
    });
    const lastText = text.substring(lastIndex);
    return (
      <Paper
        variant="outlined"
        className="entity-paper"
        sx={{ minWidth: "50vh", minHeight: "40vh", position: "relative" }}
      >
        {[
          ...entitySpans,
          <Box component="span" key="last">
            {lastText}
          </Box>,
        ]}

        <Box position="absolute" bottom={0} right={0}>
          <HorizontalLegend entities={entities} />
        </Box>
      </Paper>
    );
  };

  return <Box>{renderEntities()}</Box>;
};

export default TextNer;
