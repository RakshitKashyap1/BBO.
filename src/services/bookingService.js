import apiClient from '../api/apiClient';

export const getBookings = async () => {
  const response = await apiClient.get('/bookings/');
  return response.data;
};

export const createBooking = async (bookingData) => {
  const response = await apiClient.post('/bookings/', bookingData);
  return response.data;
};
