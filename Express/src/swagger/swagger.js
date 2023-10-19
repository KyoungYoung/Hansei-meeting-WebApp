const swaggerAutogen = require('swagger-autogen')({ language: 'ko' });

const doc = {
  info: {
    version: '1.0.0',
    title: 'Hansei-Meeting-WebApp API',
    description: '한세 커뮤니티 다과회 API 문서',
    license:'kky',
  },
  host: ['localhost:8000', '15.164.51.24 '],      
  basePath: '/',
  schemes: ['http'],   
  consumes: [],  
  produces: ['application/json'], 
  tags: [        // by default: empty Array
    {
      name: 'user',         // Tag name
      description: '유저관련 API',  // Tag description
    },
    // { ... }
  ],
  securityDefinitions: {},  // by default: empty object
  definitions: {},          // by default: empty object (Swagger 2.0)
  components: {}            // by default: empty object (OpenAPI 3.x)
};

const outputFile = './src/swagger/swagger-output.json';
const endpointsFiles = ['./src/app.ts'];

/* NOTE: if you use the express Router, you must pass in the 
   'endpointsFiles' only the root file where the route starts,
   such as: index.js, app.js, routes.js, ... */

swaggerAutogen(outputFile, endpointsFiles, doc);