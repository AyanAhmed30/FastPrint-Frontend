import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Products
import PrintBook from './pages/products/PrintBook';
import ComicBook from './pages/products/ComicBook';
import Cookbook from './pages/products/CookBook';
import Ebook from './pages/products/Ebook';
import PhotoBook from './pages/products/PhotoBook';
import PrintMagzine from './pages/products/PrintMagzine';
import YearBook from './pages/products/YearBook';

// Resources
import GuideTemplates from './pages/resources/GuideTemplate';
import Blog from './pages/resources/Blog';
import PublishingResources from './pages/resources/PublishingResources';
import ContactResources from './pages/resources/ContactResources';
import HireProfessional from './pages/resources/HireProfessional';
import OrderLookup from './pages/resources/OrderLookup';
import PlanProject from './pages/resources/PlanProject';

// Main Pages
import Home from './pages/Home';
import Pricing from './pages/Pricing';
import PricingCalculator from './pages/PricingCalculator';
import Portfolio from './pages/Portfolio';
import PrintShop from './pages/PrintShop';
import About from './pages/About';
import Login from './pages/Login';
import Signup from './pages/Signup';

// ✅ Newly added
import PrintBookCalculator from './pages/PrintBookCalculator';
import ComicBookCalculator from './pages/ComicBookCalculator'; // ✅ new import


const AppRoutes = () => {
  return (
    <Routes>
      {/* Main Pages */}
      <Route path="/" element={<Home />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/pricing-calculator" element={<PricingCalculator />} />
      <Route path="/portfolio" element={<Portfolio />} />
      <Route path="/print-shop" element={<PrintShop />} />
      <Route path="/about" element={<About />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* ✅ Pricing Calculator for Print Book */}
      <Route path="/calculator/printbook" element={<PrintBookCalculator />} />
      <Route path="/calculator/comicbook" element={<ComicBookCalculator />} /> {/* ✅ added */}


      {/* Product Routes */}
      <Route path="/products/print-book" element={<PrintBook />} />
      <Route path="/products/comic-book" element={<ComicBook />} />
      <Route path="/products/cookbook" element={<Cookbook />} />
      <Route path="/products/ebook" element={<Ebook />} />
      <Route path="/products/photo-book" element={<PhotoBook />} />
      <Route path="/products/print-magazine" element={<PrintMagzine />} />
      <Route path="/products/yearbook" element={<YearBook />} />

      {/* Resource Routes */}
      <Route path="/resources/guide-templates" element={<GuideTemplates />} />
      <Route path="/resources/blog" element={<Blog />} />
      <Route path="/resources/publishing-resources" element={<PublishingResources />} />
      <Route path="/resources/contact-resources" element={<ContactResources />} />
      <Route path="/resources/hire-professional" element={<HireProfessional />} />
      <Route path="/resources/order-lookup" element={<OrderLookup />} />
      <Route path="/resources/plan-project" element={<PlanProject />} />
    </Routes>
  );
};

export default AppRoutes;
