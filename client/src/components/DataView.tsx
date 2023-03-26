import { useState, useEffect, useContext } from "react";
import { useTheme, styled } from "@mui/material/styles";
import { Avatar, Card, Grid, Typography, Stack, Divider } from "@mui/material";

import InfluencerContext from "../hooks/SelectContext";

const Content = styled(Card)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  padding: "2rem",
  margin: "0 auto",
  width: "100%",
  minWidth: "100%",
  height: "100%",
  minHeight: "80vh",
  background: theme.palette.primary.main,
  borderRadius: "15px",
  boxShadow: "none",
  [theme.breakpoints.up("md")]: {
    // minWidth: "90%",
  },
}));

const Children = styled(Card)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  padding: "2rem",
  background: theme.palette.secondary.main,
  borderRadius: "15px",
  boxShadow: "none",
  cursor: "pointer",
}));

export default function DataView({ type, selected }: any) {
  const theme = useTheme();
  const [data, setData] = useState<any[]>([]);
  useEffect(() => {
    setData(selected);
  }, []);
  const { setSelected } = useContext(InfluencerContext);
  const handleCampaign = (id: string) => {
    fetch(`https://takumi-frontend-express-server.vercel.app/campaigns/${id}`)
      .then((response) => response.json())
      .then((data) => setSelected(data));
  };
  const handleInfluencer = (id: string) => {
    fetch(`https://takumi-frontend-express-server.vercel.app/influencers/${id}`)
      .then((response) => response.json())
      .then((data) => setSelected(data));
  };

  const getImageSrc = (obj: any): string | undefined => {
    const imageKeys = ["logo", "avatar", "coverImage"];
    const imageSrc = imageKeys.find((key) => obj[key]);
    return imageSrc ? obj[imageSrc] : undefined;
  };

  return (
    <>
      <Content>
        {!selected.id ? (
          <Typography
            variant="h4"
            component="p"
            sx={{ color: "white", textAlign: "center", mt: 5 }}
          >
            Select a {type.substring(0, type.length - 1)}
          </Typography>
        ) : (
          <>
            <Stack
              direction={{ xs: "column", md: "row" }}
              divider={<Divider orientation="vertical" flexItem />}
              spacing={3}
              sx={{
                background: theme.palette.secondary.main,
                borderRadius: "15px",
                p: 3,
              }}
            >
              <Avatar
                src={getImageSrc(selected)}
                sx={{ width: 200, height: 200, mb: 2 }}
              />
              <Stack
                direction="column"
                spacing={1}
                sx={{ justifyContent: "center" }}
              >
                <Typography variant="h3" component="h2" sx={{ color: "white" }}>
                  {selected.name
                    ? selected.name
                    : selected.firstName + " " + selected.lastName}
                </Typography>
                <Typography variant="body1" sx={{ color: "white" }}>
                  {selected.description && selected.description}
                </Typography>
                <Typography variant="body1" sx={{ color: "white" }}>
                  {selected.email && `Email: ${selected.email}`}
                </Typography>
                <Typography variant="body1" sx={{ color: "white" }}>
                  {selected.country && `Country: ${selected.country}`}
                </Typography>
                <Typography variant="body1" sx={{ color: "white" }}>
                  {selected.birthdate &&
                    `DOB: ${selected.birthdate.toString().split("T")[0]}`}
                </Typography>
                <Typography variant="body1" sx={{ color: "white" }}>
                  <b>ID:</b> {selected.id}
                </Typography>
              </Stack>
            </Stack>
            <Typography
              variant="h3"
              component="h2"
              sx={{
                color: "white",
                mt: 5,
                mb: 3,
                fontSize: "1.7rem",
                fontWeight: "700",
              }}
            >
              {selected.campaigns && "Campaigns:"}
              {selected.influencers && "Influencers:"}
            </Typography>

            <Grid container spacing={3}>
              {selected.campaigns?.map((campaign: any) => (
                <Grid item xs={12} md={4} key={campaign.id}>
                  <Children onClick={() => handleCampaign(campaign.id)}>
                    <Avatar
                      src={campaign?.coverImage}
                      sx={{ width: 60, height: 60, mr: 2 }}
                    />
                    <Typography
                      variant="body1"
                      sx={{
                        color: "white",
                        fontWeight: 600,
                      }}
                    >
                      {campaign.name}
                    </Typography>
                  </Children>
                </Grid>
              ))}
              {selected.influencers?.map((influencer: any) => (
                <Grid item xs={12} md={4} key={influencer.id}>
                  <Children onClick={() => handleInfluencer(influencer.id)}>
                    <Avatar
                      src={influencer?.avatar}
                      sx={{ width: 60, height: 60, mr: 2 }}
                    />
                    <Typography
                      variant="body1"
                      sx={{
                        color: "white",
                        fontWeight: 600,
                      }}
                    >
                      {influencer.firstName} {influencer.lastName}
                    </Typography>
                  </Children>
                </Grid>
              ))}
            </Grid>
            {/* </Stack> */}
          </>
        )}
      </Content>
    </>
  );
}
