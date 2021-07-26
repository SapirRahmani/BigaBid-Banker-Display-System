import { useEffect, useState } from "react";
import axios from "axios";
import { MenuItem } from "@material-ui/core";
import Select from "@material-ui/core/Select";

const SelectCampaign = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [currentCampaign, setCurrentCampaign] = useState("");

  const getCampaigns = async () => {
    try {
      const campaignsData = await axios.get("http://localhost:8000/campaigns");

      console.log(campaignsData);
      return campaignsData.data;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(async () => {
    setCampaigns(await getCampaigns());
  }, []);
  return (
    <Select
      value={currentCampaign}
      onChange={(e) => {
        setCurrentCampaign(e.target.value);
      }}
    >
      {campaigns.map((campaign) => {
        return <MenuItem value={campaign}>{campaign}</MenuItem>;
      })}
    </Select>
  );
};

export default SelectCampaign;
