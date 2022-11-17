import { factory } from "./factory";

class Store2 {
    #schemas;
    #tables;
    #dataset;
    #factory;

    #createSchema(schema) {
        const schemaObj = this.#factory.create('Schema', schema);
        schemaObj.table = {};
        // store
        this.#schemas[schemaObj.tableName] = schemaObj;
        this.#tables[schemaObj.tableName] = schemaObj.table;
    }

    async #loadIntoTablesAsync(schemas, data) {
        return await new Promise((resolve, reject) => {
            for(let schema of schemas) {
                for(let item of data) {
                    const obj = this.#factory.create(schema.tableName, item);
        
                    if (!schema.table.hasOwnProperty(obj[schema.primaryKey]))
                        schema.table[obj[schema.primaryKey]] = obj;
        
                    if (schema.initCount === 0)
                        this.#dataset.push(obj);
                }
            }

            resolve(schemas);
        });
    }

    #addTableRelationships(schemas) {
        schemas.filter(schema => schema.relation).forEach(childSchema => {

            const parentSchema = this.#schemas[childSchema.relation];
            const children = Object.values(childSchema.table);

            Object.values(parentSchema.table)
                .forEach(
                    parent => parent[childSchema.tableName] = children
                        .filter(
                            child => child[parentSchema.primaryKey] === parent[parentSchema.primaryKey]));
        });
    }
    
    constructor(factory) {
        // Initialize schemas, tables, dataset object or array
        this.#schemas = {};
        this.#tables = {};
        this.#dataset = [];
        // assign factory service
        this.#factory = factory;
    }

    init(schema) {
        // check for passing config
        if (!schema) return this;
        schema.initCount = Object.keys(this.#schemas).length;
        this.#createSchema(schema);
        
        return this;
    }

    async loadAsync(data) {
        return await new Promise((resolve, reject) => {
            this.#loadIntoTablesAsync(Object.values(this.#schemas), data)
                .then((schemas) => this.#addTableRelationships(schemas));

            resolve();
        });
    }

    getUnique = (tableName) => Object.values(this.#tables[tableName]);
    getById = (tableName, id) => this.#tables[tableName][id];
    print = () => console.log(this.#tables);
}

export const store2 = new Store2(factory);