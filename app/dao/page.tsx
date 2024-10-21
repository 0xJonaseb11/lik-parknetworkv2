'use client';

import { Card, Metric, Text, Title, BarList, Flex, Grid } from '@tremor/react';
import Chart from './chart';

const fence = [
  { name: 'Chicago Metal Works', value: 1230 },
  { name: 'Sebastian Fence Co.', value: 751 },
  { name: 'Oak Park Welding', value: 471 },
  { name: 'Home Depot', value: 280 },
  { name: 'Other proposals', value: 78 }
];

const asphalt = [
  { name: 'Heavy Duty Construction', value: 453 },
  { name: 'Rose Paving', value: 351 },
  { name: 'Hardy Paving ', value: 271 },
  { name: 'Ogden Construction ', value: 211 },
  { name: 'Other proposals', value: 191 }
];

const pricing = [
  { name: 'Increase rates by 5%', value: 789 },
  { name: 'Keep rates the same', value: 676 },
  { name: 'Increase rates by 10%', value: 564 },
  { name: 'Lower rates by 5%', value: 234 },
  { name: 'Other proposals', value: 191 }
];

const data = [
  {
    category: 'Proposal 12',
    stat: 'New fence contractor',
    data: fence
  },
  {
    category: 'Proposal 17',
    stat: 'New asphalt contractor',
    data: asphalt
  },
  {
    category: 'Proposal 21',
    stat: 'Pricing adjustments',
    data: pricing
  }
];

export default function PlaygroundPage() {
  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Grid numItemsSm={2} numItemsLg={3} className="gap-6">
        {data.map((item) => (
          <Card key={item.category}>
            <Title>{item.category}</Title>
            <Flex
              justifyContent="start"
              alignItems="baseline"
              className="space-x-2"
            >
              <Metric>{item.stat}</Metric>
              <Text>Total votes</Text>
            </Flex>
            <Flex className="mt-6">
              <Text>Options</Text>
              <Text className="text-right">Votes</Text>
            </Flex>
            <BarList
              data={item.data}
              valueFormatter={(number: number) =>
                Intl.NumberFormat('us').format(number).toString()
              }
              className="mt-2"
            />
          </Card>
        ))}
      </Grid>
      <Chart />
    </main>
  );
}
