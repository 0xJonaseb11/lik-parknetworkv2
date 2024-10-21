export type StatCard = {
  id: string;
  img: string;
  count: string;
  text: {
    title: string;
    helperText: string;
  };
};

export default function useStats(): StatCard[] {
  const cards: StatCard[] = [
    {
      id: '1',
      img: 'https://silicon.createx.studio/assets/img/about/icons/headset-light.svg',
      count: '100',
      text: {
        title: 'WePark',
        helperText: 'Members'
      }
    },
    {
      id: '2',
      img: 'https://silicon.createx.studio/assets/img/about/icons/chat-light.svg',
      count: '200',
      text: {
        title: 'WePark',
        helperText: 'Network Parking Spaces'
      }
    },
    {
      id: '3',
      img: 'https://silicon.createx.studio/assets/img/about/icons/add-group-light.svg',
      count: '100',
      text: {
        title: 'WePark',
        helperText: 'EV Charging Stations'
      }
    },
    {
      id: '4',
      img: 'https://silicon.createx.studio/assets/img/about/icons/location-light.svg',
      count: '2,000',
      text: {
        title: 'Transactions',
        helperText: 'on the WePark network'
      }
    }
  ];

  return cards;
}
