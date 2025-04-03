const {generateApi} = require('swagger-typescript-api');
const path = require('path');

const PATH = path.resolve(process.cwd(), "./src/types/domain");
const INPUT = path.resolve(process.cwd(), './openapi.yaml');

void generateApi({
    name: 'todo-list-api',
    input: INPUT,
    output: PATH,
    generateClient: false,
    generateUnionEnums: true
});