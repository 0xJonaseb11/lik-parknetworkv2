export type LocationAvailabilityTimings = {
  period: string;
  openingTime: string;
  closingTime: string;
};

export type DisplayLocation = {
  location: string;
  phone: string;
  timings: LocationAvailabilityTimings[];
};

export default function useDisplayLocations(): DisplayLocation[] {
  const locations: DisplayLocation[] = [
    {
      location: '6104 Roosevelt Rd. Oak Park, IL 60304',
      phone: '(708) 340-8888',
      timings: [
        {
          period: 'Mon - Fri',
          openingTime: '9:00 am',
          closingTime: '22:00 am'
        },
        {
          period: 'Sat - Sun',
          openingTime: '9:00 am',
          closingTime: '22:00 am'
        }
      ]
    }
  ];

  return locations;
}
