import express, { Request, Response } from 'express';
import axios from 'axios';
import cors from 'cors';

const app = express();
const PORT: number = 3000;

// Use CORS middleware
app.use(cors());

app.get('/ethereum-data', async (req: Request, res: Response) => {
  try {
    const response = await axios.get(
      "https://rest.cryptoapis.io/v2/market-data/assets/assetId/630629da4e66ce0983f2cd4d",
      {
        headers: {
          "Content-Type": "application/json",
          "X-Api-Key": "1478965ec63fd141d3094e98777f096f71ff95e2",
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
