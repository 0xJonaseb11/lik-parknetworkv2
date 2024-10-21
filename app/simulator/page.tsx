import FlexBox from '../../components/Layout/FlexBox';
import SimulatorCanvas from '../../components/Simulator/SimulatorCanvas';
import TransactionsTable from '../../containers/transactions/TransactionsTable';
import Btn from './Btn';

export default function Page() {
  return (
    <section className="h-screen overflow-hidden flex flex-col sm:flex-row">
      <FlexBox className="flex-col sm:w-1/3 h-full">
        <FlexBox className="flex-col justify-center items-center p-8">
          <h2 className="h1 mb-4 text-center">Parking Simulator</h2>
          <Btn />
        </FlexBox>
        <TransactionsTable />
      </FlexBox>
      <FlexBox className="w-2/3">
        <SimulatorCanvas />
      </FlexBox>
    </section>
  );
}
