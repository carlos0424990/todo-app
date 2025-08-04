import dotenv from 'dotenv';

dotenv.config();

interface Config {
  PORT: number;
  DB_URI:string;
  SECRET:string;
}

const config: Config = {
  PORT: Number(process.env.PORT) || 3000,
  DB_URI:process.env.DB_URI||"",
  SECRET:process.env.SECRET||''
};

export default config;