import * as React from 'react';

interface Row {
    Col1: string;
    Col2: string;
    Col3: string;
    Index: number;
}

interface MainState {
    Entries: Row[];
    EditMode: boolean;

}

export class Main extends React.Component<{}, MainState> {

    constructor() {
        super();

        //Alternatively we can fetch this data from a db.
        this.state = {
            Entries: [
                {
                    Col1: "Entry1",
                    Col2: "Entry2",
                    Col3: "Entry3",
                    Index: 0
                },
                {
                    Col1: "Entry4",
                    Col2: "Entry5",
                    Col3: "Entry6",
                    Index: 1
                },
                {
                    Col1: "Entry7",
                    Col2: "Entry8",
                    Col3: "Entry9",
                    Index: 2
                }
            ],
            EditMode: false
        };
    }

    UpdateRow = (e: any, pos: number, index: number) => {

        let oldEntries = this.state.Entries;
        console.log(oldEntries);
        let row = oldEntries[index];
        row[pos] = e.target.value;
        
        oldEntries[index] = row;
        
        // This is an anti-pattern!
        // State should be immutable, and we should use 
        // the immutability helpers instead
        this.setState({
            Entries: oldEntries
        });

    }

    ChangeMode = () => {
        this.setState({
            EditMode: !this.state.EditMode
        });
    }

    render() {
        const body = this.state.EditMode ?
            this.state.Entries.map(x => <EditEntry Row={x} Update={this.UpdateRow} />) :
            this.state.Entries.map(x => <ViewEntry Index={x.Index} Col1={x.Col1} Col2={x.Col2} Col3={x.Col3} />);

        return (
            <div className="main">
                <a href="#" onClick={this.ChangeMode}>Edit</a>
                {body}
            </div>
        );
    }
}

const ViewEntry = (props: Row) =>
    <div className="Entry">
        <p>{props.Col1}</p>
        <p>{props.Col2}</p>
        <p>{props.Col3}</p>
    </div>;

interface EditEntryProps {
    Row: Row;
    Update(e: any, pos: number, index: number): void;
}

const EditEntry = (props: EditEntryProps) =>
    <div className="view">
        <input onChange={(e) => props.Update(e, 0, props.Row.Index)} value={props.Row.Col1} />
        <input onChange={(e) => props.Update(e, 1, props.Row.Index)} value={props.Row.Col2} />
        <input onChange={(e) => props.Update(e, 2, props.Row.Index)} value={props.Row.Col3} />
    </div>;