import { DataSource } from "ng2-smart-table/lib/lib/data-source/data-source";

export abstract class IDataSourceProvider {
    abstract getDataSourceForTable(endPoint: string): DataSource;
}