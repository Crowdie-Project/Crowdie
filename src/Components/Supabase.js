
// ENVIRONMENT
// import env from './config/env';
// console.log(env);
// console.log("__DEV__ ?",__DEV__);
// env contains env.SUPABASE_URL, env.SUPABASE_KEY
//
// NOTE: env.SUPABASE_URL and env.SUPABASE_KEY are ONLY
// available if __DEV__ is true, NULL otherwise. 

import env from '../config/env';
import AsyncStorage from '@react-native-async-storage/async-storage'

//SUPABASE IMPORTS
import { createClient } from '@supabase/supabase-js'

/*const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_KEY);

export {supabase};*/

export const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_KEY, {
  localStorage: AsyncStorage,
})