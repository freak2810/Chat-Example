import { config } from 'dotenv';

config();

export const env = {
	NODE_ENV: process.env.NODE_ENV || 'development',

	AWS_REGION: process.env.AWS_REGION || 'us-east-1',
	AWS_BUCKET_NAME: process.env.AWS_BUCKET_NAME!,
};
