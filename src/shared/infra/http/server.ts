import { main } from "@shared/infra/http/main";
import { PostgresDataSource } from "../../../../ormconfig";




PostgresDataSource.initialize().then( () => {
    console.log('Postgres Data Source has been initialized!')
    main.init();
    main.listen();
}).catch((err) => {
    console.error("Error during Postgres Data Source initialization", err)
})