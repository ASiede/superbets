import { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { history } from '../App/App';

export const LeaderboardSearch = () => {
  const [codeInput, setCodeInput] = useState('');
  const handleSearchForEvent = async () => {
    history.push(`/leaderboard/${codeInput}`);
  };

  return (
    <div>
      <div>
        <InputText
          placeholder='Event Code'
          onChange={(e) => setCodeInput(e.target.value)}
        />
        <Button
          icon='pi pi-search'
          className='p-button-warning'
          onClick={handleSearchForEvent}
        />
      </div>
    </div>
  );
};

export default LeaderboardSearch;
