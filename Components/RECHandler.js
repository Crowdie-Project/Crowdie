//LICENSE GOES HERE

import {RECHandler} from 'rec-handler';

const RECH = new RECHandler();
//w000000t
//We've got webpack so we can use the csv-loader loader to init!
RECH.init();

export {RECH as RECHandler};