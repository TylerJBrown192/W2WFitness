# Server Overview

* A Node.js server, utilising:
  * `express` for the server layer
  * `typeorm` as the ORM layer
  * `PostgreSQL` as the database layer (via `pg` node driver)
* Implementing 3-layer DDD - the end goal would be that each of these directories could be in their own repository / npm package, and consumed generically by all other packages
  * `index.ts` as the Controller layer, which will eventually be broken out into their own classes in `/src/controllers/`
  * `/src/domain/` as the Domain layer, implementing business logic
    * Right now, this is relying on the `getRepository` typeorm method, imported within the Domain layer. Once this gets more complex, we'll break it out into it's own server-exclusive layer, as any Server-related "getting" logic shouldn't be defined within this layer, only consumed
  * `/src/server` as the Server layer, for all isolatable Server logic, object definitions, etc

------------------------------------

## Project Startup

* TODO: Lay out server installation steps before all others
* Swap TSConfig over to ESConfig (can the frontend and backend share linters?)
* `$ npm ci`
* Ensure that Postgres is actively running (local machine only right now)
* `$ npm run dev`
  * Runs `ts-node` with the `-r / require` flag (for node process attachment / inspecting)
  * This will start the server, create the connection to the database, and run the database schema migration (IF NOT PRODUCTION, via `typeorm` configObject's `synchronize` key)
* If using VSCode:
  * Hit `F5` / run the `.vscode/launch.json` option `"Attach to Nodemon"`
  * When the list of running Node processes appears, select the process that says: `node '[filestructure]/npm_cli.js' run dev` (the command you just typed in)
  * You should see the terminal output: `Debugger attached.` with additional output like the `localhost:port/uuid` that the node inspector is attached to
  * This will attach VSCode to the actively running Node process, allowing for breakpoint setting within the IDE itself
* NOTE: This project does not currently hot-reload, by design. Though it'd be nice to get Controller layer hot-reloading, the Server layer / ORM integration has so many automatic jobs running on startup, we wouldn't want a potentially destructive migration happening on-save. Maybe I'll revisit this in the future

------------------------------------

## Interacting with TypeORM & the CLI

In general, one should primarily interact with TypeORM's CLI via the modified commands within `package.json` (`$ migration:run`, etc). This is because centralizing a TypeORM config file (located at `/src/server/config.ts`) and transpiling it from TS to JS on the fly is a bit more tedious than it seems.

### Generating Migrations

The `$ npm run migration:generate` command requires a 'Migration Name' argument to properly generate a Migration Class. To properly pass this to an `npm` script, execute something like this in your terminal:

`$ npm run migration:generate -- -n YourMeaningfulMigrationName`

------------------------------------

## TODO

* Create a Trello board of all of these, yikes...

* Either share ESLint definitions for both sides of the app, or bring the Server's own version down into here (TSLint depreciated)
* Migrate `Log` class name to `DailyLog`
* User / Admin Permissions <https://github.com/MichielDeMey/express-jwt-permissions>
* Read this and extrapolate lessons / tasks from it: <https://github.com/goldbergyoni/nodebestpractices#readme>
* Containerize application
* Unit testing & more
* Unify all options in `ormconfig.json` vs `config.ts`
* Add in a Location-based feature
  * Where did your workout take place?
* Research & implement `http2` node functionality w/ `http` v1 fallback
* Find best Express model validator
  * interop with typeORM classes? why not?
  * <https://github.com/typestack/class-validator>
    * <https://github.com/typeorm/typeorm/blob/master/docs/validation.md>
* Create Postman collection for all entities and include it in repo
* Find a good schema builder (postgres specific? or external application?) and include it in repo
* User auth
  * Potentially add a field to the Log table to make a daily Log publicly viewable?
* Create seed data
* Determine DB backup plan
* Research migrations for typeORM
  * <https://typeorm.io/#/migrations>
* Create field for attaching pictures to a daily Log
* Logging infrastructure
* Implement MongoDB for all read-heavy objects without relationships (Terminology)
