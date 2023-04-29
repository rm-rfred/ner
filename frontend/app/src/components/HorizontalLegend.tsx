import { Box, Grid, Stack } from "@mui/material";
import React from "react";

interface Entity {
  text: string;
  label: string;
  start_char: number;
  end_char: number;
}

interface Props {
  entities: Entity[];
}

const ENTITY_COLORS: { [key: string]: string } = {
  CARDINAL: "rgb(235, 103, 123)",
  DATE: "orange",
  EVENT: "yellowgreen",
  FAC: "rosybrown",
  GPE: "purple",
  LANGUAGE: "rgb(160, 95, 16)",
  LAW: "rgb(246, 201, 246)",
  LOC: "green",
  MONEY: "rgb(184, 99, 99)",
  NORP: "rgb(101, 190, 198)",
  ORDINAL: "rgb(156, 206, 168)",
  ORG: "red",
  PERCENT: "rgb(85, 107, 158)",
  PERSON: "blue",
  PRODUCT: "rgb(192, 55, 66)",
  QUANTITY: "rgb(84, 44, 19)",
  TIME: "rgb(119, 255, 0)",
  WORK_OF_ART: "rgb(15, 88, 88)",
};

const HorizontalLegend: React.FC<Props> = ({ entities }) => {
  return (
    <>
      {entities.map((entity) => (
        <Grid container>
          <Grid item>
            <Stack
              direction="row"
              spacing={0}
              alignItems="center"
              justifyContent="flex-end"
            >
              <Box
                style={{
                  backgroundColor:
                    ENTITY_COLORS[entity.label as keyof typeof ENTITY_COLORS],
                  height: "15px",
                  width: "15px",
                  marginRight: "5px",
                }}
              />
              <Box>{entity.label}</Box>
            </Stack>
          </Grid>
        </Grid>
      ))}
    </>
  );
};

export default HorizontalLegend;
