import { LocalDataSource } from 'ng2-smart-table';
import { EmptyCellEditComponent } from '../../../@common/components/table/emptyCellEditorComponent';
import { NumberCellEditComponent } from '../../../@common/components/table/numberCellEditComponent';
import { OrderAdditionalActionComponent } from '../../../@common/components/table/orderAdditionalAction.component';
import { PhotoCellEditComponent } from '../../../@common/components/table/photoCellEditComponent';
import { PhotoCellRenderComponent } from '../../../@common/components/table/photoCellRenderComponent';
import { EnumDisplayMap } from '../enumDisplayMap';

export const defaultInlineTableSettings = (columns: {}) => {
    return {
        add: {
            addButtonContent: '<i class="nb-plus"></i>',
            createButtonContent: '<i class="nb-checkmark"></i>',
            cancelButtonContent: '<i class="nb-close"></i>',
            confirmCreate: true,
        },
        edit: {
            editButtonContent: '<i class="nb-edit"></i>',
            saveButtonContent: '<i class="nb-checkmark"></i>',
            cancelButtonContent: '<i class="nb-close"></i>',
            confirmSave: true
        },
        delete: {
            deleteButtonContent: '<i class="nb-trash"></i>',
            confirmDelete: false,
        },
        columns: columns
    }
};

export const enumValuePrepareFunction = (type: string) => {
    return (cell, row) => !!cell && EnumDisplayMap[type][cell] ? EnumDisplayMap[type][cell] : undefined;
}

export const filterEditorForEnum = (type: string, toExclude?: string[] | number[], isString: boolean = false) => {
    return {
        type: "list",
        config: {
            selectText: "Select...",
            filterFunction: (a, b) => {
                return a == b
            },
            list: [
                { value: '', title: 'Not set' },
                ...Object.keys(EnumDisplayMap[type])
                    .map(key => ({
                        value: isString ? key: Number(key),
                        title: EnumDisplayMap[type][key],
                    }))
                    .filter(pair => !toExclude || (toExclude as Array<string | number>).indexOf(pair.value) < 0),
            ],
        },
    }
}

export const enumColumn = (title: string, type: string, toExclude?: string[] | number[], isString?: boolean) => (
    {
        title: title,
        valuePrepareFunction: enumValuePrepareFunction(type),
        filter: filterEditorForEnum(type, toExclude, isString),
        editor: filterEditorForEnum(type, toExclude, isString),
    }
);

export const stringColumn = (title: string, valuePrepareFunction?: (value: string) => string, disableFilter?: boolean) => (
    {
        title: title,
        type: 'text',
        filter: !disableFilter,
        valuePrepareFunction: valuePrepareFunction
    }
);

export const reorderColumn = <T>(parentGetter: () => any, property: string, dataSource: LocalDataSource) => (
    {
        type: 'custom',
        filter: false,
        editor: {
            type: 'custom',
            component: EmptyCellEditComponent
        },
        renderComponent: OrderAdditionalActionComponent,
        onComponentInitFunction(instance: OrderAdditionalActionComponent<T>) {
            const parent = parentGetter();
            instance.setArray(property, parent);
            instance.down.subscribe((row) => {
                const index = parent[property].indexOf(row);
                if (index === parent[property].length - 1) return;

                parent[property].splice(index + 1, 0, parent[property].splice(index, 1)[0]);
                dataSource.load(parent[property]);
            });
            instance.up.subscribe((row) => {
                const index = parent[property].indexOf(row);
                if (index === 0) return;

                parent[property].splice(index - 1, 0, parent[property].splice(index, 1)[0]);
                dataSource.load(parent[property]);
            });
        },
    }
);

export const photoColumn = (title: string, disableFilter?: boolean) => (
    {
        title: 'Photo',
        editor: {
            type: 'custom',
            component: PhotoCellEditComponent
        },
        type: 'custom',
        filter: !!disableFilter,
        renderComponent: PhotoCellRenderComponent
    }
);

export const numberColumn = (title: string) => (
    {
        title: title,
        editor: {
            type: 'custom',
            component: NumberCellEditComponent
        }
    }
);

export const createLocalDataSource = (dataSource: LocalDataSource, parent: any, property: string) => {
    dataSource.load(parent[property] || []);
    dataSource.onChanged().subscribe(_ => {
        dataSource.getAll().then(all => {
            parent[property] = all;
        });
    });
}