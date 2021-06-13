
// ENVIRONMENT
// import env from './config/env';
// console.log(env);
// console.log("__DEV__ ?",__DEV__);
// env contains env.SUPABASE_URL, env.SUPABASE_KEY
//
// NOTE: env.SUPABASE_URL and env.SUPABASE_KEY are ONLY
// available if __DEV__ is true, NULL otherwise. 

console.log(process.env);
console.log(process.ENV);

//import env from '../config/env';
import AsyncStorage from '@react-native-community/async-storage'

//SUPABASE IMPORTS
import { createClient } from '@supabase/supabase-js'

/*const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_KEY);

export {supabase};*/

/*export const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_KEY, {
  localStorage: AsyncStorage,
})*/

export const supabase = createClient(process.ENV.SUPABASE_URL, process.ENV.SUPABASE_KEY, {
  localStorage: AsyncStorage,
})

/*export const supabase = createClient(process.env.NPM_CONFIG_SUPABASE_URL, process.env.NPM_CONFIG_SUPABASE_KEY, {
  localStorage: AsyncStorage,
})*/