const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);

  //config.module.rules = [];

  //console.info("DID WE WAIT?");
  //console.info(config);
  // Customize the config before returning it.

  /*config.target='node',
  config.externals = {
  	"fs":"commonjs fs"
  };*/

  config.module.rules.push(
  {
    test: /\.csv$/,
    loader: 'csv-loader',
    //use: ['csv-loader'],
    options: {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true
    }
  }
  );

  /*config.module.rules.push(
  {
    test: /\.(c|d|t)sv$/,
    use: ['dsv-loader']
  }
  );*/

  //console.info("FORGET ME NOT!");
  console.info(config.module.rules);


  // // load all .csv, .dsv, .tsv files with dsv-loader
  //   // or dsv-loader?delimiter=,

  return config;
};
