import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Header from '../components/Header';
import Carousel from '../components/Carousel';

import Book1 from '../assets/images/book1.png';
import Book2 from '../assets/images/Group.png';
import RightImage from '../assets/images/right.png';

import PerfectBoundImg from '../assets/images/perfectbound.png';
import CoilBoundImg from '../assets/images/coilbound.png';
import SaddleImg from '../assets/images/saddle.png';
import CaseWrap from '../assets/images/casewrap.png';
import LinenWrap from '../assets/images/linenwrap.png';
import StandardBlackAndWhite from '../assets/images/int1.png';
import PremiumBlackAndWhite from '../assets/images/in2.png';
import StandardColor from '../assets/images/in3.png';
import PremiumColor from '../assets/images/int4.png';
import CreamUncoated from '../assets/images/pp1.jpg';
import WhiteUncoated from '../assets/images/pp2.jpg';
import WhiteCoated from '../assets/images/pp3.jpg';
import WhiteCoated2 from '../assets/images/pp4.jpg';
import Glossy from '../assets/images/glossy.png';
import Matty from '../assets/images/matty.png';
import Footer from '../components/Footer';
import RedirectButton from '../components/RedirectButton';

const API_BASE = 'http://localhost:8000';

const imageMap = {
  bindings: {
    'Perfect Bound': PerfectBoundImg,
    'Coil Bound': CoilBoundImg,
    'Saddle Stitch': SaddleImg,
    'Case Wrap': CaseWrap,
    'Linen Wrap': LinenWrap,
  },
  interior_colors: {
    'Standard Black & White': StandardBlackAndWhite,
    'Premium Black & White': PremiumBlackAndWhite,
    'Standard Color': StandardColor,
    'Premium Color': PremiumColor,
  },
  paper_types: {
    '60# Cream-Uncoated': CreamUncoated,
    '60# White-Uncoated': WhiteUncoated,
    '80# White-Coated': WhiteCoated,
    '100# White-Coated': WhiteCoated2,
  },
  cover_finishes: {
    Gloss: Glossy,
    Matte: Matty,
  },
};

const SelectInput = ({ name, value, options, onChange, placeholder, className }) => (
  <select
    name={name}
    value={value}
    onChange={onChange}
    required
    className={`w-full rounded px-3 border border-white text-sm focus:outline-none ${className}`}
  >
    <option value="">{placeholder}</option>
    {options.map((opt) => (
      <option key={opt.id} value={opt.id}>
        {opt.name}
      </option>
    ))}
  </select>
);

const InputField = ({ name, value, onChange, type, placeholder, min, max, className }) => (
  <input
    type={type}
    name={name}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    min={min}
    max={max}
    className={`w-full rounded px-3 border border-white text-sm focus:outline-none ${className}`}
  />
);

const OptionField = ({ title, name, options, images, form, handleChange, disabled }) => (
  <fieldset>
    <legend className="font-semibold text-gray-700 mb-3">{title}</legend>
    <div className="flex flex-wrap gap-6">
      {options.map((opt) => {
        const isSelected = form[name] === opt.id;
        return (
          <label
            key={opt.id}
            className={`cursor-pointer flex flex-col items-center w-24 p-2 border rounded transition
              ${isSelected ? 'border-blue-600 bg-blue-100' : 'border-gray-300'}
              ${disabled ? 'opacity-50 pointer-events-none' : ''}
            `}
          >
            <input
              type="radio"
              name={name}
              value={opt.id}
              checked={isSelected}
              onChange={handleChange}
              disabled={disabled}
              className="mb-2"
            />
            {images[opt.name] && (
              <img src={images[opt.name]} alt={opt.name} className="w-16 h-16 object-contain mb-1" />
            )}
            <span className="text-center text-sm">{opt.name}</span>
          </label>
        );
      })}
    </div>
  </fieldset>
);

