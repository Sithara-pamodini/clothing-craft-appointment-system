import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

function Home() {
  return (
    <div className="min-h-screen bg-[#fffaf7] text-gray-900">
      {/* Hero Section */}
      <section
        className="relative min-h-[620px] md:min-h-[700px] bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/hero-bg.png')",
        }}
      >
        {/* Soft overlay for text readability */}
        {/* <div className="absolute inset-0 bg-white/55 md:bg-white/35"></div> */}
        <div className="absolute inset-0 bg-white/10"></div>

        <div className="relative max-w-7xl mx-auto px-4 py-24 md:py-32 min-h-[620px] md:min-h-[700px] flex items-center">
          <div className="max-w-2xl">
            <p className="uppercase tracking-[0.3em] text-sm text-pink-700 font-semibold mb-4">
              Nilu Fashion
            </p>

            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6 text-white">
              Elegant Clothing, Tailored for Your Style
            </h1>

            <p className="text-white text-lg md:text-xl mb-8 max-w-xl">
              Discover beautiful clothing, custom tailoring, alterations, and
              fitting services designed to help you look confident for every
              occasion.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/book-appointment"
                className="bg-gray-900 text-white px-6 py-3 rounded-full font-semibold hover:bg-gray-700 transition flex items-center justify-center gap-2"
              >
                Book Appointment
                <ArrowRight size={18} />
              </Link>

              <Link
                to="/services"
                className="border border-gray-300 bg-white/80 backdrop-blur px-6 py-3 rounded-full font-semibold hover:bg-white transition text-center"
              >
                View Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Clothing Categories */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="uppercase tracking-[0.25em] text-sm text-pink-700 font-semibold mb-3">
            Our Collection
          </p>

          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Clothing for Every Occasion
          </h2>

          <p className="text-gray-600 text-lg">
            Nilu Fashion offers stylish clothing and custom-made outfits for
            daily wear, office wear, special events, and traditional occasions.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-3xl p-5 shadow-sm border hover:shadow-md transition overflow-hidden">
            <img
              src="/images/lady-wear.png"
              alt="Ladies Wear"
              className="w-full h-48 object-cover rounded-2xl mb-5"
            />
            <h3 className="font-bold text-xl mb-2">Ladies Wear</h3>
            <p className="text-gray-600">
              Elegant dresses, tops, blouses, skirts, and everyday fashion wear.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-5 shadow-sm border hover:shadow-md transition overflow-hidden">
            <img
              src="/images/Occasion.png"
              alt="Occasion Wear"
              className="w-full h-48 object-cover rounded-2xl mb-5"
            />
            <h3 className="font-bold text-xl mb-2">Occasion Wear</h3>
            <p className="text-gray-600">
              Beautiful outfits for parties, weddings, functions, and events.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-5 shadow-sm border hover:shadow-md transition overflow-hidden">
            <img
              src="/images/Custom.png"
              alt="Custom Tailoring"
              className="w-full h-48 object-cover rounded-2xl mb-5"
            />
            <h3 className="font-bold text-xl mb-2">Custom Tailoring</h3>
            <p className="text-gray-600">
              Personalized stitching and fitting based on your style and size.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-5 shadow-sm border hover:shadow-md transition overflow-hidden">
            <img
              src="/images/Alterations.png"
              alt="Alterations"
              className="w-full h-48 object-cover rounded-2xl mb-5"
            />
            <h3 className="font-bold text-xl mb-2">Alterations</h3>
            <p className="text-gray-600">
              Resize, repair, adjust, and improve your existing clothing items.
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-white border-y">
        <div className="max-w-7xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-12 items-center">
          <div className="rounded-[2rem] bg-gradient-to-br from-gray-900 to-gray-700 text-white p-8 md:p-12">
            <p className="uppercase tracking-[0.25em] text-sm text-pink-200 font-semibold mb-4">
              What We Do
            </p>

            <h2 className="text-3xl md:text-4xl font-bold mb-5">
              Fashion Services Made Simple
            </h2>

            <p className="text-gray-200 text-lg mb-8">
              Whether you need a new outfit, a perfect fit, or a professional
              alteration, Nilu Fashion provides clothing services with personal
              attention and care.
            </p>

            <Link
              to="/book-appointment"
              className="inline-flex items-center gap-2 bg-white text-gray-900 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition"
            >
              Schedule a Visit
              <ArrowRight size={18} />
            </Link>
          </div>

          <div className="grid gap-4">
            <div className="bg-[#fffaf7] p-6 rounded-2xl border">
              <h3 className="font-bold text-xl mb-2">Dress Making</h3>
              <p className="text-gray-600">
                Custom dresses created for casual wear, office use, events, and
                special occasions.
              </p>
            </div>

            <div className="bg-[#fffaf7] p-6 rounded-2xl border">
              <h3 className="font-bold text-xl mb-2">Saree Jacket Stitching</h3>
              <p className="text-gray-600">
                Stylish saree jackets stitched with attention to fit, comfort,
                and design.
              </p>
            </div>

            <div className="bg-[#fffaf7] p-6 rounded-2xl border">
              <h3 className="font-bold text-xl mb-2">Fitting Appointments</h3>
              <p className="text-gray-600">
                Book a fitting appointment to get accurate measurements and
                adjustments.
              </p>
            </div>

            <div className="bg-[#fffaf7] p-6 rounded-2xl border">
              <h3 className="font-bold text-xl mb-2">Clothing Repairs</h3>
              <p className="text-gray-600">
                Simple repairs, resizing, hemming, and clothing adjustments for
                a better fit.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Appointment CTA */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="rounded-[2rem] bg-pink-50 border border-pink-100 p-8 md:p-14 text-center">
          <p className="uppercase tracking-[0.25em] text-sm text-pink-700 font-semibold mb-3">
            Visit Nilu Fashion
          </p>

          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Need a Fitting or Custom Outfit?
          </h2>

          <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-8">
            Book an appointment and let us help you choose, stitch, alter, or
            perfect your clothing with care.
          </p>

          <Link
            to="/book-appointment"
            className="inline-flex items-center gap-2 bg-gray-900 text-white px-7 py-3 rounded-full font-semibold hover:bg-gray-700 transition"
          >
            Book Appointment
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;