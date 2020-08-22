import express from 'express';
import compression from 'compression';
import cors from 'cors';
import {IResolvers, makeExecutableSchema} from 'graphql-tools';
import { GraphQLSchema } from 'graphql';
import graphqlHTTP from 'express-graphql';

const app = express();
const PORT = 3000;
app.use('*', cors());
app.use(compression());

//definicion del Schema
const typeDefs = `
    type Query {
        hola: String!
        holaConNombre(nombre: String!): String!
        holaAlCursoGraphQl: String!
    }
`;
//definicion de los Resolvers
const resolvers: IResolvers = {
    Query: {
        hola(): string{
            return "Hola Mundo";
        },
        holaConNombre(__: void, {nombre}): string{
            return `Hola Mundo ${nombre}`;
        },
        holaAlCursoGraphQl(): string {
            return "Hola Mundo en el Curso de GraphQl"
        }
    }
};

//union de schema y resolvers
const schema: GraphQLSchema = makeExecutableSchema({
    typeDefs,
    resolvers
});

app.use('/', (re, res) => {
    res.send('Bienvenido a node');
});
//import graphQLHTTP from 'express-graphql';
app.use('/api', graphqlHTTP({
    schema,
    
    graphiql: true
}));

app.listen(
    {port: PORT},
    () => console.log(`Api =====> http://localhost:${PORT}/api/graphql`)
    
);