import { HttpClient, HttpParams } from "@angular/common/http";
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
        return new ServerDataSourceWithNullFilter(this.httpClient, {
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

class ServerDataSourceWithNullFilter extends ServerDataSource {
    constructor(http: HttpClient, conf?: ServerSourceConf | {}) {
        super(http, conf);
    }

    addFilterRequestParams(httpParams: HttpParams) {
        if (this.filterConf.filters) {
            this.filterConf.filters.forEach((fieldConf) => {
                if (fieldConf['search'] || fieldConf['search'] === null) {
                    let value = fieldConf['search'] || '';
                    httpParams = httpParams.set(this.conf.filterFieldKey.replace('#field#', fieldConf['field']), value);
                }
            });
        }
        return httpParams;
    }
}