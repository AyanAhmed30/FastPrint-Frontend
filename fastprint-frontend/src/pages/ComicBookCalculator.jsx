import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_BASE = 'http://localhost:8000'; // Update if needed

const ComicBookCalculator = () => {
  const [dropdowns, setDropdowns] = useState({});
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
  const [loadingDropdowns, setLoadingDropdowns] = useState(true);
  const [loadingBindings, setLoadingBindings] = useState(false);
  const [calculating, setCalculating] = useState(false);

  // 🔽 Fetch dropdowns once on load
  useEffect(() => {
    const fetchDropdowns = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/comicbook/dropdowns/`);
        setDropdowns(res.data);
      } catch (err) {
        console.error("❌ Dropdown Fetch Error:", err);
        alert("Failed to load dropdowns.");
      } finally {
        setLoadingDropdowns(false);
      }
    };
    fetchDropdowns();
  }, []);

  // 🔁 Fetch bindings on trim size + page count
  useEffect(() => {
    const { trim_size_id, page_count } = form;
    if (trim_size_id && page_count) {
      const fetchBindings = async () => {
        try {
          setLoadingBindings(true);
          const res = await axios.get(`${API_BASE}/api/comicbook/bindings/`, {
            params: { trim_size_id, page_count }
          });
          setBindings(res.data || []);
        } catch (err) {
          console.error("❌ Binding Fetch Error:", err);
          alert("Failed to load bindings.");
        } finally {
          setLoadingBindings(false);
        }
      };
      fetchBindings();
    } else {
      setBindings([]);
    }
  }, [form.trim_size_id, form.page_count]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setCalculating(true);
      const res = await axios.post(`${API_BASE}/api/comicbook/calculate/`, form);
      setResult(res.data);
    } catch (err) {
      console.error("❌ Calculation Error:", err);
      alert("Calculation failed.");
    } finally {
      setCalculating(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-900 text-white rounded shadow-md mt-10">
      <h2 className="text-2xl font-bold text-yellow-400 text-center mb-6">📚 Comic Book Calculator</h2>

      {loadingDropdowns ? (
        <p className="text-center text-yellow-300">Loading dropdown options...</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">

          <SelectInput
            label="Trim Size"
            name="trim_size_id"
            value={form.trim_size_id}
            options={dropdowns.trim_sizes || []}
            onChange={handleChange}
          />

          <InputField
            label="Page Count"
            name="page_count"
            type="number"
            value={form.page_count}
            onChange={handleChange}
          />

          {loadingBindings ? (
            <p className="text-yellow-300">Loading bindings...</p>
          ) : (
            <SelectInput
              label="Binding Type"
              name="binding_id"
              value={form.binding_id}
              options={bindings}
              onChange={handleChange}
              priceField="price"
            />
          )}

          <SelectInput
            label="Interior Color"
            name="interior_color_id"
            value={form.interior_color_id}
            options={dropdowns.interior_colors || []}
            onChange={handleChange}
            priceField="price_per_page"
          />

          <SelectInput
            label="Paper Type"
            name="paper_type_id"
            value={form.paper_type_id}
            options={dropdowns.paper_types || []}
            onChange={handleChange}
            priceField="price_per_page"
          />

          <SelectInput
            label="Cover Finish"
            name="cover_finish_id"
            value={form.cover_finish_id}
            options={dropdowns.cover_finishes || []}
            onChange={handleChange}
            priceField="price"
          />

          <InputField
            label="Quantity"
            name="quantity"
            type="number"
            value={form.quantity}
            onChange={handleChange}
          />

          <button
            type="submit"
            disabled={calculating}
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-black py-2 rounded font-semibold"
          >
            {calculating ? 'Calculating...' : 'Calculate'}
          </button>
        </form>
      )}

      {result && (
        <div className="mt-6 p-4 bg-gray-800 border border-yellow-600 rounded">
          <h3 className="font-semibold text-yellow-400">💰 Result</h3>
          <p><strong>Cost per Book:</strong> ${Number(result.cost_per_book).toFixed(2)}</p>
          <p><strong>Total Cost:</strong> ${Number(result.total_cost).toFixed(2)}</p>
        </div>
      )}
    </div>
  );
};

const SelectInput = ({ label, name, value, options, onChange, priceField }) => (
  <div>
    <label className="block mb-1 font-medium">{label}</label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      required
      className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600"
    >
      <option value="">Select {label}</option>
      {options.map((opt) => (
        <option key={opt.id} value={opt.id}>
          {opt.name} {priceField ? `($${opt[priceField]})` : ''}
        </option>
      ))}
    </select>
  </div>
);

const InputField = ({ label, name, value, onChange, type = 'text' }) => (
  <div>
    <label className="block mb-1 font-medium">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      required
      min={type === 'number' ? 1 : undefined}
      className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600"
    />
  </div>
);

export default ComicBookCalculator;
