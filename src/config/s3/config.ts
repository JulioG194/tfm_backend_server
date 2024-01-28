import { S3Client } from "@aws-sdk/client-s3";
import { fromIni } from "@aws-sdk/credential-provider-ini";
import 'dotenv/config';

export const s3Client = new S3Client({
  region: process.env.AWS_REGION ?? '',
  credentials: fromIni({ profile: 'default' }),
});

