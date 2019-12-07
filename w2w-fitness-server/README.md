## TODO:

* Unify all options in `ormconfig.json` vs `config.ts`
* Find best Express model validator
  * interop with typeORM classes? why not?
  * <https://github.com/typestack/class-validator>
    * <https://github.com/typeorm/typeorm/blob/master/docs/validation.md>
* Create Postman collection for all entities and include it in repo
* Find a good schema builder (postgres specific? or external application?) and include it in repo
* Break out Express routes out per model & compose in `index.ts`
* Create seed data
* Determine DB backup plan
* Research migrations for typeORM
  * <https://typeorm.io/#/migrations>
* Create field for attaching pictures to a daily Log
* Logging infrastructure
