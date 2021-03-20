import {SUPABASE_URL, SUPABASE_KEY} from '@env';

const devEnvironmentVariables = {
  SUPABASE_URL: SUPABASE_URL,
  SUPABASE_KEY: SUPABASE_KEY,
};

const prodEnvironmentVariables = {
};

export default __DEV__ ? devEnvironmentVariables : prodEnvironmentVariables;