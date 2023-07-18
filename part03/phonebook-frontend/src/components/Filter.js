const Filter = ({ filter, change }) => (
    <div>
        filter shown with
        <input value={filter} onChange={change}></input>
    </div>
);

export default Filter;
