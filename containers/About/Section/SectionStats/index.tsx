import Col from '../../../../components/Layout/Col';
import Row from '../../../../components/Layout/Row';
import StatCard from '../../../../components/About/StatCard';
import useStats from '../../../../hooks/about/useStats';

export default function SectionStats() {
  const stats = useStats();

  return (
    <section className="container pb-5 mb-2 mb-md-4 mb-lg-5">
      <div className="bg-secondary rounded-3 py-5 px-3 px-md-0">
        <div className="row justify-content-center mb-2 py-md-2 py-lg-4">
          <div className="col-lg-10 col-md-11">
            <h2 className="pb-3">WePark 2024 Goals</h2>
            <Row className="row-cols-1 row-cols-md-2 g-4">
              {stats.map((stat) => (
                <Col key={stat.id}>
                  <StatCard {...stat} />
                </Col>
              ))}
            </Row>
          </div>
        </div>
      </div>
    </section>
  );
}
