const DropDownComp = ({ selectVal, setSelectVal, title, options }) => {
  return (
    <div>
      <select
        className="text-black w-[150px] font-bold outline-none border-none p-2"
        value={selectVal}
        onChange={(e) => setSelectVal(e.target.value)}
      >
        <option value="" disabled>
          {title}
        </option>

        {options.map((o, index) => (
          <option key={index} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropDownComp;
