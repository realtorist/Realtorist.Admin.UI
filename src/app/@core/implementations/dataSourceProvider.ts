import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ServerDataSource } from "ng2-smart-table";
import { DataSource } from "ng2-smart-table/lib/lib/data-source/data-source";
import { ServerSourceConf } from "ng2-smart-table/lib/lib/data-source/server/server-source.conf";
import { environment } from "../../../environments/environment";
import { IDataSourceProvider } from "../abstractions/dataSourceProvider";
import { apiServerUrl } from './serverUrl';

@Injectable()
export class DataSourceProvider extends IDataSourceProvider {
    private readonly baseUrl = `${apiServerUrl()}/api/admin/`
    constructor(private readonly httpClient: HttpClient) {
        super();
    }
    
    getDataSourceForTable(endPoint: string): DataSource {
        return new ServerDataSource(this.httpClient, {
            endPoint: `${this.baseUrl}${endPoint}`,
            pagerLimitKey: "limit",
            pagerPageKey: "page",
            dataKey: "results",
            totalKey: "totalRecords",
            sortFieldKey: 'sortField',
            sortDirKey: 'sortOrder',
            filterFieldKey: 'filter[#field#]'
          } as ServerSourceConf);
    }

}