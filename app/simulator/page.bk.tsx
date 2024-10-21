import FlexBox from '../../components/Layout/FlexBox';

export default function Page() {
  return (
    <section className="h-screen overflow-hidden flex flex-col sm:flex-row">
      <FlexBox className="container sm:w-1/2 h-full justify-center items-center">
        <div className='p-8'>
          <h2 className="h1 mb-4">3D Shape Illustration</h2>
          <p className="pb-3 mb-3">
            Proin odio elit fringilla pellentesque erat sapien, cursus id. Sed
            mi semper amet fringilla. Eget morbi arcu ac vestibulum sodales.
            Montes, integer lacinia amet tristique tincidunt.
          </p>
          <table className="mb-5">
            <tbody>
              <tr>
                <th className="text-dark fw-bold pb-2" scope="row">
                  Client
                </th>
                <td className="ps-3 ps-sm-4 pb-2">Createx Inc.</td>
              </tr>
              <tr>
                <th className="text-dark fw-bold pb-2" scope="row">
                  Category
                </th>
                <td className="ps-3 ps-sm-4 pb-2">Graphic Design</td>
              </tr>
              <tr>
                <th className="text-dark fw-bold pb-2" scope="row">
                  Date
                </th>
                <td className="ps-3 ps-sm-4 pb-2">29 November 2023</td>
              </tr>
            </tbody>
          </table>
          <a
            href="portfolio-single-project.html"
            className="btn btn-primary shadow-primary mt-n2"
          >
            Read more
          </a>
        </div>
      </FlexBox>
      <div
        className="bg-blue sm:w-1/2 h-full"
        style={{
          backgroundImage:
            'url(https://silicon.createx.studio/assets/img/portfolio/slider/01.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      ></div>
    </section>
  );
}
