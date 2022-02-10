import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import Event from '../Event/Event';
import { setEvent } from '../../actions';
import { StateType, SnackbarType, EventMode } from '../../Types';
import './ConfirmAnswers.css';

const COPY_TO_CLIPBOARD = 'Copy To Clipboard';
const COPIED_TO_CLIPBOARD = 'Copied To Clipboard!';

export const ConfirmAnswers = ({
  manageSnackbars
}: {
  manageSnackbars: SnackbarType[];
}) => {
  const event = useSelector((state: StateType) => state.selectedEvent);
  const user = useSelector((state: StateType) => state.user);
  const [copyCodeToolTip, setCopyCodeToolTip] = useState(COPY_TO_CLIPBOARD);
  const [copyLinkToolTip, setCopyLinkToolTip] = useState(COPY_TO_CLIPBOARD);
  const dispatch = useDispatch();

  const events = user.events || [];
  const encodedEvent = Buffer.from(`${user.username}:${event?.name}`).toString(
    'base64'
  );
  const eventLink = `https://superbets.herokuapp.com/${encodedEvent}`; // TODO: update with local dev base url

  return (
    <div id='confirm'>
      <Dropdown
        value={event}
        options={events}
        onChange={(target) =>
          dispatch(setEvent(target.value, EventMode.CONFIRM))
        }
        optionLabel='name'
        filter
        showClear
        filterBy='name'
        placeholder='Select an Event'
      />
      <p>{event?.name}</p>
      {event?.name && (
        <div className='confirm-container'>
          <div>{<Event manageSnackbars={manageSnackbars as any} />}</div>
          <div className='side-card'>
            <div className='copy-code'>
              <p>This is the Code for your event</p>
              <div>
                <InputText
                  value={encodedEvent}
                  className='p-inputtext-sm extra-wide-input'
                />
                <Button
                  icon='pi pi-copy'
                  className='p-button'
                  onClick={() => {
                    navigator.clipboard.writeText(encodedEvent);
                    setCopyCodeToolTip(COPIED_TO_CLIPBOARD);
                    setCopyLinkToolTip(COPY_TO_CLIPBOARD);
                  }}
                  tooltip={copyCodeToolTip}
                />
              </div>
            </div>
            <div className='copy-link'>
              <p>This is the Link for your event</p>
              <div>
                <InputText
                  value={eventLink}
                  className='p-inputtext-sm extra-wide-input'
                />
                <Button
                  icon='pi pi-copy'
                  className='p-button'
                  onClick={() => {
                    navigator.clipboard.writeText(eventLink);
                    setCopyLinkToolTip(COPIED_TO_CLIPBOARD);
                    setCopyCodeToolTip(COPY_TO_CLIPBOARD);
                  }}
                  tooltip={copyLinkToolTip}
                />
              </div>
            </div>
            <div className='lock-button'>
              <p>Use to finalize all bets and lock in final answers</p>
              <Button
                className='p-button-help'
                label={'Lock It In'}
                onClick={() => console.log('LOCKED')}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConfirmAnswers;