const InfoRow = ({ label, value }) => (
  <div className="flex justify-between border-b border-gray-200 pb-1 text-gray-700">
    <span className="font-semibold">{label}</span>
    <span>{value}</span>
  </div>
);

const getNameById = (list, id) => list?.find((opt) => opt.id === id)?.name || '-';

const MagazineCalculator = () => {
  const [dropdowns, setDropdowns] = useState({});
  const [allBindings, setAllBindings] = useState([]);
  const [bindings, setBindings] = useState([]);
  const [form, setForm] = useState({
    trim_size_id: '',
    page_count: '',
    binding_id: '',
    interior_color_id: '',
    paper_type_id: '',
    cover_finish_id: '',
    quantity: 1,
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [calculating, setCalculating] = useState(false);

  useEffect(() => {
    axios.get(`${API_BASE}/api/magazine/dropdowns/`)
      .then((res) => {
        setDropdowns(res.data);
        setAllBindings(res.data.binding_types || []);
      })
      .catch(() => alert('Failed to load dropdowns.'))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const { trim_size_id, page_count } = form;
    if (trim_size_id && page_count) {
      axios
        .get(`${API_BASE}/api/magazine/bindings/`, { params: { trim_size_id, page_count } })
        .then((res) => setBindings(res.data))
        .catch(() => alert('Failed to load bindings.'));
    } else {
      setBindings([]);
    }
  }, [form.trim_size_id, form.page_count]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === 'quantity' || name === 'page_count' ? Number(value) : value,
    }));
    setResult(null);
  };

  const handlePageCount = (e) => {
    let val = e.target.value;
    if (val === '') return handleChange(e);
    const numVal = Number(val);
    if (numVal > 200) {
      handleChange({ ...e, target: { ...e.target, value: '200' } });
    } else if (numVal < 1) {
      handleChange({ ...e, target: { ...e.target, value: '1' } });
    } else {
      handleChange(e);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCalculating(true);
    try {
      const res = await axios.post(`${API_BASE}/api/magazine/calculate/`, form);
      setResult(res.data);
    } catch {
      alert('Calculation failed.');
    } finally {
      setCalculating(false);
    }
  };

  const showFilteredBindings = form.trim_size_id && form.page_count;
  const bindingOptions = showFilteredBindings ? bindings : allBindings;

  return (
    <>
      <Header />
      <section
        className="w-full px-6 py-8 border-[5px] border-white/50 backdrop-blur-xl flex flex-col md:flex-row justify-between items-center"
        style={{ background: 'linear-gradient(90deg, #016AB3 16.41%, #0096CD 60.03%, #00AEDC 87.93%)' }}
      >
        <div className="w-full md:w-1/2 text-white text-center md:text-left mb-6 md:mb-0">
          <h2 className="text-[28px] sm:text-[36px] md:text-[50px] font-bold leading-tight mb-3">
            Magazine <span className="text-[#F8C20A]">Calculator</span>
          </h2>
          <p className="text-sm sm:text-base leading-relaxed">Calculate your magazine printing costs and get instant pricing.</p>
        </div>
        <div className="w-full md:w-1/2 flex justify-center md:justify-end items-center">
          <img src={Book1} alt="Book1" className="w-[160px] mr-[-135px] z-10" />
          <img src={Book2} alt="Book2" className="w-[170px] rotate-[4deg]" />
        </div>
      </section>

      <Carousel />

      <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
        {loading ? (
          <p className="text-blue-700">Loading options...</p>
        ) : (
          <div className="flex w-full max-w-6xl gap-8">
            <form onSubmit={handleSubmit} className="flex-1 bg-white p-8 rounded-lg shadow-lg flex flex-col gap-6">
              {/* Trim Size + Page Count */}
              <div
                className="flex flex-col gap-4 px-4 py-4 mb-8"
                style={{
                  background: 'linear-gradient(90deg, #016AB3 16.41%, #0096CD 60.03%, #00AEDC 87.93%)',
                  border: '1px solid #E5E5E5',
                  borderRadius: '20px',
                }}
              >
                <h3 style={{ color: 'white' }} className="text-lg font-semibold">
                  Book Size & Page Count
                </h3>
                <div className="flex gap-4 items-end">
                  <div className="w-1/2">
                    <SelectInput
                      name="trim_size_id"
                      value={form.trim_size_id}
                      options={dropdowns.trim_sizes || []}
                      onChange={handleChange}
                      placeholder="Select Book Size"
                      className="h-12"
                    />
                  </div>
                  <div className="w-1/2">
                    <p className="text-xs text-white mb-1 opacity-90">Maximum page count is 200</p>
                    <InputField
                      type="number"
                      name="page_count"
                      value={form.page_count}
                      onChange={handlePageCount}
                      placeholder="Enter Page Count"
                      min="1"
                      max="200"
                      className="h-12"
                    />
                  </div>
                </div>
              </div>

              <OptionField
                title="Binding Type"
                name="binding_id"
                options={bindingOptions}
                images={imageMap.bindings}
                form={form}
                handleChange={handleChange}
                disabled={showFilteredBindings && bindings.length === 0}
              />

              <OptionField
                title="Interior Color"
                name="interior_color_id"
                options={dropdowns.interior_colors || []}
                images={imageMap.interior_colors}
                form={form}
                handleChange={handleChange}
              />
              <OptionField
                title="Paper Type"
                name="paper_type_id"
                options={dropdowns.paper_types || []}
                images={imageMap.paper_types}
                form={form}
                handleChange={handleChange}
              />
              <OptionField
                title="Cover Finish"
                name="cover_finish_id"
                options={dropdowns.cover_finishes || []}
                images={imageMap.cover_finishes}
                form={form}
                handleChange={handleChange}
              />

              <div>
                <label className="block mb-1 font-medium text-gray-700">Quantity</label>
                <input
                  type="number"
                  name="quantity"
                  value={form.quantity}
                  onChange={handleChange}
                  min={1}
                  required
                  className="w-full p-2 rounded border border-gray-300"
                />
              </div>

              <button
                type="submit"
                disabled={calculating}
                className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 px-6 rounded transition"
              >
                {calculating ? 'Calculating...' : 'Calculate'}
              </button>

              {result && (
                <div className="mt-6 p-4 bg-blue-100 border border-blue-300 rounded text-blue-900">
                  <h3 className="font-semibold mb-2">💰 Result</h3>
                  <p><strong>Cost per Magazine:</strong> ${Number(result.cost_per_book).toFixed(2)}</p>
                  <p><strong>Total Cost:</strong> ${Number(result.total_cost).toFixed(2)}</p>
                </div>
              )}
            </form>

            <aside className="w-96 bg-white rounded-lg shadow-lg p-6 flex flex-col">
              <img src={RightImage} alt="Magazine" className="w-full h-48 object-cover rounded mb-6" />
              <h2 className="text-2xl font-bold text-blue-900 mb-4 text-center">High-Quality Magazine Printing</h2>
              <div className="space-y-4 flex-grow">
                <InfoRow label="Trim Size" value={getNameById(dropdowns.trim_sizes, form.trim_size_id)} />
                <InfoRow label="Page Count" value={form.page_count || '-'} />
                <InfoRow label="Binding Type" value={getNameById(bindingOptions, form.binding_id)} />
                <InfoRow label="Interior Color" value={getNameById(dropdowns.interior_colors, form.interior_color_id)} />
                <InfoRow label="Paper Type" value={getNameById(dropdowns.paper_types, form.paper_type_id)} />
                <InfoRow label="Cover Finish" value={getNameById(dropdowns.cover_finishes, form.cover_finish_id)} />
                <InfoRow label="Quantity" value={form.quantity} />
                <RedirectButton/>
              </div>
            </aside>
          </div>
        )}
      </div>
      <Footer/>
    </>
  );
};

export default MagazineCalculator;
