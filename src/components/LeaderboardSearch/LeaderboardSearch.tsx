import { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { history } from '../App/App';
import { ROUTES } from '../constants';

export const LeaderboardSearch = () => {
  const [codeInput, setCodeInput] = useState('');
  const handleSearchForEvent = async () => {
    history.push(`/${ROUTES.LEADERBOARD}/${codeInput}`);
  };

  return (
    <div className='manage'>
      <h2 className='blue-text'>Leaderboard</h2>
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
