export default function ContactForm() {
  return (
    <form className="col-lg-6 col-md-7 offset-xl-1 needs-validation" noValidate>
      <div className="row">
        <div className="col-sm-6 mb-4">
          <label htmlFor="name" className="form-label fs-base">
            Full name
          </label>
          <input
            type="text"
            id="name"
            className="form-control form-control-lg"
            required
          />
          <div className="invalid-feedback">Please enter your name!</div>
        </div>
        <div className="col-sm-6 mb-4">
          <label htmlFor="email" className="form-label fs-base">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="form-control form-control-lg"
            required
          />
          <div className="invalid-feedback">
            Please provide a valid email address!
          </div>
        </div>
        <div className="col-12 pb-2 mb-4">
          <label htmlFor="message" className="form-label fs-base">
            Message
          </label>
          <textarea
            id="message"
            className="form-control form-control-lg"
            rows={4}
            required
          ></textarea>
          <div className="invalid-feedback">Please enter your message!</div>
        </div>
      </div>
      <button type="submit" className="btn btn-primary shadow-primary btn-lg">
        Send request
      </button>
    </form>
  );
}
