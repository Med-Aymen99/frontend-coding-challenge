import React, { useState } from 'react';

const FilterBar = ({ absencesData, setFilteredAbsences, setCurrentPage, absencesTypes}) => {
    const [typeFilter, setTypeFilter] = useState('');
    const [startDateFilter, setStartDateFilter] = useState('');
    const [endDateFilter, setEndDateFilter] = useState('');

    // filterOn : is used to show the cancel filter button when a filter is applied
    const [filterOn, setFilterOn] = useState(false);

    const filterAbsences = (e) => {
      e.preventDefault();
      let filtered = [...absencesData];
      if (typeFilter) filtered = filtered.filter(absence => absence.type.toLowerCase() === typeFilter);
      if (startDateFilter) filtered = filtered.filter(absence => absence.startDate === startDateFilter);
      if (endDateFilter) filtered = filtered.filter(absence => absence.endDate === endDateFilter);
      
      // The following line is used to show the cancel filter button when a filter is applied
      (endDateFilter || startDateFilter || typeFilter) && setFilterOn(true);
      
      setFilteredAbsences(filtered);
      setCurrentPage(1);
    };
    
    const filterReset = () => {
        setFilteredAbsences(absencesData);
        setTypeFilter('');
        setStartDateFilter('');
        setEndDateFilter('');
        setFilterOn(false);
    }

    return (
        <form onSubmit={filterAbsences} className="filter-bar">
            <label htmlFor="type" >Absence type : </label>
            <select 
                name="type"
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                placeholder="Filter by type"
            >
                <option value="" defaultValue >All </option>
                {absencesTypes.map((type, index) =>
                    <option key={index} value={type}>
                            {type}
                    </option>
                )}
            </select>
            
            <label htmlFor="startDate" >start Date : </label>
            <input
                name="startDate"
                id="startDate"
                type="date"
                value={startDateFilter}
                onChange={(e) => setStartDateFilter(e.target.value)}
            />
            <label htmlFor="endDate" >End Date : </label>
            <input
                name="endDate"
                id="endDate"
                type="date"
                value={endDateFilter}
                onChange={(e) => setEndDateFilter(e.target.value)}
            />
            <button type="submit" className="filter-button">Filter</button>
            { filterOn && 
                <button className="cancel-filter-button" onClick={() => filterReset()}>
                    cancel filter
                </button> 
            }

        </form>
    );
  };
  
  export default FilterBar;
  