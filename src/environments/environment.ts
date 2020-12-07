// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig : {
    apiKey: 'AIzaSyCA06zFm_-bf9hHHgBY-uakCEr2InCoidQ',
    authDomain: 'spa-stay.firebaseapp.com',
    databaseURL: 'https://spa-stay.firebaseio.com',
    projectId: 'spa-stay',
    storageBucket: 'spa-stay.appspot.com',
    messagingSenderId: '944237622450',
    appId: '1:944237622450:web:3a5316ec1584e4589485ab',
    measurementId: 'G-4DQHY2CY4G'
  },
  apiUrl: 'http://localhost:5001/api'
};


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
