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

    UpdateRow = (e: any, pos: string, index: number) => {

        const oldRow = this.state.Entries[index];
        
        const newRow = oldRow;
        newRow[pos] = e.target.value;

        const oldEntries = this.state.Entries;
        oldEntries[index] = newRow;

        // This isn't too bad but we are mutating state a litte, and could use immutability helpers
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
    Update(e: any, pos: string, index: number): void;
}

const EditEntry = (props: EditEntryProps) =>
    <div className="view">
        <input onChange={(e) => props.Update(e, 'Col1', props.Row.Index)} value={props.Row.Col1} />
        <input onChange={(e) => props.Update(e, 'Col2', props.Row.Index)} value={props.Row.Col2} />
        <input onChange={(e) => props.Update(e, 'Col3', props.Row.Index)} value={props.Row.Col3} />
    </div>;