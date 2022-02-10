import { SUPERBETS_API_BASE_URL } from '../../config';

export const getEventsByUser = async (id) => {
  const response = await fetch(`${SUPERBETS_API_BASE_URL}/betevents/${id}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  });
  const { betEvents } = await response.json();
  return betEvents;
};

export const getEventFromEncoded = async (encodedEvent) => {
  const response = await fetch(
    `${SUPERBETS_API_BASE_URL}/eventname/${encodedEvent}`,
    {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    }
  );
  return response.json();
};
