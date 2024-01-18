import swaggerAutogen from 'swagger-autogen';
import Path from 'path';
import fs from 'fs';
import { createGenerator } from 'ts-json-schema-generator';

const doc = {
  info: {
    version: 'v1.0.0',
    title: 'Swagger Demo Project',
    description: 'Implementation of Swagger with TypeScript',
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: '',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
      },
    },
    schemas: {},
  },
};

const outputFile = './swagger_output.json';
let endpointFiles = [];

const routeDir = Path.join(__dirname, 'Routes');

const files = fs.readdirSync(routeDir).forEach(async (file) => {
  if (file.endsWith('.ts') || file.endsWith('.js')) {
    const filePath = Path.join(routeDir, file);
    const fileBase = file.split('.')[0];

    const im = await import(filePath);

    const schemas = im[fileBase].schemas;

    const config = {
      path: filePath,
      tsconfig: Path.join(__dirname, '..', 'tsconfig.json'),
      type: '*', // Or <type-name> if you want to generate schema for that one type only
    };

    let defObj: any = createGenerator(config).createSchema(config.type);

    if (schemas) {
      schemas.forEach((schema) => {
        doc.components.schemas[schema] = defObj.definitions[schema].properties;
      });
    }

    endpointFiles.push(filePath);
  }
});

swaggerAutogen({ openapi: '3.0.0' })(outputFile, endpointFiles, doc);
