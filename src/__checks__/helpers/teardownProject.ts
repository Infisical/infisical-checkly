import axios from "axios";

export const teardownProject = async ({
  accessToken,
  projectId
}: {
  accessToken: string;
  projectId: string;
}) => {
  await axios.delete(`${process.env.SITE_URL}/api/v1/workspace/${projectId}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`
    }
  });
};
