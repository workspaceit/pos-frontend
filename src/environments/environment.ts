// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.


const environmentConst = {
  baseUrl:'http://192.168.1.67:8080/dccpos',
  // baseUrl:'http://163.53.151.2:8080/dccpos',
};


export const environment = {
  production: false,
  baseUrl:environmentConst.baseUrl,
  apiUrl: environmentConst.baseUrl+'/api',
  authApiUrl: environmentConst.baseUrl+'/auth',
  oAuthApiUrl: environmentConst.baseUrl+'/oauth',
  imgUrl: environmentConst.baseUrl+'/common/',
};
