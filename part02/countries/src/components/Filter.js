const Filter = ({ filter, change }) => (
    <div>
        find countries
        <input value={filter} onChange={change}></input>
    </div>
);

export default Filter;