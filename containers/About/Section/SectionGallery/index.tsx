import ImageGallery from "../../../../components/About/ImageGallery";
import { PrimaryButton } from "../../../../components/Button/Outline";

export default function SectionGallery() {
  return (
    <section className="container pb-5 mb-2 mb-md-4 mb-lg-5 mt-n2">
      <div className="d-flex align-items-center justify-content-between pb-4 mb-2">
        <h2 className="h1 mb-0">View our progress</h2>
        <PrimaryButton href="https://www.instagram.com/WePark.dao/" target="_blank">Follow our Instagram</PrimaryButton>
      </div>
      <ImageGallery />
    </section>
  );
}
