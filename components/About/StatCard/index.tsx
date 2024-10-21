import { StatCard } from "../../../hooks/about/useStats";

export default function StatCard({
  img,
  count,
  text: { title, helperText }
}: StatCard) {
  return (
    <div className="card h-100 border-0 shadow-sm p-md-2 p-lg-4">
      <div className="card-body d-flex align-items-center">
        <div className="bg-primary shadow-primary rounded-3 flex-shrink-0 p-3">
          <img src={img} className="d-block m-1" width="40" alt="Icon" />
        </div>
        <div className="ps-4 ms-lg-3">
          <h3 className="display-5 mb-1">{count || ''}</h3>
          <p className="mb-0">
            <span className="fw-semibold">{title || ''}</span>{' '}
            {helperText || ''}
          </p>
        </div>
      </div>
    </div>
  );
}
