import { useEffect, useState, useContext } from "react";
import {
  Avatar,
  Card,
  Container,
  Grid,
  Typography,
  Stack,
  Divider,
} from "@mui/material";
import { fetchData } from "../services/api/";
import DataList from "../components/DataList";
import DataView from "../components/DataView";
import SelectContext from "../hooks/SelectContext";

const Campaigns: React.FC = () => {
  const [campaigns, setCampaigns] = useState<Brand[]>([]);
  const { selected, setSelected } = useContext(SelectContext);

  const type = "Campaigns";

  useEffect(() => {
    (async () => {
      const data = await fetchData(type);
      if (data) {
        setCampaigns(data);
      }
      setSelected({});
    })();
  }, []);

  return (
    <Container maxWidth="xl" sx={{ my: 5 }}>
      <Typography variant="h2" component="h1" color="initial">
        {type}
      </Typography>
      <Grid container spacing={10}>
        <Grid item xs={12} md={5}>
          <DataList type={type} data={campaigns} />
        </Grid>
        <Grid item xs={12} md={7}>
          <Grid container>
            <DataView type={type} selected={selected} />
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Campaigns;
