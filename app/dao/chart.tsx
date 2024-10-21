'use client';

import { Card, AreaChart, Title, Text } from '@tremor/react';

const data = [
  {
    Month: 'Jan',
    FY24: 890,
    FY23: 400
  },
  {
    Month: 'Feb ',
    FY24: 1240,
    FY23: 890
  },
  {
    Month: 'Mar',
    FY24: 890,
    FY23: 780
  }
];

export default function Example() {
  return (
    <Card className="mt-8">
      <Title>Parking DAO Dividen Payout </Title>
      <Text>Year over year comparison</Text>
      <AreaChart
        className="mt-4 h-80"
        data={data}
        categories={['FY24', 'FY23']}
        index="Month"
        colors={['indigo', 'fuchsia']}
        valueFormatter={(number: number) =>
          `$ ${Intl.NumberFormat('us').format(number).toString()}`
        }
        yAxisWidth={60}
      />
    </Card>
  );
}
