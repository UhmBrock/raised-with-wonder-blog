import React from 'react';

interface TableProps {
    data: Array< { [index: string]: any }>;
}

/**
 * Creates a table - Expects to be passed in a non-empty array.
 */
const DataTable: React.FunctionComponent<TableProps> = (props: TableProps) => {

    const columnNames = Object.keys(props.data[0]);
    
    let tableRows: Array<JSX.Element> = getTableRows(props);    

    return (
        <table className="table table-bordered table-hover">
            <thead>
                <tr>
                    {columnNames.map( (name: string) => { return <th>{name}</th> })}
                </tr>
            </thead>
            <tbody>
                { tableRows }
            </tbody>
            

        </table>
    )
}

function getTableRows(props: TableProps): Array<JSX.Element> {

    const columnNames = Object.keys(props.data[0]);

    const tableRows: Array<JSX.Element> = [];

    for(let i = 0; i < props.data.length ; i++) {
        
        let rowData = [];

        for(let name of columnNames) {

            rowData.push(
                <td>{props.data[i][name]}</td>
            )
        }

        tableRows.push( 
            <tr>
                {rowData}
            </tr>
        )
    }

    return tableRows;
}


export default DataTable;